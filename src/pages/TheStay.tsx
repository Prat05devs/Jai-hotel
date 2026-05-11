import { AnimatedText, FadeInUp } from '../components/ui/Animations';
import { BedDouble, CalendarCheck, Flame, MessageCircle, Utensils } from 'lucide-react';
import { createWhatsAppLink } from '../constants';

interface TheStayProps {
  openBookingFlow: (context?: string | null) => void;
}

export function TheStay({ openBookingFlow }: TheStayProps) {
  const gopeshwarHutsLink = createWhatsAppLink(
    'Hi Jai Hotel, I want to know more about the premium Gopeshwar huts. Can you share availability, price and room photos?'
  );

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <AnimatedText 
          text="Find Your Perfect Space. From Budget-Friendly Bonfires to Premium Temple Views." 
          className="text-5xl md:text-6xl justify-center mb-6"
        />
        <FadeInUp delay={0.5}>
          <p className="text-lg text-on-surface-variant">
            Whether you seek the soulful community of Mandal or the exclusive comfort of Gopeshwar, we have a space crafted for your journey.
          </p>
        </FadeInUp>
      </section>

      {/* Accommodation Blocks */}
      <section className="max-w-7xl mx-auto px-6 py-12 space-y-24">
        {/* Block 1: Jai Hotel, Mandal Valley */}
        <FadeInUp>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-serif mb-6 text-primary-container">Jai Hotel, Mandal Valley (The Community Vibe)</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
                Our original safe house. Clean, budget-friendly rooms wrapped around a central garden. Perfect for Char Dham families, solo bikers, and WFH travelers looking for peace, daily bonfires, and hearty, home-cooked local meals at The Winehouse Restaurant.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Flame className="w-6 h-6 text-primary-container shrink-0 mt-1" />
                  <span className="text-on-surface-variant"><strong>Daily Bonfires:</strong> Gather around the fire, share stories, and gaze at the stars.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Utensils className="w-6 h-6 text-primary-container shrink-0 mt-1" />
                  <span className="text-on-surface-variant"><strong>The Winehouse Restaurant:</strong> Enjoy hearty meals made with local love.</span>
                </li>
                <li className="flex items-start gap-3">
                  <BedDouble className="w-6 h-6 text-primary-container shrink-0 mt-1" />
                  <span className="text-on-surface-variant"><strong>Cozy Rooms:</strong> Budget-friendly family suites and quiet corner desks.</span>
                </li>
              </ul>
              <button
                onClick={() => openBookingFlow('mandal')}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-container px-6 py-3.5 font-bold text-on-primary-container transition hover:bg-[#e65c00] sm:w-auto"
              >
                <CalendarCheck className="h-5 w-5" />
                Check Mandal dates
              </button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-[32px] overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=1200" alt="Cozy central garden and bonfire" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Block 2: The Gopeshwar Huts */}
        <FadeInUp delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-[4/3] rounded-[32px] overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200" alt="Modern interior of premium hut" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-serif mb-6 text-primary-container">The Gopeshwar Huts (The Premium Retreat)</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
                For those seeking a touch of modern luxury in the mountains. We offer 4 highly exclusive, premium hut-style rooms in the vibrant heart of Gopeshwar.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary-container" />
                  </div>
                  <span className="text-on-surface-variant"><strong>Temple Views:</strong> Wake up looking directly at the ancient Gopinath Temple.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary-container" />
                  </div>
                  <span className="text-on-surface-variant"><strong>Modern Comforts:</strong> Plush beds, flat-screen TVs, and pristine attached washrooms.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary-container" />
                  </div>
                  <span className="text-on-surface-variant"><strong>Food Junction:</strong> Step right outside your premium hut to our fully-equipped restaurant and cafe, serving everything you crave after a long journey.</span>
                </li>
              </ul>
              <a
                href={gopeshwarHutsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-container px-6 py-3.5 font-bold text-on-primary-container transition hover:bg-[#e65c00] sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                Ask about premium huts
              </a>
            </div>
          </div>
        </FadeInUp>
      </section>
    </div>
  );
}
