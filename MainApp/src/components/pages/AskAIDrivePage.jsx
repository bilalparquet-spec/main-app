import { useMemo, useState } from "react";
import { IconSpark, IconBubble } from "../ui/AppIcons.jsx";
import { getAppLanguage } from "../../lib/supabase.js";

const FAQ = {
  ar: {
    title: "Ask AI Drive Rent",
    placeholder: "اكتب سؤالك...",
    welcome: "مرحباً 👋 أنا Ask AI Drive Rent، يمكنني مساعدتك في الحجوزات والأسعار والوثائق.",
    quick: ["كيف أحجز سيارة؟", "ما هي الوثائق المطلوبة؟", "هل يوجد سائق؟", "طرق الدفع"],
  },
  fr: {
    title: "Ask AI Drive Rent",
    placeholder: "Écrivez votre question...",
    welcome: "Bonjour 👋 Je peux vous aider pour les réservations, documents et paiements.",
    quick: ["Comment réserver ?", "Documents nécessaires", "Chauffeur disponible ?", "Paiement"],
  },
  en: {
    title: "Ask AI Drive Rent",
    placeholder: "Type your question...",
    welcome: "Hello 👋 I can help with bookings, documents and payments.",
    quick: ["How to book?", "Required documents", "Driver available?", "Payment methods"],
  },
  tz: {
    title: "Ask AI Drive Rent",
    placeholder: "ⴰⵔⵓ ⴰⵙⵇⵙⵉⵏⴻⴽ...",
    welcome: "ⴰⵣⵓⵍ 👋 Ask AI Drive Rent ⴰⴷ ⴰⴽⵉⵏ ⵉⴰⵡⵙ ⵖⴼ ⵓⵃⴻⵔⵣ ⴷ ⵓⴷⵔⴰⵡ.",
    quick: ["ⵎⴰⵎⴽ ⴰⴷ ⵃⵔⴻⵣⴻⵖ ?", "ⵉⵡⵔⴰⵇⴻⵏ", "ⴰⵎⴻⵙⵙⴰⵡⴰⴹ ?", "ⴰⵙⵎⴻⴽⵜⵉ"],
  }
};

function answer(text, lang) {
  const q = text.toLowerCase();
  const map = {
    booking: { ar: "لحجز سيارة اختر السيارة ثم اضغط على حجز الآن وأكمل المعلومات المطلوبة.", fr: "Choisissez une voiture puis cliquez sur réserver maintenant.", en: "Choose a car and click book now.", tz: "ⴼⵔⴻⵏ ⵜⴰⵀⵔⴰⴽⵜ ⵜⴻⴳⴳⴻⴷ ⵖⴻⵔ ⵃⵔⴻⵣ ⵜⵓⵔⴰ." },
    docs: { ar: "تحتاج عادةً إلى بطاقة تعريف ورخصة سياقة سارية.", fr: "Une pièce d'identité et un permis valide sont généralement nécessaires.", en: "You usually need an ID card and a valid driving license.", tz: "ⵜⴻⵃⵡⴰⵊⴻⴷ ⴰⴽⴰⵔⴹ ⵏ ⵜⵎⴰⴳⵉⵜ ⴷ ⵜⵓⵔⴰⴳⵜ ⵏ ⵓⵏⵃⵢⴰ." },
    driver: { ar: "نعم، بعض الوكالات توفر خدمة سائق خاص.", fr: "Oui, certaines agences proposent un chauffeur privé.", en: "Yes, some agencies provide a private driver.", tz: "ⵢⴰⵀ, ⴽⵔⴰ ⵏ ⵜⵡⴽⴰⵍⴰⵜ ⵜⵜⴰⴽⴽⴰⵏ ⴰⵎⴻⵙⵙⴰⵡⴰⴹ." },
    payment: { ar: "يمكن الدفع نقداً أو عبر التحويل حسب الوكالة.", fr: "Le paiement dépend de l'agence : espèces ou virement.", en: "Payment depends on the agency: cash or bank transfer.", tz: "ⴰⵙⵎⴻⴽⵜⵉ ⵉⵜⵜⵓⵙⴱⴻⴷⴷ ⵖⴻⴼ ⵜⵡⴽⴰⵍⵜ." },
    default: { ar: "سيتم الرد عليك من طرف الوكالة قريباً.", fr: "L'agence vous répondra bientôt.", en: "The agency will reply soon.", tz: "ⵜⴰⵡⴽⴰⵍⵜ ⴰⴷ ⴰⴽⴻⵏ ⵜⴻⵔⵔ ⴷⴻⵖⵢⴰ." }
  };

  if (q.includes("حجز") || q.includes("réserver") || q.includes("book")) return map.booking[lang];
  if (q.includes("وث") || q.includes("document") || q.includes("license")) return map.docs[lang];
  if (q.includes("سائق") || q.includes("chauffeur") || q.includes("driver")) return map.driver[lang];
  if (q.includes("دفع") || q.includes("pai") || q.includes("payment")) return map.payment[lang];
  return map.default[lang];
}

export function AskAIDrivePage() {
  const lang = getAppLanguage();
  const t = FAQ[lang] || FAQ.ar;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ role: "bot", text: t.welcome }]);
  const dir = lang === "ar" ? "rtl" : "ltr";

  const send = (text) => {
    if (!text.trim()) return;
    setMessages((p) => [...p, { role: "user", text }, { role: "bot", text: answer(text, lang) }]);
    setInput("");
  };

  return (
    <div dir={dir} style={{ minHeight: "100vh", background: "#050506", color: "#fff", padding: "18px 16px 120px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ width: 46, height: 46, borderRadius: 16, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", display: "grid", placeItems: "center" }}>
          <IconSpark size={20} color="#fff" />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 900 }}>{t.title}</h1>
          <p style={{ margin: "4px 0 0", color: "rgba(255,255,255,.6)", fontSize: 13 }}>AI Assistant</p>
        </div>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ justifySelf: msg.role === "user" ? "end" : "start", maxWidth: "86%", background: msg.role === "user" ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 18, padding: "12px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {msg.role === "bot" && <IconBubble size={14} color="#A78BFA" />}
              <span style={{ fontSize: 13.5, lineHeight: 1.7 }}>{msg.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 18 }}>
        {t.quick.map((q) => (
          <button key={q} onClick={() => send(q)} style={{ border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.05)", color: "#fff", borderRadius: 999, padding: "10px 14px", fontWeight: 700, fontFamily: "inherit" }}>{q}</button>
        ))}
      </div>

      <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, padding: 14, background: "rgba(5,5,6,.94)", borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", gap: 10 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.placeholder} style={{ flex: 1, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "#fff", borderRadius: 14, padding: "14px", fontFamily: "inherit", outline: "none" }} />
        <button onClick={() => send(input)} style={{ border: "none", borderRadius: 14, padding: "0 18px", background: "linear-gradient(135deg,#7C3AED,#4F46E5)", color: "#fff", fontWeight: 800, fontFamily: "inherit" }}>Send</button>
      </div>
    </div>
  );
}
