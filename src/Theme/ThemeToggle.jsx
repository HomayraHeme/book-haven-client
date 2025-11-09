import React from "react";
import { useTheme } from "./ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi"; // react-icons ইনস্টল করা আবশ্যক

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            title="Toggle Theme"
        >
            {/* থিমের উপর ভিত্তি করে আইকন পরিবর্তন */}
            {theme === "light" ? <FiMoon className="h-6 w-6" /> : <FiSun className="h-6 w-6" />}
        </button>
    );
};

export default ThemeToggle;