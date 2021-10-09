import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./translations/en";
import { es } from "./translations/es";

const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',  // use i18n.changeLanguage to change it dynamically
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;