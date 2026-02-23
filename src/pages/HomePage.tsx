import { useState, useEffect } from 'react';
import { Heart, Phone, X, AlertTriangle } from 'lucide-react';
import { AnimatedImage } from '../components/AnimatedImage';
import { ROOMS, AMENITIES, GALLERY_IMAGES, HOTEL_INFO, hotelLogo, highlightRooftop, HERO_IMAGES, POLICIES, DINING, BOOKING_PLATFORMS, NEARBY_ATTRACTIONS, HOW_TO_REACH, CANCELLATION_POLICY } from '../data/constants';
import { GoogleReviews } from '../components/GoogleReviews';
import { useAppState } from '../hooks/useAppState';
import { BookingFormModal } from '../components/BookingFormModal';
import { getRoomsFull, getTotalRooms, getFullRooms } from '../data/adminStore';
import { Room } from '../data/constants';

interface HomePageProps {
    state: ReturnType<typeof useAppState>;
}

export const HomePage = ({ state }: HomePageProps) => {
    const { setPage, wishlist, toggleWishlist, filter, setFilter, getFilteredRooms, setMenuOpen } = state;
    const [selectedImage, setSelectedImage] = useState<{ src: string, label: string } | null>(null);
    const [heroIdx, setHeroIdx] = useState(0);
    const [bookingRoom, setBookingRoom] = useState<Room | null>(null);
    const [roomsFull, setRoomsFull] = useState(false);
    const [availableCount, setAvailableCount] = useState<number | null>(null);

    useEffect(() => {
        const fullOverride = getRoomsFull();
        const total = getTotalRooms();
        const occupied = getFullRooms();
        const available = total - occupied;

        setRoomsFull(fullOverride || available <= 0);
        setAvailableCount(available);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setHeroIdx(prev => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="animate-fadeUp overflow-y-auto pb-20 md:pb-6">

            {/* All Rooms Full/Availability Banner */}
            {roomsFull ? (
                <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 border-b border-red-700">
                    <div className="px-4 md:px-12 lg:px-20 py-3 flex items-center justify-center gap-3">
                        <AlertTriangle size={18} className="text-red-300 flex-shrink-0" />
                        <p className="text-sm md:text-base font-bold text-white uppercase tracking-wider">Rooms Sold Out — Bookings Closed</p>
                        <AlertTriangle size={18} className="text-red-300 flex-shrink-0" />
                    </div>
                </div>
            ) : availableCount !== null && availableCount <= 3 ? (
                <div className="bg-gradient-to-r from-[#E8760A] via-[#F59820] to-[#E8760A] border-b border-[#3D1C00]/20">
                    <div className="px-4 md:px-12 lg:px-20 py-3 flex items-center justify-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full animate-bounce">
                            <AlertTriangle size={14} className="text-white" />
                        </div>
                        <p className="text-sm md:text-base font-bold text-[#1A0A00]">Hurry! Only {availableCount} Rooms Left Available — Book Now!</p>
                        <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full animate-bounce">
                            <AlertTriangle size={14} className="text-white" />
                        </div>
                    </div>
                </div>
            ) : null}

            {/* Hero */}
            <div className="relative min-h-[360px] md:min-h-[520px] lg:min-h-[600px] overflow-hidden bg-[#1A0A00]">
                {/* Image Slider */}
                <div className="absolute inset-0 transition-opacity duration-1000">
                    {HERO_IMAGES.map((img, i) => (
                        <div
                            key={i}
                            className={`absolute inset-0 transition-opacity duration-1000 ${i === heroIdx ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <img src={img} alt={`Hero ${i + 1}`} className="w-full h-full object-cover opacity-60" />
                        </div>
                    ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#FFFCF7]/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(232,118,10,0.2),transparent_60%)]" />

                <div className="relative z-10 px-5 pt-4 md:px-12 lg:px-20 md:pt-8">
                    <div className="flex justify-between items-start mb-4">
                        {/* Logo + Name */}
                        <div className="flex items-center gap-3 md:gap-4">
                            <img
                                src={hotelLogo}
                                alt="Hotel Amruta Bhojana Logo"
                                className="w-14 h-14 md:w-20 md:h-20 rounded-full object-contain bg-white border-2 border-[#D4A017]/60 shadow-lg p-1 animate-fadeIn"
                            />
                            <div>
                                <h1 className="text-white font-['Playfair_Display'] text-base md:text-xl lg:text-2xl font-semibold leading-tight">Hotel Amruta Bhojana</h1>
                                <p className="text-white/80 text-[10px] md:text-sm italic">Puri, Odisha</p>
                                <div className="flex gap-0.5 mt-1">
                                    {[...Array(5)].map((_, i) => <span key={i} className="text-[#D4A017] text-[9px] md:text-sm">★</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Call icon */}
                            <a
                                href={`tel:${HOTEL_INFO.phone}`}
                                className="w-9 h-9 md:w-11 md:h-11 border border-white/30 rounded-lg flex items-center justify-center bg-white/10 transition-transform active:scale-90 hover:bg-white/20"
                                aria-label="Call hotel"
                            >
                                <Phone size={16} className="text-white md:w-5 md:h-5" />
                            </a>
                            {/* Hamburger */}
                            <button
                                onClick={() => setMenuOpen(true)}
                                className="w-9 h-9 md:w-11 md:h-11 border border-white/30 rounded-lg flex flex-col justify-center items-center gap-1 transition-transform active:scale-90 hover:bg-white/20"
                                aria-label="Open menu"
                            >
                                <div className="w-4 h-0.5 md:w-5 md:h-[3px] bg-white rounded" />
                                <div className="w-4 h-0.5 md:w-5 md:h-[3px] bg-white rounded" />
                                <div className="w-4 h-0.5 md:w-5 md:h-[3px] bg-white rounded" />
                            </button>
                        </div>
                    </div>

                    <div className="inline-block bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 text-xs md:text-sm text-white mb-4">
                        Near Jagannath Temple · Puri
                    </div>
                    <h2 className="font-['Playfair_Display'] text-[34px] md:text-5xl lg:text-6xl leading-tight text-white mb-3">
                        Welcome to <em className="text-[#F59820] not-italic">Hotel Amruta Bhojana</em>
                    </h2>
                    <p className="text-white/70 text-sm md:text-base lg:text-lg mb-4 max-w-xs md:max-w-lg">
                        Experience spiritual comfort near the sacred Jagannath Temple with modern amenities and traditional hospitality
                    </p>
                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-2 text-xs md:text-sm text-white mb-5">
                        <span className="text-[#D4A017]">★★★★★</span>
                        <span>·</span>
                        <span className="font-semibold">{HOTEL_INFO.rating}</span>
                        <span>·</span>
                        <span className="opacity-80">{HOTEL_INFO.reviewCount} Reviews on Google</span>
                    </div>

                    {/* Slider indicators */}
                    <div className="flex gap-1.5 mt-2">
                        {HERO_IMAGES.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 md:h-1.5 rounded-full transition-all duration-300 ${i === heroIdx ? 'bg-[#F59820] w-6 md:w-8' : 'bg-white/30 w-1.5 md:w-2'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Booking card */}
            <div className="px-4 md:px-12 lg:px-20 mt-4 mb-6">
                <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 md:max-w-xl">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div><label className="text-xs md:text-sm text-[#7A5230] mb-1 block">Check-in</label><div className="text-sm md:text-base font-semibold text-[#1A0A00]">20 Feb 2025</div></div>
                        <div><label className="text-xs md:text-sm text-[#7A5230] mb-1 block">Check-out</label><div className="text-sm md:text-base font-semibold text-[#1A0A00]">21 Feb 2025</div></div>
                    </div>
                    <div className="border-t border-[#FFE5C0] pt-3 mb-3">
                        <label className="text-xs md:text-sm text-[#7A5230] mb-1 block">Guests</label>
                        <div className="text-sm md:text-base font-semibold text-[#1A0A00]">2 Adults · 1 Room</div>
                    </div>
                    <button
                        onClick={() => setPage('rooms')}
                        className="w-full py-3 md:py-3.5 rounded-xl font-semibold text-white text-sm md:text-base transition-transform active:scale-95 hover:opacity-90"
                        style={{ background: 'linear-gradient(135deg, #E8760A, #F59820)' }}
                    >
                        🔍 Check Availability
                    </button>
                </div>
            </div>

            {/* Our Rooms */}
            <div className="px-4 md:px-12 lg:px-20 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-semibold text-[#1A0A00]">Our Rooms</h3>
                    <button onClick={() => setPage('rooms')} className="text-[#E8760A] text-sm md:text-base font-medium hover:underline">View All →</button>
                </div>
                <div className="flex gap-2 mb-4 overflow-x-auto">
                    {['All Rooms', 'AC Room', 'Non-AC', 'Suite'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f === 'AC Room' ? 'AC' : f)}
                            className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all active:scale-95 hover:shadow-md ${filter === (f === 'AC Room' ? 'AC' : f) ? 'bg-[#1A0A00] text-[#F59820]' : 'bg-white border border-[#FFE5C0] text-[#7A5230]'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 lg:grid-cols-3 md:overflow-visible">
                    {getFilteredRooms().slice(0, 3).map(room => (
                        <div
                            key={room.id}
                            onClick={() => setPage('detail', room)}
                            className="min-w-[210px] md:min-w-0 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform active:scale-95 hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="relative h-[135px] md:h-[200px] lg:h-[240px] overflow-hidden">
                                <AnimatedImage src={room.images[0]} alt={`${room.name} - Room 1`} className="w-full h-full" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                                <span className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] md:text-xs px-2 py-1 rounded-full pointer-events-none">{room.type}</span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleWishlist(room.id); }}
                                    className="absolute top-2 right-2 w-7 h-7 md:w-9 md:h-9 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center transition-transform active:scale-90 hover:bg-white/30"
                                >
                                    <Heart size={14} fill={wishlist.includes(room.id) ? '#E8760A' : 'none'} stroke={wishlist.includes(room.id) ? '#E8760A' : 'white'} />
                                </button>
                            </div>
                            <div className="p-3 md:p-4">
                                <h4 className="font-['Playfair_Display'] text-sm md:text-base font-semibold text-[#1A0A00] mb-1">{room.name}</h4>
                                <p className="text-xs md:text-sm text-[#7A5230] mb-2">Near Jagannath Temple</p>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="font-['Playfair_Display'] text-lg md:text-xl font-bold text-[#3D1C00]">₹{room.price}</span>
                                        <span className="text-[10px] md:text-xs text-[#7A5230]">/night</span>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setBookingRoom(room); }}
                                        className="bg-[#E8760A] text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg hover:shadow-md active:scale-95 transition-all"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <BookingFormModal
                room={bookingRoom}
                isOpen={!!bookingRoom}
                onClose={() => setBookingRoom(null)}
            />

            {/* Photo Gallery */}
            <div className="px-4 md:px-12 lg:px-20 mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <div className="h-1 w-8 rounded-full bg-[#E8760A]" />
                    <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-semibold text-[#1A0A00]">Photo Gallery</h3>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                    {GALLERY_IMAGES.map((img, i) => (
                        <div
                            key={i}
                            className="animate-fadeUp"
                            style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both' }}
                        >
                            <AnimatedImage
                                src={img.src}
                                alt={img.label}
                                className="aspect-square rounded-xl md:rounded-2xl"
                                onClick={() => setSelectedImage(img)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Full-screen Lightbox */}
            {
                selectedImage && (
                    <div
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-fadeIn"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white transition-transform active:scale-90 hover:bg-white/20"
                            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                        >
                            <X size={24} />
                        </button>

                        <div
                            className="relative max-w-full md:max-w-3xl max-h-[80vh] overflow-hidden rounded-2xl shadow-2xl animate-fadeUp"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.label}
                                className="w-full h-full object-contain animate-fadeIn"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                <h4 className="text-white font-['Playfair_Display'] text-xl font-semibold mb-1">{selectedImage.label}</h4>
                                <p className="text-white/70 text-sm">Hotel Amruta Bhojana, Puri</p>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Rooftop Garden Highlight */}
            <div className="px-4 md:px-12 lg:px-20 mb-6">
                <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ height: undefined }}>
                    <div className="h-[200px] md:h-[350px] lg:h-[420px]">
                        <AnimatedImage
                            src={highlightRooftop}
                            alt="Rooftop Garden & Restaurant"
                            className="w-full h-full"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 pointer-events-none">
                        <div className="inline-block bg-[#D4A017]/80 text-white text-[10px] md:text-xs px-2.5 py-0.5 rounded-full font-semibold mb-2">✦ Exclusive Feature</div>
                        <h4 className="font-['Playfair_Display'] text-lg md:text-2xl lg:text-3xl font-semibold text-white leading-tight">Rooftop Garden Restaurant</h4>
                        <p className="text-white/80 text-xs md:text-sm mt-1">Dine among lush green walls with LED accents</p>
                    </div>
                </div>
            </div>

            {/* Special offer banner */}
            <div className="mx-4 md:mx-12 lg:mx-20 mb-6 p-5 md:p-8 rounded-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0A00, #3D1C00)' }}>
                <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 border-2 border-white/10 rounded-full -mr-10 -mt-10" />
                <div className="relative">
                    <div className="inline-block bg-[#D4A017]/20 border border-[#D4A017]/30 text-[#D4A017] text-xs md:text-sm px-3 py-1 rounded-full mb-3">✦ Special Offer · Agoda</div>
                    <h3 className="font-['Playfair_Display'] text-xl md:text-3xl text-white mb-3 leading-tight">Book Your Stay Today</h3>
                    <div className="flex items-center gap-3 md:gap-5">
                        <button
                            onClick={() => setPage('detail', ROOMS[0])}
                            className="bg-white text-[#1A0A00] px-5 py-2.5 md:px-7 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-transform active:scale-95 hover:shadow-lg"
                        >
                            Book Now
                        </button>
                        <span className="text-[#F59820] font-semibold text-sm md:text-lg">₹3,660 per night</span>
                    </div>
                </div>
            </div>

            {/* ✨ Our Facilities – highlighted */}
            <div className="px-4 md:px-12 lg:px-20 mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <div className="h-1 w-8 rounded-full bg-[#E8760A]" />
                    <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-[#1A0A00]">Our Facilities</h3>
                    <div className="h-1 flex-1 rounded-full bg-[#FFE5C0]" />
                </div>
                <p className="text-xs md:text-sm text-[#7A5230] mb-4 ml-10">Everything you need for a perfect stay</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {AMENITIES.map((a, i) => (
                        <div
                            key={i}
                            className="rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-[#FFE5C0] transition-all active:scale-95 hover:shadow-md hover:-translate-y-0.5"
                            style={{ background: a.bg }}
                        >
                            <div
                                className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl shadow-sm text-2xl flex-shrink-0"
                                style={{ background: `${a.color}22`, border: `1.5px solid ${a.color}44` }}
                            >
                                {a.icon}
                            </div>
                            <div>
                                <div className="text-sm md:text-base font-bold" style={{ color: a.color }}>{a.name}</div>
                                <div className="text-[10px] md:text-xs text-[#7A5230] leading-snug">{a.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact quick links */}
            <div className="mx-4 md:mx-12 lg:mx-20 mb-6 bg-white rounded-2xl shadow-md overflow-hidden divide-y divide-[#FFE5C0] md:grid md:grid-cols-2 md:divide-y-0">
                <a href={`tel:${HOTEL_INFO.phone}`} className="flex items-center gap-3 p-4 transition-colors active:bg-[#FFF2E0] hover:bg-[#FFF2E0] md:border-r md:border-[#FFE5C0]">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFF2E0] rounded-full flex items-center justify-center">
                        <Phone size={18} className="text-[#E8760A]" />
                    </div>
                    <div className="flex-1">
                        <div className="text-sm md:text-base font-semibold text-[#1A0A00]">Call Us</div>
                        <div className="text-xs md:text-sm text-[#7A5230]">+91 94373 88224</div>
                    </div>
                </a>
                {/* WhatsApp */}
                <a
                    href={`https://wa.me/${HOTEL_INFO.whatsapp}?text=Hi%2C%20I%20would%20like%20to%20book%20a%20room`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors active:bg-[#F0FFF4] hover:bg-[#F0FFF4]"
                >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center" style={{ background: '#E8F5EB' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm md:text-base font-semibold text-[#1A0A00]">WhatsApp</div>
                        <div className="text-xs md:text-sm text-[#7A5230]">Chat with us instantly</div>
                    </div>
                </a>
            </div>

            {/* 🍽️ Dining & Restaurant */}
            <div className="px-4 md:px-12 lg:px-20 mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <div className="h-1 w-8 rounded-full bg-[#E8760A]" />
                    <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-[#1A0A00]">Dining & Restaurant</h3>
                    <div className="h-1 flex-1 rounded-full bg-[#FFE5C0]" />
                </div>
                <p className="text-xs md:text-sm text-[#7A5230] mb-4 ml-10">{DINING.cuisine}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    {DINING.timings.map((t, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-[#FFE5C0] p-4 md:p-5 flex items-center gap-3 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#FFF2E0] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{t.icon}</div>
                            <div>
                                <div className="text-sm md:text-base font-bold text-[#1A0A00]">{t.meal}</div>
                                <div className="text-xs md:text-sm text-[#7A5230]">{t.time}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-[#FFE5C0] p-4 md:p-5 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">💰</span>
                        <div>
                            <div className="text-xs text-[#7A5230]">Average Meal Cost</div>
                            <div className="text-lg md:text-xl font-bold text-[#3D1C00]">{DINING.avgCost}</div>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-[#FFE5C0] hidden md:block" />
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🛵</span>
                        <div>
                            <div className="text-xs text-[#7A5230]">Order Online</div>
                            <div className="flex gap-2 mt-0.5">
                                {DINING.delivery.map((d, i) => (
                                    <span key={i} className="text-xs md:text-sm font-semibold px-2.5 py-0.5 rounded-full" style={{ background: `${d.color}15`, color: d.color }}>{d.name}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 📋 Hotel Policies */}
            <div className="px-4 md:px-12 lg:px-20 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-1 w-8 rounded-full bg-[#E8760A]" />
                    <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-[#1A0A00]">Hotel Policies</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {POLICIES.map((p, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-[#FFE5C0] p-4 text-center hover:shadow-md transition-shadow">
                            <div className="text-2xl mb-2">{p.icon}</div>
                            <div className="text-sm md:text-base font-bold text-[#1A0A00] mb-1">{p.title}</div>
                            <div className="text-[10px] md:text-xs text-[#7A5230]">{p.detail}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 📜 Cancellation Policy */}
            <div className="px-4 md:px-12 lg:px-20 mb-6">
                <div className="bg-gradient-to-br from-[#FFF8F0] to-[#FFF2E0] rounded-2xl shadow-md border border-[#FFE5C0] p-5 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#E8760A] rounded-xl flex items-center justify-center text-white text-xl">📜</div>
                        <div>
                            <h3 className="font-['Playfair_Display'] text-lg md:text-2xl font-bold text-[#1A0A00]">Cancellation Policy</h3>
                            <p className="text-[10px] md:text-xs text-[#7A5230]">Please read carefully before booking</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {CANCELLATION_POLICY.map((rule, i) => (
                            <div key={i} className="flex gap-3 items-start">
                                <div className="w-7 h-7 md:w-8 md:h-8 bg-[#E8760A] rounded-lg flex items-center justify-center text-white text-xs md:text-sm font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                                <p className="text-sm md:text-base text-[#3D1C00] leading-relaxed">{rule}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 🏨 Book on Multiple Platforms */}
            <div className="mx-4 md:mx-12 lg:mx-20 mb-6 p-5 md:p-8 rounded-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0A00, #3D1C00)' }}>
                <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 border-2 border-white/10 rounded-full -mr-10 -mt-10" />
                <div className="relative">
                    <div className="inline-block bg-[#D4A017]/20 border border-[#D4A017]/30 text-[#D4A017] text-xs md:text-sm px-3 py-1 rounded-full mb-3">✦ Book Your Stay</div>
                    <h3 className="font-['Playfair_Display'] text-xl md:text-3xl text-white mb-2 leading-tight">Available on All Platforms</h3>
                    <p className="text-white/60 text-xs md:text-sm mb-4">Book with confidence through your preferred partner</p>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                        {BOOKING_PLATFORMS.map((bp, i) => (
                            <a
                                key={i}
                                href={bp.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-xl text-sm md:text-base font-semibold transition-transform active:scale-95 hover:shadow-lg ${bp.highlight
                                    ? 'bg-gradient-to-br from-[#E8760A] to-[#F59820] text-white'
                                    : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                                    }`}
                            >
                                <span>{bp.icon}</span>
                                <span>{bp.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* 📍 Nearby Attractions */}
            <div className="px-4 md:px-12 lg:px-20 mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <div className="h-1 w-8 rounded-full bg-[#E8760A]" />
                    <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-[#1A0A00]">Nearby Attractions</h3>
                    <div className="h-1 flex-1 rounded-full bg-[#FFE5C0]" />
                </div>
                <p className="text-xs md:text-sm text-[#7A5230] mb-4 ml-10">Explore Puri and beyond</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {NEARBY_ATTRACTIONS.map((a, i) => (
                        <a
                            key={i}
                            href={a.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`rounded-2xl p-4 md:p-5 text-center shadow-sm border transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-95 group ${a.highlight
                                ? 'bg-gradient-to-br from-[#FFF2E0] to-[#FFFCF7] border-[#E8760A]/30'
                                : 'bg-white border-[#FFE5C0] hover:border-[#E8760A]/30'
                                }`}
                        >
                            <div className="text-2xl md:text-3xl mb-2 flex flex-col items-center">
                                <span>{a.icon}</span>
                                <span className="text-[8px] md:text-[10px] uppercase font-bold text-[#E8760A] opacity-0 group-hover:opacity-100 transition-opacity mt-1">Open Map</span>
                            </div>
                            <div className="text-xs md:text-sm font-bold text-[#1A0A00] mb-1 leading-snug">{a.name}</div>
                            <div className="inline-block bg-[#FFF2E0] text-[#E8760A] text-[10px] md:text-xs px-2 py-0.5 rounded-full font-semibold">{a.distance}</div>
                        </a>
                    ))}
                </div>
            </div>

            {/* 🚗 How to Reach */}
            <div className="px-4 md:px-12 lg:px-20 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-1 w-8 rounded-full bg-[#E8760A]" />
                    <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-[#1A0A00]">How to Reach</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {HOW_TO_REACH.map((h, i) => (
                        <a
                            key={i}
                            href={h.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white rounded-xl shadow-sm border border-[#FFE5C0] p-4 flex items-center gap-3 hover:shadow-md transition-all active:scale-95 group"
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFF2E0] rounded-lg flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-[#E8760A]/10 transition-colors">{h.icon}</div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm md:text-base font-semibold text-[#1A0A00] truncate group-hover:text-[#E8760A] transition-colors">{h.name}</div>
                                <div className="text-xs md:text-sm text-[#E8760A] font-medium">{h.distance}</div>
                            </div>
                            <div className="text-[#E8760A] opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Google Reviews */}
            <GoogleReviews />
        </div >
    );
};
