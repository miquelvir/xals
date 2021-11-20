import React, { useState } from "react";

export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';
const THEMES = [THEME_LIGHT, THEME_DARK];

const LOCALSTORAGE_THEME = 'theme';

export const themeContext = React.createContext(
    {
        theme: THEME_LIGHT,
        setTheme: (theme) => { },
        setLight: () => { },
        setDark: () => { },
        toggle: () => {},
        isLight: true,
        isDark: false
    }
);

export const ThemeContextProvider = ({ children }) => {
    const [theme, _setTheme] = useState(localStorage.getItem(LOCALSTORAGE_THEME) === THEME_DARK? THEME_DARK: THEME_LIGHT);
    const setTheme = (newTheme) => {
        if (!THEMES.includes(newTheme)) throw new Error(`invalid theme '${newTheme}' is not one of the valid options: '${THEMES}'`); //todo: this?
        _setTheme(newTheme);
        localStorage.setItem(LOCALSTORAGE_THEME, newTheme);
    }

    const contextProvider = {
        theme: theme,
        setTheme: setTheme,
        setLight: () => setTheme(THEME_LIGHT),
        setDark: () => setTheme(THEME_DARK),
        toggle: () => setTheme(THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length]),
        isLight: theme === THEME_LIGHT,
        isDark: theme === THEME_DARK
    };

    return <themeContext.Provider value={contextProvider}>
        <div className={theme === THEME_DARK ? 'dark' : undefined}>
            {children}
        </div>
    </themeContext.Provider>;
}
