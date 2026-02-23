import { useState, useEffect, useRef } from 'react';
import { ROOMS } from '../data/constants';
import {
    getPriceOverrides, savePriceOverrides,
    getCustomRooms, saveCustomRooms, getNextRoomId,
    getOffers, saveOffers,
    getBookings, confirmBooking, cancelBooking, deleteBooking, updateBooking,
    getRoomsFull, setRoomsFull,
    getTotalRooms, setTotalRooms, getFullRooms, setFullRooms,
    Offer, AdminRoom, Booking, BookingStatus
} from '../data/adminStore';
import {
    ArrowLeft, Save, Plus, Trash2, ToggleLeft, ToggleRight, Edit3, DollarSign,
    Megaphone, BedDouble, Calendar, Clock, Mail, Phone, CheckCircle, XCircle,
    AlertTriangle, Users, Image as ImageIcon, X, Settings, Calculator
} from 'lucide-react';

type Tab = 'prices' | 'addRoom' | 'offers' | 'bookings' | 'settings';

interface AdminPageProps {
    onBack: () => void;
}

export const AdminPage = ({ onBack }: AdminPageProps) => {
    const [tab, setTab] = useState<Tab>('bookings');

    // ─── Prices tab state ────────────────────────────────
    const [priceOverrides, setPriceOverrides] = useState<Record<number, number>>({});
    const [customRooms, setCustomRooms] = useState<AdminRoom[]>([]);
    const [priceSaved, setPriceSaved] = useState(false);

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
    const [offerSaved, setOfferSaved] = useState(false);

    // ─── Bookings tab state ──────────────────────────────
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState({ userName: '', userEmail: '', userPhone: '' });
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all');

    // ─── Settings state ──────────────────────────────────
    const [roomsFull, setRoomsFullState] = useState(false);
    const [totalRooms, setTotalRoomsState] = useState(12);
    const [fullRooms, setFullRoomsState] = useState(0);

    useEffect(() => {
        setPriceOverrides(getPriceOverrides());
        setCustomRooms(getCustomRooms());
        setOffers(getOffers());
        setBookings(getBookings());
        setRoomsFullState(getRoomsFull());
        setTotalRoomsState(getTotalRooms());
        setFullRoomsState(getFullRooms());
    }, []);

    const allDefaultRooms = ROOMS;

    // ─── Stats ───────────────────────────────────────────
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

    // ─── Price handlers ──────────────────────────────────
    const handlePriceChange = (id: number, price: string) => {
        const val = parseInt(price) || 0;
        setPriceOverrides(prev => ({ ...prev, [id]: val }));
    };

    const handleCustomRoomPriceChange = (id: number, price: string) => {
        const val = parseInt(price) || 0;
        setCustomRooms(prev => prev.map(r => r.id === id ? { ...r, price: val } : r));
    };

    const savePrices = () => {
        savePriceOverrides(priceOverrides);
        saveCustomRooms(customRooms);
        setPriceSaved(true);
        setTimeout(() => setPriceSaved(false), 2000);
    };

    // ─── Image Upload handler ────────────────────────────
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) {
                    setRoomImages(prev => [...prev, ev.target!.result as string]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (idx: number) => {
        setRoomImages(prev => prev.filter((_, i) => i !== idx));
    };

    // ─── Add Room handler ────────────────────────────────
    const handleAddRoom = () => {
        if (!newRoom.name || !newRoom.price || !newRoom.desc) return;

        const gradients = [
            'linear-gradient(135deg,#1A0A00,#5C2A00,#E8760A)',
            'linear-gradient(135deg,#0A1A00,#2A5C00,#70A030)',
            'linear-gradient(135deg,#00101A,#004060,#0080C0)',
            'linear-gradient(135deg,#1A0A20,#5A1A60,#A030B0)',
            'linear-gradient(135deg,#1A1A00,#5C5C00,#A0A030)',
        ];

        const room: AdminRoom = {
            id: getNextRoomId(),
            name: newRoom.name,
            type: newRoom.type,
            tag: newRoom.tag || null,
            price: parseInt(newRoom.price) || 0,
            rating: 5.0,
            reviews: 0,
            features: newRoom.features.split(',').map(f => f.trim()).filter(Boolean),
            desc: newRoom.desc,
            gradient: gradients[Math.floor(Math.random() * gradients.length)],
            images: roomImages,
            includes: ['Free WiFi', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
            isCustom: true,
        };

        const updated = [...customRooms, room];
        saveCustomRooms(updated);
        setCustomRooms(updated);
        setNewRoom({ name: '', type: 'Deluxe', price: '', features: '', desc: '', tag: '' });
        setRoomImages([]);
        setRoomAdded(true);
        setTimeout(() => setRoomAdded(false), 2500);
    };

    const deleteCustomRoom = (id: number) => {
        const updated = customRooms.filter(r => r.id !== id);
        saveCustomRooms(updated);
        setCustomRooms(updated);
    };

    // ─── Offer handlers ──────────────────────────────────
    const addOffer = () => {
        if (!newOfferText.trim()) return;
        const newOffer: Offer = { id: Date.now(), text: newOfferText.trim(), active: true };
        const updated = [...offers, newOffer];
        setOffers(updated);
        saveOffers(updated);
        setNewOfferText('');
        setOfferSaved(true);
        setTimeout(() => setOfferSaved(false), 2000);
    };

    const toggleOffer = (id: number) => {
        const updated = offers.map(o => o.id === id ? { ...o, active: !o.active } : o);
        setOffers(updated);
        saveOffers(updated);
    };

    const deleteOffer = (id: number) => {
        const updated = offers.filter(o => o.id !== id);
        setOffers(updated);
        saveOffers(updated);
    };

    // ─── Booking handlers ────────────────────────────────
    const handleConfirm = (id: string) => {
        const updated = confirmBooking(id);
        setBookings(updated);
    };

    const handleCancel = (id: string) => {
        const updated = cancelBooking(id);
        setBookings(updated);
    };

    const handleDelete = (id: string) => {
        const updated = deleteBooking(id);
        setBookings(updated);
        setDeleteConfirmId(null);
    };

    const startEdit = (booking: Booking) => {
        setEditingId(booking.id);
        setEditData({ userName: booking.userName, userEmail: booking.userEmail, userPhone: booking.userPhone });
    };

    const saveEdit = () => {
        if (!editingId) return;
        const updated = updateBooking(editingId, editData);
        setBookings(updated);
        setEditingId(null);
    };

    // ─── Rooms Full handler ──────────────────────────────
    const toggleRoomsFull = () => {
        const newVal = !roomsFull;
        setRoomsFullState(newVal);
        setRoomsFull(newVal);
    };

    const handleTotalRoomsChange = (val: string) => {
        const count = parseInt(val) || 0;
        setTotalRoomsState(count);
        setTotalRooms(count);
    };

    const handleFullRoomsChange = (val: string) => {
        const count = parseInt(val) || 0;
        setFullRoomsState(count);
        setFullRooms(count);
    };

    // ─── Status badge helper ─────────────────────────────
    const StatusBadge = ({ status }: { status: BookingStatus }) => {
        const config = {
            pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', label: '⏳ Pending', icon: <Clock size={12} /> },
            confirmed: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: '✅ Confirmed', icon: <CheckCircle size={12} /> },
            cancelled: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', label: '❌ Cancelled', icon: <XCircle size={12} /> },
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
        { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
    ];

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-white">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-[#1A0A00] border-b border-[#3D1C00] shadow-lg">
                <div className="px-4 md:px-12 lg:px-20 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={onBack} className="w-10 h-10 bg-[#3D1C00] rounded-xl flex items-center justify-center hover:bg-[#5C2A00] transition-colors">
                            <ArrowLeft size={20} className="text-[#F59820]" />
                        </button>
                        <div>
                            <h1 className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-white">Admin Panel</h1>
                            <p className="text-[10px] md:text-xs text-[#7A5230]">Hotel Amruta Bhojana · Management</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Rooms Full Toggle in header */}
                        <button
                            onClick={toggleRoomsFull}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${roomsFull
                                ? 'bg-red-900/40 border border-red-500/40 text-red-400'
                                : 'bg-[#3D1C00] border border-[#5C2A00] text-[#7A5230] hover:text-white'
                                }`}
                        >
                            {roomsFull ? <ToggleRight size={16} className="text-red-400" /> : <ToggleLeft size={16} />}
                            <span className="hidden md:inline">{roomsFull ? 'Rooms FULL' : 'Rooms Open'}</span>
                        </button>
                        <div className="w-10 h-10 bg-gradient-to-br from-[#E8760A] to-[#F59820] rounded-xl flex items-center justify-center">
                            <Edit3 size={18} className="text-white" />
                        </div>
                    </div>
                </div>

                {/* Tab bar */}
                <div className="px-4 md:px-12 lg:px-20 flex gap-1 pb-0 overflow-x-auto">
                    {tabs.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-semibold transition-all whitespace-nowrap relative ${tab === t.id
                                ? 'bg-[#0D0D0D] text-[#F59820] border-t-2 border-x border-[#E8760A] border-x-[#3D1C00]'
                                : 'text-[#7A5230] hover:text-white hover:bg-[#1A1A1A]'
                                }`}
                        >
                            {t.icon}
                            <span className="hidden md:inline">{t.label}</span>
                            {t.count && t.count > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">{t.count}</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="px-4 md:px-12 lg:px-20 py-6">

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
                                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${statusFilter === f
                                            ? 'bg-[#E8760A] text-white'
                                            : 'bg-[#1A1A1A] text-[#7A5230] hover:text-white border border-[#2A2A2A]'
                                            }`}
                                    >{f}</button>
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

                                        {/* Delete confirmation overlay */}
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
                                                    <span className="text-[#5A5A5A] text-[10px]">#{booking.id}</span>
                                                </div>

                                                {editingId === booking.id ? (
                                                    /* Edit mode */
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
                                                    /* View mode */
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
                                                        {new Date(booking.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </div>
                                                    <div className="text-[#7A5230] text-xs flex items-center justify-end gap-2">
                                                        <Clock size={12} />
                                                        {new Date(booking.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>

                                                {/* Action buttons */}
                                                {editingId !== booking.id && (
                                                    <div className="flex gap-1.5">
                                                        {booking.status === 'pending' && (
                                                            <button onClick={() => handleConfirm(booking.id)} title="Confirm"
                                                                className="w-9 h-9 bg-green-900/30 rounded-lg flex items-center justify-center text-green-400 hover:bg-green-900/60 transition-colors">
                                                                <CheckCircle size={16} />
                                                            </button>
                                                        )}
                                                        {booking.status !== 'cancelled' && (
                                                            <button onClick={() => handleCancel(booking.id)} title="Cancel Booking"
                                                                className="w-9 h-9 bg-yellow-900/30 rounded-lg flex items-center justify-center text-yellow-400 hover:bg-yellow-900/60 transition-colors">
                                                                <XCircle size={16} />
                                                            </button>
                                                        )}
                                                        <button onClick={() => startEdit(booking)} title="Edit"
                                                            className="w-9 h-9 bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-400 hover:bg-blue-900/60 transition-colors">
                                                            <Edit3 size={16} />
                                                        </button>
                                                        <button onClick={() => setDeleteConfirmId(booking.id)} title="Delete"
                                                            className="w-9 h-9 bg-red-900/30 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-900/60 transition-colors">
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
                                <p className="text-sm text-[#7A5230]">Edit room prices — changes appear on the website instantly</p>
                            </div>
                            <button
                                onClick={savePrices}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${priceSaved
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gradient-to-r from-[#E8760A] to-[#F59820] text-white hover:shadow-lg active:scale-95'
                                    }`}
                            >
                                <Save size={16} />
                                {priceSaved ? 'Saved ✓' : 'Save All'}
                            </button>
                        </div>

                        <h3 className="text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-3">Default Rooms</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            {allDefaultRooms.map(room => (
                                <div key={room.id} className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] p-5 hover:border-[#E8760A]/30 transition-colors">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="font-semibold text-white text-sm">{room.name}</h4>
                                            <span className="text-[10px] text-[#7A5230]">{room.type} · ID #{room.id}</span>
                                        </div>
                                        {room.tag && (
                                            <span className="text-[9px] bg-[#E8760A]/20 text-[#F59820] px-2 py-0.5 rounded-full font-bold">{room.tag}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[#7A5230] text-sm">₹</span>
                                        <input type="number" value={priceOverrides[room.id] ?? room.price} onChange={e => handlePriceChange(room.id, e.target.value)}
                                            className="flex-1 bg-[#0D0D0D] border border-[#3D1C00] rounded-lg px-3 py-2 text-white text-lg font-bold focus:outline-none focus:border-[#E8760A] transition-colors" />
                                        <span className="text-[10px] text-[#7A5230]">/night</span>
                                    </div>
                                    <div className="text-[10px] text-[#5A5A5A] mt-2">
                                        Original: ₹{room.price.toLocaleString()}
                                        {priceOverrides[room.id] && priceOverrides[room.id] !== room.price && (
                                            <span className="text-[#F59820] ml-2">· Modified</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {customRooms.length > 0 && (
                            <>
                                <h3 className="text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-3">Custom Rooms (Admin Added)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {customRooms.map(room => (
                                        <div key={room.id} className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] p-5 hover:border-[#E8760A]/30 transition-colors relative">
                                            <button onClick={() => deleteCustomRoom(room.id)} className="absolute top-3 right-3 w-8 h-8 bg-red-900/30 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-900/60 transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                            <h4 className="font-semibold text-white text-sm mb-1">{room.name}</h4>
                                            <span className="text-[10px] text-[#7A5230] block mb-3">{room.type} · ID #{room.id} · Custom</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#7A5230] text-sm">₹</span>
                                                <input type="number" value={room.price} onChange={e => handleCustomRoomPriceChange(room.id, e.target.value)}
                                                    className="flex-1 bg-[#0D0D0D] border border-[#3D1C00] rounded-lg px-3 py-2 text-white text-lg font-bold focus:outline-none focus:border-[#E8760A] transition-colors" />
                                                <span className="text-[10px] text-[#7A5230]">/night</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* ── Tab: Add Room ───────────────────────── */}
                {tab === 'addRoom' && (
                    <div className="animate-fadeUp max-w-2xl">
                        <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white mb-1">Add New Room</h2>
                        <p className="text-sm text-[#7A5230] mb-6">Create a new room listing for the website</p>

                        {roomAdded && (
                            <div className="bg-green-900/30 border border-green-600/30 rounded-xl p-4 mb-4 flex items-center gap-2 text-green-400 text-sm font-semibold animate-fadeUp">
                                ✅ Room added successfully! It will appear on the website.
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
                                    <input type="text" placeholder="e.g. Best Value, New" value={newRoom.tag} onChange={e => setNewRoom(prev => ({ ...prev, tag: e.target.value }))}
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
                                <input type="text" placeholder="e.g. Double Bed, Air Conditioning, WiFi TV, Free WiFi" value={newRoom.features} onChange={e => setNewRoom(prev => ({ ...prev, features: e.target.value }))}
                                    className="w-full bg-[#1A1A1A] border border-[#3D1C00] rounded-xl px-4 py-3 text-white placeholder-[#5A5A5A] focus:outline-none focus:border-[#E8760A] transition-colors" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1.5">Description *</label>
                                <textarea rows={3} placeholder="Describe the room..." value={newRoom.desc} onChange={e => setNewRoom(prev => ({ ...prev, desc: e.target.value }))}
                                    className="w-full bg-[#1A1A1A] border border-[#3D1C00] rounded-xl px-4 py-3 text-white placeholder-[#5A5A5A] focus:outline-none focus:border-[#E8760A] transition-colors resize-none" />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1.5">Room Images</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-[#1A1A1A] border-2 border-dashed border-[#3D1C00] rounded-xl p-6 text-center cursor-pointer hover:border-[#E8760A]/50 transition-colors"
                                >
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

                            <button
                                onClick={handleAddRoom}
                                disabled={!newRoom.name || !newRoom.price || !newRoom.desc}
                                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-base transition-all ${!newRoom.name || !newRoom.price || !newRoom.desc
                                    ? 'bg-[#2A2A2A] text-[#5A5A5A] cursor-not-allowed'
                                    : 'bg-gradient-to-r from-[#E8760A] to-[#F59820] text-white hover:shadow-lg active:scale-[0.98]'
                                    }`}
                            >
                                <Plus size={20} />
                                Add Room to Website
                            </button>
                        </div>

                        {customRooms.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-3">Custom Rooms Added ({customRooms.length})</h3>
                                <div className="space-y-2">
                                    {customRooms.map(room => (
                                        <div key={room.id} className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {room.images.length > 0 && (
                                                    <img src={room.images[0]} alt={room.name} className="w-12 h-12 rounded-lg object-cover border border-[#3D1C00]" />
                                                )}
                                                <div>
                                                    <span className="text-sm font-semibold text-white">{room.name}</span>
                                                    <span className="text-xs text-[#7A5230] ml-2">₹{room.price.toLocaleString()} · {room.type}</span>
                                                </div>
                                            </div>
                                            <button onClick={() => deleteCustomRoom(room.id)} className="w-8 h-8 bg-red-900/30 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-900/60 transition-colors">
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
                        <p className="text-sm text-[#7A5230] mb-6">Manage the scrolling offers banner on the website</p>

                        <div className="flex gap-3 mb-6">
                            <input type="text" placeholder="e.g. 🎉 Flat 20% off on Deluxe rooms this weekend!" value={newOfferText} onChange={e => setNewOfferText(e.target.value)} onKeyDown={e => e.key === 'Enter' && addOffer()}
                                className="flex-1 bg-[#1A1A1A] border border-[#3D1C00] rounded-xl px-4 py-3 text-white placeholder-[#5A5A5A] focus:outline-none focus:border-[#E8760A] transition-colors" />
                            <button onClick={addOffer} disabled={!newOfferText.trim()}
                                className={`px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${!newOfferText.trim()
                                    ? 'bg-[#2A2A2A] text-[#5A5A5A] cursor-not-allowed'
                                    : 'bg-gradient-to-r from-[#E8760A] to-[#F59820] text-white hover:shadow-lg active:scale-95'
                                    }`}>
                                <Plus size={16} /> Add
                            </button>
                        </div>

                        {offerSaved && (
                            <div className="bg-green-900/30 border border-green-600/30 rounded-xl p-3 mb-4 text-green-400 text-sm font-semibold animate-fadeUp">
                                ✅ Offer added! It will appear on the website banner.
                            </div>
                        )}

                        {offers.length === 0 ? (
                            <div className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] p-8 text-center">
                                <div className="text-4xl mb-3">📢</div>
                                <p className="text-[#7A5230] text-sm">No offers yet. Add one above to display the offers banner.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {offers.map(offer => (
                                    <div key={offer.id} className={`bg-[#1A1A1A] rounded-xl border p-4 flex items-center gap-3 transition-all ${offer.active ? 'border-[#E8760A]/30' : 'border-[#2A2A2A] opacity-50'}`}>
                                        <button onClick={() => toggleOffer(offer.id)} className="flex-shrink-0 transition-colors" title={offer.active ? 'Disable' : 'Enable'}>
                                            {offer.active ? <ToggleRight size={28} className="text-[#E8760A]" /> : <ToggleLeft size={28} className="text-[#5A5A5A]" />}
                                        </button>
                                        <p className="flex-1 text-sm text-white">{offer.text}</p>
                                        <button onClick={() => deleteOffer(offer.id)} className="w-8 h-8 bg-red-900/30 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-900/60 transition-colors flex-shrink-0">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {offers.some(o => o.active) && (
                            <div className="mt-6">
                                <h3 className="text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-2">Banner Preview</h3>
                                <div className="rounded-xl overflow-hidden border border-[#3D1C00]">
                                    <div className="bg-gradient-to-r from-[#1A0A00] via-[#3D1C00] to-[#1A0A00] text-white overflow-hidden">
                                        <div className="flex items-center h-9">
                                            <div className="flex-shrink-0 bg-[#E8760A] px-3 h-full flex items-center gap-1.5">
                                                <span className="text-xs">🔥</span>
                                                <span className="text-[10px] font-bold uppercase tracking-wider">Offers</span>
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <div className="whitespace-nowrap px-4" style={{ animation: `marquee 10s linear infinite` }}>
                                                    <span className="text-xs font-medium text-[#FFE5C0]">
                                                        {offers.filter(o => o.active).map(o => o.text).join('   ✦   ')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ── Tab: Settings ───────────────────────── */}
                {tab === 'settings' && (
                    <div className="animate-fadeUp max-w-2xl">
                        <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white mb-1">Settings</h2>
                        <p className="text-sm text-[#7A5230] mb-6">Manage global hotel settings</p>

                        {/* All Rooms Full Toggle */}
                        <div className={`bg-[#1A1A1A] rounded-2xl border p-6 transition-all mb-6 ${roomsFull ? 'border-red-500/30' : 'border-[#2A2A2A]'}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${roomsFull ? 'bg-red-900/40 text-red-400' : 'bg-[#3D1C00] text-[#F59820]'}`}>
                                        <AlertTriangle size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Manual Override: Rooms Full</h3>
                                        <p className="text-sm text-[#7A5230]">Instantly mark all rooms as full across the website.</p>
                                    </div>
                                </div>
                                <button onClick={toggleRoomsFull} className="flex-shrink-0">
                                    {roomsFull
                                        ? <ToggleRight size={36} className="text-red-400" />
                                        : <ToggleLeft size={36} className="text-[#5A5A5A]" />
                                    }
                                </button>
                            </div>
                            {roomsFull && (
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
                                    <input
                                        type="number"
                                        value={totalRooms}
                                        onChange={e => handleTotalRoomsChange(e.target.value)}
                                        className="w-full bg-[#0D0D0D] border border-[#3D1C00] rounded-xl px-4 py-3 text-white text-xl font-bold focus:outline-none focus:border-[#E8760A] transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-2">How many are FULL?</label>
                                    <input
                                        type="number"
                                        value={fullRooms}
                                        onChange={e => handleFullRoomsChange(e.target.value)}
                                        className="w-full bg-[#0D0D0D] border border-[#3D1C00] rounded-xl px-4 py-3 text-white text-xl font-bold focus:outline-none focus:border-[#E8760A] transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between bg-[#0D0D0D] p-4 rounded-xl border border-[#3D1C00]">
                                <span className="text-sm text-[#7A5230] font-semibold">Availability Status on Website:</span>
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full animate-pulse ${totalRooms - fullRooms <= 0 ? 'bg-red-500' : totalRooms - fullRooms <= 3 ? 'bg-yellow-500' : 'bg-green-500'}`} />
                                    <span className={`font-bold ${totalRooms - fullRooms <= 0 ? 'text-red-400' : totalRooms - fullRooms <= 3 ? 'text-yellow-400' : 'text-green-400'}`}>
                                        {totalRooms - fullRooms <= 0 ? 'SOLD OUT' : `${totalRooms - fullRooms} Rooms Available`}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-6 bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] p-6">
                            <h3 className="text-sm font-bold text-[#7A5230] uppercase tracking-wider mb-4">Quick Overview</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-[#7A5230]">Total Rooms</span>
                                    <span className="text-white font-bold">{ROOMS.length + customRooms.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-[#7A5230]">Custom Rooms</span>
                                    <span className="text-white font-bold">{customRooms.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-[#7A5230]">Active Offers</span>
                                    <span className="text-white font-bold">{offers.filter(o => o.active).length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-[#7A5230]">Total Bookings</span>
                                    <span className="text-white font-bold">{totalBookings}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-[#7A5230]">Pending Bookings</span>
                                    <span className="text-yellow-400 font-bold">{pendingBookings}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
