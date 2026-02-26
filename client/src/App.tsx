import { useEffect } from 'react';
import { BottomNav } from './components/BottomNav';
import { SideMenu } from './components/SideMenu';
import { Footer } from './components/Footer';
import { OffersBanner } from './components/OffersBanner';
import { BookNowPopup } from './components/BookNowPopup';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { DetailPage } from './pages/DetailPage';
import { ContactPage } from './pages/ContactPage';
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
    return <AdminPage onBack={() => state.setPage('home')} />;
  }

  return (
    <div className="w-full max-w-[430px] md:max-w-full mx-auto min-h-screen bg-[#FFFCF7] shadow-2xl md:shadow-none overflow-hidden relative flex flex-col">
      {/* Offers banner at the very top */}
      <OffersBanner />

      {state.page === 'home' && <HomePage state={state} />}
      {state.page === 'rooms' && <RoomsPage state={state} />}
      {state.page === 'detail' && <DetailPage state={state} />}
      {state.page === 'contact' && <ContactPage state={state} />}

      <Footer />

      <BottomNav page={state.page} setPage={state.setPage} />

      {state.menuOpen && (
        <SideMenu
          page={state.page}
          setPage={state.setPage}
          onClose={() => state.setMenuOpen(false)}
        />
      )}

      {/* Book Now popup + Payment modal */}
      <BookNowPopup state={state} />
    </div>
  );
}

export default App;


