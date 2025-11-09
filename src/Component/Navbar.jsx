import React from "react";
import logoImg from "../assets/Untitled_design-removebg-preview.png";
import { Link, NavLink } from "react-router";
import ThemeToggle from "../Theme/ThemeToggle";

const Navbar = () => {
    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "underline text-red-800" : "text-green-700"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/all-books"
                    className={({ isActive }) =>
                        isActive ? "underline text-red-800" : "text-green-700"
                    }
                >
                    All Books
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/add-book"
                    className={({ isActive }) =>
                        isActive ? "underline text-red-800" : "text-green-700"
                    }
                >
                    Add Books
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/myBooks"
                    className={({ isActive }) =>
                        isActive ? "underline text-red-800" : "text-green-700"
                    }
                >
                    My Books
                </NavLink>
            </li>
        </>
    );

    return (
        <nav className="navbar bg-base-100 shadow-xl border-b border-base-300 sticky top-0 z-50 px-4 sm:px-8">
            {/* Navbar Start */}
            <div className="navbar-start">
                {/* Mobile Dropdown */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-box w-52"
                    >
                        {navLinks}
                        <li className="p-2 mt-2">
                            <ThemeToggle />
                        </li>
                    </ul>
                </div>

                <img className="w-12 h-12 mr-2" src={logoImg} alt="Logo" />
                <Link
                    to="/"
                    className="btn btn-ghost text-2xl font-extrabold hover:bg-transparent"
                >
                    <span className="text-green-700">BOOK-</span>
                    <span className="text-red-800">HAVEN</span>
                </Link>
            </div>

            {/* Navbar Center (Desktop Menu) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-semibold space-x-1">
                    {navLinks}
                </ul>
            </div>

            {/* Navbar End (Right Side) */}
            <div className="navbar-end flex items-center gap-3 sm:gap-4">
                {/* Desktop Theme Toggle */}
                <div className="hidden lg:block">
                    <ThemeToggle />
                </div>

                {/* Login Button → Deep Green */}
                <Link
                    to="/login"
                    className="btn bg-green-700 text-white hover:bg-green-600 btn-sm sm:btn-md font-bold"
                >
                    Login
                </Link>

                {/* Register Button → Deep Burgundy */}
                <Link
                    to="/registration"
                    className="btn bg-red-800 text-white hover:bg-red-700 btn-sm sm:btn-md hidden md:flex font-bold"
                >
                    Register
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
