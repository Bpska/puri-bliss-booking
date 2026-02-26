import { useState, useEffect } from 'react';
import { ROOMS, Room } from '../data/constants';
import { getRooms, AdminRoom } from '../data/adminStore';

export type PageId = 'home' | 'rooms' | 'detail' | 'contact' | 'admin';

export function useAppState() {
    const [page, setPage] = useState<PageId>('home');
    const [selectedRoom, setSelectedRoom] = useState<Room>(ROOMS[0]);
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

    const [checkIn, setCheckIn] = useState(formatDate(tomorrow));
    const [checkOut, setCheckOut] = useState(formatDate(dayAfter));
    const [guests, setGuests] = useState(2);
    const [wishlist, setWishlist] = useState<number[]>([]);
    const [filter, setFilter] = useState('All Rooms');
    const [form, setForm] = useState({ fname: '', lname: '', phone: '', email: '', msg: '' });
    const [success, setSuccess] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeRoomImg, setActiveRoomImg] = useState<Record<number, number>>({});
    const [allRooms, setAllRooms] = useState<AdminRoom[]>([]);

    // Check URL hash for admin access
    useEffect(() => {
        const checkHash = () => {
            if (window.location.hash === '#admin') {
                setPage('admin');
            }
        };
        checkHash();
        window.addEventListener('hashchange', checkHash);
        return () => window.removeEventListener('hashchange', checkHash);
    }, []);

    // Load rooms from backend, fall back to static data
    useEffect(() => {
        getRooms().then(r => setAllRooms(r)).catch(() => setAllRooms([]));
    }, []);

    const toggleWishlist = (id: number) => {
        setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    // Use admin-merged rooms (with price overrides + custom rooms), fall back to ROOMS
    const getFilteredRooms = (): Room[] => {
        // Map AdminRoom → Room shape for components
        const rooms: Room[] = allRooms.length > 0
            ? allRooms.map(r => ({
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
            }))
            : ROOMS;
        if (filter === 'All Rooms') return rooms;
        if (filter === 'AC') return rooms.filter(r => r.features.includes('Air Conditioning'));
        if (filter === 'Non-AC') return rooms.filter(r => r.type === 'Economy');
        if (filter === 'Deluxe') return rooms.filter(r => r.type === 'Deluxe' || r.type === 'Suite');
        if (filter === 'Budget') return rooms.filter(r => r.price < 2000);
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

    const navigateTo = (p: PageId, room?: Room) => {
        if (room) setSelectedRoom(room);
        setPage(p);
        setMenuOpen(false);
        // Scroll to top on every page navigation
        window.scrollTo({ top: 0, behavior: 'instant' });
        // Also reset any scrollable container in the app
        const scrollEl = document.querySelector('.overflow-y-auto');
        if (scrollEl) scrollEl.scrollTop = 0;
        // Update hash for admin
        if (p === 'admin') {
            window.location.hash = '#admin';
        } else if (window.location.hash === '#admin') {
            window.location.hash = '';
        }
    };

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
    };
}
