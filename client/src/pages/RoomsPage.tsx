import { Heart } from 'lucide-react';
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
        <div className="animate-fadeUp overflow-y-auto pb-20 md:pb-6">

            <div className="relative min-h-[180px] md:min-h-[240px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0A00, #3D1C00)' }}>
                <div className="relative z-10 px-5 py-5 md:px-12 lg:px-20 md:py-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src={hotelLogo}
                            alt="Hotel Amruta Bhojana Logo"
                            onClick={() => {
                                setPage('home');
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-contain bg-white border-2 border-[#D4A017]/60 shadow-lg p-1 cursor-pointer transition-transform active:scale-95"
                        />
                        <div>
                            <h1 className="font-['Playfair_Display'] text-xl md:text-3xl font-semibold text-white mb-1">Rooms &amp; Tariff</h1>
                            <p className="text-white/70 text-xs md:text-sm">Comfortable stays near Jagannath Temple</p>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {[
                            { id: 'home', label: 'Home' },
                            { id: 'rooms', label: 'Rooms' },
                            { id: 'about', label: 'About Us' },
                            { id: 'contact', label: 'Contact' }
                        ].map(link => (
                            <button
                                key={link.id}
                                onClick={() => setPage(link.id as any)}
                                className={`text-sm font-semibold transition-colors uppercase tracking-wider relative group ${link.id === 'rooms' ? 'text-[#F59820]' : 'text-white/80 hover:text-[#F59820]'}`}
                            >
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#F59820] transition-all ${link.id === 'rooms' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#FFFCF7] rounded-t-3xl" />
            </div>

            <div className="px-4 md:px-12 lg:px-20 mt-4 mb-5">
                {/* Scrollable pill filter */}
                <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                    {[
                        { label: 'All Rooms', value: 'All Rooms' },
                        { label: 'Deluxe AC With BreakFast', value: 'Deluxe AC With BreakFast' },
                        { label: 'Deluxe AC', value: 'Deluxe AC' },
                        { label: 'AC Room with BreakFast', value: 'AC Room with BreakFast' },
                        { label: 'AC Room', value: 'AC Room' },
                        { label: 'Non-AC with BreakFast', value: 'Non-AC with BreakFast' },
                        { label: 'Non-AC', value: 'Non-AC' },
                    ].map(({ label, value }) => (
                        <button
                            key={value}
                            onClick={() => setFilter(value)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all active:scale-95 hover:shadow-md ${filter === value
                                ? 'bg-[#1A0A00] text-[#F59820] shadow-md'
                                : 'bg-white border border-[#FFE5C0] text-[#7A5230]'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-4 md:px-12 lg:px-20 space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
                {filtered.map(room => {
                    const imgIdx = getRoomImgIndex(room.id);
                    return (
                        <div key={room.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                            {/* Image carousel */}
                            <div className="relative h-[200px] md:h-[260px] overflow-hidden">
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
                                            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 md:w-9 md:h-9 bg-black/30 rounded-full flex items-center justify-center text-white text-sm transition-transform active:scale-90 hover:bg-black/50"
                                        >‹</button>
                                        <button
                                            onClick={() => setRoomImgIndex(room.id, (imgIdx + 1) % room.images.length)}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 md:w-9 md:h-9 bg-black/30 rounded-full flex items-center justify-center text-white text-sm transition-transform active:scale-90 hover:bg-black/50"
                                        >›</button>
                                    </>
                                )}

                                <div className="absolute top-3 left-3 flex gap-2 pointer-events-none">
                                    <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] md:text-xs px-2.5 py-1 rounded-full">{room.type}</span>
                                </div>

                                <button
                                    onClick={() => toggleWishlist(room.id)}
                                    className="absolute top-3 right-3 w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center transition-transform active:scale-90 hover:bg-white/30"
                                >
                                    <Heart size={16} fill={wishlist.includes(room.id) ? '#E8760A' : 'none'} stroke={wishlist.includes(room.id) ? '#E8760A' : 'white'} />
                                </button>

                                <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                                    <h3 className="font-['Playfair_Display'] text-lg md:text-xl font-semibold text-white mb-1">{room.name}</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[#D4A017]">★</span>
                                        <span className="text-white text-xs md:text-sm font-semibold">{room.rating}</span>
                                        <span className="text-white/70 text-xs md:text-sm">({room.reviews} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 md:p-5">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {room.features.slice(0, 4).map((f, i) => (
                                        <span key={i} className="bg-[#FFF2E0] text-[#7A5230] text-[10px] md:text-xs px-2.5 py-1 rounded-full font-medium">{f}</span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="font-['Playfair_Display'] text-2xl font-bold text-[#3D1C00]">₹{room.price}</span>
                                        <span className="text-xs md:text-sm text-[#7A5230] ml-1">per night</span>
                                    </div>
                                    <button
                                        onClick={() => setPage('detail', room)}
                                        className="px-5 py-2.5 md:px-6 md:py-3 rounded-lg font-semibold text-sm md:text-base text-white transition-transform active:scale-95 hover:shadow-lg"
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
