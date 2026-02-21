import { HOTEL_INFO, hotelLogo } from '../data/constants';
import { useAppState } from '../hooks/useAppState';

interface ContactPageProps {
    state: ReturnType<typeof useAppState>;
}

const WhatsAppIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export const ContactPage = ({ state }: ContactPageProps) => {
    const { form, setForm, success, handleSubmit } = state;

    return (
        <div className="animate-fadeUp overflow-y-auto pb-20">

            <div className="relative min-h-[180px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0A00, #3D1C00)' }}>
                <div className="relative z-10 px-5 py-6">
                    <div className="inline-block bg-[#D4A017]/20 border border-[#D4A017]/30 text-[#D4A017] text-xs px-3 py-1 rounded-full mb-3">Get in Touch</div>
                    <h1 className="font-['Playfair_Display'] text-2xl font-semibold text-white mb-2">Contact &amp; About Us</h1>
                    <p className="text-white/70 text-sm">We're here to help with your divine journey</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#FFFCF7] rounded-t-3xl" />
            </div>

            <div className="px-4 -mt-4">
                {/* About section */}
                <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
                    {/* Logo + name */}
                    <div className="flex items-center gap-4 mb-4">
                        <img
                            src={hotelLogo}
                            alt="Hotel Amruta Bhojana Logo"
                            className="w-16 h-16 rounded-full object-contain bg-white border-2 border-[#D4A017]/50 shadow-md flex-shrink-0 p-1 animate-fadeIn"
                        />
                        <div>
                            <h2 className="font-['Playfair_Display'] text-lg font-semibold text-[#1A0A00] leading-tight">
                                Hotel <em className="text-[#E8760A] not-italic">Amruta Bhojana</em>
                            </h2>
                            <div className="flex gap-0.5 mt-1">
                                {[...Array(5)].map((_, i) => <span key={i} className={`text-sm ${i < 4 ? 'text-[#D4A017]' : 'text-[#FFE5C0]'}`}>★</span>)}
                            </div>
                        </div>
                    </div>
                    <p className="text-xs font-semibold text-[#7A5230] mb-4">{HOTEL_INFO.rating} out of 5 · {HOTEL_INFO.reviewCount} Google Reviews</p>
                    <p className="text-sm text-[#7A5230] leading-relaxed mb-4">
                        Located steps away from the sacred Jagannath Temple in Puri, Hotel Amruta Bhojana offers comfortable accommodations for pilgrims and travelers. We pride ourselves on cleanliness, hospitality, and providing an authentic spiritual experience.
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                        {[['4.7', 'Rating'], ['318', 'Reviews'], ['24/7', 'Service']].map(([val, label]) => (
                            <div key={label} className="bg-[#FFF2E0] rounded-xl p-3 text-center">
                                <div className="font-['Playfair_Display'] text-2xl font-bold text-[#E8760A] mb-1">{val}</div>
                                <div className="text-[10px] text-[#7A5230]">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Check-in/out */}
                <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
                    <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#1A0A00] mb-4">Check-in &amp; Check-out</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-xs text-[#7A5230] mb-1">Check-in from</div>
                            <div className="text-2xl font-['Playfair_Display'] font-bold text-[#E8760A]">{HOTEL_INFO.checkin}</div>
                        </div>
                        <div>
                            <div className="text-xs text-[#7A5230] mb-1">Check-out until</div>
                            <div className="text-2xl font-['Playfair_Display'] font-bold text-[#E8760A]">{HOTEL_INFO.checkout}</div>
                        </div>
                    </div>
                </div>

                {/* Location — Google Maps embed */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-4">
                    <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                        <div>
                            <h3 className="font-['Playfair_Display'] text-base font-semibold text-[#1A0A00]">📍 Our Location</h3>
                            <p className="text-[10px] text-[#7A5230] mt-0.5">{HOTEL_INFO.address}</p>
                        </div>
                        <a
                            href={HOTEL_INFO.maps}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 bg-[#1A0A00] text-white text-[10px] font-semibold px-3 py-1.5 rounded-full transition-transform active:scale-95"
                        >
                            Open Maps
                        </a>
                    </div>
                    {/* Google Maps iframe embed */}
                    <div className="w-full" style={{ height: 280 }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3753.7599320199656!2d85.8200545!3d19.8077735!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19c7003d7d26d7%3A0xe071fee0c0e5b665!2sHotel%20Amruta%20Bhojana!5e0!3m2!1sen!2sin!4v1771647599605!5m2!1sen!2sin"
                            width="100%"
                            height="280"
                            style={{ border: 0, display: 'block' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Hotel Amruta Bhojana Location Map"
                        />
                    </div>
                </div>

                {/* Contact links */}
                <div className="space-y-3 mb-4">
                    {[
                        { href: `tel:${HOTEL_INFO.phone}`, icon: '📞', label: 'Call Us Now', sub: '+91 94373 88224', bg: 'from-[#E8760A] to-[#F59820]' },
                        { href: `https://wa.me/${HOTEL_INFO.whatsapp}?text=Hi%2C%20I%20would%20like%20to%20make%20a%20booking`, icon: null, label: 'WhatsApp Us', sub: 'Chat instantly on WhatsApp', bg: 'from-[#25D366] to-[#128C7E]', whatsapp: true },
                        { href: HOTEL_INFO.website, icon: '🌐', label: 'Visit Website', sub: 'hotelamrutabhojana.com', bg: 'from-[#E8760A] to-[#F59820]' },
                        { href: `mailto:${HOTEL_INFO.email}`, icon: '✉️', label: 'Email Us', sub: HOTEL_INFO.email, bg: 'from-[#E8760A] to-[#F59820]' },
                        { href: HOTEL_INFO.maps, icon: '📍', label: 'Google Maps', sub: 'Get Directions', bg: 'from-[#E8760A] to-[#F59820]' },
                        { href: HOTEL_INFO.agoda, icon: '🏨', label: 'Book on Agoda', sub: 'Best Price Guarantee', bg: 'from-[#E8760A] to-[#F59820]' },
                    ].map((item, i) => (
                        <a
                            key={i}
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4 border border-[#FFE5C0] transition-transform active:scale-95"
                        >
                            <div className={`w-12 h-12 bg-gradient-to-br ${item.bg} rounded-xl flex items-center justify-center text-xl`}>
                                {item.whatsapp ? <WhatsAppIcon /> : item.icon}
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-semibold text-[#1A0A00]">{item.label}</div>
                                <div className="text-xs text-[#7A5230]">{item.sub}</div>
                            </div>
                            <span className="text-[#E8760A]">→</span>
                        </a>
                    ))}
                </div>

                {/* Contact form */}
                <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
                    <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#1A0A00] mb-4">Send us a Message</h3>
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="First Name" value={form.fname} onChange={e => setForm({ ...form, fname: e.target.value })} className="px-4 py-3 border border-[#FFE5C0] rounded-xl text-sm focus:outline-none focus:border-[#E8760A] text-[#1A0A00]" />
                            <input type="text" placeholder="Last Name" value={form.lname} onChange={e => setForm({ ...form, lname: e.target.value })} className="px-4 py-3 border border-[#FFE5C0] rounded-xl text-sm focus:outline-none focus:border-[#E8760A] text-[#1A0A00]" />
                        </div>
                        <input type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 border border-[#FFE5C0] rounded-xl text-sm focus:outline-none focus:border-[#E8760A] text-[#1A0A00]" />
                        <input type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border border-[#FFE5C0] rounded-xl text-sm focus:outline-none focus:border-[#E8760A] text-[#1A0A00]" />
                        <textarea placeholder="Your Message" rows={4} value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} className="w-full px-4 py-3 border border-[#FFE5C0] rounded-xl text-sm focus:outline-none focus:border-[#E8760A] resize-none text-[#1A0A00]" />
                        <button onClick={handleSubmit} className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-transform active:scale-95" style={{ background: 'linear-gradient(135deg, #1A0A00, #E8760A)' }}>
                            ✉️ Send Message
                        </button>
                    </div>
                    {success && (
                        <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                            <div className="text-2xl mb-2">✓</div>
                            <div className="text-sm font-semibold text-green-800">Message sent successfully!</div>
                            <div className="text-xs text-green-600 mt-1">We'll get back to you soon.</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
