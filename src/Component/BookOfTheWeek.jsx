import React from "react";
import { useTheme } from "../Theme/ThemeContext";
import { FaStar, FaBookOpen, FaUserAlt, FaTags } from "react-icons/fa";

const BookOfTheWeek = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const bgColor = isDark ? "bg-gray-800" : "bg-[#faf6ef]";

    const textColor = isDark ? "text-[#f4e4b8]" : "text-[#4a3b2d]";
    const titleColor = isDark ? "text-[#c5a25e]" : "text-amber-700";
    const btnGradient = isDark
        ? "bg-[#0C1A3C] border border-amber-200 hover:bg-[#1A2A4D] text-amber-100"
        : "bg-amber-200 border border-amber-400 hover:bg-amber-300 text-[#1b1b1b]";

    // Static book data
    const book = {
        title: "The Enchanted Forest",
        author: "J. R. Fantasy",
        genre: "Fantasy / Adventure",
        rating: 4.8,
        summary:
            "Dive into an enchanting journey where magic and adventure collide in a forest filled with mystical creatures and ancient secrets.",
        coverImage: "https://i.ibb.co.com/Hf4rcCSD/weekBook.jpg",
    };

    return (
        <section >
            <div className={`max-w-4xl flex flex-col md:flex-row gap-8 rounded-2xl shadow-2xl p-8 ${bgColor} backdrop-blur-md mt-10 rounded-2xl shadow-2xl`}>
                {/* Book Image */}
                <div className="md:w-1/3 flex justify-center">
                    <img
                        src={book.coverImage}
                        alt={book.title}
                        className="rounded-2xl w-60 h-80 object-cover shadow-lg border border-[#c5a25e]"
                    />
                </div>

                {/* Book Info */}
                <div className={`md:w-2/3 flex flex-col justify-between`}>
                    <div>
                        <h2 className={`text-3xl sm:text-4xl font-extrabold mb-4 ${titleColor}`}>
                            Book of the Week
                        </h2>
                        <h3 className={`text-2xl font-bold mb-3 ${textColor}`}>{book.title}</h3>
                        <p className={`flex items-center gap-2 mb-2 ${textColor}`}>
                            <FaUserAlt /> <span className="font-semibold">Author:</span> {book.author}
                        </p>
                        <p className={`flex items-center gap-2 mb-2 ${textColor}`}>
                            <FaTags /> <span className="font-semibold">Genre:</span> {book.genre}
                        </p>
                        <p className={`flex items-center gap-2 mb-4 ${textColor}`}>
                            <FaStar className="text-yellow-400" /> <span className="font-semibold">Rating:</span> {book.rating}
                        </p>
                        <p className={`text-justify leading-relaxed mb-6 ${textColor}`}>{book.summary}</p>
                    </div>

                    <button
                        className={`${btnGradient} btn py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2`}
                    >
                        <FaBookOpen /> Read Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BookOfTheWeek;
