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
    isCustom?: boolean; // true for admin-added rooms
}

const ROOMS_KEY = 'hab_admin_rooms';
const OFFERS_KEY = 'hab_admin_offers';
const PRICE_OVERRIDES_KEY = 'hab_price_overrides';

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
