import React, { useContext } from "react";
import logoImg from "../assets/booklogo-removebg-preview.png";
import { Link, NavLink } from "react-router";
import ThemeToggle from "../Theme/ThemeToggle";
import { useTheme } from "../Theme/ThemeContext";
import { AuthContext } from "../Provider/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const { user, logout } = useContext(AuthContext);

    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? "text-[#c5a25e] underline"
                            : "text-[#d4c19c] hover:text-[#f4e4b8]"
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
                            ? "text-[#c5a25e] underline"
                            : "text-[#d4c19c] hover:text-[#f4e4b8]"
                    }
                >
                    All Books
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/add-book"
                    className={({ isActive }) =>
                        isActive
                            ? "text-[#c5a25e] underline"
                            : "text-[#d4c19c] hover:text-[#f4e4b8]"
                    }
                >
                    Add Books
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/myBooks"
                    className={({ isActive }) =>
                        isActive
                            ? "text-[#c5a25e] underline"
                            : "text-[#d4c19c] hover:text-[#f4e4b8]"
                    }
                >
                    My Books
                </NavLink>
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
            className={`navbar sticky top-0 z-50 px-4 sm:px-8 border-b ${isDark
                ? "bg-[#1b1b1b]/90 border-[#3a3a3a]"
                : "bg-[#fdf6e3]/90 border-[#e0d9c3]"
                } backdrop-blur-md text-[#d4c19c]`}
        >

            <div className="navbar-start flex items-center gap-2">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost text-[#f4e4b8] lg:hidden">
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
                        className={`menu menu-sm dropdown-content mt-3 p-3 shadow-lg rounded-box w-52 space-y-2 ${isDark ? "bg-[#1b1b1b]" : "bg-[#fdf6e3]"
                            }`}
                    >
                        {navLinks}
                        <li className="p-2 mt-2">
                            <ThemeToggle />
                        </li>
                    </ul>
                </div>

                <img className="w-16 h-12" src={logoImg} alt="Logo" />
                <Link
                    to="/"
                    className={`btn btn-ghost normal-case text-2xl font-extrabold hover:bg-transparent ${isDark ? "text-amber-100" : "text-amber-800"
                        } hidden sm:block `}
                >
                    BOOK-<span className="text-[#c5a25e]">HAVEN</span>
                </Link>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium space-x-4">{navLinks}</ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end flex items-center gap-3 sm:gap-4">
                <div className="hidden lg:block">
                    <ThemeToggle />
                </div>

                {!user ? (
                    <>
                        <Link
                            to="/login"
                            className={`btn btn-sm sm:btn-md font-bold ${isDark
                                ? "bg-[#16213e] text-[#f4e4b8] border border-[#c5a25e] hover:bg-[#1a2b52]"
                                : "btn-outline text-[#1b1b1b] border border-[#c5a25e] hover:bg-[#e0c67a]"
                                }`}
                        >
                            Login
                        </Link>
                        <Link
                            to="/registration"
                            className={`btn btn-sm sm:btn-md hidden md:flex font-bold ${isDark
                                ? "bg-[#c5a25e] text-[#1b1b1b] hover:bg-[#d5b971]"
                                : "bg-[#c5a25e] text-[#1b1b1b] hover:bg-[#e0c67a]"
                                }`}
                        >
                            Register
                        </Link>
                    </>
                ) : (
                    <div className="flex items-center gap-2">
                        {user.photoURL && (
                            <img
                                src={user.photoURL}
                                alt={user.displayName}
                                className="w-10 h-10 rounded-full border border-amber-500"
                                title={user.displayName}
                            />
                        )}
                        <button
                            onClick={handleLogout}
                            className={`btn btn-sm sm:btn-md font-bold ${isDark
                                ? "bg-[#16213e] text-[#f4e4b8] border border-[#c5a25e] hover:bg-[#1a2b52]"
                                : "bg-[#c5a25e] text-[#1b1b1b] hover:bg-[#e0c67a]"
                                }`}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
