import { usePlannerStore } from "../../store";
import { Button } from "../ui";
import { INTERESTS } from "../../data/mock";
import { Sparkles, Wallet, Calendar, Compass, Users, ArrowRight, ArrowLeft, Check, Loader2, MapPin, Plane, Star } from "lucide-react";
import { formatPrice } from "../../lib/utils";
import { generateMockItinerary } from "../../lib/ai";
import type { Itinerary } from "../../types";

const STYLES = [
  { id: "budget", label: "Budget", desc: "Hostels, street food, public transport", icon: Wallet },
  { id: "comfort", label: "Comfort", desc: "Nice riads, mix of experiences", icon: Star },
  { id: "luxury", label: "Luxury", desc: "5-star stays, private guides, fine dining", icon: Sparkles },
  { id: "adventure", label: "Adventure", desc: "Hiking, desert, active days", icon: Compass },
  { id: "cultural", label: "Cultural", desc: "History, medinas, artisan workshops", icon: MapPin },
];

export default function AIPlannerForm() {
  const store = usePlannerStore();
  const { step, setStep, budget, days, travelStyle, interests, companions, update, addInterest, removeInterest, setItinerary, isGenerating } = store;

  const handleGenerate = async () => {
    update({ isGenerating: true });
    // Simulate API call delay
    await new Promise((r) => setTimeout(r, 2200));
    const it: Itinerary = generateMockItinerary({ budget, days, travelStyle, interests, companions });
    setItinerary(it);
    update({ isGenerating: false });
    setStep(5);
  };

  return (
    <div className="bg-white dark:bg-white/5 rounded-3xl shadow-xl border border-sand-200/50 dark:border-white/10 overflow-hidden">
      {/* Progress bar */}
      <div className="bg-sand-50 dark:bg-black/30 px-6 py-4 border-b border-sand-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex-1">
              <div
                className={`h-1.5 rounded-full transition-all ${
                  s <= step ? "bg-gradient-to-r from-terracotta-500 to-saffron-500" : "bg-sand-200 dark:bg-white/10"
                }`}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 text-xs font-medium text-night-800/60 dark:text-sand-100/60">
          Step {Math.min(step, 4)} of 4 {step === 5 && "— Your itinerary is ready!"}
        </div>
      </div>

      <div className="p-6 md:p-8 min-h-[440px]">
        {step === 1 && (
          <div className="animate-fade-in">
            <StepHeader icon={Wallet} title="What's your budget?" subtitle="Total per person for the entire trip" />
            <div className="text-center my-8">
              <div className="text-6xl md:text-7xl font-bold font-display bg-gradient-to-r from-terracotta-500 to-saffron-500 bg-clip-text text-transparent">
                {formatPrice(budget, "MAD")}
              </div>
              <div className="text-sm text-night-800/60 dark:text-sand-100/60 mt-2">
                ≈ {formatPrice(budget / 10, "USD")} • {formatPrice(budget / 11, "EUR")}
              </div>
            </div>
            <input
              type="range"
              min={1500}
              max={30000}
              step={500}
              value={budget}
              onChange={(e) => update({ budget: +e.target.value })}
              className="w-full accent-terracotta-500"
            />
            <div className="flex justify-between text-xs text-night-800/60 dark:text-sand-100/60 mt-2">
              <span>Backpacker</span>
              <span>Comfort</span>
              <span>Luxury</span>
            </div>
            <StepActions onNext={() => setStep(2)} nextDisabled={false} />
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <StepHeader icon={Calendar} title="How many days?" subtitle="How long is your Moroccan adventure?" />
            <div className="grid grid-cols-4 gap-3 my-8">
              {[3, 5, 7, 10, 12, 14, 21, 30].map((d) => (
                <button
                  key={d}
                  onClick={() => update({ days: d })}
                  className={`py-5 rounded-2xl border-2 transition ${
                    days === d
                      ? "border-terracotta-500 bg-terracotta-500/10 text-terracotta-600 dark:text-saffron-400"
                      : "border-sand-200 dark:border-white/10 hover:border-terracotta-500/50"
                  }`}
                >
                  <div className="text-2xl font-bold">{d}</div>
                  <div className="text-xs text-night-800/60 dark:text-sand-100/60">days</div>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 mb-6">
              <Users size={18} className="text-terracotta-500" />
              <span className="text-sm font-medium">Travelers:</span>
              <div className="flex items-center gap-2">
                <button onClick={() => update({ companions: Math.max(1, companions - 1) })} className="w-8 h-8 rounded-full bg-sand-200 dark:bg-white/10 hover:bg-terracotta-500 hover:text-white transition">−</button>
                <span className="w-8 text-center font-bold">{companions}</span>
                <button onClick={() => update({ companions: companions + 1 })} className="w-8 h-8 rounded-full bg-sand-200 dark:bg-white/10 hover:bg-terracotta-500 hover:text-white transition">+</button>
              </div>
            </div>
            <StepActions onNext={() => setStep(3)} onBack={() => setStep(1)} />
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <StepHeader icon={Compass} title="Travel style?" subtitle="What kind of trip are you dreaming of?" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => update({ travelStyle: s.id })}
                  className={`text-start p-5 rounded-2xl border-2 transition flex items-center gap-4 ${
                    travelStyle === s.id
                      ? "border-terracotta-500 bg-terracotta-500/10"
                      : "border-sand-200 dark:border-white/10 hover:border-terracotta-500/50"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    travelStyle === s.id ? "bg-terracotta-500 text-white" : "bg-sand-100 dark:bg-white/10 text-night-800 dark:text-sand-100"
                  }`}>
                    <s.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-night-800 dark:text-sand-100">{s.label}</div>
                    <div className="text-xs text-night-800/60 dark:text-sand-100/60">{s.desc}</div>
                  </div>
                  {travelStyle === s.id && <Check className="text-terracotta-500" size={20} />}
                </button>
              ))}
            </div>
            <StepActions onNext={() => setStep(4)} onBack={() => setStep(2)} />
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in">
            <StepHeader icon={Sparkles} title="What excites you?" subtitle="Select all that apply — our AI will tailor your trip" />
            <div className="flex flex-wrap gap-2 my-6">
              {INTERESTS.map((i) => {
                const active = interests.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() => (active ? removeInterest(i) : addInterest(i))}
                    className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition ${
                      active
                        ? "border-terracotta-500 bg-terracotta-500 text-white"
                        : "border-sand-200 dark:border-white/10 text-night-800 dark:text-sand-100 hover:border-terracotta-500/50"
                    }`}
                  >
                    {active && <Check size={14} className="inline mr-1" />}
                    {i}
                  </button>
                );
              })}
            </div>
            {interests.length === 0 && (
              <p className="text-xs text-night-800/50 dark:text-sand-100/50 text-center">Select at least one interest</p>
            )}
            <StepActions
              onNext={handleGenerate}
              onBack={() => setStep(3)}
              nextLabel={isGenerating ? "Generating..." : "Generate My Itinerary ✨"}
              nextDisabled={interests.length === 0 || isGenerating}
              loading={isGenerating}
            />
          </div>
        )}

        {step === 5 && store.generatedItinerary && <ItineraryResult itinerary={store.generatedItinerary} onReset={() => { update({ generatedItinerary: null }); setStep(1); }} />}
      </div>
    </div>
  );
}

function StepHeader({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle: string }) {
  return (
    <div className="text-center mb-6">
      <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-terracotta-500 to-saffron-500 text-white flex items-center justify-center mb-3 shadow-lg">
        <Icon size={24} />
      </div>
      <h3 className="text-2xl font-bold font-display text-night-800 dark:text-sand-100 text-balance">{title}</h3>
      <p className="text-sm text-night-800/60 dark:text-sand-100/60 mt-1">{subtitle}</p>
    </div>
  );
}

function StepActions({
  onNext,
  onBack,
  nextLabel = "Continue",
  nextDisabled = false,
  loading = false,
}: {
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  loading?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 mt-8">
      {onBack ? (
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft size={16} /> Back
        </Button>
      ) : <div />}
      <Button onClick={onNext} disabled={nextDisabled} size="lg">
        {loading ? <><Loader2 size={16} className="animate-spin" /> Generating...</> : <>{nextLabel} <ArrowRight size={16} /></>}
      </Button>
    </div>
  );
}

function ItineraryResult({ itinerary, onReset }: { itinerary: Itinerary; onReset: () => void }) {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-ma-500 text-white flex items-center justify-center">
          <Check size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold font-display text-night-800 dark:text-sand-100">{itinerary.title}</h3>
          <p className="text-sm text-night-800/60 dark:text-sand-100/60">{itinerary.total_days} days • {itinerary.travel_style}</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-terracotta-500/10 to-saffron-500/10 dark:from-terracotta-500/20 dark:to-saffron-500/20 rounded-2xl p-4 mb-5 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-night-800/60 dark:text-sand-100/60">Estimated total</div>
          <div className="text-2xl font-bold text-terracotta-600 dark:text-saffron-400">{formatPrice(itinerary.total_estimated_cost || 0, itinerary.currency)}</div>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-wider text-night-800/60 dark:text-sand-100/60">Per day</div>
          <div className="text-lg font-bold text-night-800 dark:text-sand-100">
            {formatPrice(Math.round((itinerary.total_estimated_cost || 0) / itinerary.total_days), itinerary.currency)}
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-5 max-h-[360px] overflow-y-auto pr-2 scrollbar-hide">
        {itinerary.days.map((day) => (
          <div key={day.day_number} className="bg-sand-50 dark:bg-black/30 rounded-2xl p-4 border border-sand-200 dark:border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-terracotta-500 text-white flex items-center justify-center font-bold text-sm">
                  {day.day_number}
                </div>
                <div>
                  <div className="font-semibold text-night-800 dark:text-sand-100 text-sm">Day {day.day_number}</div>
                  <div className="text-xs text-night-800/60 dark:text-sand-100/60 flex items-center gap-1"><MapPin size={10} /> {day.destination}</div>
                </div>
              </div>
              <div className="text-xs font-semibold text-terracotta-600 dark:text-saffron-400">{formatPrice(day.daily_total)}</div>
            </div>
            {day.transport && (
              <div className="text-xs mb-2 flex items-center gap-1.5 text-majorelle-600 dark:text-majorelle-400">
                <Plane size={12} /> {day.transport.method}: {day.transport.from} → {day.transport.to} ({formatPrice(day.transport.cost)})
              </div>
            )}
            <div className="grid gap-2">
              {[
                { label: "Morning", items: day.morning, emoji: "🌅" },
                { label: "Afternoon", items: day.afternoon, emoji: "☀️" },
                { label: "Evening", items: day.evening, emoji: "🌙" },
              ].map((slot) => (
                <div key={slot.label}>
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-night-800/50 dark:text-sand-100/50 mb-1">
                    {slot.emoji} {slot.label}
                  </div>
                  <ul className="space-y-0.5">
                    {slot.items.map((a, i) => (
                      <li key={i} className="text-xs text-night-800/80 dark:text-sand-100/80 flex items-start gap-1.5">
                        <span className="text-terracotta-500 mt-0.5">•</span>
                        <span>
                          <span className="font-medium">{a.activity}</span>
                          <span className="text-night-800/60 dark:text-sand-100/60"> at {a.place}</span>
                          {a.cost > 0 && <span className="text-terracotta-500 dark:text-saffron-400 ml-1">({formatPrice(a.cost)})</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-sand-200 dark:border-white/10 text-xs flex items-center justify-between">
              <span className="text-night-800/60 dark:text-sand-100/60">🏨 {day.hotel.name} ({day.hotel.type})</span>
              <span className="font-semibold">{formatPrice(day.hotel.cost)}</span>
            </div>
          </div>
        ))}
      </div>

      {itinerary.tips && itinerary.tips.length > 0 && (
        <div className="bg-saffron-500/10 rounded-2xl p-4 mb-5">
          <div className="text-xs uppercase tracking-wider font-semibold text-saffron-600 dark:text-saffron-400 mb-2">💡 Pro Tips</div>
          <ul className="space-y-1">
            {itinerary.tips.map((tip, i) => (
              <li key={i} className="text-xs text-night-800/80 dark:text-sand-100/80 flex items-start gap-2">
                <span className="text-saffron-500">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="outline" onClick={onReset} className="flex-1">
          Start Over
        </Button>
        <Button className="flex-1" size="lg">
          Save & Book →
        </Button>
      </div>
    </div>
  );
}
