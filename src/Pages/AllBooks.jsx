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

  const [search, setSearch] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch books from API
  const fetchBooks = async (order) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://book-haven-api-server.vercel.app/books?sort=${order}`
      );
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

  if (loading) return <Spinner />;

  // Filter and search
  const filteredBooks = books
    .filter((book) => {
      return (
        (!search ||
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())) &&
        (!filterGenre || book.genre === filterGenre) &&
        (!filterRating || book.rating >= parseInt(filterRating))
      );
    });

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section
      className={`min-h-screen px-4 sm:px-8 py-16 pb-100 ${
        isDark ? "bg-[#1b1b1b] text-amber-100" : "bg-[#faf6ef] text-amber-900"
      }`}
    >
      <h2
        className={`text-4xl font-extrabold mb-6 text-center ${
          isDark ? "text-[#c5a25e]" : "text-amber-800"
        }`}
      >
        All Books Collection
      </h2>

      {/* Search + Filters + Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 max-w-6xl mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or author"
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 w-full sm:w-1/3"
        />

        <select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full sm:w-1/5"
        >
          <option value="">All Genres</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Romance">Romance</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Mystery">Mystery</option>
        </select>

        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full sm:w-1/5"
        >
          <option value="">All Ratings</option>
          <option value="4">4 & up</option>
          <option value="3">3 & up</option>
          <option value="2">2 & up</option>
        </select>

        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="px-4 py-2 border rounded-lg w-full sm:w-1/4"
        >
          <option value="desc">Sort by Rating: High → Low</option>
          <option value="asc">Sort by Rating: Low → High</option>
        </select>
      </div>

      {/* Books Table */}
      <div className="overflow-x-auto max-w-6xl mx-auto shadow-lg rounded-2xl border border-opacity-20">
        <table
          className={`${isDark ? "bg-[#262626]" : "bg-white"} w-full border-collapse rounded-2xl`}
        >
          <thead>
            <tr
              className={`text-left text-sm sm:text-base uppercase ${
                isDark ? "text-[#c5a25e]" : "text-amber-700"
              } border-b ${isDark ? "border-[#3a3a3a]" : "border-[#d4c19c]"}`}
            >
              <th className="py-4 px-3 sm:px-6">Title</th>
              <th className="py-4 px-3 sm:px-6">Author</th>
              <th className="py-4 px-3 sm:px-6">Genre</th>
              <th className="py-4 px-3 sm:px-6 text-center">Rating</th>
              <th className="py-4 px-3 sm:px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBooks.map((book) => (
              <tr
                key={book._id}
                className={`${
                  isDark ? "hover:bg-[#2e2e2e]" : "hover:bg-[#fff7e6]"
                } transition-all border-b ${isDark ? "border-[#3a3a3a]" : "border-[#d4c19c]"}`}
              >
                <td className={`py-3 px-3 sm:px-6 font-semibold`}>
                  {book.title}
                </td>
                <td className={`py-3 px-3 sm:px-6`}>{book.author}</td>
                <td className={`py-3 px-3 sm:px-6`}>{book.genre}</td>
                <td className="py-3 px-3 sm:px-6 text-center flex justify-center items-center gap-2">
                  <span className="text-yellow-400">
                    <FaStar />
                  </span>{" "}
                  {book.rating}
                </td>
                <td className="py-3 px-3 sm:px-6 text-center">
                  <Link
                    to={`/book-details/${book._id}`}
                    className={`${
                      isDark
                        ? "bg-[#0C1A3C] border border-amber-200 hover:bg-[#1A2A4D] text-amber-100"
                        : "bg-amber-200 border border-amber-400 hover:bg-amber-300 text-[#1b1b1b]"
                    } rounded-l font-semibold py-2 px-5 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2 justify-center`}
                  >
                    <FaBookOpen /> View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg font-semibold border ${
                currentPage === i + 1
                  ? "bg-amber-400 text-white"
                  : isDark
                  ? "bg-[#262626] text-amber-200 border-amber-400"
                  : "bg-white text-amber-800 border-amber-300"
              } hover:scale-105 transition-transform`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default AllBooks;
