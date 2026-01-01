import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import axios from "axios";
import { useTheme } from "../../Theme/ThemeContext";
import Spinner from "../../Component/Spinner";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books data from backend
  useEffect(() => {
    axios
      .get("https://book-haven-api-server.vercel.app/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner></Spinner>

  // Data for charts
  const genres = [...new Set(books.map((b) => b.genre))];
  const booksPerGenre = genres.map(
    (g) => books.filter((b) => b.genre === g).length
  );

  const ratings = books.map((b) => b.rating);
  const titles = books.map((b) => b.title);

  const barData = {
    labels: genres,
    datasets: [
      {
        label: "Books per Genre",
        data: booksPerGenre,
        backgroundColor: "rgba(255, 193, 7, 0.7)", // amber
        borderColor: "rgba(255, 193, 7, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: titles,
    datasets: [
      {
        label: "Book Ratings",
        data: ratings,
        borderColor: "rgba(255, 193, 7, 1)",
        backgroundColor: "rgba(255, 193, 7, 0.3)",
        tension: 0.3,
      },
    ],
  };

  const pieData = {
    labels: genres,
    datasets: [
      {
        label: "Genre Distribution",
        data: booksPerGenre,
        backgroundColor: genres.map(
          (_, i) => `hsl(${(i * 60) % 360}, 70%, 50%)`
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col gap-8">
      <h1
        className={`text-3xl font-bold ${
          isDark ? "text-amber-100" : "text-amber-900"
        }`}
      >
        Dashboard Analytics
      </h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className={`p-6 rounded-2xl shadow-lg ${
            isDark ? "bg-[#262626] text-amber-100" : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-lg font-semibold mb-2">Total Books</h2>
          <p className="text-3xl font-bold">{books.length}</p>
        </div>

        <div
          className={`p-6 rounded-2xl shadow-lg ${
            isDark ? "bg-[#262626] text-amber-100" : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-lg font-semibold mb-2">Total Genres</h2>
          <p className="text-3xl font-bold">{genres.length}</p>
        </div>

        <div
          className={`p-6 rounded-2xl shadow-lg ${
            isDark ? "bg-[#262626] text-amber-100" : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-lg font-semibold mb-2">Average Rating</h2>
          <p className="text-3xl font-bold">
            {(
              ratings.reduce((a, b) => a + b, 0) / ratings.length
            ).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          className={`p-6 rounded-2xl shadow-lg ${
            isDark ? "bg-[#262626] text-amber-100" : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">Books per Genre</h2>
          <Bar data={barData} />
        </div>

        <div
          className={`p-6 rounded-2xl shadow-lg ${
            isDark ? "bg-[#262626] text-amber-100" : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">Book Ratings</h2>
          <Line data={lineData} />
        </div>

        <div
          className={`p-6 rounded-2xl shadow-lg items-center ${
            isDark ? "bg-[#262626] text-amber-100" : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-lg font-semibold mb-4">Genre Distribution</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
