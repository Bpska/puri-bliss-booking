import { useState, useEffect, useRef } from 'react';
import { Phone, X, AlertTriangle, CalendarDays, ChevronDown, Users } from 'lucide-react';
import { AnimatedImage } from '../components/AnimatedImage';
import { AMENITIES, GALLERY_IMAGES, HOTEL_INFO, hotelLogo, highlightRooftop, HERO_IMAGES, POLICIES, DINING, BOOKING_PLATFORMS, NEARBY_ATTRACTIONS, HOW_TO_REACH, CANCELLATION_POLICY } from '../data/constants';
import heroNightExterior from '../images/hero-night-exterior.jpg';
import { GoogleReviews } from '../components/GoogleReviews';
import { useAppState } from '../hooks/useAppState';
import { getSettings } from '../data/adminStore';
import gsap from 'gsap';

interface HomePageProps {
    state: ReturnType<typeof useAppState>;
}

export const HomePage = ({ state }: HomePageProps) => {
    const { setPage, filter, getFilteredRooms, setMenuOpen, checkIn, checkOut, guests, setGuests, formatDisplayDate, setCheckIn, setCheckOut } = state;
    const [isGuestsOpen, setIsGuestsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<{ src: string, label: string } | null>(null);
    const [heroIdx, setHeroIdx] = useState(0);
    const [galleryFilter, setGalleryFilter] = useState('All');
    const [roomsFull, setRoomsFull] = useState(false);
    const [availableCount, setAvailableCount] = useState<number | null>(null);
    const [heroImages, setHeroImages] = useState<{ src: string, title?: string, subtitle?: string }[]>(
        HERO_IMAGES.map(src => ({ src }))
    );

    // GSAP refs
    const heroRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const hotelNameRef = useRef<HTMLDivElement>(null);
    const locationBadgeRef = useRef<HTMLDivElement>(null);
    const heroTitleRef = useRef<HTMLHeadingElement>(null);
    const heroDescRef = useRef<HTMLParagraphElement>(null);
    const ratingBadgeRef = useRef<HTMLDivElement>(null);
    const indicatorsRef = useRef<HTMLDivElement>(null);
    const navActionsRef = useRef<HTMLDivElement>(null);
    const heroImageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getSettings().then(s => {
            const available = s.total_rooms - s.full_rooms;
            setRoomsFull(s.rooms_full || available <= 0);
            setAvailableCount(available);
            if (s.hero_images && s.hero_images.length > 0) {
                setHeroImages(s.hero_images);
            }
        }).catch(() => {
            setRoomsFull(false);
            setAvailableCount(null);
        });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setHeroIdx(prev => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroImages.length]);

    // GSAP Hero entrance animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // Ken Burns zoom on the hero image container
            if (heroImageRef.current) {
                gsap.fromTo(heroImageRef.current,
                    { scale: 1.15 },
                    { scale: 1, duration: 8, ease: 'power1.out' }
                );
            }

            // Logo — scale in with elastic bounce
            if (logoRef.current) {
                tl.fromTo(logoRef.current,
                    { scale: 0, opacity: 0, rotation: -180 },
                    { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' },
                    0.2
                );
            }

            // Hotel name — slide in from left with fade
            if (hotelNameRef.current) {
                tl.fromTo(hotelNameRef.current,
                    { x: -40, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.8 },
                    0.5
                );
            }

            // Nav actions (call, menu) — fade in from right
            if (navActionsRef.current) {
                tl.fromTo(navActionsRef.current,
                    { x: 30, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.6 },
                    0.6
                );
            }

            // Location badge — pop in
            if (locationBadgeRef.current) {
                tl.fromTo(locationBadgeRef.current,
                    { y: 20, opacity: 0, scale: 0.8 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(2)' },
                    0.8
                );
            }

            // Hero title — cinematic reveal from below
            if (heroTitleRef.current) {
                tl.fromTo(heroTitleRef.current,
                    { y: 60, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
                    { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power4.out' },
                    0.9
                );
            }

            // Description text — fade up
            if (heroDescRef.current) {
                tl.fromTo(heroDescRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7 },
                    1.3
                );
            }

            // Rating badge — slide in from left
            if (ratingBadgeRef.current) {
                tl.fromTo(ratingBadgeRef.current,
                    { x: -30, opacity: 0, scale: 0.9 },
                    { x: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
                    1.5
                );
            }

            // Indicators — stagger fade in
            if (indicatorsRef.current) {
                const dots = indicatorsRef.current.children;
                tl.fromTo(dots,
                    { y: 10, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, stagger: 0.06 },
                    1.7
                );
            }
        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Ken Burns effect on hero image transitions
    useEffect(() => {
        if (heroImageRef.current) {
            gsap.fromTo(heroImageRef.current,
                { scale: 1.1 },
                { scale: 1, duration: 5, ease: 'power1.out' }
            );
        }
    }, [heroIdx]);

    return (
        <div className="animate-fadeUp overflow-y-auto pb-20 md:pb-6">
            {/* Floating Visitor Counter - Left Side */}
            <div className="fixed left-3 bottom-36 md:bottom-24 md:left-6 z-40 bg-[#1A0A00]/60 backdrop-blur-md border border-[#E8760A]/30 rounded-2xl p-2 md:p-3 shadow-2xl flex items-center gap-2.5 md:gap-3 transition-transform hover:scale-105" style={{ animation: 'slideDown 0.5s ease-out 1.5s both' }}>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#E8760A] to-[#F59820] rounded-xl flex items-center justify-center text-white shadow-inner">
                    <Users size={16} className="md:w-5 md:h-5" />
                </div>
                <div className="pr-2">
                    <div className="text-[9px] md:text-[10px] font-bold text-[#FFE5C0]/80 uppercase tracking-wider mb-0.5">Total Visitors</div>
                    <div className="font-['Playfair_Display'] text-sm md:text-base font-bold text-white leading-none">
                        {state.visitorCount ? state.visitorCount.toLocaleString() : '...'}
                    </div>
                </div>
            </div>

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

            {/* Hero — GSAP Animated */}
            <div ref={heroRef} className="relative min-h-[360px] md:min-h-[520px] lg:min-h-[600px] overflow-hidden bg-[#1A0A00]">
                {/* Image Slider with Ken Burns */}
                <div ref={heroImageRef} className="absolute inset-0 will-change-transform">
                    {heroImages.map((img, i) => (
                        <div
                            key={i}
                            className={`absolute inset-0 transition-opacity duration-1000 ${i === heroIdx ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <img src={img.src} alt={`Hero ${i + 1}`} className="w-full h-full object-cover opacity-80" />
                        </div>
                    ))}
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-[#FFFCF7]/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(232,118,10,0.2),transparent_60%)]" />

                <div className="relative z-10 px-5 pt-4 md:px-12 lg:px-20 md:pt-8">
                    <div className="flex justify-between items-start mb-4">
                        {/* Logo + Name */}
                        <div className="flex items-center gap-3 md:gap-4">
                            <img
                                ref={logoRef}
                                src={hotelLogo}
                                alt="Hotel Amruta Bhojana Logo"
                                onClick={() => {
                                    setPage('home');
                                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                }}
                                className="w-20 h-20 md:w-32 md:h-32 rounded-full object-contain bg-white border-2 border-[#D4A017]/60 shadow-lg p-1 cursor-pointer"
                                style={{ opacity: 0 }}
                            />
                            <div ref={hotelNameRef} style={{ opacity: 0 }}>
                                <h1 className="text-white font-['Playfair_Display'] text-base md:text-xl lg:text-2xl font-semibold leading-tight">Hotel Amruta Bhojana</h1>
                                <p className="text-white/80 text-[10px] md:text-sm italic">Puri, Odisha</p>
                                <div className="flex gap-0.5 mt-1">
                                    {[...Array(5)].map((_, i) => <span key={i} className="text-[#D4A017] text-[9px] md:text-sm">★</span>)}
                                </div>
                            </div>
                        </div>
                        <div ref={navActionsRef} className="flex items-center gap-3" style={{ opacity: 0 }}>
                            {/* Desktop Nav */}
                            <nav className="hidden md:flex items-center gap-6 mr-4">
                                {[
                                    { id: 'home', label: 'Home' },
                                    { id: 'rooms', label: 'Rooms' },
                                    { id: 'about', label: 'About Us' },
                                    { id: 'contact', label: 'Contact' }
                                ].map(link => (
                                    <button
                                        key={link.id}
                                        onClick={() => setPage(link.id as any)}
                                        className="text-white/80 hover:text-[#F59820] text-sm font-semibold transition-colors uppercase tracking-wider relative group"
                                    >
                                        {link.label}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F59820] transition-all group-hover:w-full"></span>
                                    </button>
                                ))}
                            </nav>

                            {/* Call icon */}
                            <a
                                href={`tel:${HOTEL_INFO.phone}`}
                                className="w-9 h-9 md:w-11 md:h-11 border border-white/30 rounded-lg flex items-center justify-center bg-white/10 transition-transform active:scale-90 hover:bg-white/20"
                                aria-label="Call hotel"
                            >
                                <Phone size={16} className="text-white md:w-5 md:h-5" />
                            </a>
                            {/* Hamburger - Mobile only */}
                            <button
                                onClick={() => setMenuOpen(true)}
                                className="w-9 h-9 md:w-11 md:h-11 border border-white/30 rounded-lg flex flex-col justify-center items-center gap-1 transition-transform active:scale-90 hover:bg-white/20 md:hidden"
                                aria-label="Open menu"
                            >
                                <div className="w-4 h-0.5 md:w-5 md:h-[3px] bg-white rounded" />
                                <div className="w-4 h-0.5 md:w-5 md:h-[3px] bg-white rounded" />
                                <div className="w-4 h-0.5 md:w-5 md:h-[3px] bg-white rounded" />
                            </button>
                        </div>
                    </div>

                    <div ref={locationBadgeRef} className="inline-block bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 text-xs md:text-sm text-white mb-4" style={{ opacity: 0 }}>
                        Near Jagannath Temple · Puri
                    </div>
                    <h2 ref={heroTitleRef} className="font-['Playfair_Display'] text-[34px] md:text-5xl lg:text-6xl leading-tight text-white mb-3 drop-shadow-lg" style={{ opacity: 0 }}>
                        {heroImages[heroIdx]?.title || <>Welcome to <em className="text-[#F59820] not-italic">Hotel Amruta Bhojana</em></>}
                    </h2>
                    <p ref={heroDescRef} className="text-white/80 text-sm md:text-base lg:text-lg mb-5 max-w-xs md:max-w-lg drop-shadow-md" style={{ opacity: 0 }}>
                        {heroImages[heroIdx]?.subtitle || 'Experience spiritual comfort near the sacred Jagannath Temple with modern amenities and traditional hospitality.'}
                        <br className="hidden md:block" />
                        <button onClick={() => setPage('about')} className="inline-flex items-center gap-1 text-[#F59820] font-semibold mt-2 hover:text-white transition-colors group">
                            More info <span className="group-hover:translate-x-1 transition-transform">➔</span>
                        </button>
                    </p>
                    <div ref={ratingBadgeRef} className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-2 text-xs md:text-sm text-white mb-5" style={{ opacity: 0 }}>
                        <span className="text-[#D4A017]">★★★★★</span>
                        <span>·</span>
                        <span className="font-semibold">{HOTEL_INFO.rating}</span>
                        <span>·</span>
                        <span className="opacity-80">{HOTEL_INFO.reviewCount} Reviews on Google</span>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex items-center gap-3 mb-5">
                        {/* 1. WhatsApp */}
                        <a href={`https://wa.me/${HOTEL_INFO.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center bg-[#25D366] transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg border border-white/20">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 000 12a12 12 0 001.927 6.481L0 24l5.69-1.892A11.91 11.91 0 0011.944 24c6.627 0 12-5.373 12-12S18.571 0 11.944 0zm0 22a9.927 9.927 0 01-5.127-1.42l-.367-.218-3.793 1.258 1.012-3.69-.24-.383a9.92 9.92 0 01-1.485-5.547c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.494-7.513c-.302-.151-1.78-.88-2.056-.98-.276-.1-.477-.151-.678.151-.201.302-.778.98-.954 1.181-.176.201-.352.226-.654.075-.302-.151-1.27-.468-2.42-1.493-.895-.798-1.503-1.785-1.679-2.087-.176-.302-.019-.465.132-.615.136-.135.302-.352.453-.528.151-.176.201-.302.302-.503.1-.201.05-.377-.025-.528-.075-.151-.678-1.635-.93-2.238-.246-.59-.496-.51-.678-.52-.176-.01-.377-.01-.578-.01-.201 0-.528.075-.804.377-.276.302-1.055 1.03-1.055 2.513s1.08 2.915 1.231 3.116c.151.201 2.13 3.25 5.158 4.557.72.311 1.28.497 1.717.636.722.23 1.38.197 1.898.12.58-.086 1.78-.729 2.03-1.433.251-.704.251-1.307.176-1.433-.075-.126-.276-.201-.578-.352z" /></svg>
                        </a>
                        {/* 2. Instagram */}
                        <a href="https://www.instagram.com/amrutabhojana" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg" style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                        </a>
                        {/* 3. Facebook */}
                        <a href="https://www.facebook.com/amrutabhojana" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center bg-[#1877F2] transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg border border-white/20">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                        {/* 4. Twitter / X */}
                        <a href="https://x.com/amrutabhojana" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center bg-black transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg border border-white/20">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                        {/* 5. YouTube */}
                        <a href="https://www.youtube.com/@amrutabhojana" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center bg-[#FF0000] transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg border border-white/20">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                        </a>
                    </div>

                    {/* Slider indicators */}
                    <div ref={indicatorsRef} className="flex gap-1.5 mt-2">
                        {heroImages.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 md:h-1.5 rounded-full transition-all duration-300 ${i === heroIdx ? 'bg-[#F59820] w-6 md:w-8' : 'bg-white/30 w-1.5 md:w-2'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Booking Banner (Merged) */}
            <div className="mx-4 md:mx-12 lg:mx-20 relative z-20 mt-4 md:mt-6 mb-6 p-5 md:p-8 rounded-2xl overflow-hidden shadow-xl" style={{ background: 'linear-gradient(135deg, #1A0A00, #3D1C00)' }}>
                <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 border-2 border-white/10 rounded-full -mr-10 -mt-10 pointer-events-none" />
                <div className="relative flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                    <div className="flex-shrink-0 text-center xl:text-left">
                        <h3 className="font-['Playfair_Display'] text-xl md:text-3xl text-white mb-2 leading-tight">Book Your Stay Today</h3>
                        <p className="text-white/70 text-xs md:text-sm">Experience luxury near Jagannath Temple</p>
                    </div>

                    <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4 border border-white/20 w-full max-w-4xl mx-auto xl:mx-0 shadow-inner">
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 md:divide-x divide-white/20 text-white">
                            {/* Check-in */}
                            <div
                                className="md:px-4 relative group cursor-pointer"
                                onClick={() => { const el = document.getElementById('hero-checkin') as HTMLInputElement; el?.showPicker?.(); }}
                            >
                                <input
                                    id="hero-checkin"
                                    type="date"
                                    value={checkIn}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => {
                                        const newCheckIn = e.target.value;
                                        if (newCheckIn) {
                                            setCheckIn(newCheckIn);
                                            if (newCheckIn >= checkOut) {
                                                const nextDay = new Date(newCheckIn);
                                                nextDay.setDate(nextDay.getDate() + 1);
                                                setCheckOut(nextDay.toISOString().split('T')[0]);
                                            }
                                        }
                                    }}
                                    className="sr-only"
                                />
                                <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#F59820] mb-0.5 block pointer-events-none">Check-in</label>
                                <div className="flex items-center gap-1.5 pointer-events-none group-hover:text-[#F59820] transition-colors relative z-0 w-full">
                                    <CalendarDays size={14} className="text-[#F59820] opacity-80 flex-shrink-0" />
                                    <span className="text-sm md:text-base font-bold text-white whitespace-nowrap flex-1 block">
                                        {formatDisplayDate(checkIn)}
                                    </span>
                                    <ChevronDown size={14} className="text-white/50 flex-shrink-0" />
                                </div>
                            </div>
                            {/* Check-out */}
                            <div
                                className="md:px-4 relative group cursor-pointer"
                                onClick={() => { const el = document.getElementById('hero-checkout') as HTMLInputElement; el?.showPicker?.(); }}
                            >
                                <input
                                    id="hero-checkout"
                                    type="date"
                                    value={checkOut}
                                    min={checkIn}
                                    onChange={(e) => {
                                        const newCheckOut = e.target.value;
                                        if (newCheckOut && newCheckOut > checkIn) {
                                            setCheckOut(newCheckOut);
                                        }
                                    }}
                                    className="sr-only"
                                />
                                <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#F59820] mb-0.5 block pointer-events-none">Check-out</label>
                                <div className="flex items-center gap-1.5 pointer-events-none group-hover:text-[#F59820] transition-colors relative z-0 w-full">
                                    <CalendarDays size={14} className="text-[#F59820] opacity-80 flex-shrink-0" />
                                    <span className="text-sm md:text-base font-bold text-white whitespace-nowrap flex-1 block">
                                        {formatDisplayDate(checkOut)}
                                    </span>
                                    <ChevronDown size={14} className="text-white/50 flex-shrink-0" />
                                </div>
                            </div>
                            {/* Guests & Rooms */}
                            <div className="col-span-2 md:col-span-1 border-t md:border-t-0 border-white/20 pt-3 md:pt-0 md:px-4 relative group cursor-pointer" onClick={() => setIsGuestsOpen(!isGuestsOpen)}>
                                <label className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#F59820] mb-0.5 block pointer-events-none">Guests & Rooms</label>
                                <div className="flex items-center gap-1.5 pointer-events-none group-hover:text-[#F59820] transition-colors relative z-0 w-full">
                                    <Users size={14} className="text-[#F59820] opacity-80 flex-shrink-0" />
                                    <div className="text-sm md:text-base font-bold text-white whitespace-nowrap overflow-hidden flex-1 block">
                                        {guests} {guests === 1 ? 'Adult' : 'Adults'} · 1 Room
                                    </div>
                                    <ChevronDown size={14} className="text-white/50 flex-shrink-0" />
                                </div>
                                {isGuestsOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setIsGuestsOpen(false); }} />
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-100 animate-fadeIn origin-top min-w-[170px]">
                                            {[1, 2, 3, 4, 5, 6].map(num => (
                                                <div
                                                    key={num}
                                                    className={`px-4 py-3 text-sm md:text-base font-bold cursor-pointer transition-colors border-b last:border-0 border-gray-100 whitespace-nowrap ${guests === num ? 'bg-[#FFF2E0] text-[#E8760A]' : 'text-[#3D1C00] hover:bg-gray-50'}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setGuests(num);
                                                        setIsGuestsOpen(false);
                                                    }}
                                                >
                                                    {num} {num === 1 ? 'Adult' : 'Adults'} · 1 Room
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setPage('rooms');
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                            className="w-full md:w-auto px-6 py-3.5 rounded-xl font-bold text-[#1A0A00] text-sm md:text-base transition-transform active:scale-95 hover:shadow-lg flex-shrink-0 whitespace-nowrap bg-white hover:bg-gray-100"
                        >
                            🔍 Check Availability
                        </button>
                    </div>
                </div>
            </div>
            {/* Background image wrapper for remaining content */}
            <div
                className="relative"
                style={{
                    backgroundImage: `url(${heroNightExterior})`,
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Semi-transparent overlay for readability */}
                <div className="absolute inset-0 bg-[#FFFCF7]/70 pointer-events-none" />
                <div className="relative z-10">

                    {/* Our Rooms */}
                    <div className="px-4 md:px-12 lg:px-20 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 onClick={() => setPage('rooms')} className="font-['Playfair_Display'] text-xl md:text-2xl font-semibold text-[#1A0A00] cursor-pointer hover:text-[#E8760A] transition-colors">Our Rooms</h3>
                            <button onClick={() => setPage('rooms')} className="text-[#E8760A] text-sm md:text-base font-medium hover:underline">View All →</button>
                        </div>
                        <div className="flex gap-2 mb-4 overflow-x-auto cursor-pointer" onClick={() => setPage('rooms')} style={{ scrollbarWidth: 'none' }}>
                            {['All Rooms', 'Deluxe AC With BreakFast', 'Deluxe AC', 'AC Room with BreakFast', 'AC Room', 'Non-AC with BreakFast', 'Non-AC'].map(f => (
                                <div
                                    key={f}
                                    className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all active:scale-95 hover:shadow-md ${filter === f ? 'bg-[#1A0A00] text-[#F59820]' : 'bg-white border border-[#FFE5C0] text-[#7A5230]'
                                        }`}
                                >
                                    {f}
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 lg:grid-cols-3 md:overflow-visible">
                            {getFilteredRooms().slice(0, 3).map(room => (
                                <div
                                    key={room.id}
                                    onClick={() => { setPage('rooms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    className="min-w-[210px] md:min-w-0 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform active:scale-95 hover:shadow-xl hover:-translate-y-1"
                                >
                                    <div className="relative h-[135px] md:h-[200px] lg:h-[240px] overflow-hidden">
                                        <AnimatedImage src={room.images[0]} alt={`${room.name} - Room 1`} className="w-full h-full" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                                        <span className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] md:text-xs px-2 py-1 rounded-full pointer-events-none">{room.type}</span>
                                    </div>
                                    <div className="p-3 md:p-4">
                                        <h4 className="font-['Playfair_Display'] text-sm md:text-base font-semibold text-[#1A0A00] mb-1">{room.name}</h4>
                                        <p className="text-xs md:text-sm text-[#7A5230] mb-2">Near Jagannath Temple</p>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="font-['Playfair_Display'] text-lg md:text-xl font-bold text-[#3D1C00]">₹{room.price}</span>
                                                <span className="text-[10px] md:text-xs text-[#7A5230]">/night</span>
                                            </div>
                                            <div className="bg-[#E8760A] text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg">
                                                Book Now
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Photo Gallery */}
                    <div className="px-4 md:px-12 lg:px-20 mb-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="h-1 w-8 rounded-full bg-[#E8760A]" />
                                <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-semibold text-[#1A0A00]">Photo Gallery</h3>
                            </div>
                            {/* Gallery Categories */}
                            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                                {['All', ...Array.from(new Set(GALLERY_IMAGES.map(img => img.category).filter(Boolean)))].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setGalleryFilter(cat!)}
                                        className={`px-3 py-1.5 rounded-full text-[10px] md:text-xs font-medium whitespace-nowrap transition-all ${galleryFilter === cat
                                            ? 'bg-[#1A0A00] text-[#F59820] shadow-md'
                                            : 'bg-white/50 border border-[#FFE5C0] text-[#7A5230] hover:bg-white'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                            {galleryFilter === 'All' ? (
                                // Category folders view
                                Array.from(new Set(GALLERY_IMAGES.map(img => img.category).filter(Boolean))).map((cat, i) => {
                                    const firstImage = GALLERY_IMAGES.find(img => img.category === cat);
                                    const imageCount = GALLERY_IMAGES.filter(img => img.category === cat).length;

                                    if (!firstImage) return null;

                                    return (
                                        <div
                                            key={`cat-${i}`}
                                            className="animate-fadeUp group relative cursor-pointer"
                                            style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'both' }}
                                            onClick={() => setGalleryFilter(cat!)}
                                        >
                                            <div className="aspect-square rounded-xl md:rounded-2xl overflow-hidden relative shadow-md">
                                                <AnimatedImage
                                                    src={firstImage.src}
                                                    alt={cat!}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 md:p-4">
                                                    <h4 className="text-white font-['Playfair_Display'] text-sm md:text-lg font-semibold shadow-black drop-shadow-md">{cat}</h4>
                                                    <p className="text-white/80 text-[10px] md:text-xs">{imageCount} Items</p>
                                                </div>
                                                <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md rounded-full w-6 h-6 flex items-center justify-center border border-white/30">
                                                    <span className="text-white text-xs">📁</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                // Filtering by a specific category
                                GALLERY_IMAGES
                                    .filter(img => img.category === galleryFilter)
                                    .map((img, i) => (
                                        <div
                                            key={i}
                                            className="animate-fadeUp"
                                            style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'both' }}
                                        >
                                            <AnimatedImage
                                                src={img.src}
                                                alt={img.label}
                                                className="aspect-square rounded-xl md:rounded-2xl cursor-pointer"
                                                onClick={() => setSelectedImage(img)}
                                            />
                                        </div>
                                    ))
                            )}
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



                    {/* 🍽️ Dining & Restaurant */}
                    <div className="px-4 md:px-12 lg:px-20 mb-6">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="h-1 w-8 rounded-full bg-[#E8760A]" />
                            <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-[#1A0A00]">Dining & Restaurant</h3>
                            <div className="h-1 flex-1 rounded-full bg-[#FFE5C0]" />
                        </div>
                        <p className="text-xs md:text-sm text-[#7A5230] mb-4 ml-10">{DINING.cuisine}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                            {DINING.timings.map((t, i) => (
                                <div key={i} className="bg-white rounded-2xl shadow-sm border border-[#FFE5C0] p-4 md:p-5 flex items-center gap-3 hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-[#FFF2E0] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{t.icon}</div>
                                    <div>
                                        <div className="text-sm md:text-base font-bold text-[#1A0A00]">{t.meal}</div>
                                        {t.time && <div className="text-xs md:text-sm text-[#7A5230]">{t.time}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gradient-to-r from-[#FFF8F0] to-[#FFF2E0] rounded-2xl shadow-md border-2 border-[#E8760A]/30 p-5 md:p-6 mt-2">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-2xl">🛵</span>
                                <h4 className="text-base md:text-lg font-bold text-[#1A0A00]">Order Online</h4>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-2 flex-1 md:flex-none">
                                    <span className="text-2xl">💰</span>
                                    <div>
                                        <div className="text-xs text-[#7A5230]">Average Meal Cost</div>
                                        <div className="text-lg md:text-xl font-bold text-[#3D1C00]">{DINING.avgCost}</div>
                                    </div>
                                </div>
                                <div className="h-8 w-px bg-[#FFE5C0] hidden md:block" />
                                <div className="flex flex-wrap gap-4 md:gap-6">
                                    {/* Zomato */}
                                    <a
                                        href={DINING.delivery[0]?.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-6 py-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border-2"
                                        style={{ background: '#FFFFFF', borderColor: '#E23744' }}
                                    >
                                        {/* @ts-ignore */}
                                        <img src={DINING.delivery[0]?.logo} alt="Zomato Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                                        <span className="text-base md:text-lg font-bold" style={{ color: '#E23744' }}>Zomato</span>
                                    </a>
                                    {/* Swiggy */}
                                    <a
                                        href={DINING.delivery[1]?.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-6 py-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border-2"
                                        style={{ background: '#FFFFFF', borderColor: '#FC8019' }}
                                    >
                                        {/* @ts-ignore */}
                                        <img src={DINING.delivery[1]?.logo} alt="Swiggy Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                                        <span className="text-base md:text-lg font-bold" style={{ color: '#FC8019' }}>Swiggy</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 🏨 Book on Multiple Platforms */}
                    <div className="mx-4 md:mx-12 lg:mx-20 mb-6 p-5 md:p-8 rounded-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0A00, #3D1C00)' }}>
                        <div className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 border-2 border-white/10 rounded-full -mr-10 -mt-10" />
                        <div className="relative">
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

                    {/* 📍 Nearby Attractions */}
                    <div className="px-4 md:px-12 lg:px-20 mb-6">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="h-1 w-8 rounded-full bg-[#E8760A]" />
                            <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-[#1A0A00]">Nearby Attractions</h3>
                            <div className="h-1 flex-1 rounded-full bg-[#FFE5C0]" />
                        </div>
                        <p className="text-xs md:text-sm text-[#7A5230] mb-4 ml-10">Explore Puri and beyond</p>
                        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-2">
                            {NEARBY_ATTRACTIONS.map((a, i) => (
                                <a
                                    key={i}
                                    href={a.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block group relative rounded-lg overflow-hidden aspect-square shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 bg-white border border-[#FFE5C0]/50"
                                >
                                    {/* Background Image Container */}
                                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                                        <div
                                            className="w-full h-full bg-cover bg-center bg-no-repeat"
                                            style={{ backgroundImage: `url(${a.image})` }}
                                        />
                                    </div>

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                                    {/* Top Icon Badge */}
                                    <div className="absolute top-1.5 left-1.5 w-4 h-4 md:w-5 md:h-5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-[8px] md:text-[10px] shadow-lg">
                                        {a.icon}
                                    </div>

                                    {/* Distance Badge */}
                                    <div className="absolute top-1.5 right-1.5 bg-black/40 backdrop-blur-md text-white text-[7px] md:text-[8px] px-1 py-0.5 rounded-full font-semibold border border-white/10">
                                        {a.distance}
                                    </div>

                                    {/* Content (Bottom aligned) */}
                                    <div className="absolute bottom-0 left-0 right-0 p-1.5 md:p-2 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                                        <h4 className="text-white font-bold text-[8px] md:text-[9px] leading-tight mb-0.5 truncate">{a.name}</h4>
                                        <div className="flex items-center gap-0.5 text-[#FFE5C0] text-[6px] md:text-[7px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span>Open Map</span>
                                            <span className="text-[5px]">↗</span>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 🚗 How to Reach */}
                    <div className="px-4 md:px-12 lg:px-20 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-4 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="h-1 w-8 rounded-full bg-[#E8760A]" />
                                <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-[#1A0A00]">How to Reach</h3>
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                                <a href="tel:+919437388224" className="bg-white border border-[#E8760A] text-[#1A0A00] px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 hover:bg-[#FFF2E0] transition-all shadow-sm whitespace-nowrap flex-shrink-0 transform active:scale-95">
                                    <Phone size={14} className="text-[#E8760A]" /> Book An E-Rickshaw
                                </a>
                                <a href="tel:+919437388224" className="bg-[#E8760A] text-white px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md whitespace-nowrap flex-shrink-0 transform active:scale-95">
                                    <Phone size={14} /> Book A Car
                                </a>
                            </div>
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

                </div>{/* end relative z-10 */}
            </div>{/* end background image wrapper */}
        </div >
    );
};
