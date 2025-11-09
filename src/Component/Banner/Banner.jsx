import React from "react";
import { Link } from "react-router";

import './Banner.css'; // for animations
import { useTheme } from "../../Theme/ThemeContext";

const Banner = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Background gradient
    const bgGradient = isDark
        ? "bg-gradient-to-r from-green-700 via-gray-800 to-red-800"
        : "bg-gradient-to-r from-green-700 via-gray-100 to-red-800";

    // Text colors
    const headingText = isDark ? "text-green-400" : "text-red-800";
    const paragraphText = isDark ? "text-gray-200" : "text-white";

    // Button colors
    const allBooksBtn = isDark
        ? "bg-green-700 hover:bg-green-600 text-white"
        : "bg-green-700 hover:bg-green-600 text-white";

    const createBookBtn = isDark
        ? "bg-red-800 hover:bg-red-700 text-white"
        : "bg-red-800 hover:bg-red-700 text-white";

    return (
        <section className={`relative w-full h-[70vh] flex flex-col items-center justify-center overflow-hidden ${bgGradient}`}>
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="relative z-10 text-center px-4 sm:px-8">
                <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 fade-slide`}>
                    Welcome to <span className={headingText}>BOOK-HAVEN</span>
                </h1>
                <p className={`text-lg sm:text-xl md:text-2xl mb-6 fade-slide delay-500 ${paragraphText}`}>
                    Your online library & ultimate book haven
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center fade-slide delay-1000">
                    <Link
                        to="/all-books"
                        className={`${allBooksBtn} font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-300`}
                    >
                        All Books
                    </Link>
                    <Link
                        to="/add-book"
                        className={`${createBookBtn} font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-300`}
                    >
                        Create Book
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Banner;
