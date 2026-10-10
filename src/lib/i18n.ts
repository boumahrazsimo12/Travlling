import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: { home: "Home", explore: "Explore", map: "Map", planner: "AI Planner", wc2030: "World Cup 2030", experiences: "Experiences", passport: "Passport" },
      hero: { title: "Discover the", titleAccent: "Magic of Morocco", subtitle: "From the blue streets of Chefchaouen to the golden dunes of the Sahara — let AI craft your perfect Moroccan adventure.", cta: "Plan My Trip", ctaSecondary: "Explore Destinations" },
      common: { explore: "Explore", book: "Book Now", learnMore: "Learn more", search: "Search...", filter: "Filter", rating: "Rating", price: "Price", region: "Region", type: "Type", perNight: "/night", viewAll: "View all", from: "from", reviews: "reviews" },
      home: { featured: "Featured Destinations", featuredSub: "Handpicked places where ancient history meets breathtaking beauty", hiddenGems: "Hidden Gems", hiddenGemsSub: "Off-the-beaten-path treasures discovered by AI", wc2030Banner: "FIFA World Cup 2030™ is coming to Morocco", wc2030Desc: "Be part of football history across 6 legendary cities", experiencesTitle: "Authentic Experiences", experiencesSub: "Meet local hosts who bring Morocco to life", eventsTitle: "Upcoming Events", eventsSub: "Festivals, music, and cultural celebrations" },
      planner: { title: "AI Travel Planner", subtitle: "Tell us your dreams — our AI will craft a personalized Moroccan journey", budget: "Your Budget", days: "Trip Duration", style: "Travel Style", interests: "What excites you?", generate: "Generate My Itinerary", generating: "AI is crafting your journey..." },
      footer: { tagline: "Your AI-powered gateway to Morocco", links: "Quick Links", legal: "Legal", about: "About", contact: "Contact", privacy: "Privacy", terms: "Terms" },
    },
  },
  fr: {
    translation: {
      nav: { home: "Accueil", explore: "Explorer", map: "Carte", planner: "Planificateur IA", wc2030: "Coupe du Monde 2030", experiences: "Expériences", passport: "Passeport" },
      hero: { title: "Découvrez la", titleAccent: "Magie du Maroc", subtitle: "Des rues bleues de Chefchaouen aux dunes dorées du Sahara — laissez l'IA créer votre aventure marocaine parfaite.", cta: "Planifier mon voyage", ctaSecondary: "Explorer les destinations" },
      common: { explore: "Explorer", book: "Réserver", learnMore: "En savoir plus", search: "Rechercher...", filter: "Filtrer", rating: "Note", price: "Prix", region: "Région", type: "Type", perNight: "/nuit", viewAll: "Voir tout", from: "à partir de", reviews: "avis" },
      home: { featured: "Destinations en vedette", featuredSub: "Des lieux triés où l'histoire rencontre la beauté", hiddenGems: "Trésors cachés", hiddenGemsSub: "Des pépites hors des sentiers battues découvertes par l'IA", wc2030Banner: "La Coupe du Monde FIFA 2030™ arrive au Maroc", wc2030Desc: "Vivez l'histoire du football dans 6 villes légendaires", experiencesTitle: "Expériences authentiques", experiencesSub: "Rencontrez des hôtes locaux qui font vivre le Maroc", eventsTitle: "Événements à venir", eventsSub: "Festivals, musique et célébrations culturelles" },
      planner: { title: "Planificateur de voyage IA", subtitle: "Dites-nous vos rêves — notre IA créera un voyage personnalisé", budget: "Votre budget", days: "Durée du voyage", style: "Style de voyage", interests: "Qu'est-ce qui vous passionne ?", generate: "Générer mon itinéraire", generating: "L'IA crée votre voyage..." },
      footer: { tagline: "Votre passerelle vers le Maroc propulsée par l'IA", links: "Liens rapides", legal: "Légal", about: "À propos", contact: "Contact", privacy: "Confidentialité", terms: "Conditions" },
    },
  },
  ar: {
    translation: {
      nav: { home: "الرئيسية", explore: "استكشف", map: "الخريطة", planner: "مخطط الذكاء الاصطناعي", wc2030: "كأس العالم 2026", experiences: "التجارب", passport: "جواز السفر" },
      hero: { title: "اكتشف", titleAccent: "سحر المغرب", subtitle: "من شوارع شفشاون الزرقاء إلى كثبان الصحراء الذهبية — دع الذكاء الاصطناعي يصنع مغامرتك المغربية المثالية.", cta: "خطط لرحلتي", ctaSecondary: "استكشف الوجهات" },
      common: { explore: "استكشف", book: "احجز الآن", learnMore: "اقرأ المزيد", search: "بحث...", filter: "تصفية", rating: "التقييم", price: "السعر", region: "المنطقة", type: "النوع", perNight: "/ليلة", viewAll: "عرض الكل", from: "من", reviews: "مراجعات" },
      home: { featured: "وجهات مميزة", featuredSub: "أماكن مختارة حيث يلتقي التاريخ القديم بالجمال", hiddenGems: "جواهر خفية", hiddenGemsSub: "كنوز خارج المسار اكتشفها الذكاء الاصطناعي", wc2030Banner: "كأس العالم فيفا 2030™ قادمة إلى المغرب", wc2030Desc: "كن جزءًا من تاريخ كرة القدم في 6 مدن أسطورية", experiencesTitle: "تجارب أصيلة", experiencesSub: "التقِ بمضيفين محليين يحيون المغرب", eventsTitle: "الأحداث القادمة", eventsSub: "مهرجانات وموسيقى واحتفالات ثقافية" },
      planner: { title: "مخطط رحلات الذكاء الاصطناعي", subtitle: "أخبرنا بأحلامك — سيصنع ذكاؤنا الاصطناعي رحلة مغربية شخصية", budget: "ميزانيتك", days: "مدة الرحلة", style: "أسلوب السفر", interests: "ما الذي يثيرك؟", generate: "إنشاء خط سير الرحلة", generating: "الذكاء الاصطناعي يصنع رحلتك..." },
      footer: { tagline: "بوابتك الذكية إلى المغرب", links: "روابط سريعة", legal: "قانوني", about: "عن", contact: "اتصل", privacy: "الخصوصية", terms: "الشروط" },
    },
  },
  es: {
    translation: {
      nav: { home: "Inicio", explore: "Explorar", map: "Mapa", planner: "Planificador IA", wc2030: "Mundial 2030", experiences: "Experiencias", passport: "Pasaporte" },
      hero: { title: "Descubre la", titleAccent: "Magia de Marruecos", subtitle: "Desde las calles azules de Chefchaouen hasta las dunas doradas del Sahara — deja que la IA cree tu aventura marroquí perfecta.", cta: "Planificar mi viaje", ctaSecondary: "Explorar destinos" },
      common: { explore: "Explorar", book: "Reservar", learnMore: "Más info", search: "Buscar...", filter: "Filtrar", rating: "Valoración", price: "Precio", region: "Región", type: "Tipo", perNight: "/noche", viewAll: "Ver todo", from: "desde", reviews: "reseñas" },
      home: { featured: "Destinos destacados", featuredSub: "Lugares donde la historia antigua se une con belleza", hiddenGems: "Joyas ocultas", hiddenGemsSub: "Tesoros fuera de lo común descubiertos por IA", wc2030Banner: "La Copa Mundial FIFA 2030™ llega a Marruecos", wc2030Desc: "Sé parte de la historia del fútbol en 6 ciudades legendarias", experiencesTitle: "Experiencias auténticas", experiencesSub: "Conoce anfitriones locales que dan vida a Marruecos", eventsTitle: "Próximos eventos", eventsSub: "Festivales, música y celebraciones culturales" },
      planner: { title: "Planificador IA", subtitle: "Cuéntanos tus sueños — nuestra IA creará un viaje personalizado", budget: "Tu presupuesto", days: "Duración", style: "Estilo de viaje", interests: "¿Qué te emociona?", generate: "Generar mi itinerario", generating: "La IA está creando tu viaje..." },
      footer: { tagline: "Tu puerta a Marruecos con IA", links: "Enlaces rápidos", legal: "Legal", about: "Acerca", contact: "Contacto", privacy: "Privacidad", terms: "Términos" },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
