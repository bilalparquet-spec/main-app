import { useState, useEffect } from "react";
import { dbSelect, SUPABASE_URL } from "../lib/supabase.js";
import { useOfflineCache } from "./useOfflineCache.js";

// ── helper: normalize a DB car row to match UI shape ────────────────────────
function normalizeCar(row) {
  return {
    id:         row.id,
    agencyId:   row.agency_id || row.agencyId || null,
    agencyName: row.agency_name || row.agencyName || "",
    name:       row.name,
    type:       row.type       || "sedan",
    price:      row.price      || 0,
    rating:     parseFloat(row.rating) || 0,
    trips:      row.trips      || 0,
    reviews:    row.reviews    || 0,
    year:       row.year       || new Date().getFullYear(),
    seats:      row.seats      || 5,
    wilaya:     row.wilaya     || "الجزائر",
    city:       row.city       || row.wilaya || "",
    img:        row.img || row.image || "",
    images:     Array.isArray(row.images) ? row.images : [],
    badge:      row.badge      || "",
    verified:   row.verified   || false,
    fuel:       row.fuel       || "",
    trans:      row.trans      || "",
    freeCancel: row.free_cancel || false,
    available:  row.available !== false,
    status:     row.status || "approved",
  };
}

function normalizeAgency(row) {
  return {
    id:       row.id,
    name:     row.name,
    wilaya:   row.wilaya || row.city || "الجزائر",
    city:     row.city || row.wilaya || "",
    rating:   parseFloat(row.rating) || 0,
    cars:     row.cars || row.cars_count || 0,
    badge:    row.badge || "",
    color:    row.color || "#7C3AED",
    img:      row.img || "",
    images:   Array.isArray(row.images) ? row.images : [],
    phone:    row.phone || "",
    whatsapp: row.whatsapp || "",
    email:    row.email || "",
    address:  row.address || "",
    description: row.description || "",
    status:   row.status || "pending",
  };
}

// ── useCars ─────────────────────────────────────────────────────────────────
export function useCars() {
  const cache = useOfflineCache();
  const [cars, setCars]       = useState(() => cache.getCars());
  const [loading, setLoading] = useState(() => cache.getCars().length === 0);
  const [error, setError]     = useState(null);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    let alive = true;
    const query = "?status=in.(approved,available)&order=created_at.desc";

    dbSelect("cars", query)
      .then(rows => {
        if (!alive) return;
        const normalized = (rows || []).map(normalizeCar);
        setCars(normalized);
        setOffline(false);
        cache.saveCars(normalized, `${SUPABASE_URL}/rest/v1/cars${query}`);
      })
      .catch(err => {
        if (!alive) return;
        console.warn("Supabase cars fetch failed:", err.message);
        const cached = cache.getCars();
        if (cached.length > 0) {
          setCars(cached);
          setOffline(true);
          setError(null);
        } else {
          setError(err.message);
          setCars([]);
        }
      })
      .finally(() => alive && setLoading(false));

    return () => { alive = false; };
  }, []); // eslint-disable-line

  return { cars, loading, error, offline };
}

// ── useAgencies ─────────────────────────────────────────────────────────────
export function useAgencies() {
  const cache = useOfflineCache();
  const [agencies, setAgencies] = useState(() => cache.getAgencies());
  const [loading, setLoading]   = useState(() => cache.getAgencies().length === 0);
  const [error, setError]       = useState(null);
  const [offline, setOffline]   = useState(false);

  useEffect(() => {
    let alive = true;
    const query = "?status=in.(approved,active)&order=created_at.desc";

    dbSelect("agencies", query)
      .then(rows => {
        if (!alive) return;
        const normalized = (rows || []).map(normalizeAgency);
        setAgencies(normalized);
        setOffline(false);
        cache.saveAgencies(normalized, `${SUPABASE_URL}/rest/v1/agencies${query}`);
      })
      .catch(err => {
        if (!alive) return;
        console.warn("Supabase agencies fetch failed:", err.message);
        const cached = cache.getAgencies();
        if (cached.length > 0) {
          setAgencies(cached);
          setOffline(true);
          setError(null);
        } else {
          setError(err.message);
          setAgencies([]);
        }
      })
      .finally(() => alive && setLoading(false));

    return () => { alive = false; };
  }, []); // eslint-disable-line

  return { agencies, loading, error, offline };
}

// ── useCarsByType ────────────────────────────────────────────────────────────
export function useCarsByType(type) {
  const cache = useOfflineCache();
  const [cars, setCars]       = useState(() => cache.getCarsByType(type));
  const [loading, setLoading] = useState(() => cache.getCarsByType(type).length === 0);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    let alive = true;
    const query = type === "month"
      ? "?status=in.(approved,available)&order=requests.desc&limit=10"
      : `?type=eq.${encodeURIComponent(type)}&status=in.(approved,available)&order=created_at.desc`;

    dbSelect("cars", query)
      .then(rows => {
        if (!alive) return;
        const normalized = (rows || []).map(normalizeCar);
        setCars(normalized);
        setOffline(false);
        cache.saveCarsByType(type, normalized, `${SUPABASE_URL}/rest/v1/cars${query}`);
      })
      .catch(err => {
        if (!alive) return;
        console.warn(`Supabase ${type} cars failed:`, err.message);
        const cached = cache.getCarsByType(type);
        if (cached.length > 0) {
          setCars(cached);
          setOffline(true);
        } else {
          setCars([]);
        }
      })
      .finally(() => alive && setLoading(false));

    return () => { alive = false; };
  }, [type]); // eslint-disable-line

  return { cars, loading, offline };
}
