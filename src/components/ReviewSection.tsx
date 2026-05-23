import { useState } from "react";

export default function ReviewSection({
  lang,
  targetType,
  targetId,
  reviews,
  setReviews,
  currentUser,
  openAuth,
}: {
  lang: string;
  targetType: string;
  targetId: number;
  reviews: any[];
  setReviews: (r: any) => void;
  currentUser: any;
  openAuth: () => void;
}) {
  const myReviews = reviews.filter(
    (r) => r.targetType === targetType && r.targetId === targetId
  );
  const [stars, setStars] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);
  const avg = myReviews.length
    ? +(
        myReviews.reduce((s, r) => s + r.rating, 0) / myReviews.length
      ).toFixed(1)
    : 0;

  const L: Record<string, any> = {
    ar: {
      title: "التقييمات والآراء",
      write: "اكتب تقييمك",
      ph: "شاركنا رأيك...",
      send: "إرسال التقييم",
      loginMsg: "سجّل دخولك لترك تقييم",
      loginBtn: "تسجيل الدخول",
      noReviews: "لا توجد تقييمات بعد. كن أول من يقيّم!",
      thankYou: "شكراً! تم إضافة تقييمك بنجاح 🎉",
      avg: "متوسط التقييم",
      total: "تقييم",
      yourRating: "تقييمك",
    },
    fr: {
      title: "Avis et évaluations",
      write: "Laisser un avis",
      ph: "Partagez votre expérience...",
      send: "Envoyer l'avis",
      loginMsg: "Connectez-vous pour laisser un avis",
      loginBtn: "Se connecter",
      noReviews: "Aucun avis encore. Soyez le premier!",
      thankYou: "Merci! Votre avis a été ajouté 🎉",
      avg: "Note moyenne",
      total: "avis",
      yourRating: "Votre note",
    },
    en: {
      title: "Reviews & Ratings",
      write: "Write a Review",
      ph: "Share your experience...",
      send: "Submit Review",
      loginMsg: "Sign in to leave a review",
      loginBtn: "Sign In",
      noReviews: "No reviews yet. Be the first!",
      thankYou: "Thank you! Your review has been added 🎉",
      avg: "Average rating",
      total: "reviews",
      yourRating: "Your rating",
    },
  };
  const l = L[lang] || L.ar;

  const submit = () => {
    if (!comment.trim()) return;
    const nw = {
      id: Date.now(),
      targetType,
      targetId,
      userId: currentUser.id,
      name: currentUser.name,
      phone: currentUser.phone,
      avatar: currentUser.avatar,
      rating: stars,
      comment: comment.trim(),
      date: new Date().toISOString().slice(0, 10),
    };
    setReviews(nw);
    setComment("");
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <div style={{ marginTop: 36 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <h2
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 20 }}>⭐</span>
          {l.title}
          {myReviews.length > 0 && (
            <span
              style={{
                fontSize: 12,
                background: "rgba(124,58,237,.18)",
                border: "1px solid rgba(124,58,237,.3)",
                color: "#C084FC",
                padding: "2px 9px",
                borderRadius: 20,
                fontWeight: 600,
              }}
            >
              {myReviews.length} {l.total}
            </span>
          )}
        </h2>
        {avg > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(245,158,11,.08)",
              border: "1px solid rgba(245,158,11,.22)",
              borderRadius: 11,
              padding: "6px 14px",
            }}
          >
            <span style={{ fontSize: 22, fontWeight: 900, color: "#F59E0B" }}>
              {avg}
            </span>
            <div>
              <div style={{ display: "flex", gap: 2 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    style={{
                      color:
                        i <= Math.round(avg)
                          ? "#F59E0B"
                          : "rgba(255,255,255,.2)",
                      fontSize: 13,
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,.3)" }}>
                {l.avg}
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          background: "rgba(124,58,237,.06)",
          border: "1px solid rgba(124,58,237,.18)",
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "rgba(255,255,255,.65)",
            marginBottom: 14,
          }}
        >
          {l.write}
        </div>
        {!currentUser ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 13, color: "rgba(255,255,255,.42)" }}>
              {l.loginMsg}
            </span>
            <button
              onClick={openAuth}
              style={{
                background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
                border: "none",
                color: "#fff",
                padding: "8px 18px",
                borderRadius: 9,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {l.loginBtn}
            </button>
          </div>
        ) : sent ? (
          <div
            style={{
              background: "rgba(52,211,153,.08)",
              border: "1px solid rgba(52,211,153,.24)",
              borderRadius: 10,
              padding: "14px 18px",
              textAlign: "center",
              color: "#34D399",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            {l.thankYou}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{ display: "flex", alignItems: "center", gap: 14 }}
            >
              <img
                src={currentUser.avatar}
                alt=""
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "2px solid #7C3AED",
                  objectFit: "cover",
                }}
              />
              <div>
                <div
                  style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}
                >
                  {currentUser.name}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,.35)",
                  }}
                >
                  {currentUser.phone}
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,.4)",
                  marginBottom: 7,
                }}
              >
                {l.yourRating}
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setStars(i)}
                    style={{
                      fontSize: 28,
                      cursor: "pointer",
                      color:
                        (hover || stars) >= i
                          ? "#F59E0B"
                          : "rgba(255,255,255,.18)",
                      transition: "color .15s,transform .15s",
                      display: "inline-block",
                      transform:
                        (hover || stars) >= i ? "scale(1.15)" : "scale(1)",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={l.ph}
              rows={3}
              style={{
                width: "100%",
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
                borderRadius: 10,
                color: "#fff",
                padding: "11px 14px",
                fontSize: 13,
                resize: "vertical",
              }}
            />
            <button
              onClick={submit}
              style={{
                alignSelf: "flex-start",
                background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
                border: "none",
                color: "#fff",
                padding: "9px 22px",
                borderRadius: 9,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {l.send}
            </button>
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {myReviews.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "32px 0",
              color: "rgba(255,255,255,.28)",
              fontSize: 13,
            }}
          >
            {l.noReviews}
          </div>
        )}
        {myReviews.map((r) => (
          <div
            key={r.id}
            style={{
              background: "rgba(255,255,255,.03)",
              border: "1px solid rgba(255,255,255,.07)",
              borderRadius: 14,
              padding: "16px 18px",
              animation: "fadeUp .4s ease both",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                marginBottom: 10,
              }}
            >
              <img
                src={r.avatar}
                alt=""
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  border: "2px solid rgba(124,58,237,.4)",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}
                >
                  {r.name}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span>{r.phone}</span>
                  <span>·</span>
                  <span>{r.date}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 2 }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    style={{
                      color:
                        i <= r.rating ? "#F59E0B" : "rgba(255,255,255,.18)",
                      fontSize: 14,
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,.72)",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {r.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
