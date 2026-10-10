import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Language, Itinerary, PassportStamp } from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      updateUser: (updates) =>
        set((state) => ({ user: state.user ? { ...state.user, ...updates } : null })),
    }),
    { name: "visitmaroc-auth" }
  )
);

interface ThemeState {
  dark: boolean;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      dark: false,
      toggle: () =>
        set((state) => {
          const next = !state.dark;
          if (typeof document !== "undefined") {
            document.documentElement.classList.toggle("dark", next);
          }
          return { dark: next };
        }),
    }),
    { name: "visitmaroc-theme" }
  )
);

interface LocaleState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => {
        if (typeof document !== "undefined") {
          document.documentElement.lang = language;
          document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
        }
        set({ language });
      },
    }),
    { name: "visitmaroc-locale" }
  )
);

interface PlannerState {
  step: number;
  budget: number;
  days: number;
  travelStyle: string;
  interests: string[];
  companions: number;
  generatedItinerary: Itinerary | null;
  isGenerating: boolean;
  setStep: (step: number) => void;
  update: (partial: Partial<PlannerState>) => void;
  addInterest: (i: string) => void;
  removeInterest: (i: string) => void;
  setItinerary: (it: Itinerary | null) => void;
  reset: () => void;
}

export const usePlannerStore = create<PlannerState>((set) => ({
  step: 1,
  budget: 5000,
  days: 5,
  travelStyle: "comfort",
  interests: [],
  companions: 1,
  generatedItinerary: null,
  isGenerating: false,
  setStep: (step) => set({ step }),
  update: (partial) => set(partial),
  addInterest: (i) =>
    set((s) => ({ interests: s.interests.includes(i) ? s.interests : [...s.interests, i] })),
  removeInterest: (i) =>
    set((s) => ({ interests: s.interests.filter((x) => x !== i) })),
  setItinerary: (it) => set({ generatedItinerary: it }),
  reset: () =>
    set({
      step: 1,
      budget: 5000,
      days: 5,
      travelStyle: "comfort",
      interests: [],
      companions: 1,
      generatedItinerary: null,
    }),
}));

interface PassportState {
  stamps: PassportStamp[];
  addStamp: (stamp: PassportStamp) => void;
  removeStamp: (destination_id: number) => void;
}

export const usePassportStore = create<PassportState>()(
  persist(
    (set) => ({
      stamps: [
        { destination_id: 1, destination_name: "Marrakech", visited_at: "2026-03-20", note: "Incredible first visit!" },
        { destination_id: 2, destination_name: "Chefchaouen", visited_at: "2026-04-02", note: "The blue alleys stole my heart." },
        { destination_id: 4, destination_name: "Merzouga Desert", visited_at: "2026-04-10" },
      ],
      addStamp: (stamp) =>
        set((s) => ({
          stamps: s.stamps.some((x) => x.destination_id === stamp.destination_id)
            ? s.stamps
            : [...s.stamps, stamp],
        })),
      removeStamp: (destination_id) =>
        set((s) => ({ stamps: s.stamps.filter((x) => x.destination_id !== destination_id) })),
    }),
    { name: "visitmaroc-passport" }
  )
);

interface FavoritesState {
  ids: number[];
  toggle: (id: number) => void;
  has: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((x) => x !== id) : [...s.ids, id] })),
      has: (id) => get().ids.includes(id),
    }),
    { name: "visitmaroc-favorites" }
  )
);
