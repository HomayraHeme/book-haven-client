import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { useTheme } from "../Theme/ThemeContext";
import { FaStar, FaUserAlt, FaBookOpen, FaTags, FaCalendarAlt, FaPaperPlane } from "react-icons/fa";
import { format } from "date-fns";
import app from "../Firebase/Firebase.config";
import Spinner from "../Component/Spinner";


import AOS from "aos";
import "aos/dist/aos.css";

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);
    const [book, setBook] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const auth = getAuth(app);


    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    useEffect(() => {
        AOS.refresh();
    }, [theme]);



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthChecked(true);
        });
        return () => unsubscribe();
    }, [auth]);


    useEffect(() => {
        if (!authChecked) return;
        if (!user) {
            navigate("/login");
            return;
        }

        const fetchBookDetails = async () => {
            try {
                const token = await user.getIdToken();
                const res = await axios.get(`https://book-haven-api-server.vercel.app/book-details/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBook(res.data);


                const commentRes = await axios.get(`https://book-haven-api-server.vercel.app/book-comments/${id}`);
                setComments(commentRes.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch book details.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();


        const interval = setInterval(fetchBookDetails, 5000);
        return () => clearInterval(interval);
    }, [authChecked, user, id, navigate]);


    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try {
            const token = await user.getIdToken();
            await axios.post(
                `https://book-haven-api-server.vercel.app/book-comments/${id}`,
                {
                    userName: user.displayName || "Anonymous",
                    userPhoto: user.photoURL,
                    comment: newComment,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setNewComment("");
            const res = await axios.get(`https://book-haven-api-server.vercel.app/book-comments/${id}`);
            setComments(res.data);
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };


    const cardColor = isDark ? "bg-[#262626]/70" : "bg-amber-200/30";
    const textColor = isDark ? "text-[#f4e4b8]" : "text-black";
    const titleColor = isDark ? "text-[#c5a25e]" : "text-amber-700";
    const btnGradient = isDark
        ? "bg-[#0C1A3C] border border-amber-200 hover:bg-[#1A2A4D] text-amber-100"
        : "bg-amber-200 border border-amber-400 hover:bg-amber-300 text-[#1b1b1b]";

    if (loading) return <Spinner />;
    if (error)
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500 text-xl">
                {error}
            </div>
        );

    return (
        <div
            className="min-h-screen flex flex-col items-center relative py-16 pb-100"
            style={{
                backgroundImage: `url(${book.coverImage || "https://via.placeholder.com/800x600"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >

            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>


            <div
                data-aos="fade-up"
                className={`relative max-w-4xl w-full rounded-2xl shadow-2xl p-8 sm:p-10 flex flex-col md:flex-row gap-10 ${cardColor} backdrop-blur-md`}
            >

                <div data-aos="zoom-in" className="md:w-1/3 flex justify-center">
                    <img
                        src={book.coverImage || "https://via.placeholder.com/200x300?text=No+Cover"}
                        alt={book.title}
                        className="rounded-2xl w-60 h-80 object-cover shadow-lg border border-[#c5a25e]"
                    />
                </div>


                <div data-aos="fade-left" className="md:w-2/3 p-6 rounded-2xl">
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
                        <FaStar className="text-yellow-400" /> <span className="font-semibold">Rating:</span> {book.rating}
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


            <div
                data-aos="fade-up"
                className={`mt-12 max-w-4xl w-full p-6 rounded-2xl  ${cardColor} backdrop-blur-sm shadow-lg`}
            >
                <h3 className={`text-2xl font-bold mb-4 ${titleColor}`}>Comments</h3>


                <div className="space-y-4 mb-6">
                    {comments.length > 0 ? (
                        comments.map((c, index) => (
                            <div
                                key={index}
                                data-aos="fade-right"
                                className={`p-4 rounded-lg shadow-md ${isDark ? "bg-[#1b1b1b]/60" : "bg-[#faf6ef]/60"}`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <img
                                        src={c.userPhoto || "https://via.placeholder.com/40"}
                                        alt={c.userName}
                                        className="w-10 h-10 rounded-full border border-[#c5a25e]"
                                    />
                                    <h4 className={`font-semibold ${textColor}`}>{c.userName}</h4>
                                </div>
                                <p className={`text-sm ${textColor}`}>{c.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className={`${textColor}`}>No comments yet. Be the first!</p>
                    )}
                </div>


                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className={`flex-1 p-3 rounded border border-[#c5a25e] focus:outline-none ${isDark ? "bg-[#262626] text-[#f4e4b8]" : "bg-white text-black"
                            }`}
                    />
                    <button
                        onClick={handleAddComment}
                        className={`${btnGradient} p-3 rounded flex items-center gap-2 transition-all hover:scale-105`}
                    >
                        <FaPaperPlane /> Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
