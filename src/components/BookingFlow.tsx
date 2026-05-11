import { AnimatePresence, motion } from 'motion/react';
import { ComponentType, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BedDouble,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Home,
  Laptop,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Tent,
  Users,
  X
} from 'lucide-react';

import { CONTACT, WHATSAPP_NUMBER } from '../constants';

interface BookingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  context?: string | null;
}

type RoomOption = {
  id: string;
  title: string;
  short: string;
  icon: ComponentType<{ className?: string }>;
};

const contextLabels: Record<string, string> = {
  chardham: 'Char Dham / yatra route',
  treks: 'trekking basecamp',
  wfh: 'work-from-mountains stay',
  winter: 'winter retreat',
  mandal: 'Mandal Valley rooms',
  gopeshwar: 'Gopeshwar premium huts'
};

const roomOptions: RoomOption[] = [
  { id: 'Family Suite', title: 'Family Suite', short: 'Families', icon: Users },
  { id: 'Standard Mandal Room', title: 'Mandal Room', short: 'Simple stay', icon: BedDouble },
  { id: 'Backpacker Bed', title: 'Biker Bed', short: 'Budget', icon: Tent },
  { id: 'Quiet WFH Room', title: 'WFH Room', short: 'Quiet desk', icon: Laptop },
  { id: 'Premium Gopeshwar Hut', title: 'Premium Hut', short: 'Gopeshwar', icon: Home }
];

const propertyOptions = ['Best available', 'Mandal Valley', 'Gopeshwar Huts'];
const mealOptions = ['Not sure yet', 'Breakfast only', 'Dinner included', 'Local meal plan'];

export function BookingFlow({ isOpen, onClose, context }: BookingFlowProps) {
  const today = useMemo(() => {
    const current = new Date();
    current.setHours(0, 0, 0, 0);
    return current;
  }, []);

  const [step, setStep] = useState(1);
  const [dates, setDates] = useState<Date[]>([]);
  const [room, setRoom] = useState('Family Suite');
  const [property, setProperty] = useState('Best available');
  const [guests, setGuests] = useState(2);
  const [meal, setMeal] = useState('Not sure yet');
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(1);
        setDates([]);
        setRoom('Family Suite');
        setProperty('Best available');
        setGuests(2);
        setMeal('Not sure yet');
        setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen, today]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const canGoPrev = !(currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() === today.getMonth());
  const hasDateRange = dates.length === 2;
  const contextText = context ? contextLabels[context] || context : 'general stay';

  const formatDate = (date: Date) => date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  const nights = hasDateRange ? Math.max(1, Math.round((dates[1].getTime() - dates[0].getTime()) / 86400000)) : 0;

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (clickedDate < today) return;

    if (dates.length === 0 || dates.length === 2) {
      setDates([clickedDate]);
      return;
    }

    if (clickedDate > dates[0]) {
      setDates([dates[0], clickedDate]);
      return;
    }

    setDates(clickedDate.getTime() === dates[0].getTime() ? [] : [clickedDate]);
  };

  const generateWhatsAppLink = () => {
    const dateText = hasDateRange ? `${formatDate(dates[0])} to ${formatDate(dates[1])} (${nights} night${nights > 1 ? 's' : ''})` : 'dates not selected';
    const text = [
      'Hi Jai Hotel, I would like to check availability.',
      `Trip: ${contextText}.`,
      `Dates: ${dateText}.`,
      `Stay: ${property}.`,
      `Room: ${room}.`,
      `Guests: ${guests}.`,
      `Meals: ${meal}.`,
      'Please confirm availability and price.'
    ].join(' ');

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const dateLabel = hasDateRange
    ? `${formatDate(dates[0])} - ${formatDate(dates[1])}`
    : dates.length === 1
      ? `${formatDate(dates[0])} - checkout`
      : 'Pick dates';

  const SummaryPill = ({ label, value }: { label: string; value: string | number }) => (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FAF9F6]/45">{label}</p>
      <p className="mt-1 truncate text-sm font-bold text-white">{value}</p>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-3 pb-3 sm:items-center sm:p-5">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/68 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-flow-title"
            initial={{ opacity: 0, y: 80, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.98 }}
            transition={{ type: 'spring', damping: 27, stiffness: 320 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-[#013220]/96 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 p-3 sm:p-4">
              <div className="flex min-w-0 items-center gap-3">
                {step > 1 && (
                  <button onClick={() => setStep(step - 1)} className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20" aria-label="Go back">
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                )}
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#FD8B00]">Booking request</p>
                  <h2 id="booking-flow-title" className="truncate font-serif text-xl text-[#FAF9F6] sm:text-2xl">
                    {step === 1 ? 'Dates' : step === 2 ? 'Stay details' : 'Confirm'}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden grid-cols-3 gap-1 sm:grid">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className={`h-1.5 w-9 rounded-full ${step >= item ? 'bg-[#FD8B00]' : 'bg-white/15'}`} />
                  ))}
                </div>
                <button onClick={onClose} className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20" aria-label="Close booking flow">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-4">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="dates" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} className="grid gap-3 lg:grid-cols-[1fr_280px]">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <div className="mb-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-1 py-1">
                        <button
                          onClick={() => canGoPrev && setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                          disabled={!canGoPrev}
                          className="rounded-lg p-2 text-white transition hover:bg-white/10 disabled:opacity-30"
                          aria-label="Previous month"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-bold text-[#FAF9F6]">{currentMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</span>
                        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))} className="rounded-lg p-2 text-white transition hover:bg-white/10" aria-label="Next month">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mb-1.5 grid grid-cols-7 gap-1 text-center">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                          <div key={`${day}-${index}`} className="text-[10px] font-bold text-[#FAF9F6]/50">
                            {day}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                          <div key={`empty-${index}`} className="h-8 sm:h-9" />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, index) => {
                          const day = index + 1;
                          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                          const isPast = date < today;
                          const isSelectedStart = dates[0]?.getTime() === date.getTime();
                          const isSelectedEnd = dates[1]?.getTime() === date.getTime();
                          const isBetween = hasDateRange && date > dates[0] && date < dates[1];

                          return (
                            <button
                              key={day}
                              onClick={() => handleDateClick(day)}
                              disabled={isPast}
                              className={`h-8 rounded-lg text-xs font-bold transition sm:h-9 sm:text-sm ${
                                isPast
                                  ? 'cursor-not-allowed text-white/20'
                                  : isSelectedStart || isSelectedEnd
                                    ? 'bg-[#FD8B00] text-white'
                                    : isBetween
                                      ? 'bg-[#FD8B00]/20 text-white'
                                      : 'text-[#FAF9F6] hover:bg-white/10'
                              }`}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 lg:content-between">
                      <div>
                        <CalendarDays className="mb-3 h-6 w-6 text-[#FD8B00]" />
                        <p className="font-serif text-2xl text-white">{dateLabel}</p>
                        <p className="mt-1 text-sm text-[#FAF9F6]/60">{hasDateRange ? `${nights} night${nights > 1 ? 's' : ''}` : 'Select check-in, then checkout.'}</p>
                      </div>
                      <button
                        onClick={() => setStep(2)}
                        disabled={!hasDateRange}
                        className="rounded-xl bg-[#FD8B00] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e65c00] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
                      >
                        Continue
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="details" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} className="grid gap-3 lg:grid-cols-[1fr_300px]">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#FAF9F6]/50">Room type</p>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {roomOptions.map((option) => {
                          const Icon = option.icon;
                          const selected = room === option.id;
                          return (
                            <button
                              key={option.id}
                              onClick={() => setRoom(option.id)}
                              className={`min-h-[78px] rounded-xl border p-3 text-left transition ${
                                selected ? 'border-[#FD8B00] bg-[#FD8B00]/20' : 'border-white/10 bg-white/5 hover:bg-white/10'
                              }`}
                            >
                              <Icon className={`h-5 w-5 ${selected ? 'text-[#FD8B00]' : 'text-white/70'}`} />
                              <span className="mt-2 block text-sm font-bold text-white">{option.title}</span>
                              <span className="block text-xs text-[#FAF9F6]/55">{option.short}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#FAF9F6]/50">Stay</p>
                        <div className="grid gap-2">
                          {propertyOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => setProperty(option)}
                              className={`rounded-lg border px-3 py-2 text-left text-sm font-bold transition ${
                                property === option ? 'border-[#FD8B00] bg-[#FD8B00]/20 text-white' : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#FAF9F6]/50">Guests</p>
                          <div className="flex items-center justify-between">
                            <button onClick={() => setGuests(Math.max(1, guests - 1))} className="rounded-lg bg-white/10 p-2 text-white" aria-label="Decrease guests">
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-2xl font-bold text-white">{guests}</span>
                            <button onClick={() => setGuests(Math.min(12, guests + 1))} className="rounded-lg bg-white/10 p-2 text-white" aria-label="Increase guests">
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#FAF9F6]/50">Meals</p>
                          <select value={meal} onChange={(event) => setMeal(event.target.value)} className="h-10 w-full rounded-lg border border-white/10 bg-[#082f20] px-2 text-xs font-bold text-white outline-none">
                            {mealOptions.map((option) => (
                              <option key={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <button onClick={() => setStep(3)} className="rounded-xl bg-[#FD8B00] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e65c00]">
                        Review
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="summary" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} className="grid gap-3 lg:grid-cols-[1fr_300px]">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      <SummaryPill label="Trip" value={contextText} />
                      <SummaryPill label="Dates" value={dateLabel} />
                      <SummaryPill label="Nights" value={nights} />
                      <SummaryPill label="Stay" value={property} />
                      <SummaryPill label="Room" value={room} />
                      <SummaryPill label="Guests" value={guests} />
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#FAF9F6]/50">Next step</p>
                      <p className="text-sm leading-5 text-[#FAF9F6]/70">Open WhatsApp with this request. The team can reply with availability, price and the best room.</p>
                      <div className="mt-4 grid gap-2">
                        <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#20bd5a]">
                          <MessageCircle className="h-4 w-4" />
                          Send WhatsApp
                        </a>
                        <a href={`tel:${CONTACT.phoneNumber}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15">
                          <Phone className="h-4 w-4" />
                          Call instead
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
