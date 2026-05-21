import { supabase } from "../lib/supabase";
import { Conversation, ChatMessage } from "../data";

type SetConvsFn = (fn: (p: Conversation[]) => Conversation[]) => void;

// ── Real-time subscription management ────────────────────────────────────────
let activeSubscription: ReturnType<typeof supabase.channel> | null = null;

export const subscribeToConversation = (
  conversationId: string,
  onNewMessage: (msg: ChatMessage) => void
) => {
  // Unsubscribe from previous
  if (activeSubscription) {
    activeSubscription.unsubscribe();
  }

  activeSubscription = supabase
    .channel(`messages:${conversationId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        const row = payload.new as any;
        const msg: ChatMessage = {
          id: row.id,
          from: row.sender as "user" | "agency",
          text: row.text,
          time: new Date(row.created_at).toLocaleTimeString("fr-DZ", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "delivered",
        };
        onNewMessage(msg);
      }
    )
    .subscribe();

  return activeSubscription;
};

export const unsubscribeFromConversation = () => {
  if (activeSubscription) {
    activeSubscription.unsubscribe();
    activeSubscription = null;
  }
};

// ── Ensure conversation exists in Supabase ───────────────────────────────────
export const ensureConversationInDB = async (
  localConvId: number,
  agencyId: number,
  userId: string
): Promise<string> => {
  const dbKey = `conv_${userId}_ag${agencyId}`;

  // Check if exists
  const { data } = await supabase
    .from("conversations")
    .select("id")
    .eq("id", dbKey)
    .single();

  if (!data) {
    await supabase.from("conversations").insert({
      id: dbKey,
      agency_id: agencyId,
      user_id: userId,
      local_id: localConvId,
    });
  }

  return dbKey;
};

// ── Load messages from Supabase ───────────────────────────────────────────────
export const loadMessagesFromDB = async (
  convDbId: string
): Promise<ChatMessage[]> => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", convDbId)
    .order("created_at", { ascending: true });

  if (error || !data) return [];

  return data.map((row: any) => ({
    id: row.id,
    from: row.sender as "user" | "agency",
    text: row.text,
    time: new Date(row.created_at).toLocaleTimeString("fr-DZ", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    status: "delivered" as const,
  }));
};

// ── Send message ─────────────────────────────────────────────────────────────
export const sendChatMessage = async (
  activeC: number,
  text: string,
  attach: ChatMessage["attach"] | null,
  lang: string,
  setConvs: SetConvsFn,
  setChatTyping: (v: boolean) => void,
  currentUserId?: string,
  agencyId?: number
) => {
  const now = new Date().toLocaleTimeString("fr-DZ", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const newMsg: ChatMessage = {
    id: Date.now(),
    from: "user",
    text,
    time: now,
    status: "sent",
    ...(attach ? { attach } : {}),
  };

  // Optimistic UI update
  setConvs((p) =>
    p.map((c) =>
      c.id === activeC ? { ...c, msgs: [...c.msgs, newMsg] } : c
    )
  );

  // Save to Supabase if we have user & agency context
  if (currentUserId && agencyId) {
    const convDbId = `conv_${currentUserId}_ag${agencyId}`;

    // Ensure conversation exists
    await supabase.from("conversations").upsert({
      id: convDbId,
      agency_id: agencyId,
      user_id: currentUserId,
      local_id: activeC,
    });

    // Insert message
    const { data: inserted } = await supabase.from("messages").insert({
      conversation_id: convDbId,
      sender: "user",
      text,
      user_id: currentUserId,
      agency_id: agencyId,
    }).select().single();

    // Update status to delivered
    if (inserted) {
      setTimeout(() => {
        setConvs((p) =>
          p.map((c) =>
            c.id === activeC
              ? {
                  ...c,
                  msgs: c.msgs.map((m) =>
                    m.id === newMsg.id ? { ...m, status: "delivered" } : m
                  ),
                }
              : c
          )
        );
      }, 600);
    }
  } else {
    // Fallback: delivery tick without DB
    const mid = newMsg.id!;
    setTimeout(
      () =>
        setConvs((p) =>
          p.map((c) =>
            c.id === activeC
              ? {
                  ...c,
                  msgs: c.msgs.map((m) =>
                    m.id === mid ? { ...m, status: "delivered" } : m
                  ),
                }
              : c
          )
        ),
      700
    );
  }
};

// ── Open or create conversation ───────────────────────────────────────────────
export const openOrCreateConversation = (
  agencyId: number,
  convs: Conversation[],
  setConvs: SetConvsFn,
  setActiveC: (id: number) => void
) => {
  const existing = convs.find((c) => c.agencyId === agencyId);
  if (existing) {
    setActiveC(existing.id);
  } else {
    const nw: Conversation = { id: Date.now(), agencyId, msgs: [] };
    setConvs((p) => [...p, nw]);
    setActiveC(nw.id);
  }
};
