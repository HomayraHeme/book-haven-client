 import React, { useContext, useState } from "react";
import logoImg from "../assets/booklogo-removebg-preview.png";
import { Link, NavLink } from "react-router";
import ThemeToggle from "../Theme/ThemeToggle";
import { useTheme } from "../Theme/ThemeContext";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

//   const allBooksBtnGradient = isDark
//     ? "bg-[#0C1A3C] border border-amber-200 hover:bg-[#1A2A4D] text-amber-100"
//     : "bg-amber-200 border border-amber-400 hover:bg-amber-300 text-[#1b1b1b]";

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-amber-600 underline"
              : `${isDark ? "text-[#d6c39c] hover:text-amber-100" : "text-amber-800 hover:text-amber-600"}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-books"
          className={({ isActive }) =>
            isActive
              ? "text-amber-600 underline"
              : `${isDark ? " text-[#d6c39c] hover:text-amber-100" : "text-amber-800 hover:text-amber-600"}`
          }
        >
          All Books
        </NavLink>
       </li>
      <li>
        <NavLink
          to="/howItWorks"
          className={({ isActive }) =>
            isActive
              ? "text-amber-600 underline"
              : `${isDark ? "text-[#d6c39c] hover:text-amber-100" : "text-amber-800 hover:text-amber-600"}`
          }
        >
          How It Works
        </NavLink>
      </li>
      <li> 
         {user && <>
                                <NavLink to="/dashboard" className={({ isActive }) =>
            isActive
              ? "text-amber-600 underline"
              : `${isDark ? "text-[#d6c39c] hover:text-amber-100" : "text-amber-800 hover:text-amber-600"}`
          } >Dashboard</NavLink>
                            </>}
      </li>
  </>
  );

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Logout failed! Try again.", err);
    }
  };

  return (
    <nav
      className={`navbar fixed top-0 z-50 px-4 sm:px-8 border-b ${
        isDark ? "bg-[#1b1b1b]/90 border-amber-700" : "bg-[#e0d4b9]/90 border-amber-400"
      } backdrop-blur-md`}
    >
      <div className="navbar-start flex items-center gap-2">
        {/* Mobile menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 p-3 shadow-lg rounded-box w-52 space-y-2 ${
              isDark ? "bg-[#1b1b1b]" : "bg-[#fdf6e3]"
            }`}
          >
            {navLinks}
            <li className="p-2 mt-2">
              <ThemeToggle />
            </li>
          </ul>
        </div>

        {/* Logo */}
        <img className="w-16 h-12" src={logoImg} alt="Logo" />
        <Link
          to="/"
          className={`btn btn-ghost normal-case text-2xl font-extrabold hover:bg-transparent ${
            isDark ? "text-amber-100" : "text-amber-800"
          } hidden sm:block`}
        >
          BOOK-<span className="text-[#c5a25e]">HAVEN</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium space-x-4">{navLinks}</ul>
      </div>

      {/* Right side: Theme & User */}
      <div className="navbar-end flex items-center gap-3 sm:gap-4">
        <div className="hidden lg:block">
          <ThemeToggle />
        </div>

        {!user ? (
          <>
            <Link
              to="/login"
              className={`btn btn-sm sm:btn-md font-bold ${
                isDark
                  ? "bg-[#0C1A3C] border border-amber-200 text-amber-100 hover:bg-[#1A2A4D]"
                  : "bg-amber-200 border border-amber-400 hover:bg-amber-300 text-[#1b1b1b]"
              }`}
            >
              Login
            </Link>
            <Link
              to="/registration"
              className={`btn btn-sm sm:btn-md hidden md:flex font-bold ${
                isDark
                  ? "bg-[#0C1A3C] border border-amber-200 text-amber-100 hover:bg-[#1A2A4D]"
                  : "bg-amber-200 border border-amber-400 hover:bg-amber-300 text-[#1b1b1b]"
              }`}
            >
              Register
            </Link>
          </>
        ) : (
          <div className="relative">
            {/* Profile Button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full border-2 border-amber-500"
                  title={user.displayName}
                />
              ) : (
                <FaUserCircle className="text-2xl text-amber-400" />
              )}
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <ul
                className={`absolute right-0 mt-2 w-48 ${
                  isDark ? "bg-[#1b1b1b]" : "bg-[#fff7e6]"
                } rounded-xl shadow-lg border border-amber-400 z-50`}
              >
                <li>
                  <Link
                    to="/profile"
                    className={`block px-4 py-2 ${
                      isDark ? "text-amber-100 hover:bg-amber-700" : "text-amber-800 hover:bg-amber-200"
                    } rounded-lg`}
                  >
                    Profile
                  </Link>
                </li>
                 
                <li>
                  <button
                    onClick={handleLogout}
                    className={`w-full text-left block px-4 py-2 ${
                      isDark ? "text-amber-100 hover:bg-amber-700" : "text-amber-800 hover:bg-amber-200"
                    } rounded-lg`}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
