import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";
import bgImg from "../assets/logo.jpeg";
import { useTheme } from "../Theme/ThemeContext";

const AddBooks = ({ onBookAdded }) => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        genre: "",
        rating: "",
        summary: "",
        image: "",
    });

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
            toast.error("Please login to add a book!");
            navigate("/login");
            return;
        }

        try {

            const ratingValue = parseFloat(bookData.rating) || 0;

            const res = await axios.post(
                "https://book-haven-api-server.vercel.app/books",
                { ...bookData, rating: ratingValue },
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("access-token")}`,
                    },
                }
            );

            if (res.data.insertedId) {
                toast.success("Book added successfully!");
                setBookData({
                    title: "",
                    author: "",
                    genre: "",
                    rating: "",
                    summary: "",
                    image: "",
                });


                if (onBookAdded) onBookAdded();

                navigate("/all-books");
            } else {
                toast.error("Failed to add book!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to add book!");
        }
    };


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-amber-500 font-bold text-xl">
                Loading...
            </div>
        );
    }


    if (!user) {
        toast.error("Please login to add a book!");
        navigate("/login");
        return null;
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center relative pt-20"
            style={{
                backgroundImage: `url(${bgImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black/30"></div>
            <div
                className={`mt-10 relative w-full max-w-2xl p-8 rounded-2xl shadow-xl z-10 ${isDark ? "bg-black/60 text-amber-100" : "bg-amber-100/20 text-[#1b1b1b]"
                    } backdrop-blur-md`}
            >
                <h2 className="text-3xl font-bold text-center mb-6">Add a New Book</h2>
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
                        placeholder="Genre"
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
                        className="textarea textarea-bordered w-full md:col-span-2 h-32"
                        value={bookData.summary}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <button type="submit" className={`${btnGradient} btn w-full md:col-span-2`}>
                        Add Book
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBooks;
