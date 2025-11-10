import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { useTheme } from "../Theme/ThemeContext";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";
import loginImg from "../assets/logo.jpeg"; // Background image

const UpdateBook = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const book = location.state?.book;

    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        genre: "",
        rating: "",
        summary: "",
        image: "",
    });

    useEffect(() => {
        if (book) {
            setBookData({
                title: book.title,
                author: book.author,
                genre: book.genre,
                rating: book.rating,
                summary: book.summary,
                image: book.image || book.coverImage || "",
            });
        }
    }, [book]);

    const btnGradient = isDark
        ? "bg-[#0C1A3C] border border-amber-200 hover:bg-[#1A2A4D] text-amber-100"
        : "bg-amber-200 border border-amber-400 hover:bg-amber-300 text-[#1b1b1b]";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please login to update the book!");
            navigate("/login");
            return;
        }

        try {
            const res = await axios.patch(
                `http://localhost:3000/books/${book._id}`,
                {
                    ...bookData,
                    userEmail: user.email,
                },
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("access-token")}`,
                    },
                }
            );

            if (res.data.modifiedCount > 0) {
                toast.success("Book updated successfully!");
                navigate("/myBooks");
            } else {
                toast.error("Nothing was updated!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update book!");
        }
    };

    if (!book) {
        return <p className="text-center mt-20">No book selected for update.</p>;
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center relative pb-100"
            style={{
                backgroundImage: `url(${loginImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            <div className={`mt-10 relative w-full max-w-2xl p-8 rounded-2xl shadow-xl backdrop-blur-lg z-10 ${isDark ? "bg-black/60" : "bg-amber-200/10"} 
                    backdrop-blur-md`}>
                <h2 className={`text-3xl font-semibold text-center mb-6 ${isDark ? "text-[#f4e4b8]" : "text-[#f4e4b8]"}`}>
                    Update Book
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input
                        type="text"
                        name="title"
                        placeholder="Book Title"
                        className="input input-bordered w-full"
                        value={bookData.title}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="author"
                        placeholder="Author Name"
                        className="input input-bordered w-full"
                        value={bookData.author}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="genre"
                        placeholder="Genre (e.g., Fantasy, Mystery)"
                        className="input input-bordered w-full"
                        value={bookData.genre}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="rating"
                        placeholder="Rating (1–5)"
                        className="input input-bordered w-full"
                        min="1"
                        max="5"
                        step="0.1"
                        value={bookData.rating}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        className="input input-bordered w-full md:col-span-2"
                        value={bookData.image}
                        onChange={handleChange}
                        required
                    />

                    {/* Read-only user info */}
                    <input
                        type="text"
                        value={user?.displayName || "Unknown User"}
                        readOnly
                        className="input input-bordered w-full"
                    />
                    <input
                        type="email"
                        value={user?.email || "No Email Found"}
                        readOnly
                        className="input input-bordered w-full"
                    />

                    <textarea
                        name="summary"
                        placeholder="Short Description"
                        className="textarea textarea-bordered w-full md:col-span-2"
                        value={bookData.summary}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <button
                        type="submit"
                        className={`${btnGradient} btn text-xl text-bold   w-full md:col-span-2`}
                    >
                        Update Book
                    </button>
                </form>
            </div>
        </div >
    );
};

export default UpdateBook;
