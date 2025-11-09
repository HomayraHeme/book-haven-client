import React, { useState, useEffect, useContext, createContext } from 'react';

const DAISY_THEMES = ["light", "dark"];
const DEFAULT_THEME = 'light';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || DEFAULT_THEME;
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);


    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    const setSpecificTheme = (newTheme) => {
        if (DAISY_THEMES.includes(newTheme)) {
            setTheme(newTheme);
        } else {
            console.error(`Error: The theme "${newTheme}" is not defined in the DAISY_THEMES list.`);
        }
    };

    const contextValue = {
        theme,
        toggleTheme,
        setSpecificTheme,
        allThemes: DAISY_THEMES
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};
