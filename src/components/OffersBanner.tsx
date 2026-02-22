import { useEffect, useState } from 'react';
import { getActiveOffers, Offer } from '../data/adminStore';

export const OffersBanner = () => {
    const [offers, setOffers] = useState<Offer[]>([]);

    useEffect(() => {
        // Read offers and refresh every 2 seconds (in case admin updates)
        const load = () => setOffers(getActiveOffers());
        load();
        const interval = setInterval(load, 2000);
        return () => clearInterval(interval);
    }, []);

    if (offers.length === 0) return null;

    const text = offers.map(o => o.text).join('   ✦   ');

    return (
        <div className="w-full bg-gradient-to-r from-[#1A0A00] via-[#3D1C00] to-[#1A0A00] text-white overflow-hidden z-50 relative">
            <div className="flex items-center h-9 md:h-10">
                <div className="flex-shrink-0 bg-[#E8760A] px-3 md:px-4 h-full flex items-center gap-1.5 z-10">
                    <span className="text-xs md:text-sm">🔥</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Offers</span>
                </div>
                <div className="flex-1 overflow-hidden">
                    <div
                        className="whitespace-nowrap animate-marquee"
                        style={{
                            display: 'inline-block',
                            animation: `marquee ${Math.max(15, text.length * 0.15)}s linear infinite`,
                        }}
                    >
                        <span className="text-xs md:text-sm font-medium text-[#FFE5C0] px-8">
                            {text}   ✦   {text}
                        </span>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
};
