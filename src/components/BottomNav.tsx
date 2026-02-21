import { Home as HomeIcon, Bed, Hotel, MessageSquare } from 'lucide-react';
import { PageId } from '../hooks/useAppState';

interface BottomNavProps {
    page: PageId;
    setPage: (p: PageId) => void;
}

export const BottomNav = ({ page, setPage }: BottomNavProps) => (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white shadow-[0_-4px_20px_rgba(26,10,0,0.08)] pb-5 pt-2 z-50">
        <div className="flex justify-around items-center">
            {[
                { id: 'home' as PageId, icon: HomeIcon, label: 'Home' },
                { id: 'rooms' as PageId, icon: Bed, label: 'Rooms' },
                { id: 'detail' as PageId, icon: Hotel, label: 'Book' },
                { id: 'contact' as PageId, icon: MessageSquare, label: 'Contact' },
            ].map(({ id, icon: Icon, label }) => (
                <button
                    key={id}
                    onClick={() => setPage(id)}
                    className={`flex flex-col items-center gap-1 relative transition-transform active:scale-90 ${page === id ? 'text-[#E8760A]' : 'text-[#7A5230]'}`}
                >
                    {page === id && <div className="absolute -top-2 w-12 h-0.5 bg-[#E8760A] rounded-full" />}
                    <Icon size={22} strokeWidth={1.8} />
                    <span className="text-[10px] font-medium">{label}</span>
                </button>
            ))}
        </div>
    </div>
);
