import { Award, MapPin, Camera, Lock } from "lucide-react";
import { SectionHeading } from "../components/ui";
import { BADGES, DESTINATIONS } from "../data/mock";
import { usePassportStore } from "../store";

export default function Passport() {
  const stamps = usePassportStore((s) => s.stamps);
  const earned = BADGES.filter((b) => b.earned);
  const locked = BADGES.filter((b) => !b.earned);
  const totalPoints = earned.reduce((s, b) => s + b.points_required, 0);
  const progress = Math.min(100, Math.round((stamps.length / 10) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 animate-fade-in">
      <SectionHeading
        eyebrow="Gamification"
        title="Your Digital Passport"
        subtitle="Collect stamps, earn badges, and track every step of your Moroccan journey"
        align="left"
      />

      {/* Passport booklet */}
      <div className="bg-gradient-to-br from-terracotta-700 via-terracotta-600 to-saffron-500 rounded-3xl p-6 md:p-10 text-white shadow-2xl mb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, white 20px, white 21px)" }} />
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <div className="text-xs uppercase tracking-widest text-sand-100 mb-1">Kingdom of Morocco</div>
              <h2 className="text-3xl md:text-5xl font-bold font-display">Travel Passport</h2>
              <p className="text-white/80 mt-2">Official explorer • Level {Math.floor(totalPoints / 100) + 1}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold font-display">{stamps.length}</div>
                <div className="text-xs uppercase tracking-wider">Stamps</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold font-display">{earned.length}</div>
                <div className="text-xs uppercase tracking-wider">Badges</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold font-display">{totalPoints}</div>
                <div className="text-xs uppercase tracking-wider">Points</div>
              </div>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur rounded-2xl p-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-semibold">Master Explorer Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sand-100 to-saffron-400 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs mt-2 opacity-90">Visit {10 - stamps.length} more regions to unlock Master Explorer badge</p>
          </div>
        </div>
      </div>

      {/* Stamps grid */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold font-display mb-4 flex items-center gap-2">
          <MapPin className="text-terracotta-500" size={24} /> Passport Stamps
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stamps.map((s) => {
            const dest = DESTINATIONS.find((d) => d.id === s.destination_id);
            return (
              <div key={s.destination_id} className="bg-white dark:bg-white/5 rounded-2xl overflow-hidden border-2 border-terracotta-500/40 shadow-md">
                {dest && <img src={dest.cover_image} alt={dest.name_en} className="w-full h-24 object-cover" />}
                <div className="p-3 text-center">
                  <div className="w-16 h-16 mx-auto rounded-full border-4 border-terracotta-500 -mt-10 bg-white dark:bg-night-900 flex items-center justify-center text-2xl shadow-md">
                    🛂
                  </div>
                  <div className="font-bold text-sm mt-1 text-night-800 dark:text-sand-100">{s.destination_name}</div>
                  <div className="text-xs text-night-800/50 dark:text-sand-100/50">{new Date(s.visited_at).toLocaleDateString("en", { year: "numeric", month: "short", day: "numeric" })}</div>
                  {s.note && <div className="text-[11px] italic mt-1 text-night-800/70 dark:text-sand-100/70 line-clamp-2">"{s.note}"</div>}
                </div>
              </div>
            );
          })}
          {DESTINATIONS.slice(0, Math.max(0, 4 - stamps.length)).filter((d) => !stamps.some((s) => s.destination_id === d.id)).map((d) => (
            <div key={`empty-${d.id}`} className="bg-sand-100/50 dark:bg-white/5 rounded-2xl p-6 border-2 border-dashed border-sand-300 dark:border-white/10 flex flex-col items-center justify-center text-center min-h-[140px] opacity-60">
              <Camera className="text-night-800/40 dark:text-sand-100/40 mb-2" size={24} />
              <div className="text-xs font-semibold text-night-800/60 dark:text-sand-100/60">Visit {d.name_en}</div>
              <div className="text-[10px] text-night-800/40 dark:text-sand-100/40 mt-0.5">to earn a stamp</div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 className="text-2xl font-bold font-display mb-4 flex items-center gap-2">
          <Award className="text-saffron-500" size={24} /> Badge Collection
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {earned.map((b) => (
            <div key={b.id} className="bg-gradient-to-br from-saffron-400 to-terracotta-500 rounded-2xl p-4 text-white text-center shadow-md hover:scale-105 transition">
              <div className="text-4xl mb-2">{b.icon}</div>
              <div className="font-bold text-sm">{b.name}</div>
              <div className="text-[10px] opacity-90 mt-1">{b.description}</div>
              <div className="text-[10px] mt-2 font-semibold">+{b.points_required} pts</div>
            </div>
          ))}
          {locked.map((b) => (
            <div key={b.id} className="bg-sand-100 dark:bg-white/5 rounded-2xl p-4 text-center border border-sand-200 dark:border-white/10 grayscale opacity-50">
              <div className="text-4xl mb-2 relative inline-block">
                {b.icon}
                <Lock size={12} className="absolute -bottom-0.5 -right-0.5 bg-night-800 text-white rounded-full p-0.5" />
              </div>
              <div className="font-bold text-sm text-night-800 dark:text-sand-100">{b.name}</div>
              <div className="text-[10px] text-night-800/60 dark:text-sand-100/60 mt-1">{b.description}</div>
              <div className="text-[10px] mt-2 font-semibold text-terracotta-500">{b.points_required} pts</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
