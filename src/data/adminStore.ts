import { ROOMS, Room } from './constants';

// ─── Offer type ──────────────────────────────────────────
export interface Offer {
    id: number;
    text: string;
    active: boolean;
}

// ─── Admin Room (simplified for new rooms without images) ─
export interface AdminRoom {
    id: number;
    name: string;
    type: string;
    tag: string | null;
    price: number;
    rating: number;
    reviews: number;
    features: string[];
    desc: string;
    gradient: string;
    images: string[];
    includes: string[];
    isCustom?: boolean;
}

// ─── Booking interface ──────────────────────────────────
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Booking {
    id: string;
    roomId: number;
    roomName: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    timestamp: string; // ISO string
    status: BookingStatus;
}

const ROOMS_KEY = 'hab_admin_rooms';
const OFFERS_KEY = 'hab_admin_offers';
const PRICE_OVERRIDES_KEY = 'hab_price_overrides';
const BOOKINGS_KEY = 'hab_admin_bookings';
const ROOMS_FULL_KEY = 'hab_rooms_full';
const TOTAL_ROOMS_KEY = 'hab_total_rooms';
const FULL_ROOMS_KEY = 'hab_full_rooms';

// ─── Room Price Overrides ────────────────────────────────
export function getPriceOverrides(): Record<number, number> {
    try {
        const raw = localStorage.getItem(PRICE_OVERRIDES_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

export function savePriceOverrides(overrides: Record<number, number>) {
    localStorage.setItem(PRICE_OVERRIDES_KEY, JSON.stringify(overrides));
}

// ─── Custom Rooms (admin-added) ──────────────────────────
export function getCustomRooms(): AdminRoom[] {
    try {
        const raw = localStorage.getItem(ROOMS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function saveCustomRooms(rooms: AdminRoom[]) {
    localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms));
}

// ─── Merged Rooms (defaults + overrides + custom) ────────
export function getAllRooms(): Room[] {
    const overrides = getPriceOverrides();
    const defaults = ROOMS.map(r => ({
        ...r,
        price: overrides[r.id] ?? r.price,
    }));
    const custom = getCustomRooms();
    return [...defaults, ...custom] as Room[];
}

// ─── Next available ID ───────────────────────────────────
export function getNextRoomId(): number {
    const all = getAllRooms();
    return Math.max(...all.map(r => r.id), 0) + 1;
}

// ─── Offers ──────────────────────────────────────────────
export function getOffers(): Offer[] {
    try {
        const raw = localStorage.getItem(OFFERS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function saveOffers(offers: Offer[]) {
    localStorage.setItem(OFFERS_KEY, JSON.stringify(offers));
}

export function getActiveOffers(): Offer[] {
    return getOffers().filter(o => o.active);
}

// ─── Bookings ────────────────────────────────────────────
export function getBookings(): Booking[] {
    try {
        const raw = localStorage.getItem(BOOKINGS_KEY);
        const bookings: Booking[] = raw ? JSON.parse(raw) : [];
        // Migrate old bookings that don't have status
        return bookings.map(b => ({
            ...b,
            status: b.status || 'pending',
        }));
    } catch {
        return [];
    }
}

export function saveBookings(bookings: Booking[]) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

export function addBooking(booking: Omit<Booking, 'id' | 'timestamp' | 'status'>) {
    const bookings = getBookings();
    const newBooking: Booking = {
        ...booking,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        status: 'pending',
    };
    saveBookings([newBooking, ...bookings]);
    return newBooking;
}

export function updateBooking(id: string, updates: Partial<Pick<Booking, 'userName' | 'userEmail' | 'userPhone'>>) {
    const bookings = getBookings();
    const updated = bookings.map(b => b.id === id ? { ...b, ...updates } : b);
    saveBookings(updated);
    return updated;
}

export function confirmBooking(id: string) {
    const bookings = getBookings();
    const updated = bookings.map(b => b.id === id ? { ...b, status: 'confirmed' as BookingStatus } : b);
    saveBookings(updated);
    return updated;
}

export function cancelBooking(id: string) {
    const bookings = getBookings();
    const updated = bookings.map(b => b.id === id ? { ...b, status: 'cancelled' as BookingStatus } : b);
    saveBookings(updated);
    return updated;
}

export function deleteBooking(id: string) {
    const bookings = getBookings();
    const updated = bookings.filter(b => b.id !== id);
    saveBookings(updated);
    return updated;
}

// ─── All Rooms Full Toggle ───────────────────────────────
export function getRoomsFull(): boolean {
    try {
        return localStorage.getItem(ROOMS_FULL_KEY) === 'true';
    } catch {
        return false;
    }
}

export function setRoomsFull(isFull: boolean) {
    localStorage.setItem(ROOMS_FULL_KEY, isFull ? 'true' : 'false');
}

// ─── Manual Room Availability Tracking ───────────────────
export function getTotalRooms(): number {
    try {
        const val = localStorage.getItem(TOTAL_ROOMS_KEY);
        return val ? parseInt(val) : 12; // Default to 12 rooms
    } catch {
        return 12;
    }
}

export function setTotalRooms(count: number) {
    localStorage.setItem(TOTAL_ROOMS_KEY, count.toString());
}

export function getFullRooms(): number {
    try {
        const val = localStorage.getItem(FULL_ROOMS_KEY);
        return val ? parseInt(val) : 0;
    } catch {
        return 0;
    }
}

export function setFullRooms(count: number) {
    localStorage.setItem(FULL_ROOMS_KEY, count.toString());
}
