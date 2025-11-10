import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";
import { useTheme } from "../Theme/ThemeContext";
import { FaTrash, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyBooks = () => {
    const { user } = useContext(AuthContext);
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const tableBg = isDark ? "bg-[#262626]" : "bg-white";
    const textColor = isDark ? "text-[#f4e4b8]" : "text-[#4a3b2d]";
    const titleColor = isDark ? "text-[#c5a25e]" : "text-amber-700";
    const borderColor = isDark ? "border-[#3a3a3a]" : "border-[#d4c19c]";
    const hoverRow = isDark ? "hover:bg-[#2e2e2e]" : "hover:bg-[#fff7e6]";
    const btnGradient = isDark
        ? "bg-[#0C1A3C] border border-amber-200 hover:bg-[#1A2A4D] text-amber-100"
        : "bg-amber-200 border border-amber-400 hover:bg-amber-300 text-[#1b1b1b]";

    // Fetch logged-in user's books
    useEffect(() => {
        if (!user) return;

        const fetchMyBooks = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:3000/myBooks", {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("access-token")}`,
                    },
                });
                setBooks(res.data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch your books!");
            } finally {
                setLoading(false);
            }
        };

        fetchMyBooks();
    }, [user]);

    // Delete book
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            const loadingToast = toast.loading("Deleting...");

            try {
                await axios.delete(`http://localhost:3000/books/${id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("access-token")}`,
                    },
                });

                setBooks((prev) => prev.filter((b) => b._id !== id));
                toast.dismiss(loadingToast);
                toast.success("Book deleted successfully!");

                Swal.fire("Deleted!", "Your book has been deleted.", "success");
            } catch (error) {
                console.error(error);
                toast.dismiss(loadingToast);
                toast.error("Failed to delete book!");
            }
        }
    };

    if (!user)
        return <p className="text-center mt-20">Please login to see your books.</p>;

    if (loading)
        return (
            <p className="text-center mt-20 text-xl font-semibold text-[#c5a25e] animate-pulse">
                Loading your books...
            </p>
        );

    return (
        <section className={`${isDark ? "bg-[#1b1b1b]" : "bg-[#faf6ef]"} min-h-screen px-4 sm:px-8 py-16 pb-100`}>
            <h2 className={`text-4xl font-extrabold mb-6 text-center ${titleColor}`}>My Books</h2>

            {books.length === 0 ? (
                <p className="text-center text-gray-500">You have not added any books yet.</p>
            ) : (
                <div className="overflow-x-auto max-w-6xl mx-auto shadow-lg rounded-2xl border border-opacity-20">
                    <table className={`${tableBg} w-full border-collapse rounded-2xl`}>
                        <thead>
                            <tr className={`text-left text-sm sm:text-base uppercase ${titleColor} border-b ${borderColor}`}>
                                <th className="py-4 px-3 sm:px-6">Title</th>
                                <th className="py-4 px-3 sm:px-6">Author</th>
                                <th className="py-4 px-3 sm:px-6">Genre</th>
                                <th className="py-4 px-3 sm:px-6 text-center">Rating</th>
                                <th className="py-4 px-3 sm:px-6 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {books.map((book) => (
                                <tr key={book._id} className={`${hoverRow} transition-all border-b ${borderColor}`}>
                                    <td className={`py-3 px-3 sm:px-6 font-semibold ${textColor}`}>{book.title}</td>
                                    <td className={`py-3 px-3 sm:px-6 ${textColor}`}>{book.author}</td>
                                    <td className={`py-3 px-3 sm:px-6 ${textColor}`}>{book.genre}</td>
                                    <td className={`py-3 px-3 sm:px-6 text-center ${textColor}`}>{book.rating}</td>
                                    <td className="py-3 px-3 sm:px-6 text-center flex gap-2 justify-center">
                                        <button
                                            onClick={() => navigate(`/update-book/${book._id}`, { state: { book } })}
                                            className={`btn btn-sm ${btnGradient} flex items-center gap-2`}
                                        >
                                            <FaEdit /> Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(book._id)}
                                            className="btn btn-sm bg-amber-800 hover:bg-red-600 text-white flex items-center gap-2"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default MyBooks;
