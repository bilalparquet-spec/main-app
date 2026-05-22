export interface ChatMessage {
  id?: number;
  from: "user" | "agency";
  text: string;
  time: string;
  status?: "sent" | "delivered";
  attach?: { type: "image" | "doc"; name: string; url: string; size: string };
}

export interface Conversation {
  id: number;
  agencyId: number;
  msgs: ChatMessage[];
}

export const INIT_CONVS: Conversation[] = [
  {
    id: 1,
    agencyId: 1,
    msgs: [
      { from: "agency", text: "مرحباً! كيف يمكنني مساعدتك؟", time: "10:30" },
      { from: "user",   text: "أريد حجز المرسيدس ليوم الجمعة", time: "10:31" },
      { from: "agency", text: "بكل سرور! هل تريد S-Class أم E-Class؟", time: "10:32" },
    ],
  },
  {
    id: 2,
    agencyId: 6,
    msgs: [
      { from: "agency", text: "Bonjour! Comment puis-je vous aider pour votre mariage?", time: "14:00" },
    ],
  },
];
