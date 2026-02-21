import { X } from 'lucide-react';
import { PageId } from '../hooks/useAppState';

interface SideMenuProps {
    page: PageId;
    setPage: (p: PageId) => void;
    onClose: () => void;
}

export const SideMenu = ({ page, setPage, onClose }: SideMenuProps) => (
    <>
        <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />
        <div className="fixed top-0 right-0 h-full w-64 bg-white z-[70] shadow-2xl flex flex-col animate-slideDown">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#FFE5C0]">
                <span className="font-['Playfair_Display'] text-base font-semibold text-[#1A0A00]">Menu</span>
                <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FFF2E0] transition-transform active:scale-90"
                >
                    <X size={18} className="text-[#E8760A]" />
                </button>
            </div>

            <div className="flex flex-col gap-1 px-3 py-4 flex-1">
                {[
                    { id: 'home' as PageId, label: '🏠 Home' },
                    { id: 'rooms' as PageId, label: '🛏️ Rooms & Tariff' },
                    { id: 'detail' as PageId, label: '📅 Book Now' },
                    { id: 'contact' as PageId, label: '✉️ Contact Us' },
                ].map(item => (
                    <button
                        key={item.id}
                        onClick={() => { setPage(item.id); onClose(); }}
                        className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all active:scale-95 ${page === item.id ? 'bg-[#FFF2E0] text-[#E8760A]' : 'text-[#3D1C00] hover:bg-[#FFF2E0]'
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="px-5 pb-6 space-y-3">
                <a
                    href="https://wa.me/919437388224?text=Hi%2C%20I%20would%20like%20to%20book%20a%20room%20at%20Hotel%20Amruta%20Bhojana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-sm text-white justify-center transition-transform active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    WhatsApp Us
                </a>
                <a
                    href="tel:+919437388224"
                    className="flex items-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-sm text-white justify-center transition-transform active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #E8760A, #F59820)' }}
                >
                    📞 Call Hotel
                </a>
            </div>
        </div>
    </>
);
