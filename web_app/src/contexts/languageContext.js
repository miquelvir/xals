import React, { useState } from "react";
import i18n from "../i18n";

export const LANGUAGE_EN = 'en';
export const LANGUAGE_ES = 'es';
const LANGUAGES = [LANGUAGE_EN, LANGUAGE_ES];

const LOCALSTORAGE_LANGUAGE = 'language';

export const languageContext = React.createContext(
    {
        language: LANGUAGE_EN,
        setLanguage: (language) => { },
        toggle: () => {}
    }
);

export const LanguageContextProvider = ({ children }) => {
    const localStorageLanguage = localStorage.getItem(LOCALSTORAGE_LANGUAGE);
    const [language, _setLanguage] = useState(LANGUAGES.includes(localStorageLanguage)? localStorageLanguage: LANGUAGE_EN);
    const setLanguage = (newLanguage) => {
        if (!LANGUAGES.includes(newLanguage)) throw new Error(`invalid language '${newLanguage}' is not one of the valid options: '${LANGUAGES}'`);
        _setLanguage(newLanguage);
        localStorage.setItem(LOCALSTORAGE_LANGUAGE, newLanguage);
        i18n.changeLanguage(newLanguage);
    }

    const contextProvider = {
        language: language,
        setLanguage: setLanguage,
        toggle: () => setLanguage(LANGUAGES[(LANGUAGES.indexOf(language) + 1) % LANGUAGES.length])
    };

    return <languageContext.Provider value={contextProvider}>
            {children}
    </languageContext.Provider>;
}
