import { Conversation, ChatMessage } from "../data";

type SetConvsFn = (fn: (p: Conversation[]) => Conversation[]) => void;

const AUTO_REPLIES: Record<string, string[]> = {
  ar: [
    "شكراً على تواصلك! سنرد في أقرب وقت ✓",
    "تم استلام رسالتك، كيف يمكنني مساعدتك أكثر؟",
    "بكل سرور! هل تريد تأكيد الحجز؟",
    "سيارتنا متاحة في التاريخ المطلوب 🚗",
  ],
  fr: [
    "Merci pour votre message! Nous vous répondrons bientôt ✓",
    "Bien reçu, comment puis-je vous aider davantage?",
    "Bien sûr! Voulez-vous confirmer la réservation?",
    "Notre véhicule est disponible à la date souhaitée 🚗",
  ],
  en: [
    "Thanks for your message! We'll reply soon ✓",
    "Received, how can I help you further?",
    "Of course! Would you like to confirm the booking?",
    "Our car is available on the requested date 🚗",
  ],
};

export const sendChatMessage = (
  activeC: number,
  text: string,
  attach: ChatMessage["attach"] | null,
  lang: string,
  setConvs: SetConvsFn,
  setChatTyping: (v: boolean) => void
) => {
  const newMsg: ChatMessage = {
    id: Date.now(),
    from: "user",
    text,
    time: new Date().toLocaleTimeString("fr-DZ", { hour: "2-digit", minute: "2-digit" }),
    status: "sent",
    ...(attach ? { attach } : {}),
  };

  setConvs(p => p.map(c => c.id === activeC ? { ...c, msgs: [...c.msgs, newMsg] } : c));

  // Delivery tick
  const mid = newMsg.id!;
  setTimeout(() =>
    setConvs(p => p.map(c => c.id === activeC
      ? { ...c, msgs: c.msgs.map(m => m.id === mid ? { ...m, status: "delivered" } : m) }
      : c)),
    700
  );

  // Agency typing + auto reply
  setTimeout(() => setChatTyping(true), 800);
  setTimeout(() => {
    setChatTyping(false);
    const reps = AUTO_REPLIES[lang] || AUTO_REPLIES.ar;
    setConvs(p => p.map(c => c.id === activeC
      ? {
          ...c,
          msgs: [...c.msgs, {
            id: Date.now() + 1,
            from: "agency",
            text: reps[Math.floor(Math.random() * reps.length)],
            time: new Date().toLocaleTimeString("fr-DZ", { hour: "2-digit", minute: "2-digit" }),
            status: "delivered",
          }],
        }
      : c));
  }, 2200);
};

export const openOrCreateConversation = (
  agencyId: number,
  convs: Conversation[],
  setConvs: SetConvsFn,
  setActiveC: (id: number) => void
) => {
  const existing = convs.find(c => c.agencyId === agencyId);
  if (existing) {
    setActiveC(existing.id);
  } else {
    const nw: Conversation = { id: Date.now(), agencyId, msgs: [] };
    setConvs(p => [...p, nw]);
    setActiveC(nw.id);
  }
};
