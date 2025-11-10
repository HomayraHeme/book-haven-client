import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useTheme } from "../Theme/ThemeContext";
import FindYourNextAdventure from "./FindYourNextAdventure";
import BookOfTheWeek from "./BookOfTheWeek";

const LatestBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Theme-based colors
    // const sectionBg = isDark ? "bg-gray-900" : "bg-gray-50";
    const cardBg = isDark ? "bg-gray-800" : "bg-white";
    const textColor = isDark ? "text-gray-200" : "text-gray-800";
    const borderColor = isDark ? "border-gray-700" : "border-gray-200";
    const hoverBorder = isDark ? "hover:border-amber-400" : "hover:border-amber-600";
    const genreBg = isDark ? "bg-gray-700 text-amber-200" : "bg-amber-100 text-amber-900";

    // Buttons match Banner style
    const allBooksBtnGradient = isDark
        ? "bg-[#0C1A3C] border border-amber-200 hover:bg-[#1A2A4D] text-amber-100"
        : "bg-amber-200 border border-amber-400 hover:bg-amber-300 text-[#1b1b1b]";

    useEffect(() => {
        axios.get("http://localhost:3000/latest-books")
            .then((response) => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching books:", error);
                setLoading(false);
            });
    }, []);

    if (loading)
        return (
            <p className={`text-center mt-10 text-xl font-medium ${isDark ? "text-gray-300" : "text-gray-600"} animate-pulse`}>
                Loading latest books...
            </p>
        );

    return (
        <section className={`px-4 sm:px-8 py-16 transition-colors duration-500  ${theme === "dark" ? "bg-[#1b1b1b]/90 border-[#3a3a3a]" : "bg-[#fdf6e3]/90 border-[#e0d9c3]"} 
             rounded-2xl shadow-2xl`}>
            {/* Heading */}
            <h2 className={`text-4xl lg:text-5xl font-extrabold mb-12 text-center ${isDark ? "text-amber-100" : "text-amber-800"}`}>
                New In Our Shelves
            </h2>

            <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.map((book, index) => (
                    <div
                        key={book._id}
                        className={`${cardBg} ${borderColor} ${textColor} border rounded-2xl shadow-xl overflow-hidden 
                            transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${hoverBorder} flex flex-col`}
                        style={{
                            animation: `fadeInUp 0.6s ease ${index * 0.1}s both`,
                        }}
                    >
                        {/* Book Image */}
                        <div className="overflow-hidden">
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full h-72 object-cover transition-transform duration-700 hover:scale-110"
                            />
                        </div>

                        {/* Info */}
                        <div className="p-6 flex flex-col flex-1 justify-between">
                            <div>
                                <h3 className={`text-2xl font-extrabold mb-1 leading-tight ${textColor}`}>
                                    {book.title}
                                </h3>
                                <p className={`text-md mb-3 italic opacity-80 ${textColor}`}>
                                    by {book.author}
                                </p>
                            </div>

                            <div className="mt-4">
                                {/* Genre */}
                                <span className={`inline-block ${genreBg} text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4`}>
                                    {book.genre}
                                </span>

                                <div className="flex justify-between items-center pt-3 border-t border-gray-300/30 mt-4">
                                    {/* Rating */}
                                    <span className="text-lg font-bold text-yellow-500 flex items-center">
                                        <FaStar className="mr-1 text-2xl" /> {book.rating}
                                    </span>

                                    {/* Button */}
                                    <button
                                        className={`${allBooksBtnGradient} font-semibold py-2 px-5   shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none btn btn-sm sm:btn-md`}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Animation Keyframes */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
            <div>
                <FindYourNextAdventure></FindYourNextAdventure>
            </div>
            <div>
                <BookOfTheWeek></BookOfTheWeek>
            </div>
        </section>

    );
};

export default LatestBooks;
