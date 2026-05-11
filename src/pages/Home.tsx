import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import {
  BedDouble,
  BriefcaseBusiness,
  CalendarCheck,
  Car,
  ChevronRight,
  Flame,
  MapPinned,
  MessageCircle,
  Mountain,
  Route,
  ShieldCheck,
  Soup,
  Trees
} from 'lucide-react';

import { FadeInUp, StaggerContainer, StaggerItem } from '../components/ui/Animations';
import { CONTACT, createWhatsAppLink } from '../constants';

const tripOptions = [
  {
    id: 'chardham',
    label: 'Char Dham stop',
    title: 'Rest between Kedarnath and Badrinath',
    detail: 'Easy halt, clean rooms, hot meals, parking help',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=1920',
    icon: Route
  },
  {
    id: 'treks',
    label: 'Trek basecamp',
    title: 'Start rested for Rudranath, Chopta and Tungnath',
    detail: 'Packed meals, local route guidance, early starts',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920',
    icon: Mountain
  },
  {
    id: 'wfh',
    label: 'Workcation',
    title: 'Quiet mountain days with practical comfort',
    detail: 'Wi-Fi, desk-friendly rooms, long-stay rhythm',
    image: 'https://images.unsplash.com/photo-1516397281156-ca07cf9746fc?auto=format&fit=crop&q=80&w=1920',
    icon: BriefcaseBusiness
  },
  {
    id: 'winter',
    label: 'Winter retreat',
    title: 'Bonfires, snowfall drives and temple visits',
    detail: 'Warm food, calm evenings, off-season planning',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=1920',
    icon: Flame
  }
];

const proofPoints = [
  { label: '15+ years hosting travelers', icon: ShieldCheck },
  { label: 'On the Mandal-Chopta route', icon: MapPinned },
  { label: 'Rooms, meals and local guidance', icon: BedDouble }
];

const stayHighlights = [
  {
    title: 'Mandal Valley Rooms',
    desc: 'The original Jai Hotel stay: budget-friendly rooms around a garden, suited for families, bikers and trekkers.',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=900',
    icon: Trees
  },
  {
    title: 'Gopeshwar Premium Huts',
    desc: 'Four quieter premium hut-style rooms near Gopinath Temple for guests who want a more private base.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=900',
    icon: BedDouble
  },
  {
    title: 'Food Junction and Winehouse',
    desc: 'Simple, filling meals after a long mountain day, with hot chai, breakfast support and dinner planning.',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=900',
    icon: Soup
  }
];

interface HomeProps {
  openBookingFlow: (context?: string | null) => void;
  openItineraryFlow: () => void;
}

export function Home({ openBookingFlow, openItineraryFlow }: HomeProps) {
  const [selectedTrip, setSelectedTrip] = useState(tripOptions[0]);
  const roomAdviceLink = createWhatsAppLink(
    `Hi Jai Hotel, I am planning a ${selectedTrip.label.toLowerCase()} trip. Can you suggest the best room or stay option for me?`
  );

  return (
    <div className="w-full">
      <section className="relative h-[calc(100dvh-4rem)] min-h-[540px] overflow-hidden px-4 py-5 text-[#FAF9F6] md:px-8 md:py-6">
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedTrip.image}
            src={selectedTrip.image}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full object-cover"
            alt={selectedTrip.title}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,19,14,0.88)_0%,rgba(8,19,14,0.64)_45%,rgba(8,19,14,0.25)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#08130e]/90 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-between gap-4">
          <div className="grid min-h-0 flex-1 items-center gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(340px,420px)] xl:grid-cols-[minmax(0,1fr)_420px]">
            <div className="max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur sm:text-[11px] md:mb-4"
              >
                <MapPinned className="h-4 w-4 text-[#FD8B00]" />
                Mandal Valley | Chopta route
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8, ease: 'easeOut' }}
                className="max-w-3xl font-serif text-[clamp(2.2rem,10.5vw,5.8rem)] leading-[1.02] sm:text-[clamp(2.6rem,7.5vw,5.8rem)]"
              >
                Jai Hotel, your mountain base before the next climb.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8, ease: 'easeOut' }}
                className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base md:mt-4 md:text-lg xl:text-xl [@media(max-height:720px)]:mt-3 [@media(max-height:720px)]:line-clamp-2"
              >
                Rest well between yatra routes, treks, temple visits and quiet workcation days. Tell us why you are coming, and we will help you choose the right room.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                className="mt-4 flex flex-col gap-3 sm:flex-row md:mt-6"
              >
                <button
                  onClick={() => openBookingFlow(selectedTrip.id)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FD8B00] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_45px_rgba(253,139,0,0.28)] transition hover:bg-[#e65c00] hover:-translate-y-0.5 sm:px-6 sm:py-3.5 sm:text-base"
                >
                  Check availability
                  <ChevronRight className="h-5 w-5" />
                </button>
                <a
                  href={CONTACT.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20 sm:px-6 sm:py-3.5 sm:text-base"
                >
                  <Car className="h-5 w-5" />
                  Get directions
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48, duration: 0.75, ease: 'easeOut' }}
                className="mt-4 lg:hidden"
              >
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">Trip type</p>
                <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
                  {tripOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedTrip.id === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setSelectedTrip(option)}
                        className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition ${
                          isSelected
                            ? 'border-[#FD8B00] bg-[#FD8B00] text-white'
                            : 'border-white/20 bg-white/10 text-white/80 backdrop-blur hover:bg-white/15'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
              className="hidden rounded-2xl border border-white/15 bg-[#013220]/85 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-4 lg:block"
            >
              <div className="mb-3 flex items-center justify-between gap-4 px-1">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">Plan around</p>
                  <h2 className="mt-1 font-serif text-xl text-white md:text-2xl">Your trip type</h2>
                </div>
                <CalendarCheck className="h-6 w-6 text-[#FD8B00]" />
              </div>

              <div className="grid gap-2 [@media(max-height:720px)]:gap-1.5">
                {tripOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = selectedTrip.id === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedTrip(option)}
                      className={`flex items-start gap-3 rounded-xl border p-3 text-left transition [@media(max-height:720px)]:py-2 ${
                        isSelected
                          ? 'border-[#FD8B00] bg-[#FD8B00]/20 shadow-[0_10px_30px_rgba(253,139,0,0.14)]'
                          : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                      }`}
                    >
                      <span className={`rounded-lg p-2 ${isSelected ? 'bg-[#FD8B00] text-white' : 'bg-white/10 text-white/75'}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-white md:text-base">{option.label}</span>
                        <span className="mt-0.5 block text-xs leading-4 text-white/65 md:text-sm md:leading-5 [@media(max-height:720px)]:hidden">{option.detail}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="hidden shrink-0 gap-2 border-t border-white/15 pt-3 text-xs text-white/75 md:grid-cols-3 md:text-sm lg:grid [@media(max-height:680px)]:hidden">
            {proofPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.label} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-[#FD8B00] md:h-5 md:w-5" />
                  <span>{point.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:px-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <FadeInUp>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-container">Why guests stop here</p>
            <h2 className="text-4xl md:text-5xl">Built for real mountain travel, not showroom travel.</h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-lg leading-8 text-on-surface-variant">
              Jai Hotel works because it understands the rhythm of this route: late arrivals, early departures, tired families, hungry trekkers, sudden weather changes and guests who need a local answer before Google catches up.
            </p>
          </FadeInUp>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12">
        <FadeInUp>
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-container">Choose your base</p>
              <h2 className="text-4xl md:text-5xl">Stay options that match the journey.</h2>
            </div>
            <a href={roomAdviceLink} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full items-center justify-center gap-2 md:w-auto">
              <MessageCircle className="h-5 w-5" />
              Ask for room advice
            </a>
          </div>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {stayHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <article className="h-full overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <Icon className="mb-5 h-7 w-7 text-primary-container" />
                    <h3 className="mb-3 text-2xl">{item.title}</h3>
                    <p className="leading-7 text-on-surface-variant">{item.desc}</p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      <section className="bg-secondary py-24 text-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <FadeInUp>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-container">Local planning</p>
            <h2 className="text-4xl md:text-5xl">Not sure how to fit Chopta, Rudranath or Gopeshwar into your dates?</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-surface/75">
              Use the itinerary planner to share your crew, pace and trip length. We will turn it into a WhatsApp-ready plan that the hotel team can refine with current route and weather context.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.15}>
            <div className="rounded-xl border border-surface/20 bg-surface/10 p-6">
              <div className="grid gap-4">
                {['Family yatra halt', 'Rudranath basecamp', 'Temple and waterfall day', 'Quiet long stay'].map((item) => (
                  <div key={item} className="flex items-center gap-3 border-b border-surface/10 pb-4 last:border-0 last:pb-0">
                    <ShieldCheck className="h-5 w-5 text-primary-container" />
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={openItineraryFlow} className="mt-6 w-full rounded-xl bg-surface px-6 py-4 font-bold text-secondary transition hover:bg-surface/90">
                Plan my itinerary
              </button>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
