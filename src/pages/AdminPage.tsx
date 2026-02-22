import { useState, useEffect } from 'react';
import { ROOMS } from '../data/constants';
import {
    getPriceOverrides, savePriceOverrides,
    getCustomRooms, saveCustomRooms, getNextRoomId,
    getOffers, saveOffers,
    Offer, AdminRoom,
} from '../data/adminStore';
import { ArrowLeft, Save, Plus, Trash2, ToggleLeft, ToggleRight, Edit3, DollarSign, Megaphone, BedDouble } from 'lucide-react';

type Tab = 'prices' | 'addRoom' | 'offers';

interface AdminPageProps {
    onBack: () => void;
}

export const AdminPage = ({ onBack }: AdminPageProps) => {
    const [tab, setTab] = useState<Tab>('prices');

    // ─── Prices tab state ────────────────────────────────
    const [priceOverrides, setPriceOverrides] = useState<Record<number, number>>({});
    const [customRooms, setCustomRooms] = useState<AdminRoom[]>([]);
    const [priceSaved, setPriceSaved] = useState(false);

    // ─── Add Room tab state ──────────────────────────────
    const [newRoom, setNewRoom] = useState({
        name: '', type: 'Deluxe', price: '', features: '', desc: '', tag: '',
    });
    const [roomAdded, setRoomAdded] = useState(false);

    // ─── Offers tab state ────────────────────────────────
    const [offers, setOffers] = useState<Offer[]>([]);
    const [newOfferText, setNewOfferText] = useState('');
    const [offerSaved, setOfferSaved] = useState(false);

    useEffect(() => {
        setPriceOverrides(getPriceOverrides());
        setCustomRooms(getCustomRooms());
        setOffers(getOffers());
    }, []);

    // All rooms (defaults + custom) for price editing
    const allDefaultRooms = ROOMS;

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
            images: [],
            includes: ['Free WiFi', 'Daily Housekeeping', 'CCTV Security', '24hr Room Service'],
            isCustom: true,
        };

        const updated = [...customRooms, room];
        saveCustomRooms(updated);
        setCustomRooms(updated);
        setNewRoom({ name: '', type: 'Deluxe', price: '', features: '', desc: '', tag: '' });
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
        const newOffer: Offer = {
            id: Date.now(),
            text: newOfferText.trim(),
            active: true,
        };
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

    const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
        { id: 'prices', label: 'Room Prices', icon: <DollarSign size={18} /> },
        { id: 'addRoom', label: 'Add Room', icon: <BedDouble size={18} /> },
        { id: 'offers', label: 'Offers', icon: <Megaphone size={18} /> },
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
                    <div className="w-10 h-10 bg-gradient-to-br from-[#E8760A] to-[#F59820] rounded-xl flex items-center justify-center">
                        <Edit3 size={18} className="text-white" />
                    </div>
                </div>

                {/* Tab bar */}
                <div className="px-4 md:px-12 lg:px-20 flex gap-1 pb-0">
                    {tabs.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-semibold transition-all ${tab === t.id
                                ? 'bg-[#0D0D0D] text-[#F59820] border-t-2 border-x border-[#E8760A] border-x-[#3D1C00]'
                                : 'text-[#7A5230] hover:text-white hover:bg-[#1A1A1A]'
                                }`}
                        >
                            {t.icon}
                            <span className="hidden md:inline">{t.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="px-4 md:px-12 lg:px-20 py-6">

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

                        {/* Default rooms */}
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
                                        <input
                                            type="number"
                                            value={priceOverrides[room.id] ?? room.price}
                                            onChange={e => handlePriceChange(room.id, e.target.value)}
                                            className="flex-1 bg-[#0D0D0D] border border-[#3D1C00] rounded-lg px-3 py-2 text-white text-lg font-bold focus:outline-none focus:border-[#E8760A] transition-colors"
                                        />
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

                        {/* Custom rooms */}
                        {customRooms.length > 0 && (
                            <>
                                <h3 className="text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-3">Custom Rooms (Admin Added)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {customRooms.map(room => (
                                        <div key={room.id} className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] p-5 hover:border-[#E8760A]/30 transition-colors relative">
                                            <button
                                                onClick={() => deleteCustomRoom(room.id)}
                                                className="absolute top-3 right-3 w-8 h-8 bg-red-900/30 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-900/60 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                            <h4 className="font-semibold text-white text-sm mb-1">{room.name}</h4>
                                            <span className="text-[10px] text-[#7A5230] block mb-3">{room.type} · ID #{room.id} · Custom</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#7A5230] text-sm">₹</span>
                                                <input
                                                    type="number"
                                                    value={room.price}
                                                    onChange={e => handleCustomRoomPriceChange(room.id, e.target.value)}
                                                    className="flex-1 bg-[#0D0D0D] border border-[#3D1C00] rounded-lg px-3 py-2 text-white text-lg font-bold focus:outline-none focus:border-[#E8760A] transition-colors"
                                                />
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
                            {/* Name */}
                            <div>
                                <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1.5">Room Name *</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Premium Double AC Room"
                                    value={newRoom.name}
                                    onChange={e => setNewRoom(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full bg-[#1A1A1A] border border-[#3D1C00] rounded-xl px-4 py-3 text-white placeholder-[#5A5A5A] focus:outline-none focus:border-[#E8760A] transition-colors"
                                />
                            </div>

                            {/* Type + Tag */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1.5">Room Type *</label>
                                    <select
                                        value={newRoom.type}
                                        onChange={e => setNewRoom(prev => ({ ...prev, type: e.target.value }))}
                                        className="w-full bg-[#1A1A1A] border border-[#3D1C00] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E8760A] transition-colors"
                                    >
                                        <option value="Deluxe">Deluxe</option>
                                        <option value="Standard">Standard</option>
                                        <option value="Economy">Economy</option>
                                        <option value="Suite">Suite</option>
                                        <option value="Premium">Premium</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1.5">Tag (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Best Value, New"
                                        value={newRoom.tag}
                                        onChange={e => setNewRoom(prev => ({ ...prev, tag: e.target.value }))}
                                        className="w-full bg-[#1A1A1A] border border-[#3D1C00] rounded-xl px-4 py-3 text-white placeholder-[#5A5A5A] focus:outline-none focus:border-[#E8760A] transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1.5">Price per Night (₹) *</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 3500"
                                    value={newRoom.price}
                                    onChange={e => setNewRoom(prev => ({ ...prev, price: e.target.value }))}
                                    className="w-full bg-[#1A1A1A] border border-[#3D1C00] rounded-xl px-4 py-3 text-white placeholder-[#5A5A5A] focus:outline-none focus:border-[#E8760A] transition-colors text-lg font-bold"
                                />
                            </div>

                            {/* Features */}
                            <div>
                                <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1.5">Features (comma-separated)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Double Bed, Air Conditioning, WiFi TV, Free WiFi"
                                    value={newRoom.features}
                                    onChange={e => setNewRoom(prev => ({ ...prev, features: e.target.value }))}
                                    className="w-full bg-[#1A1A1A] border border-[#3D1C00] rounded-xl px-4 py-3 text-white placeholder-[#5A5A5A] focus:outline-none focus:border-[#E8760A] transition-colors"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-1.5">Description *</label>
                                <textarea
                                    rows={3}
                                    placeholder="Describe the room..."
                                    value={newRoom.desc}
                                    onChange={e => setNewRoom(prev => ({ ...prev, desc: e.target.value }))}
                                    className="w-full bg-[#1A1A1A] border border-[#3D1C00] rounded-xl px-4 py-3 text-white placeholder-[#5A5A5A] focus:outline-none focus:border-[#E8760A] transition-colors resize-none"
                                />
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

                        {/* Existing Custom Rooms List */}
                        {customRooms.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-xs font-bold text-[#7A5230] uppercase tracking-wider mb-3">Custom Rooms Added ({customRooms.length})</h3>
                                <div className="space-y-2">
                                    {customRooms.map(room => (
                                        <div key={room.id} className="bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] p-4 flex items-center justify-between">
                                            <div>
                                                <span className="text-sm font-semibold text-white">{room.name}</span>
                                                <span className="text-xs text-[#7A5230] ml-2">₹{room.price.toLocaleString()} · {room.type}</span>
                                            </div>
                                            <button
                                                onClick={() => deleteCustomRoom(room.id)}
                                                className="w-8 h-8 bg-red-900/30 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-900/60 transition-colors"
                                            >
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

                        {/* Add new offer */}
                        <div className="flex gap-3 mb-6">
                            <input
                                type="text"
                                placeholder="e.g. 🎉 Flat 20% off on Deluxe rooms this weekend!"
                                value={newOfferText}
                                onChange={e => setNewOfferText(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addOffer()}
                                className="flex-1 bg-[#1A1A1A] border border-[#3D1C00] rounded-xl px-4 py-3 text-white placeholder-[#5A5A5A] focus:outline-none focus:border-[#E8760A] transition-colors"
                            />
                            <button
                                onClick={addOffer}
                                disabled={!newOfferText.trim()}
                                className={`px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${!newOfferText.trim()
                                    ? 'bg-[#2A2A2A] text-[#5A5A5A] cursor-not-allowed'
                                    : 'bg-gradient-to-r from-[#E8760A] to-[#F59820] text-white hover:shadow-lg active:scale-95'
                                    }`}
                            >
                                <Plus size={16} />
                                Add
                            </button>
                        </div>

                        {offerSaved && (
                            <div className="bg-green-900/30 border border-green-600/30 rounded-xl p-3 mb-4 text-green-400 text-sm font-semibold animate-fadeUp">
                                ✅ Offer added! It will appear on the website banner.
                            </div>
                        )}

                        {/* Offers list */}
                        {offers.length === 0 ? (
                            <div className="bg-[#1A1A1A] rounded-2xl border border-[#2A2A2A] p-8 text-center">
                                <div className="text-4xl mb-3">📢</div>
                                <p className="text-[#7A5230] text-sm">No offers yet. Add one above to display the offers banner on your website.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {offers.map(offer => (
                                    <div key={offer.id} className={`bg-[#1A1A1A] rounded-xl border p-4 flex items-center gap-3 transition-all ${offer.active ? 'border-[#E8760A]/30' : 'border-[#2A2A2A] opacity-50'}`}>
                                        <button
                                            onClick={() => toggleOffer(offer.id)}
                                            className="flex-shrink-0 transition-colors"
                                            title={offer.active ? 'Click to disable' : 'Click to enable'}
                                        >
                                            {offer.active
                                                ? <ToggleRight size={28} className="text-[#E8760A]" />
                                                : <ToggleLeft size={28} className="text-[#5A5A5A]" />
                                            }
                                        </button>
                                        <p className="flex-1 text-sm text-white">{offer.text}</p>
                                        <button
                                            onClick={() => deleteOffer(offer.id)}
                                            className="w-8 h-8 bg-red-900/30 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-900/60 transition-colors flex-shrink-0"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Preview */}
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
            </div>
        </div>
    );
};
