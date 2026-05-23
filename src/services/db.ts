import { supabase } from './supabase';

// ── CARS ─────────────────────────────────────────────────────────────────────
export const carsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('cars')
      .select('*, agencies(*)');
    if (error) throw error;
    return data || [];
  },
  async getById(id: number) {
    const { data, error } = await supabase
      .from('cars')
      .select('*, agencies(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },
  async insert(car: any) {
    const { data, error } = await supabase.from('cars').insert([car]).select().single();
    if (error) throw error;
    return data;
  },
  async update(id: number, updates: any) {
    const { data, error } = await supabase.from('cars').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async delete(id: number) {
    const { error } = await supabase.from('cars').delete().eq('id', id);
    if (error) throw error;
  },
};

// ── AGENCIES ─────────────────────────────────────────────────────────────────
export const agenciesService = {
  async getAll() {
    const { data, error } = await supabase.from('agencies').select('*');
    if (error) throw error;
    return data || [];
  },
  async getById(id: number) {
    const { data, error } = await supabase.from('agencies').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async insert(agency: any) {
    const { data, error } = await supabase.from('agencies').insert([agency]).select().single();
    if (error) throw error;
    return data;
  },
  async update(id: number, updates: any) {
    const { data, error } = await supabase.from('agencies').update(updates).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
};

// ── BOOKINGS ─────────────────────────────────────────────────────────────────
export const bookingsService = {
  async getAll() {
    const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  async getByAgency(agencyId: number) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('agency_id', agencyId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  async insert(booking: any) {
    const { data, error } = await supabase.from('bookings').insert([booking]).select().single();
    if (error) throw error;
    return data;
  },
  async updateStatus(id: number, status: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

// ── REVIEWS ──────────────────────────────────────────────────────────────────
export const reviewsService = {
  async getAll() {
    const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  async insert(review: any) {
    const { data, error } = await supabase.from('reviews').insert([review]).select().single();
    if (error) throw error;
    return data;
  },
};

// ── CONVERSATIONS ─────────────────────────────────────────────────────────────
export const conversationsService = {
  async getByUser(userId: string) {
    const { data, error } = await supabase
      .from('conversations')
      .select('*, messages(*)')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  async getOrCreate(userId: string, agencyId: number) {
    let { data } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', userId)
      .eq('agency_id', agencyId)
      .single();
    if (!data) {
      const { data: newConv, error } = await supabase
        .from('conversations')
        .insert([{ user_id: userId, agency_id: agencyId }])
        .select()
        .single();
      if (error) throw error;
      data = newConv;
    }
    return data;
  },
};

// ── MESSAGES ─────────────────────────────────────────────────────────────────
export const messagesService = {
  async getByConversation(convId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data || [];
  },
  async insert(message: any) {
    const { data, error } = await supabase.from('messages').insert([message]).select().single();
    if (error) throw error;
    return data;
  },
  subscribeToConversation(convId: string, callback: (msg: any) => void) {
    return supabase
      .channel(`messages:${convId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${convId}`,
      }, (payload) => callback(payload.new))
      .subscribe();
  },
};

// ── AUTH / USERS ──────────────────────────────────────────────────────────────
export const usersService = {
  async getAll() {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return data || [];
  },
  async getPendingRequests() {
    const { data, error } = await supabase
      .from('pending_requests')
      .select('*')
      .eq('status', 'pending');
    if (error) throw error;
    return data || [];
  },
  async approveRequest(id: string) {
    const { data: req, error: fetchErr } = await supabase
      .from('pending_requests')
      .select('*')
      .eq('id', id)
      .single();
    if (fetchErr) throw fetchErr;
    const { error: insErr } = await supabase.from('users').insert([{
      username: req.username,
      password: req.password,
      name: req.name,
      phone: req.phone,
      avatar: req.avatar,
      provider: req.provider,
      created_at: new Date().toISOString(),
    }]);
    if (insErr) throw insErr;
    await supabase.from('pending_requests').update({ status: 'approved' }).eq('id', id);
  },
  async rejectRequest(id: string) {
    await supabase.from('pending_requests').update({ status: 'rejected' }).eq('id', id);
  },
  async insertPendingRequest(req: any) {
    const { data, error } = await supabase.from('pending_requests').insert([req]).select().single();
    if (error) throw error;
    return data;
  },
  async findUser(username: string, password: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();
    if (error) return null;
    return data;
  },
  async checkUsernameExists(username: string) {
    const { data } = await supabase.from('users').select('id').eq('username', username).single();
    return !!data;
  },
  async checkPhoneExists(phone: string) {
    const { data } = await supabase.from('users').select('id').eq('phone', phone).single();
    return !!data;
  },
};

// ── AGENCY REGISTRATION REQUESTS ─────────────────────────────────────────────
export const agencyRequestsService = {
  async insert(req: any) {
    const { data, error } = await supabase.from('agency_requests').insert([req]).select().single();
    if (error) throw error;
    return data;
  },
  async getAll() {
    const { data, error } = await supabase
      .from('agency_requests')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },
  async updateStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('agency_requests')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
