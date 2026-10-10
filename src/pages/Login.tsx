import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Mail, Lock, User as UserIcon, Globe } from "lucide-react";
import { Button, Input } from "../components/ui";
import { useAuthStore } from "../store";

export default function Login() {
  const nav = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", email: "demo@visitmaroc.ma", password: "demo1234", nationality: "Morocco" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login(
      {
        id: 1,
        name: form.name || "Demo Explorer",
        email: form.email,
        role: "tourist",
        avatar: "https://i.pravatar.cc/150?img=47",
        nationality: form.nationality,
        preferred_language: "en",
        gamification_points: 450,
        sustainability_score: 20,
      },
      "mock-jwt-token"
    );
    nav("/");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-sand-100 via-sand-50 to-terracotta-50 dark:from-night-900 dark:via-night-950 dark:to-night-900 moroccan-pattern">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-terracotta-500 via-saffron-500 to-majorelle-600 text-white shadow-xl mb-4">
            <MapPin size={28} />
          </div>
          <h1 className="text-3xl font-bold font-display text-night-800 dark:text-sand-100">
            {mode === "login" ? "Welcome back" : "Join VisitMaroc"}
          </h1>
          <p className="text-night-800/60 dark:text-sand-100/60 text-sm mt-1">
            {mode === "login" ? "Sign in to continue your Moroccan journey" : "Create your account and start exploring"}
          </p>
        </div>

        <div className="bg-white dark:bg-night-900 rounded-3xl shadow-2xl border border-sand-200 dark:border-white/10 p-7">
          <div className="flex gap-1 bg-sand-100 dark:bg-white/5 p-1 rounded-full mb-6">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                mode === "login" ? "bg-white dark:bg-night-800 text-terracotta-500 shadow" : "text-night-800/60 dark:text-sand-100/60"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
                mode === "register" ? "bg-white dark:bg-night-800 text-terracotta-500 shadow" : "text-night-800/60 dark:text-sand-100/60"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode === "register" && (
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-night-800/40 dark:text-sand-100/40" size={16} />
                <Input
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-night-800/40 dark:text-sand-100/40" size={16} />
              <Input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="pl-10"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-night-800/40 dark:text-sand-100/40" size={16} />
              <Input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="pl-10"
                required
              />
            </div>
            {mode === "register" && (
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-night-800/40 dark:text-sand-100/40" size={16} />
                <Input
                  placeholder="Nationality"
                  value={form.nationality}
                  onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                  className="pl-10"
                />
              </div>
            )}

            <Button type="submit" size="lg" className="w-full">
              {mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-sand-200 dark:border-white/10" /></div>
            <div className="relative text-center text-xs uppercase text-night-800/40 dark:text-sand-100/40 bg-white dark:bg-night-900 px-2 inline-block mx-auto w-fit block ml-auto mr-auto">
              or continue with
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {["Google", "Facebook", "Apple"].map((p) => (
              <button key={p} className="py-2 rounded-xl border border-sand-200 dark:border-white/10 text-sm font-medium text-night-800 dark:text-sand-100 hover:bg-sand-50 dark:hover:bg-white/5 transition">
                {p}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-night-800/50 dark:text-sand-100/50 mt-5">
            {mode === "login" ? "Demo mode — any credentials work ✨" : "By signing up, you agree to our Terms & Privacy Policy."}
          </p>
        </div>
      </div>
    </div>
  );
}
