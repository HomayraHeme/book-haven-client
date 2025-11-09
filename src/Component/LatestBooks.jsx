import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useTheme } from "../Theme/ThemeContext";

const LatestBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    const isDark = theme === "dark";

    // Elegant color palette (same logic as Footer)
    // const bgColor = isDark ? "bg-gray-900" : "bg-gray-50";
    const cardBg = isDark ? "bg-gray-800" : "bg-white";
    const textColor = isDark ? "text-gray-200" : "text-gray-800";
    const borderColor = isDark ? "border-gray-700" : "border-gray-200";
    const hoverBorder = isDark ? "hover:border-green-500" : "hover:border-red-500";
    const buttonGradient = isDark
        ? "from-green-700 to-red-700"
        : "from-red-700 to-green-700";

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
            <p className="text-center mt-10 text-xl font-medium text-gray-600 animate-pulse">
                Loading latest books...
            </p>
        );

    return (
        <section
            className={` px-4 sm:px-8 py-16 transition-colors duration-500`}
        >
            {/* Gradient Heading */}
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-12 text-center">
                <span className="bg-gradient-to-r from-green-700 to-red-700 text-transparent bg-clip-text">
                    New In Our Shelves
                </span>
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
                                <h3 className="text-2xl font-extrabold mb-1 leading-tight">
                                    {book.title}
                                </h3>
                                <p className="text-md mb-3 italic opacity-80">
                                    by {book.author}
                                </p>
                            </div>

                            <div className="mt-4">
                                {/* Genre */}
                                <span className="inline-block bg-red-100 text-red-700 dark:bg-red-900 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                                    {book.genre}
                                </span>

                                <div className="flex justify-between items-center pt-3 border-t border-gray-300/30 mt-4">
                                    {/* Rating */}
                                    <span className="text-lg font-bold text-yellow-500 flex items-center">
                                        <FaStar className="mr-1 text-2xl" /> {book.rating}
                                    </span>

                                    {/* Button */}
                                    <button
                                        className={`bg-gradient-to-r ${buttonGradient} text-white font-semibold py-2 px-5 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none`}
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
        </section>
    );
};

export default LatestBooks;     