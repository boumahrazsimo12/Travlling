import type { TravelStyle } from "../types";

interface Params {
  budget: number;
  days: number;
  travelStyle: string;
  interests: string[];
  companions: number;
}

const DESTINATION_POOLS: Record<string, string[]> = {
  cultural: ["Fez", "Marrakech", "Meknes", "Rabat", "Volubilis"],
  adventure: ["Todra Gorges", "Merzouga Desert", "Atlas Mountains", "Dades Valley", "Taghazout"],
  beach: ["Essaouira", "Agadir", "Taghazout", "Legzira Beach", "Asilah"],
  desert: ["Merzouga Desert", "Zagora", "M'Hamid", "Ouarzazate"],
  budget: ["Chefchaouen", "Essaouira", "Meknes", "Tangier"],
  default: ["Marrakech", "Chefchaouen", "Fez", "Merzouga Desert", "Essaouira", "Casablanca", "Rabat"],
};

const ACTIVITIES = [
  { activity: "Explore the ancient medina", place: "Old Town", cost: 0 },
  { activity: "Visit the main souk", place: "Central Market", cost: 150 },
  { activity: "Traditional mint tea tasting", place: "Café des Épices", cost: 40 },
  { activity: "Hammam spa experience", place: "Heritage Bathhouse", cost: 350 },
  { activity: "Cooking class with local chef", place: "Family Riad", cost: 450 },
  { activity: "Sunset photography walk", place: "City Walls", cost: 0 },
  { activity: "Museum of Moroccan Arts", place: "Dar Si Said", cost: 70 },
  { activity: "Leather tannery tour", place: "Chouara", cost: 100 },
  { activity: "Rooftop dinner with city views", place: "Nomad Restaurant", cost: 280 },
  { activity: "Jardin Majorelle visit", place: "Majorelle Garden", cost: 150 },
  { activity: "Berber music evening", place: "Local Riad", cost: 180 },
  { activity: "Atlas Mountains day hike", place: "Ourika Valley", cost: 600 },
];

const HOTELS: Record<string, { name: string; type: string; cost: number }[]> = {
  budget: [
    { name: "Hostel Medina", type: "hostel", cost: 250 },
    { name: "Dar Guesthouse", type: "guesthouse", cost: 350 },
  ],
  comfort: [
    { name: "Riad Jardin Secret", type: "riad", cost: 800 },
    { name: "Hotel Atlas", type: "hotel", cost: 950 },
  ],
  luxury: [
    { name: "La Mamounia", type: "luxury", cost: 3500 },
    { name: "Royal Mansour", type: "luxury", cost: 4800 },
  ],
  adventure: [
    { name: "Desert Camp Erg Chebbi", type: "camp", cost: 1200 },
    { name: "Mountain Lodge", type: "lodge", cost: 900 },
  ],
  cultural: [
    { name: "Historic Riad Fez", type: "riad", cost: 1100 },
    { name: "Traditional Dar", type: "riad", cost: 850 },
  ],
};

const TRANSPORT_METHODS = [
  { method: "Train ONCF", cost: 180 },
  { method: "Private transfer", cost: 900 },
  { method: "CTM Bus", cost: 120 },
  { method: "Grand taxi (shared)", cost: 80 },
  { method: "Rental car", cost: 450 },
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function pickN<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n && copy.length; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}

export function generateMockItinerary(p: Params) {
  const style = (p.travelStyle as TravelStyle) || "comfort";

  // Pick destinations based on interests + style
  const poolSet = new Set<string>();
  p.interests.forEach((i) => {
    const lower = i.toLowerCase();
    if (lower.includes("culture") || lower.includes("history")) DESTINATION_POOLS.cultural.forEach((d) => poolSet.add(d));
    if (lower.includes("adventure") || lower.includes("mountain")) DESTINATION_POOLS.adventure.forEach((d) => poolSet.add(d));
    if (lower.includes("beach")) DESTINATION_POOLS.beach.forEach((d) => poolSet.add(d));
    if (lower.includes("desert")) DESTINATION_POOLS.desert.forEach((d) => poolSet.add(d));
  });
  if (poolSet.size < p.days) {
    DESTINATION_POOLS.default.forEach((d) => poolSet.add(d));
  }
  const pool = Array.from(poolSet);
  const destinations = pickN(pool, Math.min(p.days, pool.length));
  while (destinations.length < p.days) destinations.push(pick(pool));

  const hotelPool = HOTELS[style] || HOTELS.comfort;

  const days = destinations.map((dest, i) => {
    const hotel = pick(hotelPool);
    const activities = pickN(ACTIVITIES, 9);
    const morning = activities.slice(0, 3);
    const afternoon = activities.slice(3, 6);
    const evening = activities.slice(6, 9);

    const transport =
      i > 0
        ? {
            ...pick(TRANSPORT_METHODS),
            from: destinations[i - 1],
            to: dest,
          }
        : undefined;

    const activitiesCost =
      [...morning, ...afternoon, ...evening].reduce((s, a) => s + a.cost, 0);
    const daily_total = hotel.cost + activitiesCost + (transport?.cost || 0) + 300; // 300 for meals

    return {
      day_number: i + 1,
      destination: dest,
      morning,
      afternoon,
      evening,
      hotel,
      transport,
      daily_total,
    };
  });

  const total_estimated_cost = days.reduce((s, d) => s + d.daily_total, 0);

  const titles: Record<string, string> = {
    budget: `Backpacking Morocco on ${p.budget.toLocaleString()} MAD`,
    comfort: `A Comfortable ${p.days}-Day Moroccan Journey`,
    luxury: `Luxury Morocco: ${p.days} Days of Elegance`,
    adventure: `Adventure Morocco: ${p.days} Days of Discovery`,
    cultural: `Imperial Cities & Cultural Treasures`,
  };

  return {
    id: Date.now(),
    title: titles[style] || `Your ${p.days}-Day Moroccan Adventure`,
    description: `AI-generated ${p.days}-day itinerary tailored to your interests: ${p.interests.join(", ") || "varied"}.`,
    start_date: new Date(Date.now() + 86400000 * 30).toISOString().slice(0, 10),
    end_date: new Date(Date.now() + 86400000 * (30 + p.days)).toISOString().slice(0, 10),
    total_days: p.days,
    budget: p.budget,
    currency: "MAD",
    travel_style: style,
    is_ai_generated: true,
    days,
    total_estimated_cost,
    tips: [
      "Always bargain in souks — start at 30-40% of the asking price.",
      "Carry cash (dirhams) — many small shops don't accept cards.",
      "Try a traditional hammam at least once — it's a cultural rite.",
      "Dress modestly when visiting mosques (non-Muslims usually can't enter).",
      "Download offline maps — signal can be spotty in the Atlas and desert.",
      "Learn 'Shukran' (thanks) and 'Salam' (hello) — locals love the effort.",
    ],
  };
}
