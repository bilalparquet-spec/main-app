import { useState, useEffect } from "react";
import { carsService, agenciesService, reviewsService, bookingsService } from "../services/db";
import { SEED_CARS, SEED_AGENCIES } from "../data/static";

// ── useCars ─────────────────────────────────────────────────────────────────
export function useCars() {
  const [cars, setCars] = useState<any[]>(SEED_CARS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    carsService.getAll()
      .then((data) => { if (data && data.length > 0) setCars(data); })
      .catch(() => { /* fallback to seed data */ })
      .finally(() => setLoading(false));
  }, []);

  const addCar = async (car: any) => {
    try {
      const saved = await carsService.insert(car);
      setCars((prev) => [...prev, saved]);
    } catch {
      const local = { ...car, id: Date.now() };
      setCars((prev) => [...prev, local]);
    }
  };

  return { cars, loading, addCar, setCars };
}

// ── useAgencies ──────────────────────────────────────────────────────────────
export function useAgencies() {
  const [agencies, setAgencies] = useState<any[]>(SEED_AGENCIES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    agenciesService.getAll()
      .then((data) => { if (data && data.length > 0) setAgencies(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { agencies, loading, setAgencies };
}

// ── useReviews ────────────────────────────────────────────────────────────────
export function useReviews(initialReviews: any[]) {
  const [reviews, setReviews] = useState<any[]>(initialReviews);

  useEffect(() => {
    reviewsService.getAll()
      .then((data) => { if (data && data.length > 0) setReviews(data); })
      .catch(() => {});
  }, []);

  const addReview = async (review: any) => {
    try {
      const saved = await reviewsService.insert(review);
      setReviews((prev) => [saved, ...prev]);
    } catch {
      setReviews((prev) => [{ ...review, id: Date.now() }, ...prev]);
    }
  };

  return { reviews, setReviews: addReview };
}

// ── useBookings ───────────────────────────────────────────────────────────────
export function useBookings(initialBookings: any[]) {
  const [bookings, setBookings] = useState<any[]>(initialBookings);

  useEffect(() => {
    bookingsService.getAll()
      .then((data) => { if (data && data.length > 0) setBookings(data); })
      .catch(() => {});
  }, []);

  const addBooking = async (booking: any) => {
    try {
      const saved = await bookingsService.insert(booking);
      setBookings((prev) => [saved, ...prev]);
      return saved;
    } catch {
      const local = { ...booking, id: Date.now() };
      setBookings((prev) => [local, ...prev]);
      return local;
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await bookingsService.updateStatus(id, status);
    } catch {}
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  return { bookings, setBookings, addBooking, updateStatus };
}
