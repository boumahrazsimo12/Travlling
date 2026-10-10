import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Layers, MapPin, Filter } from "lucide-react";
import { Button } from "../components/ui";
import MapView from "../components/map/MapView";
import { DESTINATIONS } from "../data/mock";
import type { Destination, DestinationType } from "../types";
import { TYPE_ICONS } from "../lib/utils";

const ALL_TYPES: DestinationType[] = ["city", "beach", "mountain", "desert", "village", "monument", "market"];

export default function MapPage() {
  const navigate = useNavigate();
  const [visibleTypes, setVisibleTypes] = useState<Set<DestinationType>>(new Set(ALL_TYPES));
  const [selected, setSelected] = useState<Destination | null>(null);

  const toggleType = (t: DestinationType) => {
    const next = new Set(visibleTypes);
    if (next.has(t)) next.delete(t);
    else next.add(t);
    setVisibleTypes(next);
  };

  const visible = useMemo(() => DESTINATIONS.filter((d) => visibleTypes.has(d.type)), [visibleTypes]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-display flex items-center gap-2">
            <MapPin className="text-terracotta-500" /> Interactive Map
          </h1>
          <p className="text-night-800/60 dark:text-sand-100/60 mt-1">
            Discover Morocco visually — click any pin to plan your visit
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-night-800/60 dark:text-sand-100/60" />
          <span className="text-sm text-night-800/60 dark:text-sand-100/60">
            {visible.length} of {DESTINATIONS.length} shown
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-5">
        <div>
          <MapView
            destinations={visible}
            height="70vh"
            onSelect={(d) => setSelected(d)}
          />
        </div>

        <aside className="space-y-4">
          <div className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-sand-200 dark:border-white/10">
            <h3 className="font-bold flex items-center gap-2 mb-3">
              <Filter size={16} /> Toggle layers
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {ALL_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleType(t)}
                  className={`text-start px-3 py-2 rounded-xl text-xs font-medium border-2 transition flex items-center gap-1.5 ${
                    visibleTypes.has(t)
                      ? "border-terracotta-500 bg-terracotta-500/10 text-terracotta-600 dark:text-saffron-400"
                      : "border-sand-200 dark:border-white/10 text-night-800/60 dark:text-sand-100/60"
                  }`}
                >
                  <span>{TYPE_ICONS[t]}</span> {t}
                </button>
              ))}
            </div>
          </div>

          {selected ? (
            <div className="bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-sand-200 dark:border-white/10 shadow-lg animate-fade-in">
              <img src={selected.cover_image} alt={selected.name_en} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg font-display">{selected.name_en}</h3>
                <p className="text-xs text-night-800/60 dark:text-sand-100/60 mb-3">{selected.region} • {selected.type}</p>
                <p className="text-sm text-night-800/80 dark:text-sand-100/80 line-clamp-3 mb-4">
                  {selected.description_en}
                </p>
                <Button className="w-full" size="md" onClick={() => navigate(`/destinations/${selected.slug}`)}>
                  View Details <MapPin size={14} />
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-saffron-500/10 dark:bg-saffron-500/20 rounded-2xl p-5 border border-saffron-500/20">
              <div className="text-2xl mb-2">👆</div>
              <h4 className="font-bold mb-1">Click any pin</h4>
              <p className="text-sm text-night-800/70 dark:text-sand-100/70">
                Select a destination on the map to see quick info and jump to details.
              </p>
            </div>
          )}

          <div className="bg-white dark:bg-white/5 rounded-2xl p-4 border border-sand-200 dark:border-white/10">
            <div className="text-xs font-semibold uppercase tracking-wider text-night-800/60 dark:text-sand-100/60 mb-2">
              All destinations
            </div>
            <div className="space-y-1 max-h-64 overflow-y-auto scrollbar-hide">
              {visible.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelected(d)}
                  className={`w-full text-start px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition ${
                    selected?.id === d.id
                      ? "bg-terracotta-500/10 text-terracotta-600 dark:text-saffron-400"
                      : "hover:bg-sand-100 dark:hover:bg-white/5 text-night-800 dark:text-sand-100"
                  }`}
                >
                  <span>{TYPE_ICONS[d.type]}</span>
                  <span className="flex-1 truncate font-medium">{d.name_en}</span>
                  <span className="text-xs text-night-800/50 dark:text-sand-100/50">★{d.rating}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
