import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import es from "./locales/es.json";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

const resources = {
  es: { translation: es },
  en: { translation: en },
  fr: { translation: fr },
};

const deviceLanguage = Localization.getLocales()[0].languageCode || "en";

i18n.use(initReactI18next).init({
  lng: Object.keys(resources).includes(deviceLanguage) ? deviceLanguage : "en",
  fallbackLng: "en",
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
