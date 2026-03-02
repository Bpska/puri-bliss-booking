import { useState, useEffect, useRef } from 'react';
import {
    getBookings, confirmBooking, cancelBooking, deleteBooking, updateBooking,
    getOffers, addOffer, toggleOffer, deleteOffer,
    getRooms, addRoom, deleteRoom, savePrices, updateRoom,
    getSettings, updateSettings,
    login, isLoggedIn, clearToken,
    Offer, AdminRoom, Booking, BookingStatus, Settings,
} from '../data/adminStore';
import {
    ArrowLeft, Save, Plus, Trash2, ToggleLeft, ToggleRight, Edit3, DollarSign,
    Megaphone, BedDouble, Calendar, Clock, Mail, Phone, CheckCircle, XCircle,
    AlertTriangle, Users, Image as ImageIcon, X, Settings as SettingsIcon, Calculator, LogOut, Lock,
} from 'lucide-react';
import hotelLogoAdmin from '../images/hotel-logo-2.jpg';

type Tab = 'prices' | 'addRoom' | 'offers' | 'bookings' | 'settings' | 'hero';

interface AdminPageProps {
    onBack: () => void;
    refreshRooms?: () => void;
}

// ─── Login Screen ─────────────────────────────────────────
const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(username, password);
            onLogin();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#E8760A] to-[#F59820] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Lock size={28} className="text-white" />
                    </div>
                    <h1 className="font-['Playfair_Display'] text-2xl font-bold text-white">Admin Panel</h1>
                    <p className="text-[#7A5230] text-sm mt-1">Hotel Amruta Bhojana</p>
                </div>
                <form onSubmit={handleLogin} className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] p-6 space-y-4">
                    {error && (
                        <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}
                    <div>
                        <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1.5">Username</label>
                        <input
                            type="text" value={username} onChange={e => setUsername(e.target.value)}
                            placeholder="admin" required autoComplete="username"
                            className="w-full bg-[#0D0D0D] border border-[#3D1C00] rounded-xl px-4 py-3 text-white placeholder-[#5A5A5A] focus:outline-none focus:border-[#E8760A] transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1.5">Password</label>
                        <input
                            type="password" value={password} onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••" required autoComplete="current-password"
                            className="w-full bg-[#0D0D0D] border border-[#3D1C00] rounded-xl px-4 py-3 text-white placeholder-[#5A5A5A] focus:outline-none focus:border-[#E8760A] transition-colors"
                        />
                    </div>
                    <button type="submit" disabled={loading}
                        className={`w-full py-3 rounded-xl font-bold transition-all ${loading ? 'bg-[#3D1C00] text-[#7A5230]' : 'bg-gradient-to-r from-[#E8760A] to-[#F59820] text-white hover:shadow-lg active:scale-[0.98]'}`}>
                        {loading ? 'Signing in…' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export const AdminPage = ({ onBack, refreshRooms }: AdminPageProps) => {
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());
    const [tab, setTab] = useState<Tab>('bookings');
    const [loading, setLoading] = useState(false);

    // ─── Prices tab state ────────────────────────────────
    const [allRooms, setAllRooms] = useState<AdminRoom[]>([]);
    const [priceOverrides, setPriceOverrides] = useState<Record<number, number>>({});
    const [priceSaved, setPriceSaved] = useState(false);
    const [editingRoomId, setEditingRoomId] = useState<number | null>(null);
    const [editRoomData, setEditRoomData] = useState<{ name: string; type: string; desc: string; tag: string; features: string }>({ name: '', type: '', desc: '', tag: '', features: '' });
    const [deleteRoomConfirmId, setDeleteRoomConfirmId] = useState<number | null>(null);

    // ─── Add Room tab state ──────────────────────────────
    const [newRoom, setNewRoom] = useState({
        name: '', type: 'Deluxe', price: '', features: '', desc: '', tag: '',
    });
    const [roomImages, setRoomImages] = useState<string[]>([]);
    const [roomAdded, setRoomAdded] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // ─── Offers tab state ────────────────────────────────
    const [offers, setOffers] = useState<Offer[]>([]);
    const [newOfferText, setNewOfferText] = useState('');

    // ─── Bookings tab state ──────────────────────────────
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState({ userName: '', userEmail: '', userPhone: '' });
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all');

    // ─── Settings state ──────────────────────────────────
    const [settings, setSettings] = useState<Settings>({ rooms_full: false, total_rooms: 12, full_rooms: 0 });

    const loadAll = async () => {
        setLoading(true);
        try {
            const [b, o, r, s] = await Promise.all([getBookings(), getOffers(), getRooms(), getSettings()]);
            setBookings(b);
            setOffers(o);
            setAllRooms(r);
            setSettings(s);
            // Build price overrides map from rooms
            const overrides: Record<number, number> = {};
            r.forEach(room => { if (room.priceOverride != null) overrides[room.roomId] = room.priceOverride; });
            setPriceOverrides(overrides);
        } catch (err) {
            console.warn('API not connected or token invalid');
            throw err; // Propagate error to trigger logout
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (loggedIn) {
            loadAll().catch(() => {
                // If token is invalid or API rejects it, clear token and show login
                clearToken();
                setLoggedIn(false);
            });
        }
    }, [loggedIn]);

    if (!loggedIn) {
        return <LoginScreen onLogin={() => setLoggedIn(true)} />;
    }


    // ─── Derived stats ────────────────────────────────────
    const customRooms = allRooms.filter(r => r.isCustom);
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

    // ─── Price handlers ───────────────────────────────────
    const handlePriceChange = (id: number, price: string) => {
        const val = parseInt(price) || 0;
        setPriceOverrides(prev => ({ ...prev, [id]: val }));
    };

    const handleSavePrices = async () => {
        try {
            await savePrices(priceOverrides);
            setPriceSaved(true);
            if (refreshRooms) refreshRooms();
            setTimeout(() => setPriceSaved(false), 2000);
        } catch { alert('Failed to save prices'); }
    };

    const handleStartEditRoom = (room: AdminRoom) => {
        setEditingRoomId(room.roomId);
        setEditRoomData({
            name: room.name, type: room.type,
            desc: room.desc || '', tag: room.tag || '',
            features: (room.features || []).join(', '),
        });
    };

    const handleSaveEditRoom = async () => {
        if (!editingRoomId) return;
        try {
            const updated = await updateRoom(editingRoomId, {
                name: editRoomData.name,
                type: editRoomData.type,
                desc: editRoomData.desc,
                tag: editRoomData.tag || null,
                features: editRoomData.features.split(',').map(f => f.trim()).filter(Boolean),
            });
            setAllRooms(prev => prev.map(r => (r.roomId === editingRoomId ? updated : r)));
            setEditingRoomId(null);
            if (refreshRooms) refreshRooms();
        } catch { alert('Failed to update room'); }
    };

    const handleConfirmDeleteRoom = async (roomId: number) => {
        try {
            await deleteRoom(roomId);
            setAllRooms(prev => prev.filter(r => (r.roomId || r.id) !== roomId));
            setDeleteRoomConfirmId(null);
            if (refreshRooms) refreshRooms();
        } catch { alert('Failed to delete room'); }
    };

    // ─── Image Upload handler ─────────────────────────────
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) setRoomImages(prev => [...prev, ev.target!.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (idx: number) => setRoomImages(prev => prev.filter((_, i) => i !== idx));

    // ─── Add Room handler ─────────────────────────────────
    const handleAddRoom = async () => {
        if (!newRoom.name || !newRoom.price || !newRoom.desc) return;
        const gradients = [
            'linear-gradient(135deg,#1A0A00,#5C2A00,#E8760A)',
            'linear-gradient(135deg,#0A1A00,#2A5C00,#70A030)',
            'linear-gradient(135deg,#00101A,#004060,#0080C0)',
            'linear-gradient(135deg,#1A0A20,#5A1A60,#A030B0)',
        ];
        const maxId = allRooms.reduce((max, r) => Math.max(max, r.roomId || r.id || 0), 0);
        try {
            const created = await addRoom({
                roomId: maxId + 1,
                name: newRoom.name, type: newRoom.type, tag: newRoom.tag || null,
                price: parseInt(newRoom.price) || 0,
                features: newRoom.features.split(',').map(f => f.trim()).filter(Boolean),
                desc: newRoom.desc,
                gradient: gradients[Math.floor(Math.random() * gradients.length)],
                images: roomImages,
                includes: ['Free WiFi', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
            });
            setAllRooms(prev => [...prev, created]);
            setNewRoom({ name: '', type: 'Deluxe', price: '', features: '', desc: '', tag: '' });
            setRoomImages([]);
            setRoomAdded(true);
            if (refreshRooms) refreshRooms();
            setTimeout(() => setRoomAdded(false), 2500);
        } catch { alert('Failed to add room'); }
    };

    const handleDeleteRoom = async (roomId: number) => {
        try {
            await deleteRoom(roomId);
            setAllRooms(prev => prev.filter(r => (r.roomId || r.id) !== roomId));
            if (refreshRooms) refreshRooms();
        } catch { alert('Failed to delete room'); }
    };

    // ─── Offer handlers ───────────────────────────────────
    const handleAddOffer = async () => {
        if (!newOfferText.trim()) return;
        try {
            const created = await addOffer(newOfferText.trim());
            setOffers(prev => [...prev, created]);
            setNewOfferText('');
        } catch { alert('Failed to add offer'); }
    };

    const handleToggleOffer = async (id: number, active: boolean) => {
        try {
            const updated = await toggleOffer(id, !active);
            setOffers(prev => prev.map(o => o.id === id ? updated : o));
        } catch { alert('Failed to toggle offer'); }
    };

    const handleDeleteOffer = async (id: number) => {
        try {
            await deleteOffer(id);
            setOffers(prev => prev.filter(o => o.id !== id));
        } catch { alert('Failed to delete offer'); }
    };

    // ─── Booking handlers ─────────────────────────────────
    const handleConfirm = async (id: string) => {
        try {
            const updated = await confirmBooking(id);
            setBookings(prev => prev.map(b => b.id === id ? { ...updated, timestamp: updated.createdAt } : b));
        } catch { alert('Failed to confirm booking'); }
    };

    const handleCancel = async (id: string) => {
        try {
            const updated = await cancelBooking(id);
            setBookings(prev => prev.map(b => b.id === id ? { ...updated, timestamp: updated.createdAt } : b));
        } catch { alert('Failed to cancel booking'); }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteBooking(id);
            setBookings(prev => prev.filter(b => b.id !== id));
            setDeleteConfirmId(null);
        } catch { alert('Failed to delete booking'); }
    };

    const startEdit = (booking: Booking) => {
        setEditingId(booking.id);
        setEditData({ userName: booking.userName, userEmail: booking.userEmail, userPhone: booking.userPhone });
    };

    const saveEdit = async () => {
        if (!editingId) return;
        try {
            const updated = await updateBooking(editingId, editData);
            setBookings(prev => prev.map(b => b.id === editingId ? { ...updated, timestamp: updated.createdAt } : b));
            setEditingId(null);
        } catch { alert('Failed to save changes'); }
    };

    // ─── Settings handlers ────────────────────────────────
    const handleUpdateSettings = async (updates: Partial<Settings>) => {
        try {
            const updated = await updateSettings(updates);
            setSettings(updated);
        } catch { alert('Failed to update settings'); }
    };

    // ─── Hero Config handlers ─────────────────────────────
    const heroFileInputRef = useRef<HTMLInputElement>(null);

    const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = async (ev) => {
                if (ev.target?.result) {
                    const newEntry = { src: ev.target.result as string, title: '', subtitle: '' };
                    const current = settings.hero_images || [];
                    try {
                        const updated = await updateSettings({ hero_images: [...current, newEntry] });
                        setSettings(updated);
                    } catch { alert('Failed to upload hero image'); }
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const updateHeroImage = async (idx: number, updates: { title?: string, subtitle?: string }) => {
        if (!settings.hero_images) return;
        const newImages = [...settings.hero_images];
        newImages[idx] = { ...newImages[idx], ...updates };
        setSettings(prev => ({ ...prev, hero_images: newImages })); // Optimistic
        try {
            await updateSettings({ hero_images: newImages });
        } catch { alert('Failed to save title'); }
    };

    const removeHeroImage = async (idx: number) => {
        if (!settings.hero_images) return;
        const newImages = settings.hero_images.filter((_, i) => i !== idx);
        setSettings(prev => ({ ...prev, hero_images: newImages })); // Optimistic
        try {
            await updateSettings({ hero_images: newImages });
        } catch { alert('Failed to remove image'); }
    };

    // ─── Status badge helper ──────────────────────────────
    const StatusBadge = ({ status }: { status: BookingStatus }) => {
        const config = {
            pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: <Clock size={12} />, label: '⏳ Pending' },
            confirmed: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', icon: <CheckCircle size={12} />, label: '✅ Confirmed' },
            cancelled: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', icon: <XCircle size={12} />, label: '❌ Cancelled' },
        };
        const c = config[status];
        return (
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${c.bg} ${c.text} border ${c.border}`}>
                {c.icon} {c.label}
            </span>
        );
    };

    const filteredBookings = statusFilter === 'all' ? bookings : bookings.filter(b => b.status === statusFilter);

    const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
        { id: 'bookings', label: 'Bookings', icon: <Calendar size={18} />, count: pendingBookings },
        { id: 'prices', label: 'Room Prices', icon: <DollarSign size={18} /> },
        { id: 'addRoom', label: 'Add Room', icon: <BedDouble size={18} /> },
        { id: 'offers', label: 'Offers', icon: <Megaphone size={18} /> },
        { id: 'hero', label: 'Hero Config', icon: <ImageIcon size={18} /> },
        { id: 'settings', label: 'Settings', icon: <SettingsIcon size={18} /> },
    ];

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col md:flex-row">
            {/* Sidebar (Desktop) / Header (Mobile) */}
            <div className="md:w-[280px] md:flex-shrink-0 md:min-h-screen sticky top-0 z-40 bg-[#1A0A00] border-b md:border-b-0 md:border-r border-[#3D1C00] shadow-xl md:shadow-2xl flex flex-col">
                <div className="px-4 py-4 md:px-6 md:py-8 flex items-center justify-between md:flex-col md:items-start md:gap-8 border-b border-[#3D1C00]">
                    <div className="flex items-center gap-3 w-full">
                        <img
                            src={hotelLogoAdmin}
                            alt="Hotel Logo"
                            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-[#D4A017]/60 shadow-lg cursor-pointer transition-transform active:scale-95"
                            onClick={onBack}
                            title="Back to Home"
                        />
                        <div>
                            <h1 className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-white">Admin Panel</h1>
                            <p className="text-[10px] md:text-xs text-[#7A5230]">Hotel Amruta Bhojana</p>
                        </div>
                    </div>

                    <div className="flex items-center md:flex-col md:w-full gap-2 md:gap-3">
                        {/* Rooms Full Quick Toggle */}
                        <button
                            onClick={() => handleUpdateSettings({ rooms_full: !settings.rooms_full })}
                            className={`flex items-center justify-center gap-2 px-3 py-2 md:py-3 md:w-full rounded-xl text-xs font-bold transition-all ${settings.rooms_full
                                ? 'bg-red-900/40 border border-red-500/40 text-red-400'
                                : 'bg-[#3D1C00] border border-[#5C2A00] text-[#7A5230] hover:text-white'
                                }`}
                        >
                            {settings.rooms_full ? <ToggleRight size={16} className="text-red-400" /> : <ToggleLeft size={16} />}
                            <span className="hidden md:inline">{settings.rooms_full ? 'Rooms FULL' : 'Rooms Open'}</span>
                        </button>
                        {/* Logout */}
                        <button
                            onClick={() => { clearToken(); setLoggedIn(false); }}
                            className="w-10 h-10 md:w-full md:px-3 md:py-3 bg-[#3D1C00] rounded-xl flex items-center justify-center md:justify-start md:gap-2 hover:bg-[#5C2A00] transition-colors"
                            title="Logout"
                        >
                            <LogOut size={16} className="text-[#F59820]" />
                            <span className="hidden md:inline text-[#7A5230] hover:text-white font-bold text-xs transition-colors">Logout</span>
                        </button>
                    </div>
                </div>

                {/* Tab bar */}
                <div className="px-4 md:px-3 md:py-4 flex gap-1 md:flex-col md:gap-2 pb-0 overflow-x-auto custom-scrollbar md:flex-1">
                    {tabs.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`flex items-center gap-2 md:gap-3 px-4 py-2.5 md:py-3.5 rounded-t-xl md:rounded-xl text-sm font-semibold transition-all whitespace-nowrap relative group ${tab === t.id
                                ? 'bg-[#0D0D0D] md:bg-[#E8760A]/10 text-[#F59820] border-t-2 md:border-t-0 md:border-l-4 border-x md:border-x-0 border-[#E8760A] border-x-[#3D1C00]'
                                : 'text-[#7A5230] hover:text-white hover:bg-[#1A1A1A] md:border-l-4 md:border-transparent'
                                }`}
                        >
                            <span className={`${tab === t.id ? 'text-[#F59820]' : 'text-[#7A5230] group-hover:text-white'} transition-colors`}>{t.icon}</span>
                            <span className="hidden md:inline">{t.label}</span>
                            {t.count != null && t.count > 0 && (
                                <span className="absolute md:static md:ml-auto -top-1 -right-1 md:top-auto md:right-auto w-5 h-5 md:w-6 md:h-6 bg-red-500 text-white rounded-full text-[10px] md:text-xs font-bold flex items-center justify-center shadow-lg shadow-red-500/20">{t.count}</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 w-full flex flex-col min-h-screen relative">
                {/* Loading */}
                {loading && (
                    <div className="flex items-center justify-center flex-1 text-[#7A5230]">
                        <div className="animate-spin w-8 h-8 border-2 border-[#E8760A] border-t-transparent rounded-full mr-3" />
                        Loading data…
                    </div>
                )}

                {/* Content */}
                {!loading && (
                    <div className="px-4 md:px-8 lg:px-12 py-6 w-full max-w-6xl mx-auto">

                        {/* ── Tab: Bookings ───────────────────────── */}
                        {tab === 'bookings' && (
                            <div className="animate-fadeUp">
                                {/* Stats Cards */}
                                <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
                                    <div className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] rounded-2xl border border-[#2A2A4A] p-4 md:p-5">
                                        <div className="flex items-center gap-2 text-blue-400 mb-2"><Users size={18} /><span className="text-[10px] uppercase font-bold tracking-wider">Total</span></div>
                                        <div className="text-2xl md:text-3xl font-bold text-white">{totalBookings}</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-[#1A2E1A] to-[#16351E] rounded-2xl border border-[#2A4A2A] p-4 md:p-5">
                                        <div className="flex items-center gap-2 text-green-400 mb-2"><CheckCircle size={18} /><span className="text-[10px] uppercase font-bold tracking-wider">Confirmed</span></div>
                                        <div className="text-2xl md:text-3xl font-bold text-white">{confirmedBookings}</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-[#2E2A1A] to-[#35301E] rounded-2xl border border-[#4A3A2A] p-4 md:p-5">
                                        <div className="flex items-center gap-2 text-yellow-400 mb-2"><Clock size={18} /><span className="text-[10px] uppercase font-bold tracking-wider">Pending</span></div>
                                        <div className="text-2xl md:text-3xl font-bold text-white">{pendingBookings}</div>
                                    </div>
                                </div>

                                {/* Filter bar */}
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-white">Bookings</h2>
                                    <div className="flex gap-1.5">
                                        {(['all', 'pending', 'confirmed', 'cancelled'] as const).map(f => (
                                            <button key={f} onClick={() => setStatusFilter(f)}
                                                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${statusFilter === f ? 'bg-[#E8760A] text-white' : 'bg-[#1A1A1A] text-[#7A5230] hover:text-white border border-[#2A2A2A]'}`}>
                                                {f}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {filteredBookings.length === 0 ? (
                                    <div className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] p-8 text-center">
                                        <div className="text-4xl mb-3">📅</div>
                                        <p className="text-[#7A5230] text-sm">No bookings found.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {filteredBookings.map(booking => (
                                            <div key={booking.id} className={`bg-[#1A1A1A] rounded-2xl border p-5 transition-all ${booking.status === 'confirmed' ? 'border-green-500/20' : booking.status === 'cancelled' ? 'border-red-500/20 opacity-60' : 'border-[#2A2A2A] hover:border-[#E8760A]/30'}`}>
                                                {deleteConfirmId === booking.id && (
                                                    <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-4 mb-4 flex flex-col md:flex-row items-center gap-3">
                                                        <AlertTriangle size={20} className="text-red-400 flex-shrink-0" />
                                                        <p className="text-sm text-red-300 flex-1">Are you sure you want to delete this booking?</p>
                                                        <div className="flex gap-2">
                                                            <button onClick={() => handleDelete(booking.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700">Delete</button>
                                                            <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg text-xs font-bold hover:bg-[#3A3A3A]">Cancel</button>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                            <StatusBadge status={booking.status} />
                                                            <span className="bg-[#E8760A]/20 text-[#F59820] text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">{booking.roomName}</span>
                                                            <span className="text-[#5A5A5A] text-[10px]">#{booking.id.substring(0, 8)}</span>
                                                        </div>
                                                        {editingId === booking.id ? (
                                                            <div className="space-y-2 mt-3">
                                                                <input value={editData.userName} onChange={e => setEditData(p => ({ ...p, userName: e.target.value }))} placeholder="Name" className="w-full bg-[#0D0D0D] border border-[#3D1C00] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8760A]" />
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    <input value={editData.userEmail} onChange={e => setEditData(p => ({ ...p, userEmail: e.target.value }))} placeholder="Email" className="bg-[#0D0D0D] border border-[#3D1C00] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8760A]" />
                                                                    <input value={editData.userPhone} onChange={e => setEditData(p => ({ ...p, userPhone: e.target.value }))} placeholder="Phone" className="bg-[#0D0D0D] border border-[#3D1C00] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8760A]" />
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <button onClick={saveEdit} className="px-4 py-2 bg-gradient-to-r from-[#E8760A] to-[#F59820] text-white rounded-lg text-xs font-bold hover:shadow-lg active:scale-95"><Save size={12} className="inline mr-1" />Save</button>
                                                                    <button onClick={() => setEditingId(null)} className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg text-xs font-bold">Cancel</button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <h4 className="text-lg font-bold text-white mb-1">{booking.userName}</h4>
                                                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#7A5230]">
                                                                    <div className="flex items-center gap-1.5"><Mail size={14} /> {booking.userEmail}</div>
                                                                    <div className="flex items-center gap-1.5 font-bold text-white/90"><Phone size={14} /> {booking.userPhone}</div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col items-end gap-3 border-t md:border-t-0 border-[#2A2A2A] pt-3 md:pt-0">
                                                        <div className="text-right">
                                                            <div className="text-white font-bold flex items-center justify-end gap-2 mb-1 text-sm">
                                                                <Calendar size={14} className="text-[#E8760A]" />
                                                                {new Date(booking.createdAt || booking.timestamp || '').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                            </div>
                                                            <div className="text-[#7A5230] text-xs flex items-center justify-end gap-2">
                                                                <Clock size={12} />
                                                                {new Date(booking.createdAt || booking.timestamp || '').toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                                            </div>
                                                        </div>
                                                        {editingId !== booking.id && (
                                                            <div className="flex gap-1.5">
                                                                {booking.status === 'pending' && (
                                                                    <button onClick={() => handleConfirm(booking.id)} title="Confirm" className="w-9 h-9 bg-green-900/30 rounded-lg flex items-center justify-center text-green-400 hover:bg-green-900/60 transition-colors">
                                                                        <CheckCircle size={16} />
                                                                    </button>
                                                                )}
                                                                {booking.status !== 'cancelled' && (
                                                                    <button onClick={() => handleCancel(booking.id)} title="Cancel" className="w-9 h-9 bg-yellow-900/30 rounded-lg flex items-center justify-center text-yellow-400 hover:bg-yellow-900/60 transition-colors">
                                                                        <XCircle size={16} />
                                                                    </button>
                                                                )}
                                                                <button onClick={() => startEdit(booking)} title="Edit" className="w-9 h-9 bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-900/60 transition-colors">
                                                                    <Edit3 size={16} />
                                                                </button>
                                                                <button onClick={() => setDeleteConfirmId(booking.id)} title="Delete" className="w-9 h-9 bg-red-900/30 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-900/60 transition-colors">
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── Tab: Room Prices ────────────────────── */}
                        {tab === 'prices' && (
                            <div className="animate-fadeUp">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white">Room Prices</h2>
                                        <p className="text-sm text-[#7A5230]">Manage rooms — Create, Edit, Update prices, Delete</p>
                                    </div>
                                    <button onClick={handleSavePrices}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${priceSaved ? 'bg-green-600 text-white' : 'bg-gradient-to-r from-[#E8760A] to-[#F59820] text-white hover:shadow-lg active:scale-95'}`}>
                                        <Save size={16} />
                                        {priceSaved ? 'Saved ✓' : 'Save All Prices'}
                                    </button>
                                </div>

                                <h3 className="text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-3">All Rooms ({allRooms.length})</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {allRooms.map(room => (
                                        <div key={room.id} className={`bg-[#1A1A1A] rounded-2xl border p-5 transition-all ${editingRoomId === room.roomId ? 'border-[#E8760A] shadow-lg shadow-[#E8760A]/10' : deleteRoomConfirmId === room.roomId ? 'border-red-500/50' : 'border-[#2A2A2A] hover:border-[#E8760A]/30'}`}>
                                            {/* ── Editing Mode ── */}
                                            {editingRoomId === room.roomId ? (
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-[10px] text-[#F59820] font-bold uppercase tracking-wider">✏️ Editing Room #{room.roomId}</span>
                                                        <button onClick={() => setEditingRoomId(null)} className="text-[#7A5230] hover:text-white transition-colors">
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] text-[#7A5230] uppercase tracking-wider mb-1 font-bold">Room Name</label>
                                                        <input value={editRoomData.name} onChange={e => setEditRoomData(d => ({ ...d, name: e.target.value }))}
                                                            className="w-full bg-[#0D0D0D] border border-[#3D1C00] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8760A] transition-colors" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div>
                                                            <label className="block text-[10px] text-[#7A5230] uppercase tracking-wider mb-1 font-bold">Type</label>
                                                            <select value={editRoomData.type} onChange={e => setEditRoomData(d => ({ ...d, type: e.target.value }))}
                                                                className="w-full bg-[#0D0D0D] border border-[#3D1C00] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8760A] transition-colors">
                                                                {['Deluxe', 'Standard', 'Economy', 'Suite', 'Premium'].map(t => <option key={t} value={t}>{t}</option>)}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] text-[#7A5230] uppercase tracking-wider mb-1 font-bold">Tag</label>
                                                            <input value={editRoomData.tag} onChange={e => setEditRoomData(d => ({ ...d, tag: e.target.value }))}
                                                                placeholder="e.g. Best Value"
                                                                className="w-full bg-[#0D0D0D] border border-[#3D1C00] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8760A] transition-colors" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] text-[#7A5230] uppercase tracking-wider mb-1 font-bold">Features (comma separated)</label>
                                                        <input value={editRoomData.features} onChange={e => setEditRoomData(d => ({ ...d, features: e.target.value }))}
                                                            placeholder="WiFi, AC, TV"
                                                            className="w-full bg-[#0D0D0D] border border-[#3D1C00] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8760A] transition-colors" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] text-[#7A5230] uppercase tracking-wider mb-1 font-bold">Description</label>
                                                        <textarea value={editRoomData.desc} onChange={e => setEditRoomData(d => ({ ...d, desc: e.target.value }))}
                                                            rows={2}
                                                            className="w-full bg-[#0D0D0D] border border-[#3D1C00] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8760A] transition-colors resize-none" />
                                                    </div>
                                                    <div className="flex gap-2 pt-1">
                                                        <button onClick={handleSaveEditRoom}
                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E8760A] to-[#F59820] text-white text-sm font-bold hover:shadow-lg active:scale-95 transition-all">
                                                            <Save size={14} /> Save Changes
                                                        </button>
                                                        <button onClick={() => setEditingRoomId(null)}
                                                            className="px-4 py-2.5 rounded-xl bg-[#2A2A2A] text-[#7A5230] text-sm font-bold hover:bg-[#3A3A3A] transition-colors">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : deleteRoomConfirmId === room.roomId ? (
                                                /* ── Delete Confirmation ── */
                                                <div className="text-center py-4">
                                                    <div className="w-12 h-12 bg-red-900/40 rounded-full flex items-center justify-center mx-auto mb-3">
                                                        <AlertTriangle size={24} className="text-red-400" />
                                                    </div>
                                                    <p className="text-sm font-bold text-white mb-1">Delete "{room.name}"?</p>
                                                    <p className="text-[11px] text-[#7A5230] mb-4">This action cannot be undone.</p>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => handleConfirmDeleteRoom(room.roomId)}
                                                            className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 active:scale-95 transition-all">
                                                            Yes, Delete
                                                        </button>
                                                        <button onClick={() => setDeleteRoomConfirmId(null)}
                                                            className="flex-1 px-4 py-2.5 rounded-xl bg-[#2A2A2A] text-[#7A5230] text-sm font-bold hover:bg-[#3A3A3A] transition-colors">
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                /* ── Normal View ── */
                                                <>
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <h4 className="font-semibold text-white text-sm">{room.name}</h4>
                                                            <span className="text-[10px] text-[#7A5230]">{room.type} · ID #{room.roomId}</span>
                                                            {room.isCustom && <span className="text-[9px] bg-purple-500/20 text-purple-400 ml-2 px-1.5 py-0.5 rounded-full font-bold">Custom</span>}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            {room.tag && <span className="text-[9px] bg-[#E8760A]/20 text-[#F59820] px-2 py-0.5 rounded-full font-bold">{room.tag}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[#7A5230] text-sm">₹</span>
                                                        <input type="number"
                                                            value={priceOverrides[room.roomId] ?? room.priceOverride ?? room.price}
                                                            onChange={e => handlePriceChange(room.roomId, e.target.value)}
                                                            className="flex-1 bg-[#0D0D0D] border border-[#3D1C00] rounded-lg px-3 py-2 text-white text-lg font-bold focus:outline-none focus:border-[#E8760A] transition-colors" />
                                                        <span className="text-[10px] text-[#7A5230]">/night</span>
                                                    </div>
                                                    <div className="text-[10px] text-[#5A5A5A] mt-2">
                                                        Original: ₹{room.price.toLocaleString()}
                                                        {priceOverrides[room.roomId] != null && priceOverrides[room.roomId] !== room.price && (
                                                            <span className="text-[#F59820] ml-2">· Modified</span>
                                                        )}
                                                    </div>
                                                    {/* Action Buttons */}
                                                    <div className="flex gap-2 mt-3 pt-3 border-t border-[#2A2A2A]">
                                                        <button onClick={() => handleStartEditRoom(room)}
                                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#E8760A]/10 text-[#F59820] text-[11px] font-bold hover:bg-[#E8760A]/20 active:scale-95 transition-all">
                                                            <Edit3 size={12} /> Edit
                                                        </button>
                                                        <button onClick={() => setDeleteRoomConfirmId(room.roomId)}
                                                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 text-[11px] font-bold hover:bg-red-500/20 active:scale-95 transition-all">
                                                            <Trash2 size={12} /> Delete
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ── Tab: Add Room ───────────────────────── */}
                        {tab === 'addRoom' && (
                            <div className="animate-fadeUp max-w-2xl">
                                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white mb-1">Add New Room</h2>
                                <p className="text-sm text-[#7A5230] mb-6">Create a new room listing — saved to database</p>
                                {roomAdded && (
                                    <div className="bg-green-900/30 border border-green-600/30 rounded-xl p-4 mb-4 flex items-center gap-2 text-green-400 text-sm font-semibold animate-fadeUp">
                                        ✅ Room added and saved to listing!
                                    </div>
                                )}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1.5">Room Name *</label>
                                        <input type="text" placeholder="e.g. Premium Double AC Room" value={newRoom.name} onChange={e => setNewRoom(prev => ({ ...prev, name: e.target.value }))}
                                            className="w-full bg-[#1A1A1A] border border-[#3D1C00] rounded-xl px-4 py-3 text-white placeholder-[#5A5A5A] focus:outline-none focus:border-[#E8760A] transition-colors" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1.5">Room Type *</label>
                                            <select value={newRoom.type} onChange={e => setNewRoom(prev => ({ ...prev, type: e.target.value }))}
                                                className="w-full bg-[#1A1A1A] border border-[#3D1C00] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E8760A] transition-colors">
                                                <option value="Deluxe">Deluxe</option>
                                                <option value="Standard">Standard</option>
                                                <option value="Economy">Economy</option>
                                                <option value="Suite">Suite</option>
                                                <option value="Premium">Premium</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1.5">Tag (Optional)</label>
                                            <input type="text" placeholder="e.g. Best Value" value={newRoom.tag} onChange={e => setNewRoom(prev => ({ ...prev, tag: e.target.value }))}
                                                className="w-full bg-[#1A1A1A] border border-[#3D1C00] rounded-xl px-4 py-3 text-white placeholder-[#5A5A5A] focus:outline-none focus:border-[#E8760A] transition-colors" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1.5">Price per Night (₹) *</label>
                                        <input type="number" placeholder="e.g. 3500" value={newRoom.price} onChange={e => setNewRoom(prev => ({ ...prev, price: e.target.value }))}
                                            className="w-full bg-[#1A1A1A] border border-[#3D1C00] rounded-xl px-4 py-3 text-white placeholder-[#5A5A5A] focus:outline-none focus:border-[#E8760A] transition-colors text-lg font-bold" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1.5">Features (comma-separated)</label>
                                        <input type="text" placeholder="e.g. Double Bed, Air Conditioning, Free WiFi" value={newRoom.features} onChange={e => setNewRoom(prev => ({ ...prev, features: e.target.value }))}
                                            className="w-full bg-[#1A1A1A] border border-[#3D1C00] rounded-xl px-4 py-3 text-white placeholder-[#5A5A5A] focus:outline-none focus:border-[#E8760A] transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1.5">Description *</label>
                                        <textarea rows={3} placeholder="Describe the room…" value={newRoom.desc} onChange={e => setNewRoom(prev => ({ ...prev, desc: e.target.value }))}
                                            className="w-full bg-[#1A1A1A] border border-[#3D1C00] rounded-xl px-4 py-3 text-white placeholder-[#5A5A5A] focus:outline-none focus:border-[#E8760A] transition-colors resize-none" />
                                    </div>
                                    {/* Image Upload */}
                                    <div>
                                        <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1.5">Room Images</label>
                                        <div onClick={() => fileInputRef.current?.click()}
                                            className="bg-[#1A1A1A] border-2 border-dashed border-[#3D1C00] rounded-xl p-6 text-center cursor-pointer hover:border-[#E8760A]/50 transition-colors">
                                            <ImageIcon size={32} className="mx-auto text-[#7A5230] mb-2" />
                                            <p className="text-sm text-[#7A5230] font-semibold">Click to upload images</p>
                                            <p className="text-[10px] text-[#5A5A5A] mt-1">JPG, PNG — Max 5MB per image</p>
                                        </div>
                                        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                                        {roomImages.length > 0 && (
                                            <div className="flex gap-3 mt-3 flex-wrap">
                                                {roomImages.map((img, idx) => (
                                                    <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#3D1C00] group">
                                                        <img src={img} alt={`Room ${idx + 1}`} className="w-full h-full object-cover" />
                                                        <button onClick={() => removeImage(idx)} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                            <X size={16} className="text-red-400" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <button onClick={handleAddRoom} disabled={!newRoom.name || !newRoom.price || !newRoom.desc}
                                        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-base transition-all ${!newRoom.name || !newRoom.price || !newRoom.desc ? 'bg-[#2A2A2A] text-[#5A5A5A] cursor-not-allowed' : 'bg-gradient-to-r from-[#E8760A] to-[#F59820] text-white hover:shadow-lg active:scale-[0.98]'}`}>
                                        <Plus size={20} />Add Room to Website
                                    </button>
                                </div>
                                {customRooms.length > 0 && (
                                    <div className="mt-8">
                                        <h3 className="text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-3">Custom Rooms Added ({customRooms.length})</h3>
                                        <div className="space-y-2">
                                            {customRooms.map(room => (
                                                <div key={room.id} className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        {room.images.length > 0 && <img src={room.images[0]} alt={room.name} className="w-12 h-12 rounded-lg object-cover border border-[#3D1C00]" />}
                                                        <div>
                                                            <span className="text-sm font-semibold text-white">{room.name}</span>
                                                            <span className="text-xs text-[#7A5230] ml-2">₹{room.price.toLocaleString()} · {room.type}</span>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => handleDeleteRoom(room.roomId)} className="w-8 h-8 bg-red-900/30 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-900/60 transition-colors">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── Tab: Offers ─────────────────────────── */}
                        {tab === 'offers' && (
                            <div className="animate-fadeUp max-w-2xl">
                                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white mb-1">Offers & Announcements</h2>
                                <p className="text-sm text-[#7A5230] mb-6">Manage the scrolling offers banner — saved to database</p>
                                <div className="flex gap-3 mb-6">
                                    <input type="text" placeholder="e.g. 🎉 Flat 20% off on Deluxe rooms this weekend!" value={newOfferText}
                                        onChange={e => setNewOfferText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddOffer()}
                                        className="flex-1 bg-[#1A1A1A] border border-[#3D1C00] rounded-xl px-4 py-3 text-white placeholder-[#5A5A5A] focus:outline-none focus:border-[#E8760A] transition-colors" />
                                    <button onClick={handleAddOffer} disabled={!newOfferText.trim()}
                                        className={`px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${!newOfferText.trim() ? 'bg-[#2A2A2A] text-[#5A5A5A] cursor-not-allowed' : 'bg-gradient-to-r from-[#E8760A] to-[#F59820] text-white hover:shadow-lg active:scale-95'}`}>
                                        <Plus size={16} /> Add
                                    </button>
                                </div>
                                {offers.length === 0 ? (
                                    <div className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] p-8 text-center">
                                        <div className="text-4xl mb-3">📢</div>
                                        <p className="text-[#7A5230] text-sm">No offers yet. Add one above to display the banner.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {offers.map(offer => (
                                            <div key={offer.id} className={`bg-[#1A1A1A] rounded-xl border p-4 flex items-center gap-3 transition-all ${offer.active ? 'border-[#E8760A]/30' : 'border-[#2A2A2A] opacity-50'}`}>
                                                <button onClick={() => handleToggleOffer(offer.id, offer.active)} className="flex-shrink-0 transition-colors" title={offer.active ? 'Disable' : 'Enable'}>
                                                    {offer.active ? <ToggleRight size={28} className="text-[#E8760A]" /> : <ToggleLeft size={28} className="text-[#5A5A5A]" />}
                                                </button>
                                                <p className="flex-1 text-sm text-white">{offer.text}</p>
                                                <button onClick={() => handleDeleteOffer(offer.id)} className="w-8 h-8 bg-red-900/30 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-900/60 transition-colors flex-shrink-0">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── Tab: Hero Config ─────────────────────────── */}
                        {tab === 'hero' && (
                            <div className="animate-fadeUp max-w-4xl">
                                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white mb-1">Hero Images & Titles</h2>
                                <p className="text-sm text-[#7A5230] mb-6">Manage the images and text shown in the home page slider.</p>

                                <div className="mb-6">
                                    <div onClick={() => heroFileInputRef.current?.click()}
                                        className="bg-[#1A1A1A] border-2 border-dashed border-[#3D1C00] rounded-xl p-6 text-center cursor-pointer hover:border-[#E8760A]/50 transition-colors">
                                        <ImageIcon size={32} className="mx-auto text-[#7A5230] mb-2" />
                                        <p className="text-sm text-[#7A5230] font-semibold">Click to upload new hero image</p>
                                        <p className="text-[10px] text-[#5A5A5A] mt-1">Recommended size: 1920x1080px (JPG, PNG)</p>
                                    </div>
                                    <input ref={heroFileInputRef} type="file" accept="image/*" multiple onChange={handleHeroImageUpload} className="hidden" />
                                </div>

                                {!settings.hero_images || settings.hero_images.length === 0 ? (
                                    <div className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] p-8 text-center">
                                        <div className="text-4xl mb-3">🖼️</div>
                                        <p className="text-[#7A5230] text-sm">No custom hero images uploaded. The default images will be shown.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {settings.hero_images.map((img, idx) => (
                                            <div key={idx} className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] overflow-hidden flex flex-col group">
                                                <div className="relative h-40 w-full shrink-0">
                                                    <img src={img.src} alt={`Hero ${idx + 1}`} className="w-full h-full object-cover" />
                                                    <button onClick={() => removeHeroImage(idx)} className="absolute top-2 right-2 w-8 h-8 bg-black/60 rounded-lg flex items-center justify-center text-red-400 hover:bg-black/90 transition-colors">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <div className="p-4 flex flex-col gap-3">
                                                    <div>
                                                        <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1">Title</label>
                                                        <input type="text" placeholder="e.g. Welcome to Bliss" value={img.title || ''}
                                                            onChange={e => updateHeroImage(idx, { title: e.target.value })}
                                                            className="w-full bg-[#0D0D0D] border border-[#3D1C00] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8760A] transition-colors" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1">Subtitle (Optional)</label>
                                                        <input type="text" placeholder="e.g. Experience Spiritual Comfort" value={img.subtitle || ''}
                                                            onChange={e => updateHeroImage(idx, { subtitle: e.target.value })}
                                                            className="w-full bg-[#0D0D0D] border border-[#3D1C00] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#E8760A] transition-colors" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── Tab: Settings ───────────────────────── */}
                        {tab === 'settings' && (
                            <div className="animate-fadeUp max-w-2xl">
                                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white mb-1">Settings</h2>
                                <p className="text-sm text-[#7A5230] mb-6">Manage global hotel settings — saved to database</p>

                                {/* All Rooms Full Toggle */}
                                <div className={`bg-[#1A1A1A] rounded-2xl border p-6 transition-all mb-6 ${settings.rooms_full ? 'border-red-500/30' : 'border-[#2A2A2A]'}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${settings.rooms_full ? 'bg-red-900/40 text-red-400' : 'bg-[#3D1C00] text-[#F59820]'}`}>
                                                <AlertTriangle size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white">Manual Override: Rooms Full</h3>
                                                <p className="text-sm text-[#7A5230]">Instantly mark all rooms as full across the website.</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleUpdateSettings({ rooms_full: !settings.rooms_full })} className="flex-shrink-0">
                                            {settings.rooms_full
                                                ? <ToggleRight size={36} className="text-red-400" />
                                                : <ToggleLeft size={36} className="text-[#5A5A5A]" />}
                                        </button>
                                    </div>
                                    {settings.rooms_full && (
                                        <div className="mt-4 bg-red-900/20 border border-red-500/20 rounded-xl p-3">
                                            <p className="text-sm text-red-300 font-semibold">⚠️ Manual override is ACTIVE. Website shows "All Rooms Full".</p>
                                        </div>
                                    )}
                                </div>

                                {/* Room Availability Counter */}
                                <div className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] p-6 mb-6">
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <Calculator size={20} className="text-[#F59820]" />
                                        Room Occupancy Tracking
                                    </h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-2">Total Rooms Present</label>
                                            <input type="number" value={settings.total_rooms}
                                                onChange={e => handleUpdateSettings({ total_rooms: parseInt(e.target.value) || 0 })}
                                                className="w-full bg-[#0D0D0D] border border-[#3D1C00] rounded-xl px-4 py-3 text-white text-xl font-bold focus:outline-none focus:border-[#E8760A] transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-2">How many are FULL?</label>
                                            <input type="number" value={settings.full_rooms}
                                                onChange={e => handleUpdateSettings({ full_rooms: parseInt(e.target.value) || 0 })}
                                                className="w-full bg-[#0D0D0D] border border-[#3D1C00] rounded-xl px-4 py-3 text-white text-xl font-bold focus:outline-none focus:border-[#E8760A] transition-colors" />
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between bg-[#0D0D0D] p-4 rounded-xl border border-[#3D1C00]">
                                        <span className="text-sm text-[#7A5230] font-semibold">Availability Status on Website:</span>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full animate-pulse ${settings.total_rooms - settings.full_rooms <= 0 ? 'bg-red-500' : settings.total_rooms - settings.full_rooms <= 3 ? 'bg-yellow-500' : 'bg-green-500'}`} />
                                            <span className={`font-bold ${settings.total_rooms - settings.full_rooms <= 0 ? 'text-red-400' : settings.total_rooms - settings.full_rooms <= 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                                                {settings.total_rooms - settings.full_rooms <= 0 ? 'SOLD OUT' : `${settings.total_rooms - settings.full_rooms} Rooms Available`}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] p-6">
                                    <h3 className="text-sm font-bold text-[#7A5230] uppercase tracking-wider mb-4">Quick Overview</h3>
                                    <div className="space-y-3">
                                        {[
                                            { label: 'Total Room Types', value: allRooms.length },
                                            { label: 'Custom Rooms', value: customRooms.length },
                                            { label: 'Active Offers', value: offers.filter(o => o.active).length },
                                            { label: 'Total Bookings', value: totalBookings },
                                            { label: 'Pending Bookings', value: pendingBookings, yellow: true },
                                            { label: 'Confirmed Bookings', value: confirmedBookings, green: true },
                                        ].map(item => (
                                            <div key={item.label} className="flex justify-between items-center">
                                                <span className="text-sm text-[#7A5230]">{item.label}</span>
                                                <span className={`font-bold ${item.yellow ? 'text-yellow-400' : item.green ? 'text-green-400' : 'text-white'}`}>{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
