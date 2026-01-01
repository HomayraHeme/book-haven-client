 import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { FaBook, FaBars, FaTimes, FaUser, FaChartBar } from "react-icons/fa";
import { useTheme } from "../../Theme/ThemeContext";
import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";

const DashboardLayout = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const sidebarMenu = [
    { title: "Add Books", icon: <FaBook />, path: "add-books" },
    { title: "My Books", icon: <FaBook />, path: "my-books" },
    { title: "Analytics", icon: <FaChartBar />, path: "analytics" },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-amber-100" : "bg-[#fff7e6] text-amber-900"
      }`}
    >
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1 relative overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed  h-screen top-18 left-0  flex flex-col border-r transition-all duration-300
            ${isDark ? "border-amber-700 bg-[#262626]" : "border-amber-300 bg-[#fff7e6]"}
            ${isDrawerOpen ? "w-64" : "w-16"}
          `}
        >
          {/* Toggle Button (works on all devices) */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className={`absolute top-4 -right-3 z-50 p-2 rounded-full shadow-md transition
              ${isDark ? "bg-amber-600 text-white" : "bg-amber-200 text-amber-900"}
            `}
          >
            {isDrawerOpen ? <FaTimes size={12} /> : <FaBars size={12} />}
          </button>

          {/* Menu */}
          <nav className="flex flex-col gap-3 mt-10 px-2">
            {sidebarMenu.map((item) => (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition
                  ${
                    isActive
                      ? isDark
                        ? "bg-amber-600 text-white"
                        : "bg-amber-200 text-amber-900"
                      : "hover:bg-amber-100/10"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                {isDrawerOpen && <span className="whitespace-nowrap">{item.title}</span>}
              </NavLink>
            ))}

            {/* Profile */}
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition
                ${
                  isActive
                    ? isDark
                      ? "bg-amber-600 text-white"
                      : "bg-amber-200 text-amber-900"
                    : "hover:bg-amber-100/10"
                }`
              }
            >
              <FaUser className="text-xl" />
              {isDrawerOpen && <span>Profile</span>}
            </NavLink>
          </nav>
        </aside>

        {/* Main content */}
        <main
          className={`flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 transition-all duration-300 ${
            isDrawerOpen ? "ml-64" : "ml-16"
          }`}
        >
          <div className="w-full max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

     <div className="pt-100">
      <Footer></Footer>
     </div>
    </div>
  );
};

export default DashboardLayout;
