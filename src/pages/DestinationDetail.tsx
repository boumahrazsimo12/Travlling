import { useParams, Link } from "react-router-dom";
import { MapPin, Star, Clock, Shield, Leaf, Users, Heart, Calendar, Compass, ArrowLeft, Camera, Cloud, Sun } from "lucide-react";
import { Button, Badge } from "../components/ui";
import { HotelCard, ExperienceCard } from "../components/cards";
import MapView from "../components/map/MapView";
import { DESTINATIONS, HOTELS, EXPERIENCES, RESTAURANTS } from "../data/mock";
import { useFavoritesStore } from "../store";
import { TYPE_ICONS } from "../lib/utils";

export default function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const d = DESTINATIONS.find((x) => x.slug === slug);
  const toggle = useFavoritesStore((s) => s.toggle);
  const has = useFavoritesStore((s) => s.ids.includes(d?.id || -1));

  if (!d) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-4">🏜️</div>
        <h1 className="text-3xl font-bold font-display mb-3">Destination not found</h1>
        <p className="text-night-800/60 dark:text-sand-100/60 mb-6">This place may have wandered off into the medina...</p>
        <Link to="/explore"><Button>Back to Explore</Button></Link>
      </div>
    );
  }

  const hotels = HOTELS.filter((h) => h.destination_id === d.id).slice(0, 4);
  const experiences = EXPERIENCES.filter((e) => e.destination_id === d.id).slice(0, 3);
  const restaurants = RESTAURANTS.filter((r) => r.destination_id === d.id).slice(0, 4);
  const crowdLabel = d.avg_crowd_level <= 3 ? "Quiet" : d.avg_crowd_level <= 6 ? "Moderate" : "Busy";
  const crowdColor = d.avg_crowd_level <= 3 ? "text-emerald-ma-600" : d.avg_crowd_level <= 6 ? "text-saffron-600" : "text-terracotta-600";

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={d.cover_image} alt={d.name_en} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/40 to-transparent" />
        <div className="absolute top-6 left-6 z-10">
          <Link to="/explore" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm hover:bg-white/20 transition">
            <ArrowLeft size={14} /> All destinations
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="bg-white/10 backdrop-blur border-white/30 text-white">
                {TYPE_ICONS[d.type]} {d.type}
              </Badge>
              {d.hidden_gem && <Badge variant="warning">✨ Hidden gem</Badge>}
              {d.wc2030_venue && <Badge variant="success">⚽ WC2030 Venue</Badge>}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-display mb-2 text-balance">{d.name_en}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1"><MapPin size={14} /> {d.region}</span>
              <span className="flex items-center gap-1"><Star className="fill-saffron-400 text-saffron-400" size={14} /> {d.rating} ({d.review_count?.toLocaleString()} reviews)</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> Best: {d.best_season}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold font-display mb-3">About this place</h2>
              <p className="text-lg leading-relaxed text-night-800/80 dark:text-sand-100/80 text-pretty">
                {d.description_en}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white dark:bg-white/5 rounded-2xl p-4 border border-sand-200 dark:border-white/10">
                <Users className={crowdColor} size={20} />
                <div className="text-xs text-night-800/60 dark:text-sand-100/60 mt-2">Crowd level</div>
                <div className={`font-bold text-lg ${crowdColor}`}>{d.avg_crowd_level}/10</div>
                <div className="text-xs">{crowdLabel}</div>
              </div>
              <div className="bg-white dark:bg-white/5 rounded-2xl p-4 border border-sand-200 dark:border-white/10">
                <Shield className="text-majorelle-500" size={20} />
                <div className="text-xs text-night-800/60 dark:text-sand-100/60 mt-2">Safety</div>
                <div className="font-bold text-lg text-majorelle-500">{d.safety_score}/10</div>
                <div className="text-xs">Very safe</div>
              </div>
              <div className="bg-white dark:bg-white/5 rounded-2xl p-4 border border-sand-200 dark:border-white/10">
                <Leaf className="text-emerald-ma-500" size={20} />
                <div className="text-xs text-night-800/60 dark:text-sand-100/60 mt-2">Sustainability</div>
                <div className="font-bold text-lg text-emerald-ma-500">{d.sustainability_score}/10</div>
                <div className="text-xs">Eco-friendly</div>
              </div>
            </div>

            {/* Weather widget */}
            <div className="bg-gradient-to-br from-majorelle-500 to-majorelle-700 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Weather forecast</h3>
                <span className="text-xs opacity-80">Next 5 days</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                  <div key={day} className="text-center">
                    <div className="text-xs opacity-80 mb-1">{day}</div>
                    <div className="text-2xl mb-1">{[<Sun key="s" />, <Cloud key="c" />, <Sun key="s2" />, <Sun key="s3" />, <Cloud key="c2" />][i]}</div>
                    <div className="text-sm font-bold">{22 + i}°</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div>
              <h3 className="text-xl font-bold font-display mb-3 flex items-center gap-2">
                <MapPin size={20} className="text-terracotta-500" /> Location
              </h3>
              <MapView destinations={[d]} center={[d.latitude, d.longitude]} zoom={10} height="380px" />
            </div>

            {/* Hotels */}
            {hotels.length > 0 && (
              <div>
                <h3 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
                  🏨 Where to stay
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {hotels.map((h) => <HotelCard key={h.id} h={h} />)}
                </div>
              </div>
            )}

            {/* Experiences */}
            {experiences.length > 0 && (
              <div>
                <h3 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
                  <Compass size={20} /> Local experiences
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {experiences.map((e) => <ExperienceCard key={e.id} e={e} />)}
                </div>
              </div>
            )}

            {/* Restaurants */}
            {restaurants.length > 0 && (
              <div>
                <h3 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
                  🍽️ Where to eat
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {restaurants.map((r) => (
                    <div key={r.id} className="flex gap-3 bg-white dark:bg-white/5 rounded-2xl p-3 border border-sand-200 dark:border-white/10">
                      <img src={r.cover_image} alt={r.name} className="w-20 h-20 rounded-xl object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-night-800 dark:text-sand-100 text-sm truncate">{r.name}</div>
                        <div className="text-xs text-night-800/60 dark:text-sand-100/60 mb-1">{r.cuisine_type}</div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="flex items-center gap-0.5"><Star size={11} className="fill-saffron-500 text-saffron-500" /> {r.rating}</span>
                          <span className="text-terracotta-500 font-semibold">{r.avg_price} MAD</span>
                          <span className="text-night-800/50 dark:text-sand-100/50">• {r.price_range}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="sticky top-20 space-y-4">
              <div className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-sand-200 dark:border-white/10">
                <Button
                  onClick={() => toggle(d.id)}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Heart className={has ? "fill-terracotta-500 text-terracotta-500" : ""} size={16} />
                  {has ? "Saved" : "Save to favorites"}
                </Button>
                <Link to="/planner" className="block mt-3">
                  <Button className="w-full" size="lg">
                    <Camera size={16} /> Plan a trip here
                  </Button>
                </Link>
              </div>

              <div className="bg-gradient-to-br from-terracotta-500 to-saffron-500 rounded-2xl p-5 text-white">
                <Clock size={20} className="mb-2" />
                <h4 className="font-bold mb-2">Best time to visit</h4>
                <p className="text-sm opacity-95">{d.best_season}</p>
                <p className="text-xs opacity-80 mt-2">
                  Plan around the best weather and cultural events for the most memorable experience.
                </p>
              </div>

              <div className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-sand-200 dark:border-white/10">
                <h4 className="font-bold mb-3">Quick tips</h4>
                <ul className="space-y-2 text-sm text-night-800/80 dark:text-sand-100/80">
                  <li className="flex gap-2"><span>👋</span> Greet with "As-salamu alaykum"</li>
                  <li className="flex gap-2"><span>💰</span> Carry cash for small shops</li>
                  <li className="flex gap-2"><span>📸</span> Always ask before photographing locals</li>
                  <li className="flex gap-2"><span>🍵</span> Never refuse mint tea — it's tradition</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
