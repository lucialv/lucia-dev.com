import SpainFlag from "@/components/flags/Spain.astro";
import CataloniaFlag from "@/components/flags/Catalonia.astro";
import UnitedStatesFlag from "@/components/flags/UnitedStates.astro";

export const LANGUAGES: Record<
  string,
  { code: string; name: string; flag: typeof SpainFlag }
> = {
  ca: {
    code: "ca",
    name: "Català",
    flag: CataloniaFlag,
  },
  en: {
    code: "en",
    name: "English",
    flag: UnitedStatesFlag,
  },
  es: {
    code: "es",
    name: "Español",
    flag: SpainFlag,
  },
};

export const defaultLang = "es";
export const showDefaultLang = false;

export const ui = {
  es: {
    "nav.inicio": "Inicio",
  },
  en: {
    "nav.inicio": "Home",
  },
  ca: {
    "nav.inicio": "Inici",
  },
} as const;

export const routes = {
  es: {
    info: "informacion",
  },
  en: {
    info: "information",
  },
  ca: {
    info: "informacio",
  },
};
