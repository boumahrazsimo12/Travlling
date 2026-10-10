import { Link } from "react-router-dom";
import { MapPin, Camera, MessageCircle, Share2, Play, Mail, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-night-900 dark:bg-night-950 text-sand-100 mt-24">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-terracotta-500 via-saffron-500 to-majorelle-600 flex items-center justify-center text-white shadow-lg">
                <MapPin size={20} />
              </div>
              <div>
                <div className="font-bold text-lg">VisitMaroc</div>
                <div className="text-[10px] uppercase tracking-widest text-saffron-400">Discover the magic</div>
              </div>
            </div>
            <p className="text-sand-100/60 text-sm leading-relaxed">{t("footer.tagline")}</p>
            <div className="flex gap-2 mt-5">
              {[Camera, MessageCircle, Share2, Play].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-terracotta-500 border border-white/10 flex items-center justify-center transition"
                  aria-label="social"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-saffron-400">
              {t("footer.links")}
            </h4>
            <ul className="space-y-2.5 text-sm text-sand-100/70">
              <li><Link to="/explore" className="hover:text-white transition">Destinations</Link></li>
              <li><Link to="/planner" className="hover:text-white transition">AI Planner</Link></li>
              <li><Link to="/experiences" className="hover:text-white transition">Experiences</Link></li>
              <li><Link to="/world-cup-2030" className="hover:text-white transition">World Cup 2030</Link></li>
              <li><Link to="/map" className="hover:text-white transition">Interactive Map</Link></li>
              <li><Link to="/passport" className="hover:text-white transition">Digital Passport</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-saffron-400">
              {t("footer.about")}
            </h4>
            <ul className="space-y-2.5 text-sm text-sand-100/70">
              <li><a href="#" className="hover:text-white transition">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition">Morocco Tourism Office</a></li>
              <li><a href="#" className="hover:text-white transition">Sustainability</a></li>
              <li><a href="#" className="hover:text-white transition">Partners</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-saffron-400">
              Newsletter
            </h4>
            <p className="text-sm text-sand-100/60 mb-3">
              Hidden gems & festival alerts — no spam, only magic.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500 text-sand-100"
              />
              <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-terracotta-500 to-saffron-500 hover:from-terracotta-600 hover:to-saffron-600 text-white">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sand-100/50">
          <p>© 2026 VisitMaroc. Made with <Heart className="inline w-3.5 h-3.5 text-terracotta-400" /> in Rabat.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-white transition">{t("footer.terms")}</a>
            <a href="#" className="hover:text-white transition">{t("footer.contact")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
