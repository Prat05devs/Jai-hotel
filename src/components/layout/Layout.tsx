import { ReactNode, useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { createWhatsAppLink } from '../../constants';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  setPage: (page: string) => void;
  openBookingFlow: (context?: string | null) => void;
}

export function Layout({ children, currentPage, setPage, openBookingFlow }: LayoutProps) {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "0px"
      }
    );

    const footerElement = document.getElementById('site-footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-primary-container/20 selection:text-on-surface">
      <Navbar currentPage={currentPage} setPage={setPage} openBookingFlow={openBookingFlow} />
      
      {/* Main content wrapper */}
      <main className="flex-grow pt-16">
        {children}
      </main>

      <Footer currentPage={currentPage} setPage={setPage} />

      {/* Sticky Mobile Bar */}
      <AnimatePresence>
        {!isFooterVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
          >
            <a
              href={createWhatsAppLink('Hi Jai Hotel, I am browsing your website and need quick help with stay options.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-primary-container text-on-primary-container py-4 rounded-xl font-medium shadow-lg shadow-primary-container/30 active:scale-95 transition-transform"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Jai Hotel</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
