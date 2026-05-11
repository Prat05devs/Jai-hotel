import { AnimatedText, FadeInUp } from '../components/ui/Animations';

interface TheValleyProps {
  openItineraryFlow: () => void;
}

export function TheValley({ openItineraryFlow }: TheValleyProps) {
  const cards = [
    {
      title: "The Switzerland of India (Chopta & Tungnath)",
      desc: "Just a scenic drive through the dense forest roads starting right from our hotel. Experience the rolling meadows of Chopta and trek to the highest Shiva temple in the world, Tungnath.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Bugyals%20enroute%20Tungnath.jpg?width=1200",
      credit: "Vvnataraj / Wikimedia Commons",
      source: "https://commons.wikimedia.org/wiki/File:Bugyals_enroute_Tungnath.jpg"
    },
    {
      title: "The Epic Rudranath Trek",
      desc: "Calling all adventurers. Use Jai Hotel as your comfortable basecamp before conquering the legendary, highly sought-after 25km Rudranath trail. Rest up with us, then hit the mountains.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Rudranath%20Temple.jpg?width=1200",
      credit: "Saurabh Sharma / Wikimedia Commons",
      source: "https://commons.wikimedia.org/wiki/File:Rudranath_Temple.jpg"
    },
    {
      title: "The Ancient Heart of Chamoli (Gopeshwar & Anusuya Devi)",
      desc: "Step off the beaten path. In Mandal, trek the hidden 8-10km trail to the powerful Anusuya Devi Temple and the stunning Atri Muni Ashram waterfall. Just 7km away lies Gopeshwar, home to the historic Gopinath Temple.\n\nThe Winter Secret: Did you know the legendary 25km Rudranath trek is only open for five months? For the remaining seven months, Lord Rudranath is brought down to reside right here at the Gopinath Temple. Visit us in the off-season to experience this profound spiritual energy and receive Lord Rudra's blessings with ease.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Gopinath%20Mandir%20%2C%20Gopeshwar%20Chamoli.jpg?width=1200",
      credit: "Vishwanath Negi / Wikimedia Commons",
      source: "https://commons.wikimedia.org/wiki/File:Gopinath_Mandir_,_Gopeshwar_Chamoli.jpg"
    },
    {
      title: "The Morning Forest Walk",
      desc: "You don't need a heavy backpack to find peace. The beautiful Chopta forest road starts right at the end of Mandal. Step out of your room and instantly walk into the dense, quiet woods.",
      img: "https://commons.wikimedia.org/wiki/Special:FilePath/Grassland%2C%20Chopta%2C%20Uttarakhand.jpg?width=1200",
      credit: "Ssteaj / Wikimedia Commons",
      source: "https://commons.wikimedia.org/wiki/File:Grassland,_Chopta,_Uttarakhand.jpg"
    }
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="py-20 px-6 text-center max-w-4xl mx-auto">
        <AnimatedText 
          text="Discover the Hidden Gems of Garhwal" 
          className="text-5xl md:text-6xl justify-center mb-6"
        />
        <FadeInUp delay={0.5}>
          <p className="text-lg text-on-surface-variant">
            Most people only know Chopta. Stay with us, and we will show you the untouched beauty, spiritual heritage, and rushing glacier waters of the Mandal Valley.
          </p>
        </FadeInUp>
      </section>

      {/* Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {cards.map((card, idx) => (
            <FadeInUp key={idx} delay={idx * 0.1}>
              <div className="group rounded-[24px] overflow-hidden bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow border border-outline-variant/20 h-full flex flex-col">
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <a
                    href={card.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-[11px] font-semibold text-white/85 backdrop-blur transition hover:bg-black/70 hover:text-white"
                  >
                    Photo: {card.credit}
                  </a>
                </div>
                <div className="p-8 flex-grow">
                  <h3 className="text-2xl mb-4 font-serif">{card.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
        
        <FadeInUp delay={0.4}>
          <div className="mt-20 text-center">
            <button onClick={() => openItineraryFlow()} className="btn-primary text-lg px-8 py-4">Plan Your Itinerary With Us</button>
          </div>
        </FadeInUp>
      </section>
    </div>
  );
}
