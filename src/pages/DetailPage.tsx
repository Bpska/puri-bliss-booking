import { useState } from 'react';
import { Heart } from 'lucide-react';
import { AnimatedImage } from '../components/AnimatedImage';
import { useAppState } from '../hooks/useAppState';
import { HOTEL_INFO } from '../data/constants';

interface DetailPageProps {
    state: ReturnType<typeof useAppState>;
}

export const DetailPage = ({ state }: DetailPageProps) => {
    const { setPage, selectedRoom, guests, setGuests, wishlist, toggleWishlist } = state;
    const [detailImgIdx, setDetailImgIdx] = useState(0);

    const prev = () => setDetailImgIdx(i => (i - 1 + selectedRoom.images.length) % selectedRoom.images.length);
    const next = () => setDetailImgIdx(i => (i + 1) % selectedRoom.images.length);

    return (
        <div className="animate-fadeUp overflow-y-auto pb-32">

            {/* Image hero with carousel */}
            <div className="relative h-[290px] overflow-hidden">
                <AnimatedImage
                    src={selectedRoom.images[detailImgIdx]}
                    alt={`${selectedRoom.name} - Photo ${detailImgIdx + 1}`}
                    className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />

                {/* Dot indicators */}
                <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none">
                    {selectedRoom.images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setDetailImgIdx(i)}
                            className={`h-1.5 rounded-full transition-all pointer-events-auto ${i === detailImgIdx ? 'bg-white w-4' : 'bg-white/50 w-1.5'}`}
                        />
                    ))}
                </div>

                {/* Prev / Next arrows */}
                {selectedRoom.images.length > 1 && (
                    <>
                        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white z-10 transition-transform active:scale-90">‹</button>
                        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white z-10 transition-transform active:scale-90">›</button>
                    </>
                )}

                {/* Top bar */}
                <div className="relative z-10 px-4 py-4">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setPage('rooms')}
                            className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center transition-transform active:scale-90"
                        >
                            <span className="text-white text-lg">←</span>
                        </button>
                        <div className="flex gap-2">
                            <button
                                onClick={() => toggleWishlist(selectedRoom.id)}
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center transition-transform active:scale-90"
                            >
                                <Heart size={18} fill={wishlist.includes(selectedRoom.id) ? '#E8760A' : 'none'} stroke={wishlist.includes(selectedRoom.id) ? '#E8760A' : 'white'} />
                            </button>
                            <button
                                onClick={() => {
                                    try {
                                        if (navigator.share) {
                                            navigator.share({ title: HOTEL_INFO.name, text: `Check out this ${selectedRoom.name} at ${HOTEL_INFO.name}!`, url: window.location.href });
                                        } else {
                                            alert('Share feature not supported on this browser');
                                        }
                                    } catch (e) { console.error(e); }
                                }}
                                className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center transition-transform active:scale-90"
                            >
                                <span className="text-white">↗</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Room name overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="text-[#F59820] text-[10px] uppercase tracking-wider font-semibold mb-1">{selectedRoom.type}</div>
                    <h1 className="font-['Playfair_Display'] text-[26px] font-semibold text-white leading-tight mb-2">{selectedRoom.name}</h1>
                    <div className="flex gap-1.5">
                        {selectedRoom.images.map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all ${i === detailImgIdx ? 'bg-white w-4' : 'bg-white/30 w-1.5'}`} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Image thumbnail strip */}
            <div className="flex gap-2 px-4 py-3 overflow-x-auto">
                {selectedRoom.images.map((img, i) => (
                    <button key={i} onClick={() => setDetailImgIdx(i)} className={`flex-shrink-0 transition-transform active:scale-90 ${i === detailImgIdx ? 'ring-2 ring-[#E8760A]' : 'opacity-60'} rounded-lg overflow-hidden`}>
                        <AnimatedImage src={img} alt={`${selectedRoom.name} thumb ${i + 1}`} className="w-16 h-16 rounded-lg" />
                    </button>
                ))}
            </div>

            <div className="px-4 py-3">
                <div className="flex justify-between items-center mb-5">
                    <div className="flex gap-1 text-[#D4A017]">
                        {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                    </div>
                    <div className="text-right">
                        <div className="font-['Playfair_Display'] text-[28px] font-bold text-[#3D1C00]">₹{selectedRoom.price}</div>
                        <div className="text-xs text-[#7A5230]">per night</div>
                    </div>
                </div>

                <div className="h-px mb-5" style={{ background: 'linear-gradient(90deg, transparent, #FFE5C0 50%, transparent)' }} />

                <div className="mb-5">
                    <h2 className="font-['Playfair_Display'] text-lg font-semibold text-[#1A0A00] mb-3">About This Room</h2>
                    <p className="text-sm text-[#7A5230] leading-relaxed">{selectedRoom.desc}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                    {selectedRoom.features.map((f, i) => (
                        <span key={i} className="bg-[#FFF2E0] border border-[#FFE5C0] text-[#3D1C00] text-xs px-3 py-1.5 rounded-full font-medium">{f}</span>
                    ))}
                </div>

                {/* Dates & guests */}
                <div className="mb-5">
                    <h2 className="font-['Playfair_Display'] text-lg font-semibold text-[#1A0A00] mb-3">Select Your Stay</h2>
                    <div className="bg-white rounded-xl border border-[#FFE5C0] p-4 mb-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div><label className="text-xs text-[#7A5230] mb-1 block">Check-in</label><div className="text-sm font-semibold text-[#1A0A00]">20 Feb 2025</div></div>
                            <div><label className="text-xs text-[#7A5230] mb-1 block">Check-out</label><div className="text-sm font-semibold text-[#1A0A00]">21 Feb 2025</div></div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl border border-[#FFE5C0] p-4">
                        <label className="text-xs text-[#7A5230] mb-2 block">Guests</label>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-[#1A0A00]">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full border-2 border-[#E8760A] text-[#E8760A] flex items-center justify-center font-bold transition-transform active:scale-90">−</button>
                                <button onClick={() => setGuests(Math.min(8, guests + 1))} className="w-8 h-8 rounded-full bg-[#E8760A] text-white flex items-center justify-center font-bold transition-transform active:scale-90">+</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Includes */}
                <div className="mb-5">
                    <h2 className="font-['Playfair_Display'] text-lg font-semibold text-[#1A0A00] mb-3">What's Included</h2>
                    <div className="space-y-3">
                        {selectedRoom.includes.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#FFF2E0] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg">{i % 2 === 0 ? '📶' : '🧹'}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-semibold text-[#1A0A00]">{item}</div>
                                    <div className="text-xs text-[#7A5230]">Included in your stay</div>
                                </div>
                                <div className="text-[#E8760A] font-bold">✓</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Fixed bottom bar */}
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white shadow-[0_-4px_20px_rgba(26,10,0,0.12)] px-4 py-4 z-40">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <div className="font-['Playfair_Display'] text-xl font-bold text-[#3D1C00]">₹{selectedRoom.price}</div>
                        <div className="text-[10px] text-[#7A5230]">per night · per room</div>
                    </div>
                    <div className="flex gap-2">
                        <a
                            href={`https://wa.me/${HOTEL_INFO.whatsapp}?text=Hi%2C%20I%20want%20to%20book%20the%20${encodeURIComponent(selectedRoom.name)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="px-4 py-3 rounded-xl font-semibold text-sm text-white flex items-center gap-1.5 transition-transform active:scale-95"
                            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            WhatsApp
                        </a>
                        <button
                            onClick={() => window.open(`tel:${HOTEL_INFO.phone}`)}
                            className="px-4 py-3 rounded-xl font-semibold text-sm text-white flex items-center gap-1.5 transition-transform active:scale-95"
                            style={{ background: 'linear-gradient(135deg, #E8760A, #F59820)' }}
                        >
                            📞 Reserve
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
