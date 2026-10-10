import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import { useThemeStore, useLocaleStore } from "./store";
import "./lib/i18n";
import { useTranslation } from "react-i18next";

const queryClient = new QueryClient();

function AppInit() {
  const dark = useThemeStore((s) => s.dark);
  const language = useLocaleStore((s) => s.language);
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    if (i18n.language !== language) i18n.changeLanguage(language);
  }, [language, i18n]);

  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInit />
      <AppRouter />
    </QueryClientProvider>
  );
}
