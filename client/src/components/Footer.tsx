import { HOTEL_INFO, hotelLogoBW, fssaiLogo } from '../data/constants';
import { PageId } from '../hooks/useAppState';
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
                {/* Column 1: Brand block */}
                <div className="mb-6 text-center md:text-left md:col-span-1 flex flex-col items-center md:items-start">
                    <div
                        onClick={() => {
                            if (setPage) setPage('home');
                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-[#D4A017]/40 mb-3 overflow-hidden bg-white cursor-pointer hover:border-[#D4A017] transition-colors"
                    >
                        <img src={hotelLogoBW} alt="Hotel Amruta Bhojana" className="w-full h-full object-contain p-2 animate-fadeIn" />
                    </div>
                    <h2 className="font-['Playfair_Display'] text-lg md:text-xl font-semibold text-white mb-1">Hotel Amruta Bhojana</h2>
                    <p className="text-[#7A5230] text-[11px] md:text-xs">Near Jagannath Temple, Puri · Odisha</p>
                    <div className="flex gap-1 mt-2">
                        {[...Array(5)].map((_, i) => <span key={i} className="text-[#D4A017] text-xs">★</span>)}
                    </div>
                    <p className="text-[#7A5230] text-[10px] md:text-xs mt-1">{HOTEL_INFO.rating}/5 · {HOTEL_INFO.reviewCount} Google Reviews</p>

                    {/* Official Numbers - Highlighted */}
                    <div className="mt-5 space-y-2">
                        <div className="inline-flex items-center gap-2 bg-[#D4A017]/10 border border-[#D4A017]/30 px-3 py-1.5 rounded-full">
                            <span className="text-[#D4A017] text-[10px] font-bold uppercase tracking-widest shrink-0">GSTIN</span>
                            <span className="text-white text-xs font-semibold">{HOTEL_INFO.gstNumber}</span>
                        </div>
                        <div className="mt-3 hidden md:block">
                            <div className="inline-block bg-white rounded-md p-1.5 shadow-sm mb-1">
                                <img src={fssaiLogo} alt="FSSAI" className="h-6 md:h-10 object-contain" />
                            </div>
                            <div className="text-white/90 text-xs md:text-sm font-semibold tracking-wide">License No. {HOTEL_INFO.foodLicense}</div>
                        </div>
                    </div>
                </div>

                {/* Column 2: Contact info & Social Media */}
                <div className="mb-6 md:mb-0 md:col-span-1 text-center md:text-left flex flex-col items-center md:items-start">
                    {/* Social Media Links - vertically padded to match the Logo height so Address aligns with Hotel Name */}
                    <div className="h-28 md:h-36 mb-3 flex items-center justify-center md:justify-start">
                        <div className="flex items-center gap-3">
                            <a href="https://wa.me/919437388224" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-[#25D366] transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.488-1.761-1.663-2.059-.175-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                            </a>
                            <a href="https://www.instagram.com/amrutabhojana" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                            </a>
                            <a href="https://www.facebook.com/amrutabhojana" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-[#1877F2] transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="https://x.com/amrutabhojana" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-white/10 border border-white/20 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:bg-white/20">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            <a href="https://www.youtube.com/@amrutabhojana" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-[#FF0000] transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </a>
                        </div>
                    </div>

                    <div className="text-[#D4A017] font-semibold text-[10px] md:text-xs uppercase tracking-wider mb-2 md:mb-3 mt-1">Address</div>
                    <p className="text-[#B08050] text-xs md:text-sm mb-6 max-w-[250px]">📍 Shree Danda, Near Jagannath Temple, Puri Town, Puri, Odisha, 752001</p>

                    <div className="text-[#D4A017] font-semibold text-[10px] md:text-xs uppercase tracking-wider mb-2 md:mb-3">Contact</div>
                    <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                        <a href={`mailto:${HOTEL_INFO.email}`} className="block text-[#B08050] hover:text-[#E8760A] transition-colors truncate">✉️ {HOTEL_INFO.email}</a>
                        <a href={`tel:${HOTEL_INFO.phone}`} className="block text-[#B08050] hover:text-[#E8760A] transition-colors">📞 +91 94373 88224</a>
                        <a href="tel:06752459250" className="block text-[#B08050] hover:text-[#E8760A] transition-colors">📞 Land Line: 06752 459250</a>
                    </div>
                </div>

                {/* Column 3: Google Maps Embed */}
                <div className="mb-6 md:mb-0 md:col-span-1 h-full flex flex-col">
                    <div className="text-[#D4A017] font-semibold text-[10px] md:text-xs uppercase tracking-wider mb-2 md:mb-3 text-center md:text-left">Location</div>
                    <div className="rounded-xl overflow-hidden border-2 border-white/10 shadow-lg flex-1 min-h-[220px]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1872.4828343725654!2d85.82361110000002!3d19.8136111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19c417631cc9bf%3A0x6bba3bcaf5675e2!2sShri%20Jagannatha%20Temple%20Puri!5e0!3m2!1sen!2sin!4v1709400000000!5m2!1sen!2sin"
                            title="Hotel Amruta Bhojana Location"
                            className="w-full h-full border-0 bg-[#1A0A00]"
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>

        <div className="h-px mb-4 md:mb-6 mt-2 md:mt-4" style={{ background: 'linear-gradient(90deg, transparent, #3D1C00 50%, transparent)' }} />

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

    </footer>
);
