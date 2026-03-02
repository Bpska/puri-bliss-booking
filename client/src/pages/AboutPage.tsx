import { HOTEL_INFO, hotelLogo } from '../data/constants';
import { useAppState } from '../hooks/useAppState';
import { Phone, MapPin, Star, Coffee, Wifi, Shield, Wind, Droplets, CheckCircle, Navigation } from 'lucide-react';

interface AboutPageProps {
    state: ReturnType<typeof useAppState>;
}

export const AboutPage = ({ state }: AboutPageProps) => {
    const { setPage } = state;

    return (
        <div className="animate-fadeUp overflow-y-auto pb-20 md:pb-6">
            {/* Hero Section */}
            <div className="relative min-h-[180px] md:min-h-[240px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0A00, #3D1C00)' }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(232,118,10,0.15),transparent_60%)]" />
                <div className="relative z-10 px-5 py-6 md:px-12 lg:px-20 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <img
                            src={hotelLogo}
                            alt="Hotel Amruta Bhojana Logo"
                            onClick={() => {
                                setPage('home');
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                            }}
                            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-contain bg-white border-2 border-[#D4A017]/60 shadow-lg p-1 cursor-pointer transition-transform active:scale-95"
                        />
                        <div>
                            <h1 className="font-['Playfair_Display'] text-2xl md:text-4xl font-semibold text-white mb-2">About Us</h1>
                            <p className="text-white/80 text-sm md:text-base max-w-2xl leading-relaxed">
                                Thank you for choosing Hotel Amruta Bhojana, Puri. We are a popular star hotel situated in the heart of Puri, approximately 100 meters from the revered Jagannath Temple.
                            </p>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {[
                            { id: 'home', label: 'Home' },
                            { id: 'rooms', label: 'Rooms' },
                            { id: 'about', label: 'About Us' },
                            { id: 'contact', label: 'Contact' }
                        ].map(link => (
                            <button
                                key={link.id}
                                onClick={() => setPage(link.id as any)}
                                className={`text-sm font-semibold transition-colors uppercase tracking-wider relative group ${link.id === 'about' ? 'text-[#F59820]' : 'text-white/80 hover:text-[#F59820]'}`}
                            >
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#F59820] transition-all ${link.id === 'about' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#FFFCF7] rounded-t-3xl" />
            </div>

            <div className="px-4 md:px-12 lg:px-20 -mt-2 space-y-6">

                {/* Highlights / Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    <div className="bg-white rounded-2xl shadow-sm p-4 border border-[#FFE5C0] flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FFF2E0] flex items-center justify-center text-[#E8760A]"><Star size={20} className="fill-current" /></div>
                        <div>
                            <div className="font-bold text-[#1A0A00] text-sm md:text-base">5-Star Rated</div>
                            <div className="text-[10px] md:text-xs text-[#7A5230]">100% Excellent</div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm p-4 border border-[#FFE5C0] flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FFF2E0] flex items-center justify-center text-[#E8760A]"><MapPin size={20} /></div>
                        <div>
                            <div className="font-bold text-[#1A0A00] text-sm md:text-base">100m Away</div>
                            <div className="text-[10px] md:text-xs text-[#7A5230]">Jagannath Temple</div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm p-4 border border-[#FFE5C0] flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FFF2E0] flex items-center justify-center text-[#E8760A]"><Coffee size={20} /></div>
                        <div>
                            <div className="font-bold text-[#1A0A00] text-sm md:text-base">Pure Veg</div>
                            <div className="text-[10px] md:text-xs text-[#7A5230]">Multi-Cuisine</div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm p-4 border border-[#FFE5C0] flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#FFF2E0] flex items-center justify-center text-[#E8760A]"><CheckCircle size={20} /></div>
                        <div>
                            <div className="font-bold text-[#1A0A00] text-sm md:text-base">Free Cancel</div>
                            <div className="text-[10px] md:text-xs text-[#7A5230]">Flexible booking</div>
                        </div>
                    </div>
                </div>

                <div className="md:grid md:grid-cols-2 gap-6 space-y-6 md:space-y-0">
                    {/* Amenities */}
                    <div className="bg-white rounded-2xl shadow-md p-6 border border-[#FFE5C0]/50">
                        <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1A0A00] mb-5 flex items-center gap-2">
                            <span className="text-[#E8760A]">✨</span> Key Amenities
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 text-[#E8760A] bg-[#FFF2E0] p-1.5 rounded-lg"><Coffee size={18} /></div>
                                <div>
                                    <span className="font-semibold text-sm md:text-base text-[#1A0A00] block">Pure Veg Restaurant</span>
                                    <span className="text-xs md:text-sm text-[#7A5230]">Serving North Indian, South Indian, Chinese & Local specialties (without onion & garlic)</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 text-[#E8760A] bg-[#FFF2E0] p-1.5 rounded-lg"><Phone size={18} /></div>
                                <div>
                                    <span className="font-semibold text-sm md:text-base text-[#1A0A00] block">24-hour Room Service</span>
                                    <span className="text-xs md:text-sm text-[#7A5230]">Added convenience round the clock</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 text-[#E8760A] bg-[#FFF2E0] p-1.5 rounded-lg"><Wind size={18} /></div>
                                <div>
                                    <span className="font-semibold text-sm md:text-base text-[#1A0A00] block">Air Conditioning</span>
                                    <span className="text-xs md:text-sm text-[#7A5230]">Ensuring a comfortable stay in all rooms</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 text-[#E8760A] bg-[#FFF2E0] p-1.5 rounded-lg"><Wifi size={18} /></div>
                                <div>
                                    <span className="font-semibold text-sm md:text-base text-[#1A0A00] block">Free Wi-Fi</span>
                                    <span className="text-xs md:text-sm text-[#7A5230]">Stay connected during your visit</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 text-[#E8760A] bg-[#FFF2E0] p-1.5 rounded-lg"><Shield size={18} /></div>
                                <div>
                                    <span className="font-semibold text-sm md:text-base text-[#1A0A00] block">CCTV Surveillance</span>
                                    <span className="text-xs md:text-sm text-[#7A5230]">Enhanced security for peace of mind</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 text-[#E8760A] bg-[#FFF2E0] p-1.5 rounded-lg"><Droplets size={18} /></div>
                                <div>
                                    <span className="font-semibold text-sm md:text-base text-[#1A0A00] block">Geyser in Bathrooms</span>
                                    <span className="text-xs md:text-sm text-[#7A5230]">Hot water available 24/7</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-0.5 text-[#7A5230] bg-gray-100 p-1.5 rounded-lg"><Wind size={18} /></div>
                                <div>
                                    <span className="font-semibold text-sm md:text-base text-[#1A0A00] block">Smoking Rooms</span>
                                    <span className="text-xs md:text-sm text-[#7A5230]">Available on request for guests who smoke</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        {/* Policies */}
                        <div className="bg-white rounded-2xl shadow-md p-6 border border-[#FFE5C0]/50">
                            <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1A0A00] mb-4 flex items-center gap-2">
                                <span className="text-[#E8760A]">📋</span> Hotel Policies
                            </h3>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-[#FFF2E0] p-3 rounded-xl">
                                    <div className="text-xs text-[#7A5230] mb-1">Check-in Time</div>
                                    <div className="font-bold text-[#E8760A] text-lg">9:00 AM</div>
                                    <div className="text-[10px] text-[#7A5230] leading-tight">Plan your day easily</div>
                                </div>
                                <div className="bg-[#FFF2E0] p-3 rounded-xl">
                                    <div className="text-xs text-[#7A5230] mb-1">Check-out Time</div>
                                    <div className="font-bold text-[#E8760A] text-lg">8:00 AM</div>
                                    <div className="text-[10px] text-[#7A5230] leading-tight">Reasonable departure</div>
                                </div>
                            </div>
                            <ul className="space-y-2 text-sm md:text-base text-[#3D1C00]">
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-600" /> Free cancellation available</li>
                                <li className="flex items-center gap-2"><span className="text-red-500 font-bold">×</span> Pets are not allowed (maintaining peace)</li>
                                <li className="flex items-center gap-2"><span className="text-red-500 font-bold">×</span> Outside food not permitted</li>
                            </ul>
                        </div>

                        {/* Room Details Highlight */}
                        <div className="bg-gradient-to-br from-[#1A0A00] to-[#3D1C00] rounded-2xl shadow-md p-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 border-2 border-white/10 rounded-full -mr-16 -mt-16" />
                            <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3">Premium Rooms</h3>
                            <p className="text-white/80 text-sm mb-4 leading-relaxed">
                                Our Deluxe Double Bed rooms offer 130 sq. ft (12 sq. mt) of space, featuring city views, 1 Double Bed, and an attached bathroom. Ample space for your relaxation.
                            </p>
                            <button
                                onClick={() => setPage('rooms')}
                                className="bg-[#E8760A] hover:bg-[#F59820] text-white px-5 py-2 rounded-lg font-semibold text-sm transition-colors w-full"
                            >
                                View All Rooms
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dining Options */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-[#FFE5C0]/50">
                    <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-semibold text-[#1A0A00] mb-4 flex items-center gap-2">
                        <span className="text-[#E8760A]">🍽️</span> Dining At Amruta Bhojana
                    </h3>
                    <div className="md:flex gap-8">
                        <div className="flex-1 mb-6 md:mb-0">
                            <p className="text-sm md:text-base text-[#7A5230] mb-4">
                                Experience a diverse range of cuisines prepared in our pure vegetarian kitchen. We specialize in North Indian, South Indian, Chinese, and local Odia dishes prepared strictly without onion and garlic.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {['Breakfast: 6:30 AM - 11:00 AM', 'Lunch: 11:00 AM - 4:00 PM', 'Dinner: 7:00 PM - 11:30 PM'].map((t, i) => (
                                    <span key={i} className="bg-[#FFF8F0] border border-[#FFE5C0] text-[#E8760A] text-xs md:text-sm px-3 py-1.5 rounded-full font-medium">
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <div className="inline-flex items-center gap-2 bg-[#F0FDF4] border border-[#BBF7D0] text-green-800 px-4 py-2 rounded-xl text-sm font-semibold">
                                <span>💰 Average meal cost:</span>
                                <span className="text-lg">₹500</span>
                            </div>
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-xl p-5 border border-gray-100">
                            <h4 className="font-semibold text-[#1A0A00] mb-3 text-sm md:text-base">Online Food Delivery Available</h4>
                            <p className="text-xs md:text-sm text-[#7A5230] mb-4">We also offer in-house dining options via popular delivery platforms in Puri. Check our menu online!</p>
                            <div className="flex gap-3">
                                <div className="bg-[#E23744]/10 text-[#E23744] px-4 py-2 rounded-lg font-bold text-sm border border-[#E23744]/20">Zomato</div>
                                <div className="bg-[#FC8019]/10 text-[#FC8019] px-4 py-2 rounded-lg font-bold text-sm border border-[#FC8019]/20">Swiggy</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Options & Network */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-[#FFE5C0]/50 text-center">
                    <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-semibold text-[#1A0A00] mb-2">Book Your Stay</h3>
                    <p className="text-sm text-[#7A5230] mb-6">Book directly through our website or your favorite travel agency.</p>
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                        <button onClick={() => setPage('home')} className="bg-[#1A0A00] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-shadow">Official Website (Best Price)</button>
                        {[
                            { name: 'Agoda', url: 'https://www.agoda.com' },
                            { name: 'Goibibo', url: 'https://www.goibibo.com' },
                            { name: 'MakeMyTrip', url: 'https://www.makemytrip.com' },
                            { name: 'Swift Rooms', url: '#' },
                        ].map((b, i) => (
                            <a key={i} href={b.url} target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:border-[#E8760A] hover:text-[#E8760A] transition-colors">
                                {b.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Locations / Connectivity */}
                <div className="md:grid md:grid-cols-2 gap-6 space-y-6 md:space-y-0 pb-4">
                    <div className="bg-white rounded-2xl shadow-md p-6 border border-[#FFE5C0]/50">
                        <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1A0A00] mb-4 flex items-center gap-2">
                            <span className="text-[#E8760A]">🛕</span> Nearby Attractions
                        </h3>
                        <div className="grid grid-cols-2 gap-2 text-xs md:text-sm text-[#3D1C00]">
                            {[
                                { name: 'Shree Jagannath Temple', dist: '100m' },
                                { name: 'Narendra Puskarini', dist: '1km' },
                                { name: 'Mausi Maa Temple', dist: '1.5km' },
                                { name: 'Puri Sea Beach', dist: '1.5km' },
                                { name: 'Blue Flag Beach', dist: '1.5km' },
                                { name: 'Puri Lighthouse', dist: '2km' },
                                { name: 'Gundicha Temple', dist: '3km' },
                                { name: 'Konark Sun Temple', dist: '32km' },
                                { name: 'Ramchandi Temple', dist: '35km' },
                                { name: 'Chandrabhaga Beach', dist: '35km' },
                                { name: 'Chilka Lake', dist: '45km' },
                                { name: 'Lingraj Temple', dist: '65km' },
                                { name: 'Dhauli Shanti Stupa', dist: '65km' },
                                { name: 'Khandagiri & Udaya Giri', dist: '70km' },
                                { name: 'Nandankanan Zoo', dist: '75km' },
                                { name: 'Kalijai Temple', dist: '109km' },
                                { name: 'Biraja Temple (Jajpur)', dist: '160km' },
                            ].map((a, i) => (
                                <div key={i} className="flex justify-between border-b border-gray-100 py-1.5">
                                    <span className="truncate pr-2">{a.name}</span>
                                    <span className="text-[#E8760A] font-medium shrink-0">{a.dist}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-6 border border-[#FFE5C0]/50">
                        <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1A0A00] mb-4 flex items-center gap-2">
                            <span className="text-[#E8760A]"><Navigation size={20} /></span> How to Reach
                        </h3>
                        <div className="space-y-2 mb-6">
                            {[
                                { name: 'Jagannath Ballabha Parking', dist: '800m' },
                                { name: 'Shree Setu', dist: '1km' },
                                { name: 'Puri Railway Station', dist: '2km' },
                                { name: 'Puri Bus Terminal', dist: '2km' },
                                { name: 'NH 316', dist: '2km' },
                                { name: 'District Hospital', dist: '2km' },
                                { name: 'Bhubaneswar Airport', dist: '65km' },
                            ].map((r, i) => (
                                <div key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <div className="bg-white p-1.5 rounded shadow-sm text-[#7A5230] font-bold text-xs">{r.dist}</div>
                                    <span className="text-sm font-medium text-[#1A0A00]">{r.name}</span>
                                </div>
                            ))}
                        </div>

                        {/* GM Letter / Signature */}
                        <div className="bg-[#FFF8F0] p-5 rounded-xl border border-[#FFE5C0]">
                            <p className="text-sm md:text-base text-[#3D1C00] italic leading-relaxed mb-4">
                                "With our excellent location, comfortable rooms, and range of amenities, Hotel Amruta Bhojana is an excellent choice for those visiting Puri and the Jagannath Temple."
                            </p>
                            <div className="text-xs md:text-sm text-[#7A5230]">
                                <div className="font-['Playfair_Display'] text-lg font-bold text-[#1A0A00] mb-0.5">Prahallad Behera</div>
                                <div className="mb-2">General Manager, Hotel Amruta Bhojana</div>
                                <div>M: +91 9437388224 | Tel: 06752 459250</div>
                                <div>Mail: {HOTEL_INFO.email}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
