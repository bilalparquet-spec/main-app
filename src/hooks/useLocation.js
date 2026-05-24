import { useState, useCallback } from "react";

// Map of Algerian wilayas with approximate coordinates
const WILAYAS = [
  { name: "الجزائر",   lat: 36.7538, lng: 3.0588  },
  { name: "وهران",     lat: 35.6969, lng: -0.6331  },
  { name: "قسنطينة",  lat: 36.3650, lng: 6.6147   },
  { name: "عنابة",    lat: 36.9000, lng: 7.7667    },
  { name: "سطيف",     lat: 36.1898, lng: 5.4108    },
  { name: "تيزي وزو", lat: 36.7167, lng: 4.0500    },
  { name: "بجاية",    lat: 36.7515, lng: 5.0564    },
  { name: "باتنة",    lat: 35.5551, lng: 6.1741    },
  { name: "بسكرة",    lat: 34.8503, lng: 5.7278    },
  { name: "تلمسان",   lat: 34.8828, lng: -1.3167   },
  { name: "المدية",   lat: 36.2638, lng: 2.7539    },
  { name: "البليدة",  lat: 36.4692, lng: 2.8277    },
  { name: "مستغانم",  lat: 35.9311, lng: 0.0888    },
  { name: "سيدي بلعباس", lat: 35.1833, lng: -0.6333 },
  { name: "جيجل",     lat: 36.8200, lng: 5.7667    },
  { name: "سكيكدة",   lat: 36.8667, lng: 6.9000    },
  { name: "بومرداس",  lat: 36.7639, lng: 3.4769    },
  { name: "تيبازة",   lat: 36.6000, lng: 2.4667    },
  { name: "عين الدفلى", lat: 36.2667, lng: 1.9667  },
  { name: "غليزان",   lat: 35.9833, lng: 0.5667    },
];

function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getNearestWilaya(lat, lng) {
  let nearest = WILAYAS[0];
  let minDist = Infinity;
  for (const w of WILAYAS) {
    const d = haversineDistance(lat, lng, w.lat, w.lng);
    if (d < minDist) { minDist = d; nearest = w; }
  }
  return nearest.name;
}

export function useLocation() {
  const [state, setState] = useState({
    status: "idle",       // idle | requesting | granted | denied | unavailable
    wilaya: null,
    coords: null,
    error: null,
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState(s => ({ ...s, status: "unavailable" }));
      return;
    }
    setState(s => ({ ...s, status: "requesting" }));
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const wilaya = getNearestWilaya(latitude, longitude);
        setState({ status: "granted", wilaya, coords: { lat: latitude, lng: longitude }, error: null });
      },
      (err) => {
        setState({ status: "denied", wilaya: null, coords: null, error: err.message });
      },
      { timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  return { ...state, requestLocation };
}
