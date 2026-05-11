import { Facebook, Instagram, Mail, MapPin, MessageCircle, Navigation, Phone, ShieldCheck, Youtube } from 'lucide-react';

import { CONTACT, createWhatsAppLink } from '../../constants';

interface FooterProps {
  currentPage: string;
  setPage: (page: string) => void;
}

const navLinks = [
  { label: 'Home', page: 'home' },
  { label: 'The Valley', page: 'valley' },
  { label: 'The Stay', page: 'stay' }
];

export function Footer({ currentPage, setPage }: FooterProps) {
  const goToPage = (page: string) => {
    if (currentPage === page) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setPage(page);
  };

  return (
    <footer id="site-footer" className="border-t border-outline-variant/30 bg-[#263a2c] text-surface">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-12">
        <div className="grid gap-7 lg:grid-cols-[1.1fr_1fr_auto] lg:items-center">
          <div>
            <button type="button" onClick={() => goToPage('home')} className="font-serif text-2xl italic leading-none">
              Jai Hotel
            </button>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-surface/70">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary-container" />
                15+ years hosting travelers
              </span>
              <span>Mandal | Chopta route</span>
            </div>
          </div>

          <div className="grid gap-3 text-sm text-surface/72 sm:grid-cols-3 lg:grid-cols-1">
            <a href={CONTACT.directionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 transition hover:text-surface">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-container" />
              <span>{CONTACT.address}</span>
            </a>
            <a href={`tel:${CONTACT.phoneNumber}`} className="flex items-center gap-2 transition hover:text-surface">
              <Phone className="h-4 w-4 shrink-0 text-primary-container" />
              <span>{CONTACT.displayPhone}</span>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 transition hover:text-surface">
              <Mail className="h-4 w-4 shrink-0 text-primary-container" />
              <span>{CONTACT.displayEmail}</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
            <a
              href={createWhatsAppLink('Hi Jai Hotel, I have a quick question about staying at Jai Hotel. Can you help?')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-container px-4 py-3 text-sm font-bold text-on-primary-container transition hover:bg-[#e65c00]"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={CONTACT.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-surface/15 bg-surface/10 px-4 py-3 text-sm font-bold transition hover:bg-surface/15"
            >
              <Navigation className="h-4 w-4" />
              Directions
            </a>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-5 border-t border-surface/10 pt-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <button
                key={link.page}
                type="button"
                onClick={() => goToPage(link.page)}
                className={`text-sm transition hover:text-surface ${currentPage === link.page ? 'text-primary-container' : 'text-surface/68'}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between gap-5 md:justify-end">
            <div className="flex gap-2">
              <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full p-2 text-surface/70 transition hover:bg-surface/10 hover:text-surface">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={CONTACT.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full p-2 text-surface/70 transition hover:bg-surface/10 hover:text-surface">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={CONTACT.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="rounded-full p-2 text-surface/70 transition hover:bg-surface/10 hover:text-surface">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
            <p className="text-xs text-surface/55">Copyright {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
