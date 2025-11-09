import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaHandshake } from "react-icons/fa";
import { useTheme } from "../Theme/ThemeContext";
import logoImg from '../assets/Untitled_design-removebg-preview.png'
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { theme } = useTheme();

    const isDark = theme === "dark";

    // Elegant color palette
    const bgColor = isDark ? "bg-gray-900" : "bg-gray-100";
    const textColor = isDark ? "text-gray-200" : "text-gray-700";
    const accentGreen = "text-green-700"; // same for both
    const accentRed = "text-red-800"; // same for both
    const linkHoverColor = isDark ? "hover:text-green-500" : "hover:text-red-700";
    const iconBgColor = isDark ? "bg-green-700 hover:bg-green-600" : "bg-red-800 hover:bg-red-700";

    const peakShadow = isDark
        ? '0 10px 15px -5px rgba(0,0,0,0.4), 0 -10px 15px -5px rgba(0,0,0,0.4)'
        : '0 10px 15px -5px rgba(0,0,0,0.1), 0 -10px 15px -5px rgba(0,0,0,0.1)';

    return (
        <footer
            className={`relative ${bgColor} ${textColor} px-4 sm:px-8 py-12 sm:py-24 transition-colors duration-500`}
            style={{
                clipPath: 'polygon(0% 0%, 50% 15%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)',
                boxShadow: peakShadow,
            }}
        >
            <div className="w-full mx-auto flex flex-col md:grid lg:grid-cols-4 md:grid-cols-2 justify-between gap-10 md:gap-8 z-10 relative pb-4 max-w-[1200px] pt-24 md:pt-0">

                <div className="flex flex-col items-center text-center gap-2 w-full md:col-span-1">
                    <div className="flex items-center justify-center">
                        <img className="w-12 h-12" src={logoImg} alt="Logo" />
                        <span className={`${accentGreen} font-extrabold text-2xl pl-6`}>BOOK-</span>
                        <span className={`${accentRed} font-extrabold text-2xl ml-1`}>HAVEN</span>
                    </div>
                    <p className="text-sm mt-1 text-gray-400">
                        Your online library & book haven.
                    </p>
                    <div className="flex items-start justify-center gap-2 text-sm mt-4">
                        <FaMapMarkerAlt className={`mt-1 ${accentGreen}`} />
                        <p>123 Literary Lane, Book City, BD 4567</p>
                    </div>
                </div>

                <div className="flex flex-col items-center text-center gap-3 w-full md:col-span-1">
                    <h4 className="text-xl font-bold mb-2">Contact Info</h4>
                    <div className="flex items-center justify-center gap-2 text-sm">
                        <FaEnvelope className={accentGreen} />
                        <a href="mailto:contact@bookhaven.com" className={`${linkHoverColor} transition-colors`}>
                            contact@bookhaven.com
                        </a>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                        <FaPhone className={accentGreen} />
                        <a href="tel:+8801700123456" className={`${linkHoverColor} transition-colors`}>
                            +880 1700-123456
                        </a>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                        <FaGlobe className={accentGreen} />
                        <a href="#" className={`${linkHoverColor} transition-colors`}>
                            www.bookhaven.com
                        </a>
                    </div>
                </div>

                <div className="flex flex-col items-center text-center w-full md:col-span-1">
                    <h4 className="text-xl font-bold mb-2">Follow Us</h4>
                    <div className="flex gap-4 justify-center">
                        <a
                            href="#"
                            className={`p-2 rounded-full ${iconBgColor} text-white transition-colors duration-300`}
                            aria-label="Facebook">
                            <FaFacebookF size={18} />
                        </a>
                        <a
                            href="#"
                            className={`p-2 rounded-full ${iconBgColor} text-white transition-colors duration-300`}
                            aria-label="Twitter">
                            <FaXTwitter size={18} />
                        </a>
                        <a
                            href="#"
                            className={`p-2 rounded-full ${iconBgColor} text-white transition-colors duration-300`}
                            aria-label="Instagram">
                            <FaInstagram size={18} />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col items-center text-center w-full md:col-span-1">
                    <h4 className="text-xl font-bold mb-2">Legal</h4>
                    <ul className="flex flex-col gap-2 items-center text-sm">
                        <li className="flex items-center justify-center gap-2">
                            <FaHandshake className={accentGreen} />
                            <a href="#" className={`${linkHoverColor} transition-colors`}>
                                Privacy Policy
                            </a>
                        </li>
                        <li className="flex items-center justify-center gap-2">
                            <FaHandshake className={accentGreen} />
                            <a href="#" className={`${linkHoverColor} transition-colors`}>
                                Terms of Service
                            </a>
                        </li>
                        <li className="flex items-center justify-center gap-2">
                            <FaHandshake className={accentGreen} />
                            <a href="#" className={`${linkHoverColor} transition-colors`}>
                                Return Policy
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-700/50 text-center text-gray-400 text-sm max-w-[1200px] mx-auto">
                &copy; {currentYear} Book-Haven. All rights reserved. <span className={accentRed}>Made with ❤️</span> by Book-Haven Team.
            </div>
        </footer>
    );
};

export default Footer;
