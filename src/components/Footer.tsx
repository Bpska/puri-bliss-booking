import { HOTEL_INFO, hotelLogoBW } from '../data/constants';

const WhatsAppIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export const Footer = () => (
    <footer style={{ background: 'linear-gradient(180deg, #1A0A00 0%, #0D0500 100%)' }} className="mt-6">
        {/* Top accent line */}
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, transparent, #D4A017, #E8760A, #D4A017, transparent)' }} />

        <div className="px-5 pt-8 pb-4">

            {/* Brand block */}
            <div className="mb-6 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-[#D4A017]/40 mb-3 overflow-hidden bg-white">
                    <img src={hotelLogoBW} alt="Hotel Amruta Bhojana" className="w-full h-full object-contain p-2 animate-fadeIn" />
                </div>
                <h2 className="font-['Playfair_Display'] text-lg font-semibold text-white mb-1">Hotel Amruta Bhojana</h2>
                <p className="text-[#7A5230] text-[11px]">Near Jagannath Temple, Puri · Odisha</p>
                <div className="flex justify-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-[#D4A017] text-xs">★</span>)}
                </div>
                <p className="text-[#7A5230] text-[10px] mt-1">{HOTEL_INFO.rating}/5 · {HOTEL_INFO.reviewCount} Google Reviews</p>
            </div>

            {/* Divider */}
            <div className="h-px mb-6" style={{ background: 'linear-gradient(90deg, transparent, #3D1C00 50%, transparent)' }} />

            {/* Quick contacts */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <a
                    href={`tel:${HOTEL_INFO.phone}`}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-3 transition-all active:scale-95 hover:bg-white/10"
                >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #E8760A, #F59820)' }}>
                        <span className="text-base">📞</span>
                    </div>
                    <div>
                        <div className="text-[10px] text-[#7A5230]">Call Us</div>
                        <div className="text-xs text-white font-semibold">+91 94373 88224</div>
                    </div>
                </a>
                <a
                    href={`https://wa.me/${HOTEL_INFO.whatsapp}?text=Hi%2C%20I%20would%20like%20to%20book%20a%20room`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-3 transition-all active:scale-95 hover:bg-white/10"
                >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
                        <WhatsAppIcon />
                    </div>
                    <div>
                        <div className="text-[10px] text-[#7A5230]">WhatsApp</div>
                        <div className="text-xs text-white font-semibold">Chat with Us</div>
                    </div>
                </a>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6 text-xs">
                <div>
                    <div className="text-[#D4A017] font-semibold text-[10px] uppercase tracking-wider mb-2">Contact</div>
                    <div className="space-y-1.5">
                        <p className="text-[#B08050]">📍 {HOTEL_INFO.address}</p>
                        <a href={`mailto:${HOTEL_INFO.email}`} className="block text-[#B08050] hover:text-[#E8760A] transition-colors truncate">✉️ {HOTEL_INFO.email}</a>
                    </div>
                </div>
                <div>
                    <div className="text-[#D4A017] font-semibold text-[10px] uppercase tracking-wider mb-2">Hours</div>
                    <div className="space-y-1.5 text-[#B08050]">
                        <p>🕘 Check-in: {HOTEL_INFO.checkin}</p>
                        <p>🕗 Check-out: {HOTEL_INFO.checkout}</p>
                        <p>🛎️ Reception: 24 × 7</p>
                    </div>
                </div>
            </div>

            {/* Quick links */}
            <div className="mb-6">
                <div className="text-[#D4A017] font-semibold text-[10px] uppercase tracking-wider mb-2">Quick Links</div>
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: 'Google Maps', href: HOTEL_INFO.maps },
                        { label: 'Book on Agoda', href: HOTEL_INFO.agoda },
                        { label: 'Website', href: HOTEL_INFO.website },
                    ].map(({ label, href }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] bg-white/5 border border-white/10 text-[#B08050] px-3 py-1.5 rounded-full transition-all active:scale-95 hover:border-[#E8760A]/50 hover:text-[#E8760A]"
                        >
                            {label} →
                        </a>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="h-px mb-4" style={{ background: 'linear-gradient(90deg, transparent, #3D1C00 50%, transparent)' }} />

            {/* Bottom bar: copyright + Made by LogiSaar */}
            <div className="text-center space-y-2">
                <p className="text-[#4A2C10] text-[9px]">© 2025 Hotel Amruta Bhojana. All rights reserved.</p>

                {/* Made by LogiSaar — highlighted credit */}
                <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                    <span className="text-[#7A5230] text-[9px]">Designed &amp; Developed by</span>
                    <a
                        href="https://logisaar.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-['Playfair_Display'] text-[11px] font-bold transition-colors hover:opacity-80"
                        style={{ background: 'linear-gradient(135deg, #E8760A, #D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                        LogiSaar
                    </a>
                    <span className="text-[#D4A017] text-[9px]">✦</span>
                </div>
            </div>

        </div>
    </footer>
);
