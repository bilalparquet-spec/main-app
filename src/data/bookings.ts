export interface Booking {
  id: number;
  agencyId: number;
  carName: string;
  clientName: string;
  clientPhone: string;
  from: string;
  to: string;
  days: number;
  total: number;
  status: "pending" | "confirmed" | "cancelled";
  time: string;
}

export const INIT_BOOKINGS: Booking[] = [
  { id: 1, agencyId: 1, carName: "Mercedes S-Class",   clientName: "أحمد بن علي",    clientPhone: "0555123456", from: "2025-06-10", to: "2025-06-13", days: 3, total: 45000, status: "pending",   time: "10:32" },
  { id: 2, agencyId: 1, carName: "Toyota RAV4",        clientName: "Karim Meziani", clientPhone: "0661987654", from: "2025-06-15", to: "2025-06-17", days: 2, total: 14000, status: "confirmed", time: "09:15" },
  { id: 3, agencyId: 2, carName: "BMW 5 Series",       clientName: "سارة حمداني",   clientPhone: "0770456789", from: "2025-06-20", to: "2025-06-22", days: 2, total: 24000, status: "pending",   time: "14:00" },
  { id: 4, agencyId: 1, carName: "Lamborghini Urus",   clientName: "يوسف قاسم",     clientPhone: "0550321654", from: "2025-07-01", to: "2025-07-02", days: 1, total: 50000, status: "pending",   time: "16:45" },
  { id: 5, agencyId: 2, carName: "Range Rover Vogue",  clientName: "Sofiane Lahlou", clientPhone: "0661234567", from: "2025-06-28", to: "2025-06-30", days: 2, total: 90000, status: "confirmed", time: "11:30" },
];
