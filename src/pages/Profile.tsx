import { useAuthStore } from "../store";
import { Link } from "react-router-dom";
import { LogOut, MapPin, Award, Heart, Calendar, Globe, Star } from "lucide-react";
import { Button, Badge } from "../components/ui";
import { BADGES } from "../data/mock";
import { usePassportStore } from "../store";

export default function Profile() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const stamps = usePassportStore((s) => s.stamps);
  const earned = BADGES.filter((b) => b.earned);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🔐</div>
        <h2 className="text-2xl font-bold font-display mb-2">Please sign in</h2>
        <p className="text-night-800/60 dark:text-sand-100/60 mb-5">You need to be signed in to view your profile.</p>
        <Link to="/login"><Button>Sign In</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 animate-fade-in">
      <div className="bg-gradient-to-br from-terracotta-500 via-saffron-500 to-majorelle-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden mb-8">
        <div className="absolute inset-0 moroccan-pattern opacity-20" />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-2xl object-cover border-4 border-white/30 shadow-lg" />
          <div className="flex-1">
            <Badge variant="warning" className="mb-2">{user.role}</Badge>
            <h1 className="text-3xl font-bold font-display">{user.name}</h1>
            <p className="text-white/80 mt-1">{user.email}</p>
            <div className="flex flex-wrap gap-3 mt-3 text-sm">
              <span className="flex items-center gap-1"><Globe size={14} /> {user.nationality}</span>
              <span className="flex items-center gap-1"><Award size={14} /> {user.gamification_points} pts</span>
              <span className="flex items-center gap-1"><MapPin size={14} /> {stamps.length} stamps</span>
            </div>
          </div>
          <Button variant="outline" className="border-white/40 text-white hover:bg-white/10" onClick={() => { logout(); window.location.href = "/"; }}>
            <LogOut size={14} /> Sign Out
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-sand-200 dark:border-white/10">
          <Heart className="text-terracotta-500 mb-2" size={20} />
          <div className="text-3xl font-bold font-display">12</div>
          <div className="text-xs uppercase tracking-wider text-night-800/60 dark:text-sand-100/60">Saved Places</div>
        </div>
        <div className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-sand-200 dark:border-white/10">
          <Calendar className="text-majorelle-500 mb-2" size={20} />
          <div className="text-3xl font-bold font-display">3</div>
          <div className="text-xs uppercase tracking-wider text-night-800/60 dark:text-sand-100/60">Upcoming Trips</div>
        </div>
        <div className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-sand-200 dark:border-white/10">
          <Star className="text-saffron-500 mb-2" size={20} />
          <div className="text-3xl font-bold font-display">{earned.length}</div>
          <div className="text-xs uppercase tracking-wider text-night-800/60 dark:text-sand-100/60">Badges Earned</div>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-sand-200 dark:border-white/10">
          <h3 className="font-bold mb-3">Recent Activity</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><span>🏆</span> Earned <b>Desert Nomad</b> badge</li>
            <li className="flex gap-2"><span>🛂</span> Visited <b>Merzouga Desert</b></li>
            <li className="flex gap-2"><span>🍲</span> Booked <b>Tagine Cooking Class</b></li>
            <li className="flex gap-2"><span>⭐</span> Reviewed <b>Chefchaouen</b> — 5 stars</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-sand-200 dark:border-white/10">
          <h3 className="font-bold mb-3">Account Settings</h3>
          <ul className="space-y-2 text-sm">
            <li><button className="w-full text-start py-2 hover:text-terracotta-500 transition">Edit profile</button></li>
            <li><button className="w-full text-start py-2 hover:text-terracotta-500 transition">Change password</button></li>
            <li><button className="w-full text-start py-2 hover:text-terracotta-500 transition">Notification preferences</button></li>
            <li><button className="w-full text-start py-2 hover:text-terracotta-500 transition">Privacy settings</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
