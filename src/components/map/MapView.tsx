import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Destination } from "../../types";
import { TYPE_ICONS } from "../../lib/utils";

// Fix default marker icons for leaflet in bundled env
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

interface MapProps {
  destinations: Destination[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  onSelect?: (d: Destination) => void;
  highlightId?: number;
}

export default function MapView({
  destinations,
  center = [31.7917, -7.0926], // Morocco center
  zoom = 6,
  height = "500px",
  onSelect,
  highlightId,
}: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center,
      zoom,
      scrollWheelZoom: true,
      zoomControl: true,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    // clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    destinations.forEach((d) => {
      if (!d.latitude || !d.longitude) return;
      const marker = L.marker([d.latitude, d.longitude], {
        icon: L.divIcon({
          className: "custom-marker",
          html: `<div style="background:linear-gradient(135deg,#c9522a,#e9a024);width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.3);font-size:16px;">${TYPE_ICONS[d.type] || "📍"}</div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        }),
      }).addTo(mapRef.current!);

      const popupHtml = `
        <div style="min-width:220px;font-family:Inter,sans-serif;">
          <img src="${d.cover_image}" style="width:100%;height:110px;object-fit:cover;border-radius:8px;margin-bottom:8px;" onerror="this.style.display='none'"/>
          <div style="font-weight:700;font-size:15px;color:#1a1523;margin-bottom:4px;">${d.name_en}</div>
          <div style="font-size:12px;color:#666;margin-bottom:8px;">${d.region} • ${d.type}</div>
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;">
            <span style="color:#e9a024;">★</span>
            <span style="font-weight:600;">${d.rating || "—"} (${d.review_count || 0})</span>
          </div>
          <button onclick="window.dispatchEvent(new CustomEvent('map:select',{detail:${d.id}}))" style="width:100%;margin-top:10px;padding:6px 12px;background:#c9522a;color:white;border:none;border-radius:20px;font-weight:600;font-size:12px;cursor:pointer;">Plan Visit →</button>
        </div>
      `;
      marker.bindPopup(popupHtml);
      marker.on("click", () => onSelect?.(d));
      markersRef.current.push(marker);
    });

    // Fit bounds if multiple
    if (destinations.length > 1) {
      const bounds = L.latLngBounds(destinations.map((d) => [d.latitude, d.longitude] as [number, number]));
      mapRef.current.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [destinations, onSelect]);

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent).detail;
      const d = destinations.find((x) => x.id === id);
      if (d) onSelect?.(d);
    };
    window.addEventListener("map:select", handler);
    return () => window.removeEventListener("map:select", handler);
  }, [destinations, onSelect]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (highlightId) {
      const d = destinations.find((x) => x.id === highlightId);
      if (d) {
        mapRef.current.setView([d.latitude, d.longitude], 10, { animate: true });
      }
    }
  }, [highlightId, destinations]);

  return (
    <div
      ref={containerRef}
      style={{ height, width: "100%" }}
      className="rounded-2xl overflow-hidden border border-sand-200 dark:border-white/10 z-0"
    />
  );
}
