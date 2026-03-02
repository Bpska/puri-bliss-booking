import { HOTEL_INFO, hotelLogoBW } from '../data/constants';
import { PageId } from '../hooks/useAppState';

const WhatsAppIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

interface FooterProps {
    setPage?: (p: PageId) => void;
}

export const Footer = ({ setPage }: FooterProps = {}) => (
    <footer style={{ background: 'linear-gradient(180deg, #1A0A00 0%, #0D0500 100%)' }} className="mt-6">
        {/* Top accent line */}
        <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, transparent, #D4A017, #E8760A, #D4A017, transparent)' }} />

        <div className="px-5 pt-8 pb-4 md:px-12 lg:px-20 md:pt-12 md:pb-8">

            {/* Desktop: multi-column layout */}
            <div className="md:grid md:grid-cols-3 md:gap-8">
                {/* Brand block */}
                <div className="mb-6 text-center md:text-left md:col-span-1">
                    <div
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
                        className="inline-flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-[#D4A017]/40 mb-3 overflow-hidden bg-white cursor-pointer hover:border-[#D4A017] transition-colors"
                    >
                        <img src={hotelLogoBW} alt="Hotel Amruta Bhojana" className="w-full h-full object-contain p-2 animate-fadeIn" />
                    </div>
                    <h2 className="font-['Playfair_Display'] text-lg md:text-xl font-semibold text-white mb-1">Hotel Amruta Bhojana</h2>
                    <p className="text-[#7A5230] text-[11px] md:text-xs">Near Jagannath Temple, Puri · Odisha</p>
                    <div className="flex justify-center md:justify-start gap-1 mt-2">
                        {[...Array(5)].map((_, i) => <span key={i} className="text-[#D4A017] text-xs">★</span>)}
                    </div>
                    <p className="text-[#7A5230] text-[10px] md:text-xs mt-1">{HOTEL_INFO.rating}/5 · {HOTEL_INFO.reviewCount} Google Reviews</p>

                    {/* Official Numbers */}
                    <div className="mt-4 space-y-1 text-center md:text-left">
                        <p className="text-[#B08050] text-[10px] uppercase tracking-wider font-semibold">GSTIN: {HOTEL_INFO.gstNumber}</p>
                        <p className="text-[#B08050] text-[10px] uppercase tracking-wider font-semibold">Food License: {HOTEL_INFO.foodLicense}</p>
                    </div>
                </div>

                {/* Contact info */}
                <div className="mb-6 md:mb-0">
                    <div className="text-[#D4A017] font-semibold text-[10px] md:text-xs uppercase tracking-wider mb-2 md:mb-3">Address</div>
                    <p className="text-[#B08050] text-xs md:text-sm mb-4">📍 Shree Danda, Near Jagannath Temple, Puri Town, Puri, Odisha, 752001</p>

                    <div className="text-[#D4A017] font-semibold text-[10px] md:text-xs uppercase tracking-wider mb-2 md:mb-3">Contact</div>
                    <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                        <a href={`mailto:${HOTEL_INFO.email}`} className="block text-[#B08050] hover:text-[#E8760A] transition-colors truncate">✉️ {HOTEL_INFO.email}</a>
                        <a href={`tel:${HOTEL_INFO.phone}`} className="block text-[#B08050] hover:text-[#E8760A] transition-colors">📞 +91 94373 88224</a>
                        <a href="tel:06752459250" className="block text-[#B08050] hover:text-[#E8760A] transition-colors">📞 Land Line: 06752 459250</a>
                    </div>
                </div>



                {/* Quick links + Quick contacts */}
                <div className="mb-6 md:mb-0">
                    <div className="text-[#D4A017] font-semibold text-[10px] md:text-xs uppercase tracking-wider mb-2 md:mb-3">Quick Links</div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {[
                            { label: 'About Us', href: '#', onClick: () => setPage && setPage('about') },
                            { label: 'Google Maps', href: HOTEL_INFO.maps },
                            { label: 'Book on Agoda', href: HOTEL_INFO.agoda },
                            { label: 'Admin Panel', href: '#admin' },
                        ].map(({ label, href, onClick }) => (
                            onClick ? (
                                <button
                                    key={label}
                                    onClick={onClick}
                                    className="text-[10px] md:text-xs bg-white/5 border border-white/10 text-[#B08050] px-3 py-1.5 rounded-full transition-all active:scale-95 hover:border-[#E8760A]/50 hover:text-[#E8760A]"
                                >
                                    {label} →
                                </button>
                            ) : (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] md:text-xs bg-white/5 border border-white/10 text-[#B08050] px-3 py-1.5 rounded-full transition-all active:scale-95 hover:border-[#E8760A]/50 hover:text-[#E8760A]"
                                >
                                    {label} →
                                </a>
                            )
                        ))}
                    </div>

                    {/* Quick contacts */}
                    <div className="grid grid-cols-1 gap-2">
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
                </div>
            </div>

            {/* Divider */}
            <div className="h-px mb-4 md:mb-6 md:mt-4" style={{ background: 'linear-gradient(90deg, transparent, #3D1C00 50%, transparent)' }} />

            {/* Social Media Links */}
            <div className="flex justify-center gap-3 mb-5">
                <a href="https://www.instagram.com/amrutabhojana" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href="https://x.com/amrutabhojana" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 border border-white/20 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:bg-white/20">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href="https://www.youtube.com/@amrutabhojana" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FF0000] transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
                <a href="https://www.facebook.com/amrutabhojana" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1877F2] transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
            </div>

            {/* Bottom bar: copyright + Made by LogiSaar */}
            <div className="text-center space-y-2">
                <p className="text-[#4A2C10] text-[9px] md:text-xs">© 2025 Hotel Amruta Bhojana. All rights reserved.</p>

                {/* Made by LogiSaar — highlighted credit */}
                <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                    <span className="text-[#7A5230] text-[9px] md:text-xs">Designed &amp; Developed by</span>
                    <a
                        href="https://logisaar.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-['Playfair_Display'] text-[11px] md:text-sm font-bold transition-colors hover:opacity-80"
                        style={{ background: 'linear-gradient(135deg, #E8760A, #D4A017)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                        LogiSaar
                    </a>
                    <span className="text-[#D4A017] text-[9px] md:text-xs">✦</span>
                </div>
            </div>

            {/* Scroll to Top Arrow */}
            <button
                onClick={() => {
                    if (setPage) setPage('home');
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}
                className="fixed bottom-20 md:bottom-6 right-4 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-[#E8760A] hover:bg-[#F59820] backdrop-blur-md border border-[#FFE5C0]/30 rounded-full flex items-center justify-center text-white shadow-xl transition-all active:scale-90 z-[60]"
                aria-label="Scroll to top"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 15l-6-6-6 6" />
                </svg>
            </button>

        </div>
    </footer>
);
