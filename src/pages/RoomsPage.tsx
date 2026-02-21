import { Heart } from 'lucide-react';
import { StatusBar } from '../components/StatusBar';
import { AnimatedImage } from '../components/AnimatedImage';
import { useAppState } from '../hooks/useAppState';
import { hotelLogo } from '../data/constants';

interface RoomsPageProps {
    state: ReturnType<typeof useAppState>;
}

export const RoomsPage = ({ state }: RoomsPageProps) => {
    const { setPage, wishlist, toggleWishlist, filter, setFilter, getFilteredRooms, getRoomImgIndex, setRoomImgIndex } = state;
    const filtered = getFilteredRooms();

    return (
        <div className="animate-fadeUp overflow-y-auto pb-20">
            <StatusBar />

            <div className="relative min-h-[180px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0A00, #3D1C00)' }}>
                <div className="relative z-10 px-5 py-5 flex items-center gap-4">
                    <img
                        src={hotelLogo}
                        alt="Hotel Amruta Bhojana"
                        className="w-14 h-14 rounded-full object-contain bg-white border-2 border-[#D4A017]/60 shadow-lg flex-shrink-0 p-1 animate-fadeIn"
                    />
                    <div>
                        <h1 className="font-['Playfair_Display'] text-xl font-semibold text-white mb-1">Rooms &amp; Tariff</h1>
                        <p className="text-white/70 text-xs">Comfortable stays near Jagannath Temple</p>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#FFFCF7] rounded-t-3xl" />
            </div>

            <div className="px-4 -mt-4 mb-5">
                {/* Scrollable pill filter — each pill is flex-shrink-0 to prevent squishing */}
                <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                    {[
                        { label: 'All Rooms', value: 'All Rooms' },
                        { label: '❄️ AC Rooms', value: 'AC' },
                        { label: '🌬 Non-AC', value: 'Non-AC' },
                        { label: '👑 Deluxe', value: 'Deluxe' },
                        { label: '💰 Budget', value: 'Budget' },
                        { label: '🏡 Suite', value: 'Suite' },
                    ].map(({ label, value }) => (
                        <button
                            key={value}
                            onClick={() => setFilter(value)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${filter === value
                                ? 'bg-[#1A0A00] text-[#F59820] shadow-md'
                                : 'bg-white border border-[#FFE5C0] text-[#7A5230]'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-4 space-y-4">
                {filtered.map(room => {
                    const imgIdx = getRoomImgIndex(room.id);
                    return (
                        <div key={room.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                            {/* Image carousel */}
                            <div className="relative h-[200px] overflow-hidden">
                                <AnimatedImage
                                    src={room.images[imgIdx]}
                                    alt={`${room.name} - Photo ${imgIdx + 1}`}
                                    className="w-full h-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                                {/* Dot indicators */}
                                <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
                                    {room.images.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setRoomImgIndex(room.id, i)}
                                            className={`h-1.5 rounded-full transition-all pointer-events-auto ${i === imgIdx ? 'bg-white w-4' : 'bg-white/50 w-1.5'}`}
                                        />
                                    ))}
                                </div>

                                {/* Prev / Next */}
                                {room.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setRoomImgIndex(room.id, (imgIdx - 1 + room.images.length) % room.images.length)}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/30 rounded-full flex items-center justify-center text-white text-sm transition-transform active:scale-90"
                                        >‹</button>
                                        <button
                                            onClick={() => setRoomImgIndex(room.id, (imgIdx + 1) % room.images.length)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/30 rounded-full flex items-center justify-center text-white text-sm transition-transform active:scale-90"
                                        >›</button>
                                    </>
                                )}

                                <div className="absolute top-3 left-3 flex gap-2 pointer-events-none">
                                    <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] px-2.5 py-1 rounded-full">{room.type}</span>
                                    {room.tag && (
                                        <span className="bg-[#D4A017]/80 backdrop-blur-sm border border-[#D4A017] text-white text-[10px] px-2.5 py-1 rounded-full font-medium">✦ {room.tag}</span>
                                    )}
                                </div>

                                <button
                                    onClick={() => toggleWishlist(room.id)}
                                    className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center transition-transform active:scale-90"
                                >
                                    <Heart size={16} fill={wishlist.includes(room.id) ? '#E8760A' : 'none'} stroke={wishlist.includes(room.id) ? '#E8760A' : 'white'} />
                                </button>

                                <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                                    <h3 className="font-['Playfair_Display'] text-lg font-semibold text-white mb-1">{room.name}</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[#D4A017]">★</span>
                                        <span className="text-white text-xs font-semibold">{room.rating}</span>
                                        <span className="text-white/70 text-xs">({room.reviews} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {room.features.slice(0, 4).map((f, i) => (
                                        <span key={i} className="bg-[#FFF2E0] text-[#7A5230] text-[10px] px-2.5 py-1 rounded-full font-medium">{f}</span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="font-['Playfair_Display'] text-2xl font-bold text-[#3D1C00]">₹{room.price}</span>
                                        <span className="text-xs text-[#7A5230] ml-1">per night</span>
                                    </div>
                                    <button
                                        onClick={() => setPage('detail', room)}
                                        className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-transform active:scale-95"
                                        style={{ background: 'linear-gradient(135deg, #E8760A, #F59820)' }}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
