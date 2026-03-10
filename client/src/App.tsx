import { useEffect } from 'react';
import { BottomNav } from './components/BottomNav';
import { SideMenu } from './components/SideMenu';
import { Footer } from './components/Footer';
import { OffersBanner } from './components/OffersBanner';
import { BookNowPopup } from './components/BookNowPopup';
import { BookingFormModal } from './components/BookingFormModal';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { DetailPage } from './pages/DetailPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';
import { useAppState } from './hooks/useAppState';

function App() {
  const state = useAppState();

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');
      * { -webkit-tap-highlight-color: transparent; }
      ::-webkit-scrollbar { display: none; }
      * { -ms-overflow-style: none; scrollbar-width: none; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeUp { animation: fadeUp 0.4s ease-out; }

      @keyframes slideDown {
        from { opacity: 0; transform: translateX(20px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      .animate-slideDown { animation: slideDown 0.25s ease-out; }

      @keyframes ripple {
        0%   { transform: scale(0);   opacity: 0.6; }
        100% { transform: scale(4);   opacity: 0; }
      }
      .animate-ripple { animation: ripple 0.6s ease-out forwards; }

      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      .animate-fadeIn { animation: fadeIn 0.6s ease-out; }

      @keyframes fadeOut {
        from { opacity: 1; }
        to   { opacity: 0; }
      }
      .animate-fadeOut { animation: fadeOut 0.4s ease-in forwards; }

      @keyframes shimmer {
        0%   { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .skeleton {
        background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite linear;
      }
      .skeleton-dark {
        background: linear-gradient(90deg, #1A0A00 25%, #3D1C00 50%, #1A0A00 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite linear;
      }
      @keyframes callPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
        50% { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
      }
      .custom-scrollbar::-webkit-scrollbar {
        display: block;
        width: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: #FFF2E0;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #E8760A;
        border-radius: 10px;
      }
    `;
    document.head.appendChild(style);
    document.body.style.fontFamily = "'DM Sans', sans-serif";
    document.body.style.background = '#FFFCF7';
  }, []);

  // Admin page has its own full-screen layout
  if (state.page === 'admin') {
    return <AdminPage onBack={() => state.setPage('home')} refreshRooms={state.refreshRooms} />;
  }

  return (
    <div className="w-full max-w-[430px] md:max-w-full mx-auto min-h-screen bg-[#FFFCF7] shadow-2xl md:shadow-none overflow-hidden relative flex flex-col">
      {/* Offers banner at the very top */}
      <OffersBanner />

      {state.page === 'home' && <HomePage state={state} />}
      {state.page === 'rooms' && <RoomsPage state={state} />}
      {state.page === 'detail' && <DetailPage state={state} />}
      {state.page === 'contact' && <ContactPage state={state} />}
      {state.page === 'about' && <AboutPage state={state} />}

      <Footer setPage={state.setPage} />
      <BottomNav page={state.page} setPage={state.setPage} />

      {state.menuOpen && (
        <SideMenu
          page={state.page}
          setPage={state.setPage}
          onClose={() => state.setMenuOpen(false)}
        />
      )}

      {/* Floating Quick Call Button — right side */}
      <a
        href="tel:+919078371094"
        className="fixed right-4 bottom-36 md:bottom-24 md:right-8 z-50 w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform"
        title="Call Now"
        style={{ animation: 'callPulse 2s infinite' }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-30" />
      </a>

      {/* Book Now popup */}
      <BookNowPopup goToRooms={() => state.setPage('rooms')} />

      {/* Booking Form Modal */}
      <BookingFormModal
        isOpen={state.bookingModalOpen}
        onClose={state.closeBookingModal}
        room={state.bookingRoom}
        checkIn={state.checkIn}
        checkOut={state.checkOut}
        guests={state.guests}
      />
    </div>
  );
}

export default App;


