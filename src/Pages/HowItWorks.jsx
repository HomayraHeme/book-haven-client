 // src/pages/HowItWorks.jsx

import React from "react";
import { FaBookOpen, FaSearch, FaSmile } from "react-icons/fa";
import { useTheme } from "../Theme/ThemeContext";

const HowItWorks = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = isDark ? "bg-none" : "bg-[#faf6ef]";
  const cardBg = isDark ? "bg-gray-800" : "bg-white";
  const sectionTextColor = isDark ? "text-[#f4e4b8]" : "text-amber-900";
  const headingColor = isDark ? "text-[#c5a25e]" : "text-amber-800";
  const iconBg = isDark ? "bg-gray-700 text-amber-200" : "bg-amber-200 text-amber-900";
  const btnGradient = isDark
    ? "bg-[#0C1A3C] border border-amber-200 hover:bg-[#1A2A4D] text-amber-100"
    : "bg-amber-200 border border-amber-400 hover:bg-amber-300 text-[#1b1b1b]";

  return (
    <div className={`min-h-screen flex flex-col ${bgColor} pb-100 px-4 pt-20 sm:px-8`}>
      {/* Page Heading */}
      <h1 className={`text-4xl sm:text-5xl font-extrabold mb-12 text-center ${headingColor}`}>
        How It Works
      </h1>

      <div className="grid gap-12 max-w-6xl mx-auto">
        {/* Step 1 */}
        <div className={`flex flex-col md:flex-row items-center p-6 rounded-2xl shadow-2xl ${cardBg} backdrop-blur-md`}>
          <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
            <div className={`w-20 h-20 flex items-center justify-center text-3xl font-bold rounded-full ${iconBg}`}>
              <FaBookOpen />
            </div>
          </div>
          <div className="md:w-3/4 text-center md:text-left">
            <h2 className={`text-2xl font-semibold mb-2 ${headingColor}`}>Browse Books</h2>
            <p className={`${sectionTextColor}`}>
              Explore our wide collection by genre, author, or popularity. Find your next favorite read effortlessly.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className={`flex flex-col md:flex-row-reverse items-center p-6 rounded-2xl shadow-2xl ${cardBg} backdrop-blur-md`}>
          <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
            <div className={`w-20 h-20 flex items-center justify-center text-3xl font-bold rounded-full ${iconBg}`}>
              <FaSearch />
            </div>
          </div>
          <div className="md:w-3/4 text-center md:text-left">
            <h2 className={`text-2xl font-semibold mb-2 ${headingColor}`}>Select & Learn</h2>
            <p className={`${sectionTextColor}`}>
              Click a book to see details, summaries, ratings, and reviews to make the best choice.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className={`flex flex-col md:flex-row items-center p-6 rounded-2xl shadow-2xl ${cardBg} backdrop-blur-md`}>
          <div className="md:w-1/4 flex justify-center mb-4 md:mb-0">
            <div className={`w-20 h-20 flex items-center justify-center text-3xl font-bold rounded-full ${iconBg}`}>
              <FaSmile />
            </div>
          </div>
          <div className="md:w-3/4 text-center md:text-left">
            <h2 className={`text-2xl font-semibold mb-2 ${headingColor}`}>Enjoy Reading</h2>
            <p className={`${sectionTextColor}`}>
              Dive into a world of stories and knowledge. Share your favorite reads with friends too!
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-12 text-center">
        <a
          href="/all-books"
          className={`inline-block ${btnGradient} px-8 py-3 rounded text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
        >
          Browse Books Now
        </a>
      </div>
    </div>
  );
};

export default HowItWorks;
