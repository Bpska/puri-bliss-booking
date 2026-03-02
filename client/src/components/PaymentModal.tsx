import { useState, useEffect } from 'react';
import { X, CreditCard, Smartphone, Copy, Check, ChevronRight } from 'lucide-react';
import qrImage from '../images/phonepe-qr.jpeg';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    roomName?: string;
    roomPrice?: number;
}

export const PaymentModal = ({ isOpen, onClose, roomName, roomPrice }: PaymentModalProps) => {
    const [tab, setTab] = useState<'upi' | 'bank'>('upi');
    const [copied, setCopied] = useState<string | null>(null);
    const [animState, setAnimState] = useState<'entering' | 'visible' | 'exiting'>('entering');

    useEffect(() => {
        if (isOpen) {
            setAnimState('entering');
            requestAnimationFrame(() => setAnimState('visible'));
        }
    }, [isOpen]);

    const handleClose = () => {
        setAnimState('exiting');
        setTimeout(onClose, 300);
    };

    const copyText = (text: string, label: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(label);
            setTimeout(() => setCopied(null), 2000);
        });
    };

    if (!isOpen) return null;

    const bankDetails = [
        { label: 'Bank', value: 'HDFC Bank' },
        { label: 'Account Type', value: 'Current Account' },
        { label: 'Account Number', value: '50200109160912' },
        { label: 'Account Name', value: 'HOTEL AMRUTA BHOJANA' },
        { label: 'IFSC Code', value: 'HDFC0001117' },
    ];

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-end md:items-center justify-center transition-all duration-300 ${animState === 'visible' ? 'bg-black/60 backdrop-blur-sm' : animState === 'exiting' ? 'bg-transparent' : 'bg-black/0'
                }`}
            onClick={handleClose}
        >
            <div
                onClick={e => e.stopPropagation()}
                className={`w-full max-w-lg bg-[#FFFCF7] rounded-t-3xl md:rounded-3xl shadow-2xl transition-all duration-300 max-h-[90vh] overflow-y-auto ${animState === 'visible'
                    ? 'translate-y-0 opacity-100 scale-100'
                    : animState === 'exiting'
                        ? 'translate-y-full md:translate-y-0 md:scale-95 opacity-0'
                        : 'translate-y-full md:translate-y-8 md:scale-95 opacity-0'
                    }`}
            >
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-[#1A0A00] to-[#3D1C00] rounded-t-3xl px-5 pt-5 pb-4 z-10">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <div className="text-[10px] text-[#D4A017] font-semibold uppercase tracking-wider mb-0.5">Secure Payment</div>
                            <h2 className="font-['Playfair_Display'] text-xl font-bold text-white">Book Your Stay</h2>
                        </div>
                        <button onClick={handleClose} className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
                            <X size={18} className="text-white" />
                        </button>
                    </div>
                    {roomName && (
                        <div className="bg-white/10 rounded-xl px-4 py-3 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-white/80 text-sm">{roomName}</span>
                                {roomPrice && <span className="text-white/60 text-sm">₹{roomPrice.toLocaleString()}/night</span>}
                            </div>
                            {roomPrice && (
                                <>
                                    <div className="border-t border-white/10 pt-2 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-white/50 text-xs">Room Tariff</span>
                                            <span className="text-white/70 text-xs">₹{roomPrice.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-white/50 text-xs">GST (5%)</span>
                                            <span className="text-white/70 text-xs">₹{Math.round(roomPrice * 0.05).toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="border-t border-white/20 pt-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[#F59820] text-sm font-bold">Total Payable</span>
                                            <span className="text-[#F59820] font-bold text-lg">₹{Math.round(roomPrice * 1.05).toLocaleString()}</span>
                                        </div>
                                        <p className="text-[9px] text-white/40 mt-1">* Inclusive of 5% GST as per Government norms</p>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                    {/* Tabs */}
                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={() => setTab('upi')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'upi' ? 'bg-white text-[#1A0A00]' : 'bg-white/10 text-white/60 hover:bg-white/15'}`}
                        >
                            <Smartphone size={16} /> UPI / QR Code
                        </button>
                        <button
                            onClick={() => setTab('bank')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'bank' ? 'bg-white text-[#1A0A00]' : 'bg-white/10 text-white/60 hover:bg-white/15'}`}
                        >
                            <CreditCard size={16} /> Bank Transfer
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* ── UPI Tab ──────────────────────────────── */}
                    {tab === 'upi' && (
                        <div className="animate-fadeUp">
                            <div className="text-center mb-4">
                                <p className="text-sm text-[#7A5230]">Scan the QR code below using any UPI app</p>
                            </div>

                            {/* QR Code */}
                            <div className="bg-white rounded-2xl shadow-lg border border-[#FFE5C0] p-6 text-center mb-4">
                                {/* PhonePe logo */}
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <div className="w-10 h-10 bg-[#5f259f] rounded-full flex items-center justify-center">
                                        <span className="text-white text-lg font-bold">₱</span>
                                    </div>
                                    <span className="text-[#5f259f] font-bold text-lg">PhonePe</span>
                                </div>

                                <div className="inline-block bg-[#F59820] text-white text-sm font-semibold px-5 py-1.5 rounded-full mb-4">
                                    Hotel Amruta Bhojana
                                </div>

                                {/* QR Code Image or Placeholder */}
                                <div className="mx-auto w-56 h-56 md:w-64 md:h-64 bg-white rounded-xl border-2 border-[#E8760A]/20 flex items-center justify-center overflow-hidden mb-3">
                                    <img src={qrImage} alt="PhonePe QR Code - Hotel Amruta Bhojana" className="w-full h-full object-contain" />
                                </div>

                                <div className="flex items-center justify-center gap-2 text-[10px] text-[#7A5230]/60">
                                    <span>BHIM UPI</span>
                                    <span>·</span>
                                    <span>Terminal 10-Q465011369</span>
                                </div>
                            </div>

                            <div className="bg-[#FFF2E0] rounded-xl p-3 text-center">
                                <p className="text-xs text-[#7A5230]">
                                    <span className="font-bold text-[#E8760A]">Supported Apps:</span> PhonePe, Google Pay, Paytm, BHIM, and all UPI apps
                                </p>
                            </div>
                        </div>
                    )}

                    {/* ── Bank Transfer Tab ───────────────────── */}
                    {tab === 'bank' && (
                        <div className="animate-fadeUp">
                            <div className="text-center mb-4">
                                <p className="text-sm text-[#7A5230]">Transfer to the following bank account</p>
                            </div>

                            {/* HDFC Logo */}
                            <div className="bg-white rounded-2xl shadow-lg border border-[#FFE5C0] overflow-hidden mb-4">
                                <div className="bg-gradient-to-r from-[#004B87] to-[#0070C0] px-5 py-3 flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                        <CreditCard size={18} className="text-[#004B87]" />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm">HDFC Bank</div>
                                        <div className="text-white/70 text-[10px]">Current Account</div>
                                    </div>
                                </div>

                                <div className="p-4 space-y-3">
                                    {bankDetails.map((item) => (
                                        <div key={item.label} className="flex items-center justify-between py-2 border-b border-[#FFE5C0] last:border-0">
                                            <div>
                                                <div className="text-[10px] text-[#7A5230] uppercase tracking-wider">{item.label}</div>
                                                <div className="text-sm font-bold text-[#1A0A00] mt-0.5">{item.value}</div>
                                            </div>
                                            <button
                                                onClick={() => copyText(item.value, item.label)}
                                                className="w-8 h-8 bg-[#FFF2E0] rounded-lg flex items-center justify-center hover:bg-[#FFE5C0] transition-colors"
                                                title={`Copy ${item.label}`}
                                            >
                                                {copied === item.label
                                                    ? <Check size={14} className="text-green-600" />
                                                    : <Copy size={14} className="text-[#E8760A]" />
                                                }
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#FFF2E0] rounded-xl p-3 text-center">
                                <p className="text-xs text-[#7A5230]">
                                    <span className="font-bold text-[#E8760A]">Note:</span> Please share the payment screenshot on WhatsApp for booking confirmation
                                </p>
                            </div>
                        </div>
                    )}

                    {/* WhatsApp CTA */}
                    <a
                        href="https://wa.me/919437388224?text=Hi%2C%20I%20have%20made%20a%20payment%20for%20booking.%20Please%20confirm%20my%20reservation."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-xl font-bold text-sm hover:shadow-lg active:scale-[0.98] transition-all"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                        Confirm Booking on WhatsApp
                        <ChevronRight size={16} />
                    </a>
                </div>
            </div>
        </div>
    );
};
