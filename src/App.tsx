import { useEffect, useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { TheValley } from './pages/TheValley';
import { TheStay } from './pages/TheStay';
import { BookingFlow } from './components/BookingFlow';
import { ItineraryFlow } from './components/ItineraryFlow';

export default function App() {
  const pagePaths: Record<string, string> = {
    home: '/',
    valley: '/valley',
    stay: '/stay'
  };

  const getPageFromPath = () => {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    return Object.entries(pagePaths).find(([, pagePath]) => pagePath === path)?.[0] || 'home';
  };

  const [currentPage, setCurrentPageState] = useState(getPageFromPath);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingContext, setBookingContext] = useState<string | null>(null);
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => setCurrentPageState(getPageFromPath());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setCurrentPage = (page: string) => {
    setCurrentPageState(page);
    const nextPath = pagePaths[page] || pagePaths.home;
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBookingFlow = (context: string | null = null) => {
    setBookingContext(context);
    setIsBookingOpen(true);
  };

  const openItineraryFlow = () => {
    setIsItineraryOpen(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home openBookingFlow={openBookingFlow} openItineraryFlow={openItineraryFlow} />;
      case 'valley':
        return <TheValley openItineraryFlow={openItineraryFlow} />;
      case 'stay':
        return <TheStay openBookingFlow={openBookingFlow} />;
      default:
        return <Home openBookingFlow={openBookingFlow} openItineraryFlow={openItineraryFlow} />;
    }
  };

  return (
    <>
      <Layout currentPage={currentPage} setPage={setCurrentPage} openBookingFlow={openBookingFlow}>
        {renderPage()}
      </Layout>
      <BookingFlow 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        context={bookingContext}
      />
      <ItineraryFlow
        isOpen={isItineraryOpen}
        onClose={() => setIsItineraryOpen(false)}
      />
    </>
  );
}
