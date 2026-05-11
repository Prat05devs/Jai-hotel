import { AnimatePresence, motion } from 'motion/react';
import { ComponentType, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Bike,
  Calendar,
  Coffee,
  Compass,
  Flame,
  Home,
  Laptop,
  MapPin,
  MessageCircle,
  Mountain,
  User,
  Users,
  X
} from 'lucide-react';

import { WHATSAPP_NUMBER } from '../constants';

interface ItineraryFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

type AnswerKey = 'crew' | 'energy' | 'duration';

type AnswerOption = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  value: string;
  helper: string;
};

const questionSets: {
  key: AnswerKey;
  title: string;
  eyebrow: string;
  options: AnswerOption[];
}[] = [
  {
    key: 'crew',
    title: 'Who is coming?',
    eyebrow: 'Group',
    options: [
      { icon: User, title: 'Solo', value: 'Solo', helper: 'Flexible' },
      { icon: Users, title: 'Family', value: 'Family', helper: 'Comfort' },
      { icon: Bike, title: 'Friends', value: 'Friends', helper: 'Scenic' },
      { icon: Laptop, title: 'WFH', value: 'WFH', helper: 'Quiet' }
    ]
  },
  {
    key: 'energy',
    title: 'Choose the pace',
    eyebrow: 'Trip mood',
    options: [
      { icon: Mountain, title: 'Trekking', value: 'Trekking', helper: 'Early starts' },
      { icon: Flame, title: 'Yatra', value: 'Spiritual', helper: 'Temples' },
      { icon: MapPin, title: 'Explore', value: 'Exploration', helper: 'Hidden gems' },
      { icon: Coffee, title: 'Chill', value: 'Relaxing', helper: 'Slow days' }
    ]
  },
  {
    key: 'duration',
    title: 'Trip length',
    eyebrow: 'Duration',
    options: [
      { icon: Calendar, title: '1-2 days', value: '1-2 days', helper: 'Transit' },
      { icon: Compass, title: '3-5 days', value: '3-5 days', helper: 'Balanced' },
      { icon: Home, title: '1 week+', value: '1 week+', helper: 'Long stay' }
    ]
  }
];

const routeEvent: Record<string, string> = {
  Trekking: 'Chopta/Tungnath or Rudranath route check with early breakfast.',
  Spiritual: 'Gopinath Temple, winter Rudranath context and calm evening aarti.',
  Exploration: 'Anusuya Devi, Atri Muni waterfall or a shorter forest walk.',
  Relaxing: 'Late breakfast, valley walk, chai and bonfire.'
};

const crewNote: Record<string, string> = {
  Solo: 'Keep route check-ins simple and share return timing.',
  Family: 'Shorter hops, warm meals and flexible timing.',
  Friends: 'Parking, fuel and weather buffer first.',
  WFH: 'Work blocks first; exploration stays light.'
};

export function ItineraryFlow({ isOpen, onClose }: ItineraryFlowProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<AnswerKey, string>>({
    crew: '',
    energy: '',
    duration: ''
  });

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(1);
        setAnswers({ crew: '', energy: '', duration: '' });
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

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

  const currentQuestion = questionSets[step - 1];

  const itinerary = useMemo(() => {
    const isShort = answers.duration === '1-2 days';
    const isLong = answers.duration === '1 week+';
    return [
      {
        title: 'Arrival',
        body: `Check in, settle the ${answers.crew || 'group'}, confirm road and weather conditions.`
      },
      {
        title: answers.energy === 'Relaxing' ? 'Valley day' : answers.energy === 'Spiritual' ? 'Temple day' : answers.energy === 'Exploration' ? 'Forest day' : 'Trail day',
        body: routeEvent[answers.energy] || 'Pick a route with the hotel team.'
      },
      {
        title: isShort ? 'Departure buffer' : isLong ? 'Work/rest rhythm' : 'Gopeshwar add-on',
        body: isShort ? 'Leave early with route timing advice.' : isLong ? 'Add work blocks, rest days and short local walks.' : 'Use one slot for temple, market or viewpoint time.'
      }
    ];
  }, [answers]);

  const handleSelect = (key: AnswerKey, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (step < questionSets.length) {
      setTimeout(() => setStep((current) => current + 1), 180);
      return;
    }
    setTimeout(() => setStep(questionSets.length + 1), 180);
  };

  const generateWhatsAppLink = () => {
    const plan = itinerary.map((item, index) => `${index + 1}. ${item.title}: ${item.body}`).join(' ');
    const text = `Hi Jai Hotel, I used your itinerary planner. Crew: ${answers.crew}. Pace: ${answers.energy}. Duration: ${answers.duration}. Plan: ${plan} Please refine this with current route and weather conditions.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const OptionCard = ({ option, stateKey }: { option: AnswerOption; stateKey: AnswerKey }) => {
    const Icon = option.icon;
    const selected = answers[stateKey] === option.value;
    return (
      <button
        onClick={() => handleSelect(stateKey, option.value)}
        className={`min-h-[96px] rounded-xl border p-3 text-left transition active:scale-[0.98] sm:min-h-[110px] sm:p-4 ${
          selected ? 'border-[#FD8B00] bg-[#FD8B00]/20' : 'border-white/10 bg-white/5 hover:bg-white/10'
        }`}
      >
        <Icon className={`h-5 w-5 ${selected ? 'text-[#FD8B00]' : 'text-[#FAF9F6]/75'}`} />
        <span className="mt-4 block text-sm font-bold text-[#FAF9F6] sm:text-base">{option.title}</span>
        <span className="mt-1 block text-xs text-[#FAF9F6]/60">{option.helper}</span>
      </button>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-3 pb-3 sm:items-center sm:p-5">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-md" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="itinerary-flow-title"
            initial={{ opacity: 0, y: 80, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.98 }}
            transition={{ type: 'spring', damping: 27, stiffness: 320 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-[#013220]/96 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 p-3 sm:p-4">
              <div className="flex min-w-0 items-center gap-3">
                {step > 1 && step <= questionSets.length && (
                  <button onClick={() => setStep(step - 1)} className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20" aria-label="Go back">
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                )}
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#FD8B00]">{step <= questionSets.length ? currentQuestion.eyebrow : 'Route plan'}</p>
                  <h2 id="itinerary-flow-title" className="truncate font-serif text-xl text-[#FAF9F6] sm:text-2xl">
                    {step <= questionSets.length ? currentQuestion.title : 'Send this plan'}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden grid-cols-3 gap-1 sm:grid">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className={`h-1.5 w-9 rounded-full ${step >= item ? 'bg-[#FD8B00]' : 'bg-white/15'}`} />
                  ))}
                </div>
                <button onClick={onClose} className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20" aria-label="Close itinerary flow">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="p-3 sm:p-4">
              <AnimatePresence mode="wait">
                {step <= questionSets.length && (
                  <motion.div key={currentQuestion.key} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} className="grid gap-3">
                    <div className={`grid gap-2 ${currentQuestion.options.length === 3 ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'}`}>
                      {currentQuestion.options.map((option) => (
                        <div key={option.value}>
                          <OptionCard option={option} stateKey={currentQuestion.key} />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step > questionSets.length && (
                  <motion.div key="plan" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} className="grid gap-3 lg:grid-cols-[1fr_300px]">
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 gap-2">
                        {[answers.crew, answers.energy, answers.duration].map((answer) => (
                          <div key={answer} className="rounded-xl border border-[#FD8B00]/30 bg-[#FD8B00]/15 px-3 py-2 text-center text-xs font-bold text-[#FD8B00]">
                            {answer}
                          </div>
                        ))}
                      </div>
                      <div className="grid gap-2 sm:grid-cols-3">
                        {itinerary.map((item, index) => (
                          <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                            <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#FD8B00] text-xs font-bold text-white">{index + 1}</div>
                            <h3 className="font-sans text-base font-bold text-white">{item.title}</h3>
                            <p className="mt-1 text-xs leading-5 text-[#FAF9F6]/70">{item.body}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#FAF9F6]/50">Local note</p>
                      <p className="mt-2 text-sm leading-5 text-[#FAF9F6]/70">{crewNote[answers.crew] || 'Ask the hotel team to adjust this with current route conditions.'}</p>
                      <div className="mt-4 grid gap-2">
                        <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#20bd5a]">
                          <MessageCircle className="h-4 w-4" />
                          Send WhatsApp
                        </a>
                        <button onClick={() => setStep(1)} className="rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15">
                          Start over
                        </button>
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
