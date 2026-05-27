import { Stars } from "../ui/Stars.jsx";
import { IconHeart, IconPin, IconSearch } from "../ui/AppIcons.jsx";

const FALLBACK_CAR_IMAGE = "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80";

function resolveCarImage(car) {
  const candidates = [
    car?.img,
    car?.image,
    Array.isArray(car?.images) ? car.images.find(Boolean) : null,
  ];

  for (const item of candidates) {
    if (!item) continue;
    if (typeof item === "string" && item.trim()) return item.trim();
    if (typeof item === "object") {
      const value = item.url || item.src || item.path || item.publicUrl || item.public_url;
      if (typeof value === "string" && value.trim()) return value.trim();
    }
  }

  return FALLBACK_CAR_IMAGE;
}

export function FavoritesPage({
  liked,
  cars = [],
  onLike,
  onOpenCar,
  isLoggedIn = false,
  onRequireAuth,
  onFindFavorites,
}) {
  const likedSet = liked instanceof Set ? liked : new Set(Array.isArray(liked) ? liked : []);
  const favCars = (cars || []).filter(c => likedSet.has(c.id) || likedSet.has(String(c.id)) || likedSet.has(Number(c.id)));
  const formatPrice = (value) => Number(value || 0).toLocaleString("fr-DZ");

  const handleFindFavorites = () => {
    if (!isLoggedIn) {
      onRequireAuth?.();
      return;
    }
    onFindFavorites?.();
  };

  return (
    <div className="tiny-ui" style={{ minHeight: "62vh", paddingBottom: 100, animation: "fadeUp .35s ease", color: "#F1F5F9" }}>

      {favCars.length === 0 ? (
        <div dir="ltr" style={{ width: "100%", maxWidth: 680, margin: "0 auto", padding: "72px 14px 28px", textAlign: "left" }}>
          <h2 style={{
            margin: "0 0 46px",
            fontSize: "clamp(30px, 7vw, 46px)",
            lineHeight: 1.1,
            fontWeight: 950,
            color: "rgba(255,255,255,.92)",
            letterSpacing: ".2px",
          }}>
            Get started with favorites
          </h2>

          <p style={{
            margin: "0 0 44px",
            maxWidth: 590,
            fontSize: "clamp(25px, 6vw, 40px)",
            lineHeight: 1.55,
            fontWeight: 400,
            color: "rgba(255,255,255,.84)",
            letterSpacing: "clamp(2px, .8vw, 8px)",
          }}>
            Tap the heart icon to save your favorite vehicles to a list.
          </p>

          <button
            type="button"
            onClick={handleFindFavorites}
            style={{
              width: "100%",
              minHeight: 86,
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,.16)",
              background: "rgba(255,255,255,.065)",
              color: "rgba(255,255,255,.88)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 26,
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "clamp(24px, 5.5vw, 38px)",
              fontWeight: 900,
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,.04)",
            }}
          >
            <IconSearch size={62} color="rgba(255,255,255,.86)" />
            <span>Find new favorites</span>
          </button>
        </div>
      ) : (
        <>
          {/* Header */}
          <div style={{ padding: "24px 0 20px", textAlign: "center" }}>
            <div style={{
              width: 56, height: 56, borderRadius: 18, margin: "0 auto 14px",
              background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <IconHeart active/>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 4 }}>المفضلة</h2>
            <p style={{ color: "rgba(255,255,255,.35)", fontSize: 13 }}>
              {`${favCars.length} سيارة محفوظة`}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {favCars.map((car, i) => {
              const imageUrl = resolveCarImage(car);
              return (
                <div key={car.id} onClick={() => onOpenCar?.(car)}
                  className="btn-press"
                  style={{
                    display: "flex", gap: 14, alignItems: "center",
                    background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: 18, padding: 12, cursor: "pointer",
                    animation: `fadeUp .35s ease ${i * .06}s both`,
                  }}>
                  <img
                    src={imageUrl}
                    alt={car.name || "car"}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_CAR_IMAGE;
                    }}
                    style={{
                      width: 90,
                      height: 68,
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: 12,
                      flexShrink: 0,
                      display: "block",
                      background: "linear-gradient(135deg, rgba(255,255,255,.08), rgba(124,58,237,.12))",
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div data-no-i18n="true" style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 3,
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {car.name || "Vehicle"}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6,
                      fontSize: 11, color: "rgba(255,255,255,.38)" }}>
                      <IconPin size={10} color="rgba(255,255,255,.38)"/>
                      {car.wilaya || "الجزائر"}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Stars r={car.rating} size={10}/>
                      <span style={{ fontSize: 14, fontWeight: 900, color: "#C084FC" }}>
                        {formatPrice(car.price)}
                        <span style={{ fontSize: 10, fontWeight: 400, color: "rgba(255,255,255,.35)" }}> دج/يوم</span>
                      </span>
                    </div>
                  </div>
                  <button onClick={e => { e.stopPropagation(); onLike?.(car.id); }} style={{
                    width: 34, height: 34, borderRadius: "50%", border: "none", flexShrink: 0,
                    background: "rgba(239,68,68,.12)", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <IconHeart active/>
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
