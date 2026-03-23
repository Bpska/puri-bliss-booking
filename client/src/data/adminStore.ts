// Use relative path for API so it works across standard docker-compose port-forwarding and proxies
const API_BASE = '/api';

// ─── Token helpers ────────────────────────────────────────
export function getToken(): string | null {
    return localStorage.getItem('admin_token');
}

export function setToken(token: string) {
    localStorage.setItem('admin_token', token);
}

export function clearToken() {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
}

export function isLoggedIn(): boolean {
    return !!getToken();
}

// ─── Auth Headers ─────────────────────────────────────────
function authHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`,
    };
}

// ─── Generic fetch helpers ────────────────────────────────
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE}${url}`, options);
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(err.error || `HTTP ${res.status}`);
    }
    return res.json();
}

// ─── Auth ─────────────────────────────────────────────────
export async function login(username: string, password: string): Promise<{ token: string; username: string }> {
    const data = await apiFetch<{ token: string; username: string }>('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    setToken(data.token);
    localStorage.setItem('admin_username', data.username);
    return data;
}

// ─── Types ────────────────────────────────────────────────
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Booking {
    id: string;
    roomId: number;
    roomName: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    status: BookingStatus;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    notes?: string;
    createdAt: string;
    updatedAt: string;
    // Legacy compat
    timestamp?: string;
}

export interface Offer {
    id: number;
    text: string;
    active: boolean;
    createdAt?: string;
}

export interface AdminRoom {
    id: number;
    roomId: number;
    name: string;
    type: string;
    tag: string | null;
    price: number;
    priceOverride: number | null;
    rating: number;
    reviews: number;
    features: string[];
    desc: string;
    gradient: string;
    images: string[];
    includes: string[];
    isCustom: boolean;
}

export interface FestivalRule {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    multiplier: number;
    active: boolean;
}

export interface Settings {
    rooms_full: boolean;
    total_rooms: number;
    full_rooms: number;
    hero_images?: { src: string; title: string; subtitle?: string }[];
    festival_pricing?: FestivalRule[];
    visitor_count?: number;
}

// ─── Bookings ─────────────────────────────────────────────
export async function getBookings(status?: string): Promise<Booking[]> {
    const query = status && status !== 'all' ? `?status=${status}` : '';
    const raw = await apiFetch<Booking[]>(`/bookings${query}`, { headers: authHeaders() });
    // Add backwards-compat timestamp field
    return raw.map(b => ({ ...b, timestamp: b.createdAt }));
}

export async function createBooking(data: {
    roomId: number; roomName: string;
    userName: string; userEmail: string; userPhone: string;
    checkIn?: string; checkOut?: string; guests?: number; notes?: string;
}): Promise<Booking> {
    return apiFetch<Booking>('/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
}

export async function confirmBooking(id: string): Promise<Booking> {
    return apiFetch<Booking>(`/bookings/${id}/confirm`, {
        method: 'PUT', headers: authHeaders(),
    });
}

export async function cancelBooking(id: string): Promise<Booking> {
    return apiFetch<Booking>(`/bookings/${id}/cancel`, {
        method: 'PUT', headers: authHeaders(),
    });
}

export async function updateBooking(id: string, updates: Partial<Pick<Booking, 'userName' | 'userEmail' | 'userPhone'>>): Promise<Booking> {
    return apiFetch<Booking>(`/bookings/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(updates),
    });
}

export async function deleteBooking(id: string): Promise<void> {
    await apiFetch<void>(`/bookings/${id}`, {
        method: 'DELETE', headers: authHeaders(),
    });
}

// ─── Rooms ────────────────────────────────────────────────
export async function getRooms(): Promise<AdminRoom[]> {
    return apiFetch<AdminRoom[]>('/rooms');
}

export async function addRoom(data: Partial<AdminRoom>): Promise<AdminRoom> {
    return apiFetch<AdminRoom>('/rooms', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data),
    });
}

export async function deleteRoom(roomId: number): Promise<void> {
    await apiFetch<void>(`/rooms/${roomId}`, {
        method: 'DELETE', headers: authHeaders(),
    });
}

export async function updateRoom(roomId: number, data: Partial<AdminRoom>): Promise<AdminRoom> {
    return apiFetch<AdminRoom>(`/rooms/${roomId}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data),
    });
}

export async function savePrices(overrides: Record<number, number>): Promise<void> {
    await apiFetch<void>('/rooms/prices/bulk', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ overrides }),
    });
}

// ─── Offers ───────────────────────────────────────────────
export async function getOffers(): Promise<Offer[]> {
    return apiFetch<Offer[]>('/offers');
}

export async function getActiveOffers(): Promise<Offer[]> {
    return apiFetch<Offer[]>('/offers/active');
}

export async function addOffer(text: string): Promise<Offer> {
    return apiFetch<Offer>('/offers', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ text }),
    });
}

export async function toggleOffer(id: number, active: boolean): Promise<Offer> {
    return apiFetch<Offer>(`/offers/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ active }),
    });
}

export async function deleteOffer(id: number): Promise<void> {
    await apiFetch<void>(`/offers/${id}`, {
        method: 'DELETE', headers: authHeaders(),
    });
}

// ─── Settings ─────────────────────────────────────────────
export async function getSettings(): Promise<Settings> {
    return apiFetch<Settings>('/settings');
}

export async function updateSettings(updates: Partial<Settings>): Promise<Settings> {
    return apiFetch<Settings>('/settings', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(updates),
    });
}

// ─── Analytics ────────────────────────────────────────────
export async function postVisit(): Promise<{ visitor_count: number }> {
    return apiFetch<{ visitor_count: number }>('/settings/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
}
