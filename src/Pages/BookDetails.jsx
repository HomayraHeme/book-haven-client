import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { useTheme } from "../Theme/ThemeContext";
import { FaStar, FaUserAlt, FaBookOpen, FaTags, FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import app from "../Firebase/Firebase.config";

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const auth = getAuth(app);

    // Listen for Firebase Auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthChecked(true);
        });
        return () => unsubscribe();
    }, [auth]);

    // Fetch book details only after auth is ready
    useEffect(() => {
        if (!authChecked) return; // wait for Firebase Auth to finish
        if (!user) {
            navigate("/login");
            return;
        }

        const fetchBookDetails = async () => {
            try {
                const token = await user.getIdToken();
                const res = await axios.get(`http://localhost:3000/book-details/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBook(res.data);
            } catch (err) {
                console.error(err);
                if (err.response?.status === 401) {
                    setError("Unauthorized. Please login again.");
                    navigate("/login");
                } else {
                    setError("Failed to fetch book details.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [authChecked, user, id, navigate]);

    // Theme colors
    const cardColor = isDark ? "bg-[#262626]/70" : "bg-amber-200/30";
    const textColor = isDark ? "text-[#f4e4b8]" : "text-[#4a3b2d]";
    const titleColor = isDark ? "text-[#c5a25e]" : "text-amber-700";
    const btnGradient = isDark
        ? "bg-[#0C1A3C] border border-amber-200 hover:bg-[#1A2A4D] text-amber-100"
        : "bg-amber-200 border border-amber-400 hover:bg-amber-300 text-[#1b1b1b]";

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen text-2xl font-semibold text-[#c5a25e] animate-pulse pb-100">
                Loading Book Details...
            </div>
        );
    if (error)
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500 text-xl pb-100">
                {error}
            </div>
        );
    if (!book)
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500 text-xl pb-100">
                Book not found 😔
            </div>
        );

    return (
        <div
            className="min-h-screen flex justify-center items-center relative pb-100"
            style={{
                backgroundImage: `url(${book.coverImage || "https://via.placeholder.com/800x600"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay for blur */}
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

            {/* Content */}
            <div className={`mt-10 relative max-w-4xl w-full rounded-2xl shadow-2xl p-8 sm:p-10 flex flex-col md:flex-row gap-10 ${cardColor} backdrop-blur-md`}>
                {/* Book Image */}
                <div className="md:w-1/3 flex justify-center">
                    <img
                        src={book.coverImage || "https://via.placeholder.com/200x300?text=No+Cover"}
                        alt={book.title}
                        className="rounded-2xl w-60 h-80 object-cover shadow-lg border border-[#c5a25e]"
                    />
                </div>

                {/* Book Info */}
                <div className="md:w-2/3 p-6 rounded-2xl">
                    <h2 className={`text-3xl sm:text-4xl font-extrabold mb-3 ${titleColor}`}>
                        {book.title}
                    </h2>
                    <p className={`flex items-center gap-2 mb-3 ${textColor}`}>
                        <FaUserAlt /> <span className="font-semibold">Author:</span> {book.author}
                    </p>
                    <p className={`flex items-center gap-2 mb-3 ${textColor}`}>
                        <FaTags /> <span className="font-semibold">Genre:</span> {book.genre}
                    </p>
                    <p className={`flex items-center gap-2 mb-3 ${textColor}`}>
                        <FaStar className="text-yellow-400" /> <span className="font-semibold">Rating:</span>{" "}
                        {book.rating}
                    </p>
                    {book.created_at && (
                        <p className={`flex items-center gap-2 mb-3 ${textColor}`}>
                            <FaCalendarAlt /> <span className="font-semibold">Added On:</span>{" "}
                            {format(new Date(book.created_at), "dd MMM yyyy")}
                        </p>
                    )}
                    <p className={`mt-6 mb-5 text-justify leading-relaxed ${textColor}`}>
                        {book.summary || "No summary available for this book."}
                    </p>

                    <button
                        className={`${btnGradient} btn py-3 rounded-l font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2`}
                    >
                        <FaBookOpen /> Read Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
