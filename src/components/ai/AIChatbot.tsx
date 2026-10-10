import { useState } from "react";
import { Bot, Send, X, Sparkles, User } from "lucide-react";
import { cn } from "../../lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SAMPLE_REPLIES: Record<string, string> =
  {
    default: "Hi! I'm your Morocco AI concierge 🌿 I can help you plan trips, find hidden gems, recommend restaurants, or answer anything about Moroccan culture. What's on your mind?",
    food: "Moroccan cuisine is legendary! Must-try dishes: tagine with preserved lemons, couscous on Fridays, pastilla (sweet-savory pie), harira soup, and msemen flatbread with honey. For the best food tour, head to Fez or Marrakech's medinas.",
    best: "The best time to visit Morocco is spring (March-May) or autumn (September-November) when temperatures are mild (20-25°C). Summer is great for the coast (Essaouira, Tangier) but avoid the desert and Marrakech. Winter is perfect for the Sahara!",
    sahara: "For a Sahara trip: fly to Errachidia or drive from Marrakech (9h). Book a 2-night desert camp with camel trek — prices range 1200-2500 MAD/night. Best months: Oct-April. Pack warm layers for cold desert nights!",
    chefchaouen: "Chefchaouen is a 4-hour drive from Tangier. Spend 2 nights, stay in a blue riad in the medina, hike to the Spanish Mosque for sunset, shop for woven blankets, and try goat cheese with local honey.",
    safety: "Morocco is generally very safe for tourists. Tips: agree on taxi prices upfront, keep valuables in hotel safes, avoid empty streets late at night, drink bottled water, and always carry small cash for tips.",
    visa: "Most Western nationalities get 90 days visa-free. Check with the nearest Moroccan consulate. Passport must be valid 6+ months beyond entry. No vaccinations required.",
    language: "Arabic (Darija) and Berber are official, but French is widely spoken. In tourist areas, many speak English. Learning 'salam' (hello), 'shukran' (thanks), and 'bssaha' (bon appétit) opens many doors!",
  };

function getReply(q: string): string {
  const lower = q.toLowerCase();
  if (lower.match(/food|eat|cuisine|tagine|couscous/)) return SAMPLE_REPLIES.food;
  if (lower.match(/best.*time|when.*visit|weather|season/)) return SAMPLE_REPLIES.best;
  if (lower.match(/sahara|desert|merzouga|camel/)) return SAMPLE_REPLIES.sahara;
  if (lower.match(/chefchaouen|blue.*city|blue.*pearl/)) return SAMPLE_REPLIES.chefchaouen;
  if (lower.match(/safe|safety|danger|scam/)) return SAMPLE_REPLIES.safety;
  if (lower.match(/visa|passport/)) return SAMPLE_REPLIES.visa;
  if (lower.match(/language|speak|french|arabic/)) return SAMPLE_REPLIES.language;
  return SAMPLE_REPLIES.default;
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: SAMPLE_REPLIES.default },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const send = async () => {
    if (!input.trim() || thinking) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { role: "user", content: userMsg }]);
    setInput("");
    setThinking(true);
    await new Promise((r) => setTimeout(r, 900 + Math.random() * 600));
    setMessages((m) => [...m, { role: "assistant", content: getReply(userMsg) }]);
    setThinking(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-terracotta-500 to-saffron-500 text-white shadow-2xl shadow-terracotta-500/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
        aria-label="Open chat"
      >
        {open ? <X size={22} /> : <Bot size={22} />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-ma-500 rounded-full border-2 border-white dark:border-night-900 animate-pulse" />
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-[calc(100vw-3rem)] sm:w-96 h-[600px] max-h-[calc(100vh-7rem)] bg-white dark:bg-night-900 rounded-3xl shadow-2xl border border-sand-200 dark:border-white/10 flex flex-col overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-br from-terracotta-500 to-majorelle-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                <Sparkles size={18} />
              </div>
              <div className="flex-1">
                <div className="font-bold">VisitMaroc AI</div>
                <div className="text-xs opacity-80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online • Powered by GPT-4o
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-sand-50 dark:bg-night-950">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex gap-2", m.role === "user" ? "justify-end" : "justify-start")}>
                {m.role === "assistant" && (
                  <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-terracotta-500 to-saffron-500 text-white flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm",
                    m.role === "user"
                      ? "bg-terracotta-500 text-white rounded-br-sm"
                      : "bg-white dark:bg-white/5 text-night-800 dark:text-sand-100 rounded-bl-sm border border-sand-200 dark:border-white/10"
                  )}
                >
                  {m.content}
                </div>
                {m.role === "user" && (
                  <div className="w-7 h-7 shrink-0 rounded-full bg-majorelle-500 text-white flex items-center justify-center">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}
            {thinking && (
              <div className="flex gap-2">
                <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-terracotta-500 to-saffron-500 text-white flex items-center justify-center">
                  <Bot size={14} />
                </div>
                <div className="bg-white dark:bg-white/5 border border-sand-200 dark:border-white/10 rounded-2xl rounded-bl-sm px-3.5 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-night-800/30 dark:bg-sand-100/30 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-night-800/30 dark:bg-sand-100/30 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-night-800/30 dark:bg-sand-100/30 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-sand-200 dark:border-white/10 bg-white dark:bg-night-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask me anything about Morocco..."
                className="flex-1 px-4 py-2.5 rounded-full bg-sand-50 dark:bg-white/5 border border-sand-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 text-night-800 dark:text-sand-100"
              />
              <button
                onClick={send}
                disabled={!input.trim() || thinking}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-terracotta-500 to-saffron-500 text-white disabled:opacity-50 hover:scale-105 active:scale-95 transition flex items-center justify-center"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
