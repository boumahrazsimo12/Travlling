import { Link } from "react-router-dom";
import { Heart, MapPin, Star, Users, Clock, Sparkles } from "lucide-react";
import { Badge } from "../ui";
import { formatPrice, TYPE_ICONS, EXP_TYPE_ICONS } from "../../lib/utils";
import { useFavoritesStore } from "../../store";
import type { Destination, Hotel, Experience, Event, Stadium, TravelCompanion, EmergencyContact } from "../../types";

export function DestinationCard({ d }: { d: Destination }) {
  const toggle = useFavoritesStore((s) => s.toggle);
  const has = useFavoritesStore((s) => s.ids.includes(d.id));
  return (
    <Link
      to={`/destinations/${d.slug}`}
      className="group relative block bg-white dark:bg-white/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl dark:hover:shadow-black/50 border border-sand-200/50 dark:border-white/10 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
        <img
          src={d.cover_image}
          alt={d.name_en}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/800x600/c9522a/ffffff?text=${encodeURIComponent(d.name_en)}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <button
          onClick={(e) => {
            e.preventDefault();
            toggle(d.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur flex items-center justify-center hover:scale-110 transition z-10"
          aria-label="Favorite"
        >
          <Heart size={16} className={has ? "fill-terracotta-500 text-terracotta-500" : "text-night-800 dark:text-sand-100"} />
        </button>

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge variant="outline" className="bg-white/90 dark:bg-black/50 backdrop-blur border-none">
            {TYPE_ICONS[d.type]} {d.type}
          </Badge>
          {d.hidden_gem && (
            <Badge variant="warning">
              <Sparkles size={10} /> Hidden gem
            </Badge>
          )}
          {d.wc2030_venue && (
            <Badge variant="success">⚽ WC2030</Badge>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1.5 text-xs mb-1 opacity-90">
            <MapPin size={12} />
            {d.region}
          </div>
          <h3 className="text-xl font-bold font-display leading-tight text-balance">{d.name_en}</h3>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm">
          <Star size={14} className="fill-saffron-500 text-saffron-500" />
          <span className="font-semibold text-night-800 dark:text-sand-100">{d.rating}</span>
          <span className="text-night-800/50 dark:text-sand-100/50">({d.review_count?.toLocaleString()})</span>
        </div>
        <div className="text-xs text-night-800/60 dark:text-sand-100/60">
          Best: <span className="font-medium text-night-800 dark:text-sand-100">{d.best_season}</span>
        </div>
      </div>
    </Link>
  );
}

export function HotelCard({ h }: { h: Hotel }) {
  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl overflow-hidden shadow-sm border border-sand-200/50 dark:border-white/10 hover:shadow-lg transition">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
        <img src={h.cover_image} alt={h.name} loading="lazy" className="w-full h-full object-cover" onError={(e) => {
          (e.target as HTMLImageElement).src = `https://placehold.co/800x600/4a63c9/ffffff?text=${encodeURIComponent(h.name)}`;
        }} />
        {h.is_wc2030_partner && (
          <Badge variant="success" className="absolute top-3 left-3">⚽ WC2030 Partner</Badge>
        )}
        <Badge variant="accent" className="absolute top-3 right-3">
          {"★".repeat(h.stars)}
        </Badge>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="default">{h.type}</Badge>
          <div className="flex items-center gap-1 text-xs">
            <Star size={12} className="fill-saffron-500 text-saffron-500" />
            <span className="font-semibold text-night-800 dark:text-sand-100">{h.rating}</span>
          </div>
        </div>
        <h3 className="font-bold text-night-800 dark:text-sand-100 mb-1">{h.name}</h3>
        <p className="text-xs text-night-800/60 dark:text-sand-100/60 mb-3 line-clamp-1">{h.address}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {h.amenities.slice(0, 3).map((a) => (
            <span key={a} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-sand-100 dark:bg-white/5 text-night-800/70 dark:text-sand-100/70">{a}</span>
          ))}
        </div>
        <div className="flex items-baseline justify-between pt-3 border-t border-sand-200 dark:border-white/10">
          <div>
            <div className="text-lg font-bold text-terracotta-600 dark:text-saffron-400">{formatPrice(h.price_per_night, h.currency)}</div>
            <div className="text-xs text-night-800/50 dark:text-sand-100/50">per night</div>
          </div>
          <button className="px-4 py-1.5 rounded-full bg-night-800 dark:bg-white text-white dark:text-night-900 text-xs font-semibold hover:opacity-90 transition">Book</button>
        </div>
      </div>
    </div>
  );
}

export function ExperienceCard({ e }: { e: Experience }) {
  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl overflow-hidden shadow-sm border border-sand-200/50 dark:border-white/10 hover:shadow-lg hover:-translate-y-0.5 transition">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
        <img src={e.cover_image} alt={e.title} loading="lazy" className="w-full h-full object-cover" onError={(ev) => {
          (ev.target as HTMLImageElement).src = `https://placehold.co/800x600/2d8a6a/ffffff?text=${encodeURIComponent(e.title)}`;
        }} />
        <Badge variant="accent" className="absolute top-3 left-3 text-sm">
          {EXP_TYPE_ICONS[e.type]} {e.type}
        </Badge>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <img src={e.host_avatar} alt={e.host_name} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <div className="text-xs text-night-800/60 dark:text-sand-100/60">Hosted by</div>
            <div className="text-sm font-semibold text-night-800 dark:text-sand-100">{e.host_name}</div>
          </div>
        </div>
        <h3 className="font-bold text-night-800 dark:text-sand-100 mb-2 line-clamp-2">{e.title}</h3>
        <div className="flex items-center gap-3 text-xs text-night-800/60 dark:text-sand-100/60 mb-3">
          <span className="flex items-center gap-1"><Clock size={12} /> {e.duration_hours}h</span>
          <span className="flex items-center gap-1"><Users size={12} /> max {e.max_participants}</span>
          <span className="flex items-center gap-1">
            <Star size={12} className="fill-saffron-500 text-saffron-500" /> {e.rating}
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {e.languages.map((l) => (
            <span key={l} className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-sand-100 dark:bg-white/5 text-night-800/70 dark:text-sand-100/70">{l}</span>
          ))}
        </div>
        <div className="flex items-baseline justify-between pt-3 border-t border-sand-200 dark:border-white/10">
          <div>
            <span className="text-xs text-night-800/50 dark:text-sand-100/50">from </span>
            <span className="text-lg font-bold text-terracotta-600 dark:text-saffron-400">{formatPrice(e.price, e.currency)}</span>
          </div>
          <button className="px-4 py-1.5 rounded-full bg-night-800 dark:bg-white text-white dark:text-night-900 text-xs font-semibold hover:opacity-90 transition">Book</button>
        </div>
      </div>
    </div>
  );
}

export function EventCard({ ev }: { ev: Event }) {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const start = new Date(ev.start_date);
  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl overflow-hidden shadow-sm border border-sand-200/50 dark:border-white/10 hover:shadow-lg transition flex flex-col">
      <div className="relative aspect-[16/9] overflow-hidden bg-sand-200">
        <img src={ev.cover_image} alt={ev.title} loading="lazy" className="w-full h-full object-cover" onError={(e) => {
          (e.target as HTMLImageElement).src = `https://placehold.co/800x450/e9a024/ffffff?text=${encodeURIComponent(ev.title)}`;
        }} />
        <div className="absolute top-3 left-3 bg-white dark:bg-night-900 rounded-xl px-3 py-2 text-center min-w-[56px]">
          <div className="text-[10px] uppercase tracking-wider font-bold text-terracotta-500">{months[start.getMonth()]}</div>
          <div className="text-xl font-bold text-night-800 dark:text-sand-100">{start.getDate()}</div>
        </div>
        {ev.is_wc2030_related && <Badge variant="success" className="absolute top-3 right-3">⚽ WC2030</Badge>}
        {ev.is_free && <Badge variant="warning" className="absolute bottom-3 right-3">Free</Badge>}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <Badge variant="default" className="self-start mb-2">{ev.type}</Badge>
        <h3 className="font-bold text-night-800 dark:text-sand-100 mb-2 line-clamp-2">{ev.title}</h3>
        <p className="text-sm text-night-800/60 dark:text-sand-100/60 mb-3 line-clamp-2 flex-1">{ev.description}</p>
        <div className="flex items-center gap-1 text-xs text-night-800/70 dark:text-sand-100/70">
          <MapPin size={12} /> {ev.location_name}
        </div>
      </div>
    </div>
  );
}

export function StadiumCard({ s }: { s: Stadium }) {
  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl overflow-hidden shadow-sm border border-sand-200/50 dark:border-white/10 hover:shadow-xl transition group">
      <div className="relative aspect-[16/10] overflow-hidden bg-sand-200">
        <img src={s.cover_image} alt={s.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => {
          (e.target as HTMLImageElement).src = `https://placehold.co/800x500/4a63c9/ffffff?text=${encodeURIComponent(s.name)}`;
        }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="text-xs uppercase tracking-wider text-saffron-400 font-semibold mb-1">{s.city}</div>
          <h3 className="text-2xl font-bold font-display">{s.name}</h3>
        </div>
        <div className="absolute top-4 right-4 bg-white/95 dark:bg-night-900/90 backdrop-blur rounded-full px-3 py-1.5 text-xs font-bold text-terracotta-600 dark:text-saffron-400">
          {s.capacity.toLocaleString()} seats
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-night-800/70 dark:text-sand-100/70 mb-4 line-clamp-2">{s.description}</p>
        {s.matches && s.matches.length > 0 && (
          <div className="pt-4 border-t border-sand-200 dark:border-white/10 space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-night-800/60 dark:text-sand-100/60 mb-2">Featured Matches</div>
            {s.matches.slice(0, 2).map((m, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="font-medium text-night-800 dark:text-sand-100">{m.teams}</span>
                <span className="text-xs text-terracotta-500 dark:text-saffron-400 font-semibold">{m.stage}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function CompanionCard({ c }: { c: TravelCompanion }) {
  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl p-5 shadow-sm border border-sand-200/50 dark:border-white/10 hover:shadow-lg transition">
      <div className="flex items-center gap-3 mb-4">
        <img src={c.user_avatar} alt={c.user_name} className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-1">
          <div className="font-semibold text-night-800 dark:text-sand-100">{c.user_name}</div>
          <div className="text-xs text-night-800/60 dark:text-sand-100/60">{c.nationality} • group of {c.group_size}</div>
        </div>
      </div>
      <div className="text-sm text-night-800/70 dark:text-sand-100/70 mb-3 line-clamp-2">{c.description}</div>
      <div className="flex items-center gap-1.5 text-sm mb-3">
        <MapPin size={14} className="text-terracotta-500" />
        <span className="font-medium text-night-800 dark:text-sand-100">{c.destination_name}</span>
        <span className="text-night-800/50 dark:text-sand-100/50 ml-auto text-xs">
          {new Date(c.travel_start).toLocaleDateString("en", { month: "short", day: "numeric" })}
        </span>
      </div>
      <div className="flex flex-wrap gap-1 mb-4">
        {c.interests.map((i) => (
          <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-sand-100 dark:bg-white/5 text-night-800/70 dark:text-sand-100/70">{i}</span>
        ))}
      </div>
      <button className="w-full py-2 rounded-full bg-night-800 dark:bg-white text-white dark:text-night-900 text-sm font-semibold hover:opacity-90 transition">
        Connect
      </button>
    </div>
  );
}

export function EmergencyCard({ c }: { c: EmergencyContact }) {
  const icons: Record<string, string> = { hospital: "🏥", police: "🚔", pharmacy: "💊", embassy: "🏛️", fire: "🚒" };
  const colors: Record<string, string> = {
    hospital: "bg-red-500/10 text-red-600",
    police: "bg-blue-500/10 text-blue-600",
    pharmacy: "bg-green-500/10 text-green-600",
    embassy: "bg-purple-500/10 text-purple-600",
    fire: "bg-orange-500/10 text-orange-600",
  };
  return (
    <div className="bg-white dark:bg-white/5 rounded-2xl p-4 shadow-sm border border-sand-200/50 dark:border-white/10 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${colors[c.type]} flex items-center justify-center text-2xl shrink-0`}>
        {icons[c.type]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-night-800 dark:text-sand-100 truncate">{c.name}</div>
        <div className="text-xs text-night-800/60 dark:text-sand-100/60 truncate">
          {c.address} • {c.city}
          {c.is_24h && <span className="ml-2 text-emerald-ma-500 font-semibold">24h</span>}
        </div>
      </div>
      <a
        href={`tel:${c.phone.replace(/\s/g, "")}`}
        className="px-4 py-2 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-white text-sm font-semibold shrink-0"
      >
        {c.phone}
      </a>
    </div>
  );
}
