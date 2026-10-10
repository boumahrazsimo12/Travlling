export type Role = "admin" | "tourist" | "guide" | "artisan";
export type DestinationType = "city" | "monument" | "beach" | "mountain" | "desert" | "village" | "museum" | "market";
export type HotelType = "riad" | "hotel" | "hostel" | "apartment" | "luxury";
export type PriceRange = "budget" | "mid" | "upscale" | "luxury";
export type TravelStyle = "budget" | "comfort" | "luxury" | "adventure" | "cultural";
export type ExperienceType = "cooking" | "workshop" | "tour" | "cultural" | "adventure" | "sport";
export type EventType = "festival" | "concert" | "sports" | "cultural" | "food" | "religious";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  nationality?: string;
  preferred_language: string;
  gamification_points: number;
  sustainability_score: number;
}

export interface Destination {
  id: number;
  name_en: string;
  name_fr: string;
  name_ar: string;
  slug: string;
  type: DestinationType;
  region: string;
  latitude: number;
  longitude: number;
  description_en: string;
  description_fr: string;
  description_ar: string;
  cover_image: string;
  gallery?: string[];
  best_season: string;
  avg_crowd_level: number; // 1-10
  safety_score: number;
  sustainability_score: number;
  hidden_gem: boolean;
  wc2030_venue: boolean;
  rating?: number;
  review_count?: number;
}

export interface Hotel {
  id: number;
  destination_id: number;
  name: string;
  slug: string;
  stars: number;
  type: HotelType;
  address: string;
  latitude: number;
  longitude: number;
  price_per_night: number;
  currency: string;
  amenities: string[];
  cover_image: string;
  rating: number;
  is_wc2030_partner: boolean;
}

export interface Restaurant {
  id: number;
  destination_id: number;
  name: string;
  cuisine_type: string;
  address: string;
  latitude: number;
  longitude: number;
  price_range: PriceRange;
  avg_price: number;
  rating: number;
  cover_image: string;
}

export interface Experience {
  id: number;
  host_id: number;
  host_name: string;
  host_avatar?: string;
  destination_id: number;
  title: string;
  type: ExperienceType;
  description: string;
  price: number;
  currency: string;
  duration_hours: number;
  max_participants: number;
  cover_image: string;
  languages: string[];
  rating: number;
}

export interface ItineraryDay {
  day_number: number;
  destination: string;
  morning: { activity: string; place: string; cost: number }[];
  afternoon: { activity: string; place: string; cost: number }[];
  evening: { activity: string; place: string; cost: number }[];
  hotel: { name: string; type: string; cost: number };
  transport?: { from: string; to: string; method: string; cost: number };
  daily_total: number;
}

export interface Itinerary {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  total_days: number;
  budget: number;
  currency: string;
  travel_style: TravelStyle;
  is_ai_generated: boolean;
  days: ItineraryDay[];
  tips?: string[];
  total_estimated_cost?: number;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  type: string;
  points_required: number;
  earned?: boolean;
  earned_at?: string;
}

export interface PassportStamp {
  destination_id: number;
  destination_name: string;
  visited_at: string;
  note?: string;
  photo?: string;
}

export interface Event {
  id: number;
  destination_id: number;
  title: string;
  type: EventType;
  description: string;
  start_date: string;
  end_date: string;
  location_name: string;
  latitude: number;
  longitude: number;
  cover_image: string;
  is_wc2030_related: boolean;
  is_free: boolean;
}

export interface Stadium {
  id: number;
  name: string;
  city: string;
  capacity: number;
  latitude: number;
  longitude: number;
  description: string;
  cover_image: string;
  matches?: { date: string; teams: string; stage: string }[];
}

export interface TravelCompanion {
  id: number;
  user_name: string;
  user_avatar?: string;
  nationality: string;
  destination_id: number;
  destination_name: string;
  travel_start: string;
  travel_end: string;
  interests: string[];
  group_size: number;
  description: string;
}

export interface EmergencyContact {
  id: number;
  type: "hospital" | "police" | "pharmacy" | "embassy" | "fire";
  name: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  is_24h: boolean;
  city: string;
}

export type Language = "en" | "fr" | "ar" | "es";

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: { current_page: number; total: number; per_page: number };
}
