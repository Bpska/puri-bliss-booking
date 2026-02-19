import { useState, useEffect } from 'react';
import { Heart, Phone, MapPin, Globe, Hotel, Home as HomeIcon, Bed, MessageSquare } from 'lucide-react';

const ROOMS = [
  {
    id: 1, name: 'Deluxe AC Room', type: 'Deluxe', tag: 'Best Value',
    price: 3660, rating: 4.7, reviews: 318,
    features: ['King Bed', 'Air Conditioning', 'Cable TV', 'Free WiFi', 'Attached Bath'],
    desc: 'A comfortable Deluxe AC Room offering a peaceful stay steps from the Jagannath Temple. Clean, hygienic and value for money.',
    gradient: 'linear-gradient(135deg,#1A0A00,#5C2A00,#E8760A)',
    includes: ['Free WiFi', 'Daily Housekeeping', 'Paid Breakfast', 'Free Cancellation']
  },
  {
    id: 2, name: 'Standard AC Room', type: 'Standard', tag: null,
    price: 2500, rating: 4.6, reviews: 210,
    features: ['Double Bed', 'Air Conditioning', 'Attached Bath', 'Free WiFi'],
    desc: 'Ideal for solo travelers and couples. Clean, affordable and well-located near Jagannath Temple.',
    gradient: 'linear-gradient(135deg,#0A1A00,#2A5C00,#70A030)',
    includes: ['Free WiFi', 'Daily Housekeeping', 'Free Cancellation']
  },
  {
    id: 3, name: 'Economy Non-AC Room', type: 'Economy', tag: null,
    price: 1200, rating: 4.5, reviews: 165,
    features: ['Single Bed', 'Ceiling Fan', 'Common Bathroom', 'Budget Friendly'],
    desc: 'Perfect for budget pilgrims. Clean, safe and simple stay at the most affordable price in Puri.',
    gradient: 'linear-gradient(135deg,#00101A,#004060,#0080C0)',
    includes: ['Common Bathroom', 'Daily Housekeeping', 'Free Cancellation']
  },
  {
    id: 4, name: 'Family Suite', type: 'Suite', tag: 'Most Popular',
    price: 5500, rating: 4.8, reviews: 95,
    features: ['2 Double Beds', 'Air Conditioning', 'Private Bathroom', 'Cable TV', 'Free WiFi', 'Seating Area'],
    desc: 'Spacious suite perfect for families visiting for Jagannath Darshan. Two beds, private bath and seating area.',
    gradient: 'linear-gradient(135deg,#1A0A20,#5A1A60,#A030B0)',
    includes: ['Free WiFi', 'Daily Housekeeping', 'Paid Breakfast', 'Free Cancellation', 'Extra Bed on Request']
  },
];

const AMENITIES = [
  { icon: '🏊', name: 'Pool' }, { icon: '📶', name: 'Free WiFi' },
  { icon: '🍽️', name: 'Restaurant' }, { icon: '❄️', name: 'AC Rooms' },
  { icon: '♿', name: 'Accessible' }, { icon: '🅿️', name: 'Parking' },
  { icon: '☕', name: 'Breakfast' }, { icon: '📺', name: 'Cable TV' }
];

function App() {
  const [page, setPage] = useState('home');
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
  const [guests, setGuests] = useState(2);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [filter, setFilter] = useState('All Rooms');
  const [form, setForm] = useState({ fname: '', lname: '', phone: '', email: '', msg: '' });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');
      * { -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
      * { -ms-overflow-style: none; scrollbar-width: none; }
      @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      .animate-fadeUp { animation: fadeUp 0.4s ease-out; }
    `;
    document.head.appendChild(style);
    document.body.style.fontFamily = "'DM Sans', sans-serif";
  }, []);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const getFilteredRooms = () => {
    if (filter === 'All Rooms') return ROOMS;
    if (filter === 'AC') return ROOMS.filter(r => r.features.includes('Air Conditioning'));
    if (filter === 'Non-AC') return ROOMS.filter(r => r.type === 'Economy');
    if (filter === 'Deluxe') return ROOMS.filter(r => r.type === 'Deluxe' || r.type === 'Suite');
    if (filter === 'Budget') return ROOMS.filter(r => r.price < 2000);
    return ROOMS;
  };

  const handleSubmit = () => {
    if (form.fname && form.lname && form.phone && form.email) {
      setForm({ fname: '', lname: '', phone: '', email: '', msg: '' });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  const StatusBar = () => (
    <div className="bg-[#1A0A00] text-white px-5 py-2 flex justify-between items-center text-xs">
      <span>9:41</span>
      <div className="flex gap-1.5 items-center">
        <span>📶</span>
        <span>🔋</span>
      </div>
    </div>
  );

  const BottomNav = () => (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white shadow-[0_-4px_20px_rgba(26,10,0,0.08)] pb-5 pt-2 z-50">
      <div className="flex justify-around items-center">
        {[
          { id: 'home', icon: HomeIcon, label: 'Home' },
          { id: 'rooms', icon: Bed, label: 'Rooms' },
          { id: 'detail', icon: Hotel, label: 'Book' },
          { id: 'contact', icon: MessageSquare, label: 'Contact' }
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setPage(id)}
            className={`flex flex-col items-center gap-1 relative ${page === id ? 'text-[#E8760A]' : 'text-[#7A5230]'}`}
          >
            {page === id && <div className="absolute -top-2 w-12 h-0.5 bg-[#E8760A] rounded-full" />}
            <Icon size={22} strokeWidth={1.8} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="animate-fadeUp overflow-y-auto pb-20">
      <StatusBar />

      <div className="relative min-h-[320px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0A00 0%, #3D1C00 50%, #F59820 100%)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(232,118,10,0.3),transparent_60%)]" />
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full border-2 border-white/10" />
        <div className="absolute top-14 right-14 w-24 h-24 rounded-full border-2 border-white/15" />
        <div className="absolute top-16 right-16 w-20 h-20 rounded-full border-2 border-white/20" />

        <div className="relative z-10 px-5 pt-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-white font-['Playfair_Display'] text-xl font-semibold">Hotel Amruta Bhojana</h1>
              <p className="text-white/80 text-xs italic">Puri, Odisha</p>
            </div>
            <button className="w-9 h-9 border border-white/30 rounded-lg flex flex-col justify-center items-center gap-1">
              <div className="w-4 h-0.5 bg-white rounded" />
              <div className="w-4 h-0.5 bg-white rounded" />
              <div className="w-4 h-0.5 bg-white rounded" />
            </button>
          </div>

          <div className="inline-block bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 text-xs text-white mb-4">
            Near Jagannath Temple · Puri
          </div>

          <h2 className="font-['Playfair_Display'] text-[34px] leading-tight text-white mb-3">
            Divine Stay in <em className="text-[#F59820] not-italic">Holy</em> Puri
          </h2>
          <p className="text-white/70 text-sm mb-4 max-w-xs">
            Experience spiritual comfort near the sacred Jagannath Temple with modern amenities and traditional hospitality
          </p>

          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-2 text-xs text-white">
            <span className="text-[#D4A017]">★★★★★</span>
            <span>·</span>
            <span className="font-semibold">4.7</span>
            <span>·</span>
            <span className="opacity-80">318 Reviews on Google</span>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-7 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs text-[#7A5230] mb-1 block">Check-in</label>
              <div className="text-sm font-semibold text-[#1A0A00]">20 Feb 2025</div>
            </div>
            <div>
              <label className="text-xs text-[#7A5230] mb-1 block">Check-out</label>
              <div className="text-sm font-semibold text-[#1A0A00]">21 Feb 2025</div>
            </div>
          </div>
          <div className="border-t border-[#FFE5C0] pt-3 mb-3">
            <label className="text-xs text-[#7A5230] mb-1 block">Guests</label>
            <div className="text-sm font-semibold text-[#1A0A00]">2 Adults · 1 Room</div>
          </div>
          <button
            onClick={() => setPage('rooms')}
            className="w-full py-3 rounded-xl font-semibold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #E8760A, #F59820)' }}
          >
            🔍 Check Availability
          </button>
        </div>
      </div>

      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1A0A00]">Our Rooms</h3>
          <button onClick={() => setPage('rooms')} className="text-[#E8760A] text-sm font-medium">View All →</button>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto">
          {['All Rooms', 'AC Room', 'Non-AC', 'Suite'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f === 'AC Room' ? 'AC' : f)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filter === (f === 'AC Room' ? 'AC' : f)
                  ? 'bg-[#1A0A00] text-[#F59820]'
                  : 'bg-white border border-[#FFE5C0] text-[#7A5230]'
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {getFilteredRooms().slice(0, 3).map(room => (
            <div
              key={room.id}
              onClick={() => { setSelectedRoom(room); setPage('detail'); }}
              className="min-w-[210px] bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
            >
              <div className="relative h-[135px] overflow-hidden" style={{ background: room.gradient }}>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)' }} />
                <span className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] px-2 py-1 rounded-full">
                  {room.type}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(room.id); }}
                  className="absolute top-2 right-2 w-7 h-7 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center"
                >
                  <Heart size={14} fill={wishlist.includes(room.id) ? '#E8760A' : 'none'} stroke={wishlist.includes(room.id) ? '#E8760A' : 'white'} />
                </button>
              </div>
              <div className="p-3">
                <h4 className="font-['Playfair_Display'] text-sm font-semibold text-[#1A0A00] mb-1">{room.name}</h4>
                <p className="text-xs text-[#7A5230] mb-2">Near Jagannath Temple</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-['Playfair_Display'] text-lg font-bold text-[#3D1C00]">₹{room.price}</span>
                    <span className="text-[10px] text-[#7A5230]">/night</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#D4A017] text-xs">★</span>
                    <span className="text-xs font-semibold text-[#1A0A00]">{room.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-4 mb-6 p-5 rounded-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0A00, #3D1C00)' }}>
        <div className="absolute top-0 right-0 w-32 h-32 border-2 border-white/10 rounded-full -mr-10 -mt-10" />
        <div className="relative">
          <div className="inline-block bg-[#D4A017]/20 border border-[#D4A017]/30 text-[#D4A017] text-xs px-3 py-1 rounded-full mb-3">
            ✦ Special Offer · Agoda
          </div>
          <h3 className="font-['Playfair_Display'] text-xl text-white mb-3 leading-tight">Free Cancellation Available</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setSelectedRoom(ROOMS[0]); setPage('detail'); }}
              className="bg-white text-[#1A0A00] px-5 py-2.5 rounded-lg font-semibold text-sm"
            >
              Book Now
            </button>
            <span className="text-[#F59820] font-semibold text-sm">₹3,660 per night</span>
          </div>
        </div>
      </div>

      <div className="px-4 mb-6">
        <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#1A0A00] mb-4">Our Amenities</h3>
        <div className="grid grid-cols-4 gap-3">
          {AMENITIES.map((a, i) => (
            <div key={i} className="bg-white rounded-xl p-3 text-center shadow-sm border border-[#FFE5C0]">
              <div className="text-2xl mb-1">{a.icon}</div>
              <div className="text-[10px] text-[#7A5230] font-medium">{a.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-4 mb-6 bg-white rounded-2xl shadow-md overflow-hidden divide-y divide-[#FFE5C0]">
        <a href="tel:+919437388224" className="flex items-center gap-3 p-4">
          <div className="w-10 h-10 bg-[#FFF2E0] rounded-full flex items-center justify-center">
            <Phone size={18} className="text-[#E8760A]" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-[#1A0A00]">Call Us</div>
            <div className="text-xs text-[#7A5230]">+91 94373 88224</div>
          </div>
        </a>
        <a href="https://maps.app.goo.gl/H5oPZFBCsP61fxqNA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4">
          <div className="w-10 h-10 bg-[#FFF2E0] rounded-full flex items-center justify-center">
            <MapPin size={18} className="text-[#E8760A]" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-[#1A0A00]">Location</div>
            <div className="text-xs text-[#7A5230]">View on Google Maps</div>
          </div>
        </a>
        <a href="https://hotelamrutabhojana.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4">
          <div className="w-10 h-10 bg-[#FFF2E0] rounded-full flex items-center justify-center">
            <Globe size={18} className="text-[#E8760A]" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-[#1A0A00]">Website</div>
            <div className="text-xs text-[#7A5230]">hotelamrutabhojana.com</div>
          </div>
        </a>
      </div>

      <div className="mx-4 mb-6 bg-white rounded-2xl shadow-md p-5">
        <div className="flex gap-1 mb-3 text-[#D4A017]">
          {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
        </div>
        <p className="font-['Playfair_Display'] text-[#1A0A00] italic mb-4 leading-relaxed">
          "Excellent location near the temple. Very clean rooms and friendly staff. The AC worked perfectly and the breakfast was delicious. Highly recommended!"
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E8760A] to-[#F59820] flex items-center justify-center text-white font-semibold">
            RM
          </div>
          <div>
            <div className="text-sm font-semibold text-[#1A0A00]">Rajesh Mohanty</div>
            <div className="text-xs text-[#7A5230]">Bhubaneswar</div>
          </div>
        </div>
      </div>
    </div>
  );

  const RoomsPage = () => {
    const filtered = getFilteredRooms();

    return (
      <div className="animate-fadeUp overflow-y-auto pb-20">
        <StatusBar />

        <div className="relative min-h-[180px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0A00, #3D1C00)' }}>
          <div className="relative z-10 px-5 py-6">
            <h1 className="font-['Playfair_Display'] text-2xl font-semibold text-white mb-2">Rooms & Tariff</h1>
            <p className="text-white/70 text-sm">Comfortable stays near Jagannath Temple</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#FFFCF7] rounded-t-3xl" />
        </div>

        <div className="px-4 -mt-4 mb-5">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {['All Rooms', 'AC', 'Non-AC', 'Deluxe', 'Budget'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filter === f
                    ? 'bg-[#1A0A00] text-[#F59820]'
                    : 'bg-white border border-[#FFE5C0] text-[#7A5230]'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 space-y-4">
          {filtered.map(room => (
            <div key={room.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="relative h-[175px] overflow-hidden" style={{ background: room.gradient }}>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 15px, rgba(255,255,255,.1) 15px, rgba(255,255,255,.1) 30px)' }} />
                <div className="absolute bottom-5 left-5 w-20 h-20 rounded-full border-2 border-white/20" />

                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] px-2.5 py-1 rounded-full">
                    {room.type}
                  </span>
                  {room.tag && (
                    <span className="bg-[#D4A017]/80 backdrop-blur-sm border border-[#D4A017] text-white text-[10px] px-2.5 py-1 rounded-full font-medium">
                      ✦ {room.tag}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleWishlist(room.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center"
                >
                  <Heart size={16} fill={wishlist.includes(room.id) ? '#E8760A' : 'none'} stroke={wishlist.includes(room.id) ? '#E8760A' : 'white'} />
                </button>

                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-['Playfair_Display'] text-lg font-semibold text-white mb-1">{room.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#D4A017]">★</span>
                    <span className="text-white text-xs font-semibold">{room.rating}</span>
                    <span className="text-white/70 text-xs">({room.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.features.slice(0, 4).map((f, i) => (
                    <span key={i} className="bg-[#FFF2E0] text-[#7A5230] text-[10px] px-2.5 py-1 rounded-full font-medium">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-['Playfair_Display'] text-2xl font-bold text-[#3D1C00]">₹{room.price}</span>
                    <span className="text-xs text-[#7A5230] ml-1">per night</span>
                  </div>
                  <button
                    onClick={() => { setSelectedRoom(room); setPage('detail'); }}
                    className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white"
                    style={{ background: 'linear-gradient(135deg, #E8760A, #F59820)' }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const DetailPage = () => (
    <div className="animate-fadeUp overflow-y-auto pb-32">
      <StatusBar />

      <div className="relative h-[290px] overflow-hidden" style={{ background: selectedRoom.gradient }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,.1) 20px, rgba(255,255,255,.1) 40px)' }} />
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full border-2 border-white/20" />

        <div className="relative z-10 px-4 py-4">
          <div className="flex justify-between items-center mb-40">
            <button
              onClick={() => setPage('rooms')}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center"
            >
              <span className="text-white text-lg">←</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => toggleWishlist(selectedRoom.id)}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center"
              >
                <Heart size={18} fill={wishlist.includes(selectedRoom.id) ? '#E8760A' : 'none'} stroke={wishlist.includes(selectedRoom.id) ? '#E8760A' : 'white'} />
              </button>
              <button
                onClick={() => {
                  try {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Hotel Amruta Bhojana',
                        text: `Check out this ${selectedRoom.name} at Hotel Amruta Bhojana!`,
                        url: window.location.href,
                      });
                    } else {
                      alert('Share feature not supported on this device/browser');
                    }
                  } catch (error) {
                    console.error('Error sharing:', error);
                  }
                }}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center"
              >
                <span className="text-white">↗</span>
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-[#F59820] text-[10px] uppercase tracking-wider font-semibold mb-1">{selectedRoom.type}</div>
            <h1 className="font-['Playfair_Display'] text-[26px] font-semibold text-white leading-tight mb-3">{selectedRoom.name}</h1>
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/30'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-5">
        <div className="flex justify-between items-center mb-5">
          <div className="flex gap-1 text-[#D4A017]">
            {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
          </div>
          <div className="text-right">
            <div className="font-['Playfair_Display'] text-[28px] font-bold text-[#3D1C00]">₹{selectedRoom.price}</div>
            <div className="text-xs text-[#7A5230]">per night</div>
          </div>
        </div>

        <div className="h-px mb-5" style={{ background: 'linear-gradient(90deg, transparent, #FFE5C0 50%, transparent)' }} />

        <div className="mb-5">
          <h2 className="font-['Playfair_Display'] text-lg font-semibold text-[#1A0A00] mb-3">About This Room</h2>
          <p className="text-sm text-[#7A5230] leading-relaxed">{selectedRoom.desc}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {selectedRoom.features.map((f, i) => (
            <span key={i} className="bg-[#FFF2E0] border border-[#FFE5C0] text-[#3D1C00] text-xs px-3 py-1.5 rounded-full font-medium">
              {f}
            </span>
          ))}
        </div>

        <div className="mb-5">
          <h2 className="font-['Playfair_Display'] text-lg font-semibold text-[#1A0A00] mb-3">Select Your Stay</h2>
          <div className="bg-white rounded-xl border border-[#FFE5C0] p-4 mb-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#7A5230] mb-1 block">Check-in</label>
                <div className="text-sm font-semibold text-[#1A0A00]">20 Feb 2025</div>
              </div>
              <div>
                <label className="text-xs text-[#7A5230] mb-1 block">Check-out</label>
                <div className="text-sm font-semibold text-[#1A0A00]">21 Feb 2025</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#FFE5C0] p-4">
            <label className="text-xs text-[#7A5230] mb-2 block">Guests</label>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#1A0A00]">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-8 h-8 rounded-full border-2 border-[#E8760A] text-[#E8760A] flex items-center justify-center font-bold"
                >
                  −
                </button>
                <button
                  onClick={() => setGuests(Math.min(8, guests + 1))}
                  className="w-8 h-8 rounded-full bg-[#E8760A] text-white flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <h2 className="font-['Playfair_Display'] text-lg font-semibold text-[#1A0A00] mb-3">What's Included</h2>
          <div className="space-y-3">
            {selectedRoom.includes.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFF2E0] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">{i % 2 === 0 ? '📶' : '🧹'}</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-[#1A0A00]">{item}</div>
                  <div className="text-xs text-[#7A5230]">Included in your stay</div>
                </div>
                <div className="text-[#E8760A] font-bold">✓</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white shadow-[0_-4px_20px_rgba(26,10,0,0.12)] px-4 py-4 z-40">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-['Playfair_Display'] text-xl font-bold text-[#3D1C00]">₹{selectedRoom.price}</div>
            <div className="text-[10px] text-[#7A5230]">per night · per room</div>
          </div>
          <button
            onClick={() => window.open('tel:+919437388224')}
            className="px-6 py-3 rounded-xl font-semibold text-sm text-white flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #E8760A, #F59820)' }}
          >
            📞 Reserve Now
          </button>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="animate-fadeUp overflow-y-auto pb-20">
      <StatusBar />

      <div className="relative min-h-[180px] overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0A00, #3D1C00)' }}>
        <div className="relative z-10 px-5 py-6">
          <div className="inline-block bg-[#D4A017]/20 border border-[#D4A017]/30 text-[#D4A017] text-xs px-3 py-1 rounded-full mb-3">
            Get in Touch
          </div>
          <h1 className="font-['Playfair_Display'] text-2xl font-semibold text-white mb-2">Contact & About Us</h1>
          <p className="text-white/70 text-sm">We're here to help with your divine journey</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#FFFCF7] rounded-t-3xl" />
      </div>

      <div className="px-4 -mt-4">
        <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
          <h2 className="font-['Playfair_Display'] text-xl font-semibold text-[#1A0A00] mb-2">
            Hotel <em className="text-[#E8760A] not-italic">Amruta</em> Bhojana
          </h2>
          <div className="flex gap-1 mb-3 text-[#D4A017]">
            {[...Array(5)].map((_, i) => <span key={i} className={i < 4 ? '' : 'text-[#FFE5C0]'}>★</span>)}
          </div>
          <p className="text-xs font-semibold text-[#7A5230] mb-4">4.7 out of 5 · 318 Google Reviews</p>
          <p className="text-sm text-[#7A5230] leading-relaxed mb-4">
            Located steps away from the sacred Jagannath Temple in Puri, Hotel Amruta Bhojana offers comfortable accommodations for pilgrims and travelers. We pride ourselves on cleanliness, hospitality, and providing an authentic spiritual experience.
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#FFF2E0] rounded-xl p-3 text-center">
              <div className="font-['Playfair_Display'] text-2xl font-bold text-[#E8760A] mb-1">4.7</div>
              <div className="text-[10px] text-[#7A5230]">Rating</div>
            </div>
            <div className="bg-[#FFF2E0] rounded-xl p-3 text-center">
              <div className="font-['Playfair_Display'] text-2xl font-bold text-[#E8760A] mb-1">318</div>
              <div className="text-[10px] text-[#7A5230]">Reviews</div>
            </div>
            <div className="bg-[#FFF2E0] rounded-xl p-3 text-center">
              <div className="font-['Playfair_Display'] text-2xl font-bold text-[#E8760A] mb-1">24/7</div>
              <div className="text-[10px] text-[#7A5230]">Service</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
          <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#1A0A00] mb-4">Check-in & Check-out</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-[#7A5230] mb-1">Check-in from</div>
              <div className="text-2xl font-['Playfair_Display'] font-bold text-[#E8760A]">9:00 AM</div>
            </div>
            <div>
              <div className="text-xs text-[#7A5230] mb-1">Check-out until</div>
              <div className="text-2xl font-['Playfair_Display'] font-bold text-[#E8760A]">8:00 AM</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 mb-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, #E8760A 20px, #E8760A 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, #E8760A 20px, #E8760A 21px)' }} />
          <div className="relative">
            <div className="text-4xl mb-3 text-center">📍</div>
            <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#1A0A00] text-center mb-2">Location</h3>
            <p className="text-xs text-[#7A5230] text-center mb-3">Shree Danda, near Jagannath Temple<br />Puri, Odisha 752001</p>
            <div className="inline-block bg-[#1A0A00] text-white text-xs px-3 py-1.5 rounded-full mx-auto block w-max">
              Near Jagannath Temple
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <a href="tel:+919437388224" className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4 border border-[#FFE5C0]">
            <div className="w-12 h-12 bg-gradient-to-br from-[#E8760A] to-[#F59820] rounded-xl flex items-center justify-center text-xl">
              📞
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-[#1A0A00]">Call Us Now</div>
              <div className="text-xs text-[#7A5230]">+91 94373 88224</div>
            </div>
            <span className="text-[#E8760A]">→</span>
          </a>

          <a href="https://hotelamrutabhojana.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4 border border-[#FFE5C0]">
            <div className="w-12 h-12 bg-gradient-to-br from-[#E8760A] to-[#F59820] rounded-xl flex items-center justify-center text-xl">
              🌐
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-[#1A0A00]">Visit Website</div>
              <div className="text-xs text-[#7A5230]">hotelamrutabhojana.com</div>
            </div>
            <span className="text-[#E8760A]">→</span>
          </a>

          <a href="mailto:info@hotelamrutabhojana.com" className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4 border border-[#FFE5C0]">
            <div className="w-12 h-12 bg-gradient-to-br from-[#E8760A] to-[#F59820] rounded-xl flex items-center justify-center text-xl">
              ✉️
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-[#1A0A00]">Email Us</div>
              <div className="text-xs text-[#7A5230]">info@hotelamrutabhojana.com</div>
            </div>
            <span className="text-[#E8760A]">→</span>
          </a>

          <a href="https://maps.app.goo.gl/H5oPZFBCsP61fxqNA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4 border border-[#FFE5C0]">
            <div className="w-12 h-12 bg-gradient-to-br from-[#E8760A] to-[#F59820] rounded-xl flex items-center justify-center text-xl">
              📍
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-[#1A0A00]">Google Maps</div>
              <div className="text-xs text-[#7A5230]">Get Directions</div>
            </div>
            <span className="text-[#E8760A]">→</span>
          </a>

          <a href="https://www.agoda.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-4 border border-[#FFE5C0]">
            <div className="w-12 h-12 bg-gradient-to-br from-[#E8760A] to-[#F59820] rounded-xl flex items-center justify-center text-xl">
              🏨
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-[#1A0A00]">Book on Agoda</div>
              <div className="text-xs text-[#7A5230]">Best Price Guarantee</div>
            </div>
            <span className="text-[#E8760A]">→</span>
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 mb-4">
          <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#1A0A00] mb-4">Send us a Message</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First Name"
                value={form.fname}
                onChange={(e) => setForm({ ...form, fname: e.target.value })}
                className="px-4 py-3 border border-[#FFE5C0] rounded-xl text-sm focus:outline-none focus:border-[#E8760A] text-[#1A0A00]"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={form.lname}
                onChange={(e) => setForm({ ...form, lname: e.target.value })}
                className="px-4 py-3 border border-[#FFE5C0] rounded-xl text-sm focus:outline-none focus:border-[#E8760A] text-[#1A0A00]"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 border border-[#FFE5C0] rounded-xl text-sm focus:outline-none focus:border-[#E8760A] text-[#1A0A00]"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border border-[#FFE5C0] rounded-xl text-sm focus:outline-none focus:border-[#E8760A] text-[#1A0A00]"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              value={form.msg}
              onChange={(e) => setForm({ ...form, msg: e.target.value })}
              className="w-full px-4 py-3 border border-[#FFE5C0] rounded-xl text-sm focus:outline-none focus:border-[#E8760A] resize-none text-[#1A0A00]"
            />
            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white"
              style={{ background: 'linear-gradient(135deg, #1A0A00, #E8760A)' }}
            >
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

  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-[#FFFCF7] shadow-2xl overflow-hidden relative flex flex-col">
      {page === 'home' && <HomePage />}
      {page === 'rooms' && <RoomsPage />}
      {page === 'detail' && <DetailPage />}
      {page === 'contact' && <ContactPage />}
      <BottomNav />
    </div>
  );
}

export default App;
