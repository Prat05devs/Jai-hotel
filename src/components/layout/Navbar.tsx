import { cn } from '../../lib/utils';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { CONTACT } from '../../constants';

interface NavbarProps {
  currentPage: string;
  setPage: (page: string) => void;
  openBookingFlow: (context?: string | null) => void;
}

export function Navbar({ currentPage, setPage, openBookingFlow }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'valley', label: 'The Valley' },
    { id: 'stay', label: 'The Stay' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav px-5 py-3 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button 
          className="text-left"
          onClick={() => setPage('home')}
        >
          <span className="block text-[1.45rem] font-serif italic leading-none text-on-surface">Jai Hotel</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={cn(
                "relative rounded-full px-3 py-2 text-[15px] font-medium transition-colors duration-300",
                currentPage === item.id 
                  ? "bg-primary-container/10 text-primary-container" 
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button onClick={() => openBookingFlow()} className="btn-primary px-4 py-2 text-sm">
            Check Dates
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-on-surface"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-surface border-b border-outline-variant/20 p-6 flex flex-col gap-6 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setPage(item.id);
                setIsOpen(false);
              }}
              className={cn(
                "text-left text-lg transition-colors",
                currentPage === item.id 
                  ? "text-primary-container font-serif italic" 
                  : "text-on-surface-variant"
              )}
            >
              {item.label}
            </button>
          ))}
          <button onClick={() => { setIsOpen(false); openBookingFlow(); }} className="btn-primary w-full mt-4">
            Check Dates
          </button>
          <a href={CONTACT.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full text-center">
            Get Directions
          </a>
        </div>
      )}
    </nav>
  );
}
