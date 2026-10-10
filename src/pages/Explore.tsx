import { useState, useMemo } from "react";
import { Search, X, Sparkles } from "lucide-react";
import { Input, Button, SectionHeading } from "../components/ui";
import { DestinationCard } from "../components/cards";
import { DESTINATIONS, REGIONS } from "../data/mock";
import type { DestinationType } from "../types";

const TYPES: { id: DestinationType | "all"; label: string; icon: string }[] = [
  { id: "all", label: "All", icon: "🌍" },
  { id: "city", label: "Cities", icon: "🏙️" },
  { id: "beach", label: "Beaches", icon: "🏖️" },
  { id: "mountain", label: "Mountains", icon: "⛰️" },
  { id: "desert", label: "Deserts", icon: "🏜️" },
  { id: "village", label: "Villages", icon: "🏘️" },
  { id: "monument", label: "Monuments", icon: "🕌" },
  { id: "market", label: "Markets", icon: "🧺" },
];

export default function Explore() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<DestinationType | "all">("all");
  const [region, setRegion] = useState<string>("all");
  const [hiddenGemsOnly, setHiddenGemsOnly] = useState(false);
  const [wc2030Only, setWc2030Only] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "crowd" | "name">("rating");

  const filtered = useMemo(() => {
    let result = DESTINATIONS;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name_en.toLowerCase().includes(q) ||
          d.name_fr.toLowerCase().includes(q) ||
          d.region.toLowerCase().includes(q)
      );
    }
    if (type !== "all") result = result.filter((d) => d.type === type);
    if (region !== "all") result = result.filter((d) => d.region === region);
    if (hiddenGemsOnly) result = result.filter((d) => d.hidden_gem);
    if (wc2030Only) result = result.filter((d) => d.wc2030_venue);

    result = [...result].sort((a, b) => {
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "crowd") return a.avg_crowd_level - b.avg_crowd_level;
      return a.name_en.localeCompare(b.name_en);
    });
    return result;
  }, [search, type, region, hiddenGemsOnly, wc2030Only, sortBy]);

  const clear = () => {
    setSearch("");
    setType("all");
    setRegion("all");
    setHiddenGemsOnly(false);
    setWc2030Only(false);
  };
  const hasFilters = search || type !== "all" || region !== "all" || hiddenGemsOnly || wc2030Only;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 animate-fade-in">
      <SectionHeading
        eyebrow="All destinations"
        title="Explore Morocco"
        subtitle="Filter by type, region, or let AI find your perfect match"
        align="left"
      />

      {/* Search & filters */}
      <div className="sticky top-16 z-30 bg-sand-50/80 dark:bg-night-950/80 backdrop-blur-xl -mx-4 md:-mx-6 px-4 md:px-6 py-4 border-b border-sand-200 dark:border-white/10 mb-8">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-night-800/40 dark:text-sand-100/40" size={18} />
            <Input
              placeholder="Search destinations, regions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-sand-100 dark:hover:bg-white/5 rounded">
                <X size={14} />
              </button>
            )}
          </div>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-sand-200 dark:border-white/10 text-sm text-night-800 dark:text-sand-100"
          >
            <option value="all">All regions</option>
            {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-sand-200 dark:border-white/10 text-sm text-night-800 dark:text-sand-100"
          >
            <option value="rating">Top rated</option>
            <option value="crowd">Least crowded</option>
            <option value="name">A → Z</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {TYPES.map((tt) => (
            <button
              key={tt.id}
              onClick={() => setType(tt.id)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition border ${
                type === tt.id
                  ? "bg-terracotta-500 text-white border-terracotta-500"
                  : "bg-white dark:bg-white/5 border-sand-200 dark:border-white/10 text-night-800 dark:text-sand-100 hover:border-terracotta-500/50"
              }`}
            >
              <span>{tt.icon}</span> {tt.label}
            </button>
          ))}
          <button
            onClick={() => setHiddenGemsOnly((v) => !v)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition border ${
              hiddenGemsOnly
                ? "bg-saffron-500 text-night-900 border-saffron-500"
                : "bg-white dark:bg-white/5 border-sand-200 dark:border-white/10 text-night-800 dark:text-sand-100 hover:border-saffron-500/50"
            }`}
          >
            <Sparkles size={12} /> Hidden gems
          </button>
          <button
            onClick={() => setWc2030Only((v) => !v)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition border ${
              wc2030Only
                ? "bg-emerald-ma-500 text-white border-emerald-ma-500"
                : "bg-white dark:bg-white/5 border-sand-200 dark:border-white/10 text-night-800 dark:text-sand-100 hover:border-emerald-ma-500/50"
            }`}
          >
            ⚽ WC2030 Venues
          </button>
          {hasFilters && (
            <button onClick={clear} className="ml-auto text-xs font-medium text-terracotta-500 hover:underline">
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-5">
        <div className="text-sm text-night-800/60 dark:text-sand-100/60">
          <span className="font-semibold text-night-800 dark:text-sand-100">{filtered.length}</span> destinations
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🐪</div>
          <h3 className="text-xl font-bold text-night-800 dark:text-sand-100 mb-2">No destinations found</h3>
          <p className="text-night-800/60 dark:text-sand-100/60 mb-5">Try adjusting your filters</p>
          <Button variant="outline" onClick={clear}>Clear filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((d) => <DestinationCard key={d.id} d={d} />)}
        </div>
      )}
    </div>
  );
}
