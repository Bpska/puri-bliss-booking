import { useState, useEffect } from 'react';
import { ROOMS, Room } from '../data/constants';
import { getAllRooms } from '../data/adminStore';

export type PageId = 'home' | 'rooms' | 'detail' | 'contact' | 'admin';

export function useAppState() {
    const [page, setPage] = useState<PageId>('home');
    const [selectedRoom, setSelectedRoom] = useState<Room>(ROOMS[0]);
    const [guests, setGuests] = useState(2);
    const [wishlist, setWishlist] = useState<number[]>([]);
    const [filter, setFilter] = useState('All Rooms');
    const [form, setForm] = useState({ fname: '', lname: '', phone: '', email: '', msg: '' });
    const [success, setSuccess] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeRoomImg, setActiveRoomImg] = useState<Record<number, number>>({});

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

    const toggleWishlist = (id: number) => {
        setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    // Use admin-merged rooms (with price overrides + custom rooms)
    const getFilteredRooms = () => {
        const rooms = getAllRooms();
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
