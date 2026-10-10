import { Sparkles, Bot, Map, Users } from "lucide-react";
import AIPlannerForm from "../components/ai/AIPlannerForm";
import { SectionHeading } from "../components/ui";

export default function Planner() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 animate-fade-in">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-terracotta-500/10 text-terracotta-600 dark:text-saffron-400 text-xs font-semibold mb-4">
          <Sparkles size={12} /> Powered by GPT-4o
        </div>
        <SectionHeading
          title="AI Travel Planner"
          subtitle="Tell us your dreams. Our AI concierge crafts a personalized, day-by-day Moroccan itinerary — with stays, activities, transport, and budget — in under 60 seconds."
        />
      </div>

      <AIPlannerForm />

      <div className="grid md:grid-cols-3 gap-4 mt-10">
        {[
          { icon: Bot, title: "Morocco Expert AI", desc: "Trained on thousands of real Moroccan journeys and local insights" },
          { icon: Map, title: "Day-by-day Plan", desc: "Hotels, activities, restaurants, transport — fully scheduled" },
          { icon: Users, title: "Local Host Network", desc: "Book directly with verified guides, artisans, and chefs" },
        ].map((f) => (
          <div key={f.title} className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-sand-200 dark:border-white/10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-terracotta-500 to-saffron-500 text-white flex items-center justify-center mb-3">
              <f.icon size={18} />
            </div>
            <h3 className="font-bold mb-1 text-night-800 dark:text-sand-100">{f.title}</h3>
            <p className="text-sm text-night-800/70 dark:text-sand-100/70">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
