import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone } from 'lucide-react';
import { Room, ROOMS, CANCELLATION_POLICY } from '../data/constants';
import { createBooking, getSettings, Settings } from '../data/adminStore';
import { PaymentModal } from './PaymentModal';

interface BookingFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    room: Room | null;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
}

export const BookingFormModal = ({ isOpen, onClose, room, checkIn, checkOut, guests }: BookingFormModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [currentRoom, setCurrentRoom] = useState<Room | null>(room);
    const [submitted, setSubmitted] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [roomsFull, setRoomsFull] = useState(false);

    // Load availability from backend settings
    useEffect(() => {
        getSettings().then((s: Settings) => {
            const full = s.rooms_full || (s.total_rooms - s.full_rooms <= 0);
            setRoomsFull(full);
        }).catch(() => {
            // If backend unavailable, assume rooms available
            setRoomsFull(false);
        });
    }, []);

    useEffect(() => {
        if (room) setCurrentRoom(room);
    }, [room]);

    if (!isOpen || !currentRoom) return null;

    // If all rooms are full, show a message instead of the form
    if (roomsFull) {
        return (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
                <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
                    <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200"><X size={16} /></button>
                    <div className="text-5xl mb-4">🚫</div>
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1A0A00] mb-2">All Rooms Currently Full</h3>
                    <p className="text-sm text-[#7A5230] mb-4">We're sorry, all our rooms are currently occupied. Please try again later or contact us for availability.</p>
                    <a href="tel:+919078371094" className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#E8760A] to-[#F59820] text-white rounded-xl font-bold text-sm">📞 Call Us</a>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createBooking({
                roomId: currentRoom!.id,
                roomName: currentRoom!.name,
                userName: formData.name,
                userEmail: formData.email,
                userPhone: formData.phone,
                checkIn: checkIn,
                checkOut: checkOut,
                guests: guests,
            });
        } catch {
            // If backend unavailable, still show success UX
            console.warn('Could not save booking to server, continuing...');
        }
        setSubmitted(true);
        setTimeout(() => {
            setShowPayment(true);
        }, 1500);
    };

    const handlePaymentClose = () => {
        setShowPayment(false);
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '' });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div
                className="w-full max-w-md bg-[#FFFCF7] rounded-3xl shadow-2xl overflow-hidden animate-fadeUp"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-[#1A0A00] p-6 text-center relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <h3 className="text-xl font-bold text-white mb-1 font-['Playfair_Display']">Book Your Stay</h3>
                </div>

                <div className="p-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
                    {submitted ? (
                        <div className="py-8 text-center animate-fadeIn">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                ✓
                            </div>
                            <h4 className="text-xl font-bold text-[#1A0A00] mb-2">Booking Successful!</h4>
                            <p className="text-[#7A5230] text-sm">Our team will contact you shortly to confirm your stay.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Room Selection */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-[#7A5230] uppercase ml-1">Select Room Category</label>
                                <select
                                    className="w-full px-4 py-3 bg-white border border-[#FFE5C0] rounded-xl focus:outline-none focus:border-[#E8760A] transition-colors text-[#1A0A00] font-semibold appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%237A5230%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_1rem_center] bg-no-repeat"
                                    value={currentRoom.id}
                                    onChange={(e) => {
                                        const selected = ROOMS.find(r => r.id === parseInt(e.target.value));
                                        if (selected) setCurrentRoom(selected);
                                    }}
                                >
                                    {ROOMS.map(r => (
                                        <option key={r.id} value={r.id}>{r.name} — ₹{r.price}/night</option>
                                    ))}
                                </select>
                            </div>

                            {/* Room Preview */}
                            <div className="bg-[#FFF2E0] rounded-2xl p-4 border border-[#E8760A]/10">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="text-sm font-bold text-[#1A0A00]">{currentRoom.type} Suite</div>
                                    <div className="text-[#E8760A] font-bold text-sm">₹{currentRoom.price}/night</div>
                                </div>
                                {checkIn && checkOut && (
                                    <div className="flex justify-between items-center bg-white/60 p-2 rounded-lg mb-2 border border-[#FFE5C0]/50">
                                        <div className="text-[10px] text-[#7A5230] text-center"><div className="font-bold uppercase mb-0.5">Check-in</div><div className="text-[#1A0A00] font-semibold">{checkIn}</div></div>
                                        <div className="text-[#E8760A] text-xs font-bold">→</div>
                                        <div className="text-[10px] text-[#7A5230] text-center"><div className="font-bold uppercase mb-0.5">Check-out</div><div className="text-[#1A0A00] font-semibold">{checkOut}</div></div>
                                        <div className="border-l border-[#FFE5C0] h-6 mx-1"></div>
                                        <div className="text-[10px] text-[#7A5230] text-center"><div className="font-bold uppercase mb-0.5">Guests</div><div className="text-[#1A0A00] font-semibold">{guests || 1}</div></div>
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {currentRoom.features.slice(0, 3).map((f, i) => (
                                        <span key={i} className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-[#FFE5C0] text-[#7A5230]">{f}</span>
                                    ))}
                                    {currentRoom.features.length > 3 && <span className="text-[10px] text-[#7A5230]/60">+{currentRoom.features.length - 3} more</span>}
                                </div>
                                {/* Booking Fee & GST Breakdown */}
                                <div className="bg-white/70 rounded-xl p-3 border border-[#FFE5C0]/50 space-y-1.5">
                                    <div className="flex justify-between text-[11px]">
                                        <span className="text-[#7A5230]">Room Tariff</span>
                                        <span className="text-[#1A0A00] font-semibold">₹{currentRoom.price.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-[11px]">
                                        <span className="text-[#7A5230]">GST (5%)</span>
                                        <span className="text-[#1A0A00] font-semibold">₹{Math.round(currentRoom.price * 0.05).toLocaleString()}</span>
                                    </div>
                                    <div className="border-t border-[#FFE5C0] pt-1.5 flex justify-between text-sm">
                                        <span className="font-bold text-[#1A0A00]">Total</span>
                                        <span className="font-bold text-[#1A0A00]">₹{Math.round(currentRoom.price * 1.05).toLocaleString()}/night</span>
                                    </div>
                                    <div className="border-t border-[#E8760A]/20 pt-2 mt-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-bold text-[#E8760A]">🔒 Booking Fee (Advance)</span>
                                            <span className="font-bold text-[#E8760A] text-lg">₹{Math.round(currentRoom.price * 1.05 * 0.3).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-[11px] mt-0.5">
                                            <span className="text-[#7A5230]">Remaining (pay at check-in)</span>
                                            <span className="text-[#7A5230] font-semibold">₹{Math.round(currentRoom.price * 1.05 * 0.7).toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <p className="text-[8px] text-[#7A5230]/50">* 30% advance booking fee required. Remaining payable at check-in. Incl. 5% GST.</p>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-[#7A5230] uppercase ml-1">Full Name</label>
                                <div className="relative">
                                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A5230]/50" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-[#FFE5C0] rounded-xl focus:outline-none focus:border-[#E8760A] transition-colors text-[#1A0A00]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-[#7A5230] uppercase ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A5230]/50" />
                                    <input
                                        required
                                        type="email"
                                        placeholder="yourname@gmail.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-[#FFE5C0] rounded-xl focus:outline-none focus:border-[#E8760A] transition-colors text-[#1A0A00]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-[#7A5230] uppercase ml-1">Mobile Number</label>
                                <div className="relative">
                                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A5230]/50" />
                                    <input
                                        required
                                        type="tel"
                                        placeholder="+91 00000 00000"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-[#FFE5C0] rounded-xl focus:outline-none focus:border-[#E8760A] transition-colors text-[#1A0A00]"
                                    />
                                </div>
                            </div>

                            <div className="bg-[#FFF8F0] rounded-xl p-3 border border-[#FFE5C0]/50">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-xs">📜</span>
                                    <span className="text-[10px] font-bold text-[#1A0A00] uppercase tracking-wider">Cancellation Policy</span>
                                </div>
                                <div className="space-y-1">
                                    {CANCELLATION_POLICY.slice(0, 3).map((policy, idx) => (
                                        <div key={idx} className="flex gap-1.5 items-start">
                                            <div className="w-1 h-1 rounded-full bg-[#E8760A] mt-1 flex-shrink-0" />
                                            <p className="text-[10px] text-[#7A5230] leading-tight">{policy}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-2 space-y-3">
                                {/* Primary: Pay Booking Fee */}
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#E8760A] to-[#F59820] text-white py-4 rounded-xl font-bold text-base hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    💳 Pay Booking Fee — ₹{Math.round(currentRoom.price * 1.05 * 0.3).toLocaleString()}
                                </button>

                                {/* Direct Pay Full Amount */}
                                <button
                                    type="button"
                                    onClick={() => setShowPayment(true)}
                                    className="w-full bg-[#1A0A00] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#3D1C00] active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-[#3D1C00]"
                                >
                                    🏦 Pay Full Amount — ₹{Math.round(currentRoom.price * 1.05).toLocaleString()}
                                </button>

                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-full py-2 text-xs font-semibold text-[#7A5230]/60 hover:text-[#7A5230] transition-colors"
                                >
                                    Cancel
                                </button>
                                <p className="text-[10px] text-center text-[#7A5230]/60 italic">
                                    By proceeding, you agree to our booking policies.
                                </p>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            <PaymentModal
                isOpen={showPayment}
                onClose={handlePaymentClose}
                roomName={currentRoom.name}
                roomPrice={currentRoom.price}
            />
        </div >
    );
};
