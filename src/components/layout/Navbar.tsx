import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Menu, X, Sparkles, Globe, Sun, Moon, LogIn, Trophy } from "lucide-react";
import { Button } from "../ui";
import { useThemeStore, useLocaleStore, useAuthStore } from "../../store";
import type { Language } from "../../types";
import { cn } from "../../lib/utils";

const LANG_LABELS: Record<Language, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
  es: "Español",
};

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const dark = useThemeStore((s) => s.dark);
  const toggleTheme = useThemeStore((s) => s.toggle);
  const language = useLocaleStore((s) => s.language);
  const setLanguage = useLocaleStore((s) => s.setLanguage);
  const { i18n } = useTranslation();
  const user = useAuthStore((s) => s.user);

  const switchLang = (l: Language) => {
    setLanguage(l);
    i18n.changeLanguage(l);
    setLangOpen(false);
  };

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/explore", label: t("nav.explore") },
    { to: "/map", label: t("nav.map") },
    { to: "/planner", label: t("nav.planner"), icon: <Sparkles size={14} /> },
    { to: "/experiences", label: t("nav.experiences") },
    { to: "/world-cup-2030", label: t("nav.wc2030") },
    { to: "/passport", label: t("nav.passport"), icon: <Trophy size={14} /> },
  ];

  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-terracotta-500 via-saffron-500 to-majorelle-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition">
            <MapPin size={18} />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-lg text-night-800 dark:text-sand-100">VisitMaroc</div>
            <div className="text-[10px] uppercase tracking-widest text-terracotta-500 dark:text-saffron-400 font-semibold">Discover the magic</div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-3.5 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors",
                  isActive
                    ? "bg-terracotta-500/10 text-terracotta-600 dark:text-saffron-400"
                    : "text-night-800/80 dark:text-sand-100/80 hover:bg-sand-100 dark:hover:bg-white/5"
                )
              }
            >
              {l.icon}
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <div className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="p-2 rounded-full hover:bg-sand-100 dark:hover:bg-white/5 text-night-800 dark:text-sand-100"
              aria-label="Language"
            >
              <Globe size={18} />
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                <div className="absolute right-0 top-11 z-50 w-40 bg-white dark:bg-night-900 rounded-xl shadow-xl border border-sand-200 dark:border-white/10 p-1.5">
                  {(Object.keys(LANG_LABELS) as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => switchLang(l)}
                      className={cn(
                        "w-full text-start px-3 py-2 rounded-lg text-sm font-medium",
                        language === l
                          ? "bg-terracotta-500/10 text-terracotta-600 dark:text-saffron-400"
                          : "text-night-800 dark:text-sand-100 hover:bg-sand-100 dark:hover:bg-white/5"
                      )}
                    >
                      {LANG_LABELS[l]}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-sand-100 dark:hover:bg-white/5 text-night-800 dark:text-sand-100"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link to={user ? "/profile" : "/login"}>
            <Button variant="outline" size="sm">
              {user ? (
                <>
                  <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover" />
                  {user.name.split(" ")[0]}
                </>
              ) : (
                <>
                  <LogIn size={14} />
                  Login
                </>
              )}
            </Button>
          </Link>

          <button
            className="lg:hidden p-2 rounded-full hover:bg-sand-100 dark:hover:bg-white/5 text-night-800 dark:text-sand-100"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-sand-200 dark:border-white/10 bg-white dark:bg-night-900 px-4 py-3">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2",
                    isActive
                      ? "bg-terracotta-500/10 text-terracotta-600 dark:text-saffron-400"
                      : "text-night-800 dark:text-sand-100"
                  )
                }
              >
                {l.icon}
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
