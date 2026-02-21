import { useState } from 'react';
import { Heart, Phone, X } from 'lucide-react';
import { StatusBar } from '../components/StatusBar';
import { AnimatedImage } from '../components/AnimatedImage';
import { ROOMS, AMENITIES, GALLERY_IMAGES, HOTEL_INFO, hotelLogo, highlightRooftop } from '../data/constants';
import { GoogleReviews } from '../components/GoogleReviews';
import { useAppState } from '../hooks/useAppState';

interface HomePageProps {
    state: ReturnType<typeof useAppState>;
}

export const HomePage = ({ state }: HomePageProps) => {
    const { setPage, wishlist, toggleWishlist, filter, setFilter, getFilteredRooms, setMenuOpen } = state;
    const [selectedImage, setSelectedImage] = useState<{ src: string, label: string } | null>(null);

    return (
        <div className="animate-fadeUp overflow-y-auto pb-20">
            <StatusBar />

            {/* Hero */}
            <div className="relative min-h-[320px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0A00 0%, #3D1C00 50%, #F59820 100%)' }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(232,118,10,0.3),transparent_60%)]" />
                <div className="absolute top-10 right-10 w-32 h-32 rounded-full border-2 border-white/10" />
                <div className="absolute top-14 right-14 w-24 h-24 rounded-full border-2 border-white/15" />
                <div className="absolute top-16 right-16 w-20 h-20 rounded-full border-2 border-white/20" />

                <div className="relative z-10 px-5 pt-4">
                    <div className="flex justify-between items-start mb-4">
                        {/* Logo + Name */}
                        <div className="flex items-center gap-3">
                            <img
                                src={hotelLogo}
                                alt="Hotel Amruta Bhojana Logo"
                                className="w-14 h-14 rounded-full object-contain bg-white border-2 border-[#D4A017]/60 shadow-lg p-1 animate-fadeIn"
                            />
                            <div>
                                <h1 className="text-white font-['Playfair_Display'] text-base font-semibold leading-tight">Hotel Amruta Bhojana</h1>
                                <p className="text-white/80 text-[10px] italic">Puri, Odisha</p>
                                <div className="flex gap-0.5 mt-1">
                                    {[...Array(5)].map((_, i) => <span key={i} className="text-[#D4A017] text-[9px]">★</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Call icon always visible */}
                            <a
                                href={`tel:${HOTEL_INFO.phone}`}
                                className="w-9 h-9 border border-white/30 rounded-lg flex items-center justify-center bg-white/10 transition-transform active:scale-90"
                                aria-label="Call hotel"
                            >
                                <Phone size={16} className="text-white" />
                            </a>
                            {/* Hamburger */}
                            <button
                                onClick={() => setMenuOpen(true)}
                                className="w-9 h-9 border border-white/30 rounded-lg flex flex-col justify-center items-center gap-1 transition-transform active:scale-90"
                                aria-label="Open menu"
                            >
                                <div className="w-4 h-0.5 bg-white rounded" />
                                <div className="w-4 h-0.5 bg-white rounded" />
                                <div className="w-4 h-0.5 bg-white rounded" />
                            </button>
                        </div>
                    </div>

                    <div className="inline-block bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 text-xs text-white mb-4">
                        Near Jagannath Temple · Puri
                    </div>
                    <h2 className="font-['Playfair_Display'] text-[34px] leading-tight text-white mb-3">
                        Divine Stay in <em className="text-[#F59820] not-italic">Holy</em> Puri
                    </h2>
                    <p className="text-white/70 text-sm mb-4 max-w-xs">
                        Experience spiritual comfort near the sacred Jagannath Temple with modern amenities and traditional hospitality
                    </p>
                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-2 text-xs text-white mb-5">
                        <span className="text-[#D4A017]">★★★★★</span>
                        <span>·</span>
                        <span className="font-semibold">{HOTEL_INFO.rating}</span>
                        <span>·</span>
                        <span className="opacity-80">{HOTEL_INFO.reviewCount} Reviews on Google</span>
                    </div>
                </div>
            </div>

            {/* Booking card */}
            <div className="px-4 -mt-7 mb-6">
                <div className="bg-white rounded-2xl shadow-lg p-4">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div><label className="text-xs text-[#7A5230] mb-1 block">Check-in</label><div className="text-sm font-semibold text-[#1A0A00]">20 Feb 2025</div></div>
                        <div><label className="text-xs text-[#7A5230] mb-1 block">Check-out</label><div className="text-sm font-semibold text-[#1A0A00]">21 Feb 2025</div></div>
                    </div>
                    <div className="border-t border-[#FFE5C0] pt-3 mb-3">
                        <label className="text-xs text-[#7A5230] mb-1 block">Guests</label>
                        <div className="text-sm font-semibold text-[#1A0A00]">2 Adults · 1 Room</div>
                    </div>
                    <button
                        onClick={() => setPage('rooms')}
                        className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-transform active:scale-95"
                        style={{ background: 'linear-gradient(135deg, #E8760A, #F59820)' }}
                    >
                        🔍 Check Availability
                    </button>
                </div>
            </div>

            {/* Our Rooms */}
            <div className="px-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1A0A00]">Our Rooms</h3>
                    <button onClick={() => setPage('rooms')} className="text-[#E8760A] text-sm font-medium">View All →</button>
                </div>
                <div className="flex gap-2 mb-4 overflow-x-auto">
                    {['All Rooms', 'AC Room', 'Non-AC', 'Suite'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f === 'AC Room' ? 'AC' : f)}
                            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 ${filter === (f === 'AC Room' ? 'AC' : f) ? 'bg-[#1A0A00] text-[#F59820]' : 'bg-white border border-[#FFE5C0] text-[#7A5230]'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {getFilteredRooms().slice(0, 3).map(room => (
                        <div
                            key={room.id}
                            onClick={() => setPage('detail', room)}
                            className="min-w-[210px] bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform active:scale-95"
                        >
                            <div className="relative h-[135px] overflow-hidden">
                                <AnimatedImage src={room.images[0]} alt={`${room.name} - Room 1`} className="w-full h-full" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                                <span className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] px-2 py-1 rounded-full pointer-events-none">{room.type}</span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleWishlist(room.id); }}
                                    className="absolute top-2 right-2 w-7 h-7 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center transition-transform active:scale-90"
                                >
                                    <Heart size={14} fill={wishlist.includes(room.id) ? '#E8760A' : 'none'} stroke={wishlist.includes(room.id) ? '#E8760A' : 'white'} />
                                </button>
                            </div>
                            <div className="p-3">
                                <h4 className="font-['Playfair_Display'] text-sm font-semibold text-[#1A0A00] mb-1">{room.name}</h4>
                                <p className="text-xs text-[#7A5230] mb-2">Near Jagannath Temple</p>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="font-['Playfair_Display'] text-lg font-bold text-[#3D1C00]">₹{room.price}</span>
                                        <span className="text-[10px] text-[#7A5230]">/night</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-[#D4A017] text-xs">★</span>
                                        <span className="text-xs font-semibold text-[#1A0A00]">{room.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Photo Gallery */}
            <div className="px-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <div className="h-1 w-8 rounded-full bg-[#E8760A]" />
                    <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1A0A00]">Photo Gallery</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {GALLERY_IMAGES.map((img, i) => (
                        <div
                            key={i}
                            className="animate-fadeUp"
                            style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both' }}
                        >
                            <AnimatedImage
                                src={img.src}
                                alt={img.label}
                                className="aspect-square rounded-xl"
                                onClick={() => setSelectedImage(img)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Full-screen Lightbox */}
            {selectedImage && (
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
                        className="relative max-w-full max-h-[80vh] overflow-hidden rounded-2xl shadow-2xl animate-fadeUp"
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
            )}

            {/* Rooftop Garden Highlight */}
            <div className="px-4 mb-6">
                <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ height: 200 }}>
                    <AnimatedImage
                        src={highlightRooftop}
                        alt="Rooftop Garden & Restaurant"
                        className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                        <div className="inline-block bg-[#D4A017]/80 text-white text-[10px] px-2.5 py-0.5 rounded-full font-semibold mb-2">✦ Exclusive Feature</div>
                        <h4 className="font-['Playfair_Display'] text-lg font-semibold text-white leading-tight">Rooftop Garden Restaurant</h4>
                        <p className="text-white/80 text-xs mt-1">Dine among lush green walls with LED accents</p>
                    </div>
                </div>
            </div>

            {/* Special offer banner */}
            <div className="mx-4 mb-6 p-5 rounded-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0A00, #3D1C00)' }}>
                <div className="absolute top-0 right-0 w-32 h-32 border-2 border-white/10 rounded-full -mr-10 -mt-10" />
                <div className="relative">
                    <div className="inline-block bg-[#D4A017]/20 border border-[#D4A017]/30 text-[#D4A017] text-xs px-3 py-1 rounded-full mb-3">✦ Special Offer · Agoda</div>
                    <h3 className="font-['Playfair_Display'] text-xl text-white mb-3 leading-tight">Free Cancellation Available</h3>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setPage('detail', ROOMS[0])}
                            className="bg-white text-[#1A0A00] px-5 py-2.5 rounded-lg font-semibold text-sm transition-transform active:scale-95"
                        >
                            Book Now
                        </button>
                        <span className="text-[#F59820] font-semibold text-sm">₹3,660 per night</span>
                    </div>
                </div>
            </div>

            {/* ✨ Our Facilities – highlighted */}
            <div className="px-4 mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <div className="h-1 w-8 rounded-full bg-[#E8760A]" />
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1A0A00]">Our Facilities</h3>
                    <div className="h-1 flex-1 rounded-full bg-[#FFE5C0]" />
                </div>
                <p className="text-xs text-[#7A5230] mb-4 ml-10">Everything you need for a perfect stay</p>
                <div className="grid grid-cols-2 gap-3">
                    {AMENITIES.map((a, i) => (
                        <div
                            key={i}
                            className="rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-[#FFE5C0] transition-transform active:scale-95"
                            style={{ background: a.bg }}
                        >
                            <div
                                className="w-12 h-12 flex items-center justify-center rounded-xl shadow-sm text-2xl flex-shrink-0"
                                style={{ background: `${a.color}22`, border: `1.5px solid ${a.color}44` }}
                            >
                                {a.icon}
                            </div>
                            <div>
                                <div className="text-sm font-bold" style={{ color: a.color }}>{a.name}</div>
                                <div className="text-[10px] text-[#7A5230] leading-snug">{a.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact quick links */}
            <div className="mx-4 mb-6 bg-white rounded-2xl shadow-md overflow-hidden divide-y divide-[#FFE5C0]">
                <a href={`tel:${HOTEL_INFO.phone}`} className="flex items-center gap-3 p-4 transition-colors active:bg-[#FFF2E0]">
                    <div className="w-10 h-10 bg-[#FFF2E0] rounded-full flex items-center justify-center">
                        <Phone size={18} className="text-[#E8760A]" />
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-semibold text-[#1A0A00]">Call Us</div>
                        <div className="text-xs text-[#7A5230]">+91 94373 88224</div>
                    </div>
                </a>
                {/* WhatsApp */}
                <a
                    href={`https://wa.me/${HOTEL_INFO.whatsapp}?text=Hi%2C%20I%20would%20like%20to%20book%20a%20room`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 transition-colors active:bg-[#F0FFF4]"
                >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#E8F5EB' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-semibold text-[#1A0A00]">WhatsApp</div>
                        <div className="text-xs text-[#7A5230]">Chat with us instantly</div>
                    </div>
                </a>
            </div>

            {/* Google Reviews */}
            <GoogleReviews />
        </div>
    );
};
