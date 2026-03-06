import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { hotelLogo } from '../data/constants';

interface BookNowPopupProps {
    openBookingModal: () => void;
}

export const BookNowPopup = ({ openBookingModal }: BookNowPopupProps) => {
    const [showPopup, setShowPopup] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [animState, setAnimState] = useState<'hidden' | 'entering' | 'visible' | 'exiting'>('hidden');

    useEffect(() => {
        // Check if popup was dismissed in this session
        const wasShown = sessionStorage.getItem('hab_popup_dismissed');
        if (wasShown) return;

        // Show popup after 4 seconds
        const timer = setTimeout(() => {
            setShowPopup(true);
            setAnimState('entering');
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setAnimState('visible'));
            });
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const dismissPopup = () => {
        setAnimState('exiting');
        setTimeout(() => {
            setShowPopup(false);
            setDismissed(true);
            sessionStorage.setItem('hab_popup_dismissed', 'true');
        }, 300);
    };

    const handleBookNow = () => {
        dismissPopup();
        setTimeout(() => openBookingModal(), 350);
    };

    return (
        <>
            {/* Floating Book Now Popup */}
            {showPopup && !dismissed && (
                <div
                    className={`fixed inset-0 z-[90] flex items-center justify-center px-4 transition-all duration-300 ${animState === 'visible' ? 'bg-black/50 backdrop-blur-sm' : animState === 'exiting' ? 'bg-transparent' : 'bg-black/0'
                        }`}
                    onClick={dismissPopup}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        className={`w-full max-w-sm bg-[#FFFCF7] rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${animState === 'visible'
                            ? 'scale-100 opacity-100 translate-y-0'
                            : animState === 'exiting'
                                ? 'scale-90 opacity-0 translate-y-4'
                                : 'scale-90 opacity-0 translate-y-8'
                            }`}
                    >
                        {/* Close button */}
                        <button
                            onClick={dismissPopup}
                            className="absolute top-3 right-3 w-8 h-8 bg-black/20 rounded-full flex items-center justify-center z-10 hover:bg-black/30 transition-colors"
                        >
                            <X size={16} className="text-white" />
                        </button>

                        {/* Top solid branded banner */}
                        <div className="relative bg-[#1A0A00] px-6 py-8 text-center overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 border-2 border-white/10 rounded-full -mr-8 -mt-8" />
                            <div className="absolute bottom-0 left-0 w-16 h-16 border border-white/5 rounded-full -ml-4 -mb-4" />

                            <div className="relative flex flex-col items-center">
                                <div className="w-24 h-24 rounded-2xl bg-white p-2 mb-4 shadow-lg overflow-hidden flex items-center justify-center">
                                    <img src={hotelLogo} alt="Hotel Amruta Bhojana" className="w-full h-full object-contain" />
                                </div>
                                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-white mb-2 leading-tight">
                                    Book Your <span className="text-[#F59820]">Divine Stay</span>
                                </h3>
                                <p className="text-white/70 text-xs leading-relaxed">
                                    100m from Jagannath Temple · Pure Veg Restaurant · 24/7 Service
                                </p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="px-6 py-5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex -space-x-1">
                                    {['⭐', '⭐', '⭐', '⭐', '⭐'].map((s, i) => (
                                        <span key={i} className="text-sm">{s}</span>
                                    ))}
                                </div>
                                <span className="text-xs text-[#7A5230] font-medium">5-Star Rated · 318 Reviews</span>
                            </div>

                            <div className="bg-[#FFF2E0] rounded-xl p-3 mb-4 flex items-center gap-3">
                                <span className="text-2xl">🏷️</span>
                                <div>
                                    <div className="text-sm font-bold text-[#1A0A00]">Rooms from ₹1,800/night</div>
                                    <div className="text-[10px] text-[#7A5230]">Deluxe, Standard & Economy available</div>
                                </div>
                            </div>

                            <button
                                onClick={handleBookNow}
                                className="w-full bg-gradient-to-r from-[#E8760A] to-[#F59820] text-white py-3.5 rounded-xl font-bold text-base hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                Book Now — Pay Securely
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </button>

                            <button
                                onClick={dismissPopup}
                                className="w-full mt-2 py-2 text-xs font-semibold text-[#7A5230]/60 hover:text-[#7A5230] transition-colors"
                            >
                                Maybe later, thanks
                            </button>

                            <p className="text-center text-[10px] text-[#7A5230]/60 mt-2">
                                Pay via UPI (PhonePe, GPay) or Bank Transfer
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
