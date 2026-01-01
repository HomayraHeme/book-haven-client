import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useTheme } from "../Theme/ThemeContext";
import FindYourNextAdventure from "./FindYourNextAdventure";
import BookOfTheWeek from "./BookOfTheWeek";
import { Link } from "react-router";
import Spinner from "./Spinner";
import ExtraSections from "./ExtraSections";

const LatestBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();
    const isDark = theme === "dark";


    const cardBg = isDark ? "bg-gray-800" : "bg-white";
    const textColor = isDark ? "text-gray-200" : "text-gray-800";
    const borderColor = isDark ? "border-gray-700" : "border-gray-200";
    const hoverBorder = isDark ? "hover:border-amber-400" : "hover:border-amber-600";
    const genreBg = isDark ? "bg-gray-700 text-amber-200" : "bg-amber-100 text-amber-900";

    const allBooksBtnGradient = isDark
        ? "bg-[#0C1A3C] border border-amber-200 hover:bg-[#1A2A4D] text-amber-100"
        : "bg-amber-200 border border-amber-400 hover:bg-amber-300 text-[#1b1b1b]";

    useEffect(() => {
        axios.get("https://book-haven-api-server.vercel.app/latest-books")
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
            <Spinner></Spinner>
        );

    return (
        <section className={`px-4 sm:px-8 py-12 transition-colors duration-500  ${theme === "dark" ? "bg-[#1b1b1b]/90 border-[#3a3a3a]" : "bg-[#fdf6e3]/90 border-[#e0d9c3]"} 
             rounded-2xl shadow-2xl`}>

            <h2 className={`text-4xl lg:text-5xl font-extrabold mb-12 text-center ${isDark ? "text-amber-100" : "text-amber-800"}`}>
                New In Our Shelves
            </h2>

            <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {books.map((book, index) => (
                    <div
                        key={book._id}
                        className={`${cardBg} ${borderColor} ${textColor} border rounded-2xl shadow-xl overflow-hidden 
                            transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${hoverBorder} flex flex-col`}
                        style={{
                            animation: `fadeInUp 0.6s ease ${index * 0.1}s both`,
                        }}
                    >

                        <div className="overflow-hidden">
                            <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full h-40 object-cover transition-transform duration-700 hover:scale-110"
                            />
                        </div>


                        <div className="px-6 pt-3 flex flex-col flex-1 justify-between">
                            <div>
                                <h3 className={`text-2xl font-extrabold mb-1 leading-tight ${textColor}`}>
                                    {book.title}
                                </h3>
                                <p className={`text-md mb-1 italic opacity-80 ${textColor}`}>
                                    by {book.author}
                                </p>
                            </div>

                            <div className="mt-1">

                                <span className={`inline-block ${genreBg} text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider`}>
                                    {book.genre}
                                </span>

                                <div className="flex justify-between items-center pt-3 border-t border-gray-300/30 mb-4 mt-2">

                                    <span className="text-lg font-bold text-yellow-500 flex items-center">
                                        <FaStar className="mr-1 text-2xl" /> {book.rating}
                                    </span>


                                    <Link to={`/book-details/${book._id}`}><button
                                        className={`${allBooksBtnGradient} font-semibold py-2 px-5   shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none btn btn-sm sm:btn-md`}
                                    >
                                        View Details
                                    </button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


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
            <ExtraSections></ExtraSections>
             
        </section>

    );
};

export default LatestBooks;
