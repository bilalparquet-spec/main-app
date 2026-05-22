export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  phone: string;
  avatar: string;
  provider: string;
  joinDate?: string;
  lastLogin?: string;
  email?: string;
}

export interface PendingRequest extends Omit<User, "joinDate" | "lastLogin"> {
  status: "pending";
  requestDate: string;
}

// ── Demo accounts (always available) ─────────────────────────────────────────
export const DEMO_USERS: User[] = [
  { id: "demo_1", username: "ahmed_dz",    password: "123456", name: "أحمد بن علي",    phone: "0555123456", avatar: "https://i.pravatar.cc/80?img=11", provider: "manual", joinDate: "2025-11-20T10:00:00.000Z", lastLogin: "2026-04-01T08:30:00.000Z" },
  { id: "demo_2", username: "karim_oran",  password: "123456", name: "كريم بوعلام",    phone: "0661987654", avatar: "https://i.pravatar.cc/80?img=33", provider: "manual", joinDate: "2026-04-25T14:00:00.000Z", lastLogin: "2026-05-10T09:15:00.000Z" },
];

export const getApprovedUsers = (): User[] => {
  try { return JSON.parse(localStorage.getItem("driverent_approved_users") || "[]"); } catch { return []; }
};

export const getPendingRequests = (): PendingRequest[] => {
  try { return JSON.parse(localStorage.getItem("driverent_pending_requests") || "[]"); } catch { return []; }
};

export const savePendingRequest = (req: PendingRequest) => {
  const current = getPendingRequests();
  try { localStorage.setItem("driverent_pending_requests", JSON.stringify([...current, req])); } catch {}
};

export const getAllUsers = (): User[] => {
  const approved = getApprovedUsers();
  const merged = [...DEMO_USERS];
  approved.forEach(u => { if (!merged.find(d => d.id === u.id)) merged.push(u); });
  return merged;
};

export const loginUser = (username: string, password: string): { user?: User; error?: string } => {
  const allUsers = getAllUsers();
  const found = allUsers.find(u => u.username === username.trim() && u.password === password);
  if (!found) return { error: "errNotFound" };

  const pending = getPendingRequests();
  if (pending.find(p => p.username === username.trim() && p.status === "pending")) {
    return { error: "errStillPending" };
  }
  return { user: { ...found, lastLogin: new Date().toISOString() } };
};

export const registerUser = (username: string, password: string, phone: string, avatar: string): { success?: boolean; error?: string } => {
  const allUsers = getAllUsers();
  const pending = getPendingRequests();
  const cleanPhone = phone.replace(/\s/g, "");

  if (!username || username.length < 3) return { error: "errUsername" };
  if (allUsers.find(u => u.username === username)) return { error: "errUsernameTaken" };
  if (pending.find(p => p.username === username)) return { error: "errUsernameTaken" };
  if (!password || password.length < 6) return { error: "errPassword" };
  if (!/^0[567][0-9]{8}$/.test(cleanPhone)) return { error: "errPhone" };
  if (allUsers.find(u => u.phone === cleanPhone)) return { error: "errPhoneTaken" };
  if (pending.find(p => p.phone === cleanPhone)) return { error: "errPhoneTaken" };

  const newReq: PendingRequest = {
    id: "req_" + Date.now(), username, password,
    name: username, phone: cleanPhone, avatar,
    provider: "manual", status: "pending",
    requestDate: new Date().toISOString(),
  };
  savePendingRequest(newReq);
  return { success: true };
};
