import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../Theme/ThemeContext";
import { Link } from "react-router";
import { FaBookOpen, FaStar } from "react-icons/fa";
import Spinner from "../Component/Spinner";

const AllBooks = ({ refreshTriggerProp = 0 }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [sortOrder, setSortOrder] = useState("desc");

    const fetchBooks = async (order) => {
        try {
            setLoading(true);
            const res = await axios.get(`https://book-haven-api-server.vercel.app/books?sort=${order}`);
            setBooks(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching books:", err);
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchBooks(sortOrder);
    }, [sortOrder, refreshTriggerProp]);

    const handleSortChange = (e) => setSortOrder(e.target.value);

    if (loading) {
        return <Spinner></Spinner>
    }

    return (
        <section className={`${isDark ? "bg-none" : "bg-[#faf6ef]"} min-h-screen px-4 sm:px-8 py-16 pb-100`}>
            <h2 className={`text-4xl font-extrabold mb-6 text-center ${isDark ? "text-[#c5a25e]" : "text-amber-800"}`}>All Books Collection</h2>

            <div className="flex justify-center mb-10">
                <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className={`${isDark ? "bg-[#262626] text-[#f4e4b8] border-[#3a3a3a]" : "bg-white text-[#4a3b2d] border-[#d4c19c]"} border rounded-lg px-4 py-2`}
                >
                    <option value="desc">Sort by Rating: High → Low</option>
                    <option value="asc">Sort by Rating: Low → High</option>
                </select>
            </div>

            <div className=" overflow-x-auto max-w-6xl mx-auto shadow-lg rounded-2xl border border-opacity-20">
                <table className={`${isDark ? "bg-[#262626]" : "bg-white"} w-full border-collapse rounded-2xl`}>
                    <thead>
                        <tr className={`text-left text-sm sm:text-base uppercase ${isDark ? "text-[#c5a25e]" : "text-amber-700"} border-b ${isDark ? "border-[#3a3a3a]" : "border-[#d4c19c]"}`}>
                            <th className="py-4 px-3 sm:px-6">Title</th>
                            <th className="py-4 px-3 sm:px-6">Author</th>
                            <th className="py-4 px-3 sm:px-6">Genre</th>
                            <th className="py-4 px-3 sm:px-6 text-center">Rating</th>
                            <th className="py-4 px-3 sm:px-6 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book._id} className={`${isDark ? "hover:bg-[#2e2e2e]" : "hover:bg-[#fff7e6]"} transition-all border-b ${isDark ? "border-[#3a3a3a]" : "border-[#d4c19c]"}`}>
                                <td className={`py-3 px-3 sm:px-6 font-semibold ${isDark ? "text-[#f4e4b8]" : "text-[#4a3b2d]"}`}>{book.title}</td>
                                <td className={`py-3 px-3 sm:px-6 ${isDark ? "text-[#f4e4b8]" : "text-[#4a3b2d]"}`}>{book.author}</td>
                                <td className={`py-3 px-3 sm:px-6 ${isDark ? "text-[#f4e4b8]" : "text-[#4a3b2d]"}`}>{book.genre}</td>
                                <td className={`py-3 px-3 sm:px-6 text-center flex justify-center items-center gap-2 ${isDark ? "text-[#f4e4b8]" : "text-[#4a3b2d]"}`}>
                                    <span className="text-yellow-400"><FaStar /></span> {book.rating}
                                </td>
                                <td className="py-3 px-3 sm:px-6 text-center">
                                    <Link
                                        to={`/book-details/${book._id}`}
                                        className={`${isDark ? "bg-[#0C1A3C] border border-amber-200 hover:bg-[#1A2A4D] text-amber-100" : "bg-amber-200 border border-amber-400 hover:bg-amber-300 text-[#1b1b1b]"} rounded-l font-semibold py-2 px-5 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2 justify-center`}
                                    >
                                        <FaBookOpen /> View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AllBooks;
