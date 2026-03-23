import { useState, useEffect, useCallback } from 'react';
import { ROOMS, Room } from '../data/constants';
import { getRooms, AdminRoom, getSettings, FestivalRule, postVisit } from '../data/adminStore';

export type PageId = 'home' | 'rooms' | 'detail' | 'contact' | 'admin' | 'about';

export function useAppState() {
    const [page, setPage] = useState<PageId>('home');
    const [selectedRoomId, setSelectedRoomId] = useState<number>(ROOMS[0].id);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);

    const formatDate = (d: Date) => {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatDisplayDate = (dateStr: string) => {
        if (!dateStr) return '';
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateStr;
    };

    const [checkIn, setCheckIn] = useState(formatDate(today));
    const [checkOut, setCheckOut] = useState(formatDate(tomorrow));
    const [guests, setGuests] = useState(2);
    const [wishlist, setWishlist] = useState<number[]>([]);
    const [filter, setFilter] = useState('All Rooms');
    const [form, setForm] = useState({ fname: '', lname: '', phone: '', email: '', msg: '' });
    const [success, setSuccess] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeRoomImg, setActiveRoomImg] = useState<Record<number, number>>({});
    const [allRooms, setAllRooms] = useState<AdminRoom[]>([]);
    const [festivalRules, setFestivalRules] = useState<FestivalRule[]>([]);
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [bookingRoom, setBookingRoom] = useState<Room | null>(null);
    const [visitorCount, setVisitorCount] = useState<number>(0);

    // Track visitors on mount
    useEffect(() => {
        postVisit().then(res => setVisitorCount(res.visitor_count)).catch(() => {});
    }, []);

    // Check URL hash for routing and browser back button support
    useEffect(() => {
        const checkHash = () => {
            const hash = window.location.hash.replace('#', '') as PageId;
            const validPages: PageId[] = ['home', 'rooms', 'detail', 'contact', 'admin', 'about'];
            if (validPages.includes(hash)) {
                setPage(hash);
            } else if (!hash) {
                setPage('home');
            }

            // Scroll to top on browser back/forward navigation
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                const scrollEl = document.querySelector('.overflow-y-auto');
                if (scrollEl) scrollEl.scrollTop = 0;
            }, 10);
        };
        checkHash();
        window.addEventListener('hashchange', checkHash);
        return () => window.removeEventListener('hashchange', checkHash);
    }, []);

    const refreshRooms = () => {
        getRooms().then(r => setAllRooms(r)).catch(() => setAllRooms([]));
    };

    // Load rooms from backend, fall back to static data
    useEffect(() => {
        refreshRooms();
        // Load festival pricing rules from settings
        getSettings().then(s => {
            if (s.festival_pricing) setFestivalRules(s.festival_pricing);
        }).catch(() => { });
    }, []);

    // Helper: compute festival multiplier for a given check-in date
    const getFestivalMultiplier = (checkInDate: string): { multiplier: number; festivalName: string | null } => {
        let best = 1;
        let name: string | null = null;
        for (const rule of festivalRules) {
            if (rule.active && checkInDate >= rule.startDate && checkInDate <= rule.endDate) {
                if (rule.multiplier > best) {
                    best = rule.multiplier;
                    name = rule.name;
                }
            }
        }
        return { multiplier: best, festivalName: name };
    };

    const toggleWishlist = (id: number) => {
        setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const getAllProcessedRooms = (): Room[] => {
        const rooms: Room[] = [...ROOMS]; // start with static rooms
        // override static rooms with admin data, or append custom ones
        for (const r of allRooms) {
            const staticIdx = rooms.findIndex(orig => orig.id === (r.roomId ?? r.id));
            const mapped: Room = {
                id: r.roomId ?? r.id,
                name: r.name,
                type: r.type,
                tag: r.tag ?? null,
                price: r.priceOverride ?? r.price,
                rating: r.rating ?? 4.7,
                reviews: r.reviews ?? 0,
                features: r.features ?? [],
                desc: r.desc ?? '',
                gradient: r.gradient ?? '',
                images: r.images && r.images.length > 0 ? r.images : (ROOMS.find(orig => orig.id === (r.roomId ?? r.id))?.images ?? []),
                includes: r.includes ?? [],
            };
            if (staticIdx >= 0) rooms[staticIdx] = mapped;
            else rooms.push(mapped);
        }

        const festivalMultiplier = getFestivalMultiplier(checkIn).multiplier;
        if (festivalMultiplier !== 1) {
            for (const r of rooms) {
                r.price = Math.round(r.price * festivalMultiplier);
            }
        }
        return rooms;
    };

    const getFilteredRooms = (): Room[] => {
        const rooms = getAllProcessedRooms();
        if (filter === 'All Rooms') return rooms;
        const exactMatch = rooms.filter(r => r.name === filter || r.name.toLowerCase() === filter.toLowerCase());
        if (exactMatch.length > 0) return exactMatch;

        if (filter === 'AC' || filter === 'AC Room') return rooms.filter(r => r.features.includes('Air Conditioning'));
        if (filter === 'Non-AC') return rooms.filter(r => !r.features.includes('Air Conditioning'));
        if (filter === 'Deluxe') return rooms.filter(r => r.type === 'Deluxe' || r.type === 'Suite');
        if (filter === 'Budget') return rooms.filter(r => r.price < 2000 * getFestivalMultiplier(checkIn).multiplier);
        return rooms;
    };

    const handleSubmit = () => {
        if (form.fname && form.lname && form.phone && form.email) {
            setForm({ fname: '', lname: '', phone: '', email: '', msg: '' });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        }
    };

    const getRoomImgIndex = (roomId: number) => activeRoomImg[roomId] ?? 0;

    const setRoomImgIndex = (roomId: number, idx: number) => {
        setActiveRoomImg(prev => ({ ...prev, [roomId]: idx }));
    };

    const selectedRoom = getAllProcessedRooms().find(r => r.id === selectedRoomId) || getAllProcessedRooms()[0];
    const setSelectedRoom = (room: Room) => setSelectedRoomId(room.id);

    const navigateTo = (p: PageId, room?: Room) => {
        if (room) setSelectedRoom(room);

        // Update hash for browser history, which will trigger hashchange and setPage
        if (p === 'home') {
            if (window.location.hash !== '') {
                window.history.pushState(null, '', window.location.pathname + window.location.search);
                setPage(p); // manually set Page since hashchange might not fire perfectly for empty hash removal
            } else {
                setPage(p);
            }
        } else {
            if (window.location.hash !== `#${p}`) {
                window.location.hash = p;
            } else {
                setPage(p);
            }
        }

        setMenuOpen(false);
        // Scroll to top on every page navigation
        window.scrollTo({ top: 0, behavior: 'instant' });
        // Also reset any scrollable container in the app
        const scrollEl = document.querySelector('.overflow-y-auto');
        if (scrollEl) scrollEl.scrollTop = 0;
    };

    const openBookingModal = useCallback((room?: Room) => {
        if (room) setBookingRoom(room);
        setBookingModalOpen(true);
    }, []);

    const closeBookingModal = useCallback(() => {
        setBookingModalOpen(false);
        setBookingRoom(null);
    }, []);

    return {
        page, setPage: navigateTo,
        selectedRoom, setSelectedRoom,
        checkIn, setCheckIn,
        checkOut, setCheckOut,
        guests, setGuests,
        wishlist, toggleWishlist,
        filter, setFilter,
        form, setForm,
        success, handleSubmit,
        menuOpen, setMenuOpen,
        getRoomImgIndex, setRoomImgIndex,
        getFilteredRooms,
        refreshRooms,
        festivalRules,
        getFestivalMultiplier,
        bookingModalOpen, bookingRoom, openBookingModal, closeBookingModal,
        formatDisplayDate,
        visitorCount,
    };
}
