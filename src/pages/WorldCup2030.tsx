import { Link } from "react-router-dom";
import { MapPin, Hotel, Train, Calendar, Star } from "lucide-react";
import { Button, SectionHeading, Badge } from "../components/ui";
import { StadiumCard } from "../components/cards";
import { STADIUMS, HOTELS } from "../data/mock";
import MapView from "../components/map/MapView";

export default function WorldCup2030() {
  const stadiumDestinations = STADIUMS.map((s) => ({
    id: s.id + 1000,
    name_en: s.name,
    name_fr: s.name,
    name_ar: s.name,
    slug: s.city.toLowerCase(),
    type: "city" as const,
    region: s.city,
    latitude: s.latitude,
    longitude: s.longitude,
    description_en: s.description,
    description_fr: s.description,
    description_ar: s.description,
    cover_image: s.cover_image,
    best_season: "June 2030",
    avg_crowd_level: 10,
    safety_score: 9,
    sustainability_score: 8,
    hidden_gem: false,
    wc2030_venue: true,
    rating: 5,
    review_count: 0,
  }));

  const wcHotels = HOTELS.filter((h) => h.is_wc2030_partner);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-ma-600 via-emerald-ma-500 to-saffron-500 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-white text-center">
          <Badge variant="warning" className="mb-4 text-sm">⚽ FIFA World Cup 2030™ • Morocco 🇲🇦 Spain 🇪🇸 Portugal 🇵🇹</Badge>
          <h1 className="text-5xl md:text-7xl font-bold font-display mb-4 text-balance">
            Welcome to<br /><span className="italic text-sand-100">football history</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 text-pretty">
            6 Moroccan cities, 6 legendary stadiums, endless memories. Your ultimate guide to experiencing
            the first three-continent World Cup in history.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" className="bg-white text-emerald-ma-700 hover:bg-sand-50">
              <Calendar size={16} /> Match Schedule
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-night-900">
              <Hotel size={16} /> WC2030 Hotels
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "Host Cities", value: "6" },
              { label: "Stadiums", value: "6" },
              { label: "Total Capacity", value: "420K+" },
              { label: "Match Days", value: "28" },
            ].map((s) => (
              <div key={s.label} className="bg-white/15 backdrop-blur rounded-2xl p-4">
                <div className="text-3xl md:text-4xl font-bold font-display">{s.value}</div>
                <div className="text-xs uppercase tracking-wider opacity-90">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stadium map */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <SectionHeading
          eyebrow="Host venues"
          title="6 Legendary Stadiums"
          subtitle="From the Atlantic coast to the Atlas foothills — discover where football history will be written"
        />
        <div className="mb-8">
          <MapView destinations={stadiumDestinations} height="500px" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STADIUMS.map((s) => <StadiumCard key={s.id} s={s} />)}
        </div>
      </section>

      {/* WC2030 partner hotels */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <SectionHeading
          eyebrow="Official Partners"
          title="WC2030-Ready Hotels"
          subtitle="Certified partner properties with priority booking, match-day shuttles, and fan-friendly amenities"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {wcHotels.map((h) => (
            <div key={h.id} className="relative">
              <div className="bg-white dark:bg-white/5 rounded-2xl overflow-hidden border-2 border-emerald-ma-500/40 shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={h.cover_image} alt={h.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="success">⚽ WC2030 Partner</Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <Star size={14} className="fill-saffron-500 text-saffron-500" /> {h.rating}
                    </div>
                  </div>
                  <h3 className="font-bold text-night-800 dark:text-sand-100">{h.name}</h3>
                  <p className="text-xs text-night-800/60 dark:text-sand-100/60 mb-3">{h.address}</p>
                  <div className="flex items-baseline justify-between pt-3 border-t border-sand-200 dark:border-white/10">
                    <div className="text-lg font-bold text-terracotta-600 dark:text-saffron-400">
                      {h.price_per_night} MAD <span className="text-xs font-normal text-night-800/50 dark:text-sand-100/50">/night</span>
                    </div>
                    <Button size="sm">Reserve</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transport info */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="bg-gradient-to-br from-majorelle-600 to-majorelle-700 rounded-3xl p-8 md:p-12 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Train size={28} />
            <h2 className="text-3xl md:text-4xl font-bold font-display">Getting around Morocco</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🚄", title: "Al Boraq High-Speed", desc: "Tangier ↔ Casablanca in 2h10 — Africa's first high-speed rail" },
              { icon: "🚌", title: "CTM & Supratours", desc: "Premium intercity buses with WiFi and AC connecting all 6 host cities" },
              { icon: "✈️", title: "RAM Domestic Flights", desc: "1h flights between Casablanca, Marrakech, Agadir, Fez, Tangier" },
            ].map((t) => (
              <div key={t.title} className="bg-white/10 backdrop-blur rounded-2xl p-5">
                <div className="text-3xl mb-2">{t.icon}</div>
                <h3 className="font-bold mb-1">{t.title}</h3>
                <p className="text-sm text-white/80">{t.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/planner">
              <Button size="lg" className="bg-white text-majorelle-700 hover:bg-sand-50">
                Plan My Match Day
              </Button>
            </Link>
            <Link to="/map">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <MapPin size={16} /> Explore on Map
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
