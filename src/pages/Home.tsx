import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Sparkles, MapPin, Compass, Trophy, ArrowRight, Users, Globe, Plane } from "lucide-react";
import { Button, SectionHeading, Badge } from "../components/ui";
import { DestinationCard, ExperienceCard, EventCard } from "../components/cards";
import { DESTINATIONS, EXPERIENCES, EVENTS, BADGES } from "../data/mock";

export default function Home() {
  const { t } = useTranslation();
  const featured = DESTINATIONS.filter((d) => !d.hidden_gem).slice(0, 6);
  const hiddenGems = DESTINATIONS.filter((d) => d.hidden_gem).slice(0, 4);
  const experiences = EXPERIENCES.slice(0, 4);
  const events = EVENTS.slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 moroccan-pattern" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-20 md:pb-32">
          <div className="max-w-3xl text-white">
            <Badge variant="warning" className="mb-5 text-sm">
              <Sparkles size={12} /> AI-Powered Travel Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.05] text-balance mb-6">
              {t("hero.title")}{" "}
              <span className="italic text-sand-100">{t("hero.titleAccent")}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 text-pretty max-w-2xl mb-8 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/planner">
                <Button size="lg" variant="secondary" className="bg-white text-terracotta-600 hover:bg-sand-50">
                  <Sparkles size={16} /> {t("hero.cta")}
                </Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-night-900">
                  {t("hero.ctaSecondary")} <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Destinations", value: "150+", icon: MapPin },
              { label: "Experiences", value: "400+", icon: Compass },
              { label: "Local Hosts", value: "250+", icon: Users },
              { label: "Languages", value: "4", icon: Globe },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4 text-white">
                <s.icon size={18} className="mb-2 text-saffron-400" />
                <div className="text-2xl md:text-3xl font-bold font-display">{s.value}</div>
                <div className="text-xs uppercase tracking-wider opacity-80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 1440 80" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" className="fill-sand-50 dark:fill-night-950" />
        </svg>
      </section>

      {/* WC2030 BANNER */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 md:-mt-16 relative z-10">
        <Link
          to="/world-cup-2030"
          className="block rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-ma-600 via-emerald-ma-500 to-saffron-500 p-6 md:p-8 shadow-2xl hover:scale-[1.01] transition-transform group"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-white">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-3xl shrink-0">
              ⚽
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-widest font-bold text-sand-100 mb-1">FIFA™ Official</div>
              <h3 className="text-2xl md:text-3xl font-bold font-display leading-tight">
                {t("home.wc2030Banner")}
              </h3>
              <p className="text-white/90 mt-1">{t("home.wc2030Desc")}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-semibold">Explore stadiums & packages</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </div>
          </div>
        </Link>
      </section>

      {/* FEATURED DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <SectionHeading
          eyebrow="Explore Morocco"
          title={t("home.featured")}
          subtitle={t("home.featuredSub")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((d) => (
            <DestinationCard key={d.id} d={d} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/explore">
            <Button variant="outline" size="lg">
              {t("common.viewAll")} destinations <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>

      {/* AI PLANNER TEASER */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-night-900 to-majorelle-700 p-8 md:p-14 text-white">
          <div className="absolute inset-0 moroccan-pattern opacity-30" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="warning" className="mb-4">
                <Sparkles size={12} /> AI Trip Planner
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-balance mb-4">
                Let AI craft your{" "}
                <span className="italic text-saffron-400">perfect Morocco</span> itinerary
              </h2>
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                Tell us your budget, dates, and interests. Our AI concierge will build a
                day-by-day plan with handpicked stays, experiences, and insider tips.
              </p>
              <Link to="/planner">
                <Button size="lg" variant="primary">
                  <Sparkles size={16} /> Plan My Trip in 60 Seconds
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="glass rounded-2xl p-5 animate-float">
                <div className="flex items-center gap-2 text-xs mb-3 text-night-800 dark:text-sand-100">
                  <Sparkles size={14} className="text-terracotta-500" /> AI generating...
                </div>
                <div className="space-y-2 text-sm text-night-800 dark:text-sand-100">
                  <div className="flex justify-between"><span>Day 1: Marrakech medina</span><span className="text-terracotta-500">✓</span></div>
                  <div className="flex justify-between"><span>Day 2: Atlas Mountains</span><span className="text-terracotta-500">✓</span></div>
                  <div className="flex justify-between"><span>Day 3: Todra Gorges</span><span className="text-saffron-500">✨</span></div>
                  <div className="flex justify-between opacity-50"><span>Day 4: Merzouga Desert</span></div>
                  <div className="flex justify-between opacity-30"><span>Day 5: Fez</span></div>
                </div>
                <div className="mt-4 pt-4 border-t border-sand-200 dark:border-white/10 flex justify-between text-xs">
                  <span className="text-night-800/70 dark:text-sand-100/70">Estimated</span>
                  <span className="font-bold text-terracotta-600 dark:text-saffron-400">4,800 MAD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIDDEN GEMS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <SectionHeading
          eyebrow="Off the beaten path"
          title={t("home.hiddenGems")}
          subtitle={t("home.hiddenGemsSub")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {hiddenGems.map((d) => (
            <DestinationCard key={d.id} d={d} />
          ))}
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <SectionHeading
          eyebrow="Meet your hosts"
          title={t("home.experiencesTitle")}
          subtitle={t("home.experiencesSub")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {experiences.map((e) => (
            <ExperienceCard key={e.id} e={e} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/experiences">
            <Button variant="outline" size="lg">Browse all experiences <ArrowRight size={16} /></Button>
          </Link>
        </div>
      </section>

      {/* EVENTS */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <SectionHeading
          eyebrow="What's happening"
          title={t("home.eventsTitle")}
          subtitle={t("home.eventsSub")}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((ev) => (
            <EventCard key={ev.id} ev={ev} />
          ))}
        </div>
      </section>

      {/* GAMIFICATION */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="rounded-3xl bg-gradient-to-br from-saffron-500/10 to-terracotta-500/10 dark:from-saffron-500/20 dark:to-terracotta-500/20 p-8 md:p-12 border border-sand-200 dark:border-white/10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="warning" className="mb-3"><Trophy size={12} /> Gamification</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-balance">
                Earn badges, collect stamps, climb the leaderboard 🏆
              </h2>
              <p className="text-night-800/70 dark:text-sand-100/70 mb-5 text-lg">
                Every destination visited, every experience booked, every review written earns you points
                and unlocks exclusive badges. Your digital passport awaits.
              </p>
              <Link to="/passport">
                <Button size="lg">
                  <Trophy size={16} /> Open My Passport
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {BADGES.slice(0, 8).map((b) => (
                <div
                  key={b.id}
                  className={`aspect-square rounded-2xl p-3 text-center flex flex-col items-center justify-center transition ${
                    b.earned
                      ? "bg-white dark:bg-white/10 shadow-md"
                      : "bg-night-800/5 dark:bg-white/5 grayscale opacity-40"
                  }`}
                >
                  <div className="text-3xl mb-1">{b.icon}</div>
                  <div className="text-[10px] font-semibold text-night-800 dark:text-sand-100 line-clamp-2">{b.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="rounded-3xl bg-night-900 text-white p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 moroccan-pattern opacity-20" />
          <div className="relative">
            <Plane className="mx-auto mb-4 text-saffron-400" size={36} />
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-balance">
              Ready for the adventure of a lifetime?
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg">
              From the bustling souks of Marrakech to the silent dunes of Merzouga — Morocco is waiting.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/planner">
                <Button size="lg" variant="primary">Start Planning</Button>
              </Link>
              <Link to="/explore">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">Browse Destinations</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
