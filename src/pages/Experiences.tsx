import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input, SectionHeading } from "../components/ui";
import { ExperienceCard } from "../components/cards";
import { EXPERIENCES } from "../data/mock";
import type { ExperienceType } from "../types";
import { EXP_TYPE_ICONS } from "../lib/utils";

const TYPES: { id: ExperienceType | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "cooking", label: "Cooking" },
  { id: "workshop", label: "Workshop" },
  { id: "tour", label: "Tours" },
  { id: "cultural", label: "Cultural" },
  { id: "adventure", label: "Adventure" },
  { id: "sport", label: "Sport" },
];

export default function Experiences() {
  const [type, setType] = useState<ExperienceType | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let r = EXPERIENCES;
    if (type !== "all") r = r.filter((e) => e.type === type);
    if (search) {
      const q = search.toLowerCase();
      r = r.filter((e) => e.title.toLowerCase().includes(q) || e.host_name.toLowerCase().includes(q));
    }
    return r;
  }, [type, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 animate-fade-in">
      <SectionHeading
        eyebrow="Cultural marketplace"
        title="Authentic Experiences"
        subtitle="Book directly with verified local hosts — chefs, artisans, guides, and storytellers who bring Morocco to life"
        align="left"
      />

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-night-800/40 dark:text-sand-100/40" size={18} />
          <Input placeholder="Search experiences or hosts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-11" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => setType(t.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 border-2 transition ${
              type === t.id
                ? "border-terracotta-500 bg-terracotta-500 text-white"
                : "border-sand-200 dark:border-white/10 text-night-800 dark:text-sand-100 hover:border-terracotta-500/50"
            }`}
          >
            {t.id !== "all" && <span>{EXP_TYPE_ICONS[t.id]}</span>}
            {t.label}
          </button>
        ))}
      </div>

      <div className="text-sm text-night-800/60 dark:text-sand-100/60 mb-5">
        <span className="font-semibold text-night-800 dark:text-sand-100">{filtered.length}</span> experiences
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((e) => <ExperienceCard key={e.id} e={e} />)}
      </div>
    </div>
  );
}
