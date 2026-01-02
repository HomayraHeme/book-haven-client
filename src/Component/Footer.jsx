import React from "react";
import { FaFacebookF, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaHandshake } from "react-icons/fa";
import { useTheme } from "../Theme/ThemeContext";
import logoImg from '../assets/booklogo-removebg-preview.png';
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { theme } = useTheme();

    const isDark = theme === "dark";


    const brandPrimary = "text-amber-800";
    const brandSecondary = "text-amber-100";


    const bgColor = isDark ? "bg-[#1b1b1b]" : "bg-[#e0d4b9]";
    const textColor = isDark ? "text-amber-100" : "text-amber-800";
    const mutedTextColor = isDark ? "text-amber-200/70" : "text-amber-800";
    const linkHoverColor = isDark ? "hover:text-amber-300" : "hover:text-amber-600"; const iconBgColor1 = isDark ? "bg-[#0C1A3C] hover:bg-[#1A2A4D]" : "bg-amber-800 hover:bg-amber-300";
    const borderTopColor = isDark ? "border-gray-700" : "border-amber-600";

    return (
        <footer
            className={`relative ${bgColor} ${textColor} px-4 sm:px-8 py-12 sm:py-24  transition-colors duration-500 pb-40 md:pb-24`}
            style={{
                clipPath: 'polygon(0% 0%, 50% 15%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)',
                boxShadow: isDark
                    ? '0 10px 15px -5px rgba(0,0,0,0.4), 0 -10px 15px -5px rgba(0,0,0,0.4)'
                    : '0 10px 15px -5px rgba(0,0,0,0.1), 0 -10px 15px -5px rgba(0,0,0,0.1)',
            }}
        >
            <div className="w-full mx-auto flex flex-col md:grid lg:grid-cols-4 md:grid-cols-2 justify-between gap-10 md:gap-8 z-10 relative pb-4 max-w-[1200px] pt-24 md:pt-0">

                <div className="flex flex-col items-center text-center gap-2 w-full md:col-span-1">
                    <div className="flex items-center justify-center">
                        <img className="w-16 h-12" src={logoImg} alt="Logo" />
                        <span className={` ${isDark ? "text-amber-100" : "text-amber-800"} font-extrabold text-2xl pl-6`}>BOOK-</span>
                        <span className="text-[#c5a25e] font-extrabold text-2xl ml-1">HAVEN</span>
                    </div>
                    <p className={`text-sm mt-1 ${mutedTextColor}`}>
                        Your online library & book haven.
                    </p>
                    <div className="flex items-start justify-center gap-2 text-sm mt-4">
                        <FaMapMarkerAlt className={`${brandPrimary} mt-1`} />
                        <p className={mutedTextColor}>123 Literary Lane, Book City, BD 4567</p>
                    </div>
                </div>

                <div className="flex flex-col items-center text-center gap-3 w-full md:col-span-1">
                    <h4 className={`${brandPrimary} text-xl font-bold mb-2`}>Contact Info</h4>
                    <div className="flex items-center justify-center gap-2 text-sm">
                        <FaEnvelope className={brandSecondary} />
                        <a href="mailto:contact@bookhaven.com" className={`${linkHoverColor} transition-colors`}>
                            contact@bookhaven.com
                        </a>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                        <FaPhone className={brandSecondary} />
                        <a href="tel:+8801700123456" className={`${linkHoverColor} transition-colors`}>
                            +880 1700-123456
                        </a>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm">
                        <FaGlobe className={brandSecondary} />
                        <a href="#" className={`${linkHoverColor} transition-colors`}>
                            www.bookhaven.com
                        </a>
                    </div>
                </div>

                <div className="flex flex-col items-center text-center w-full md:col-span-1">
                    <h4 className={`${brandPrimary} text-xl font-bold mb-2`}>Follow Us</h4>
                    <div className="flex gap-4 justify-center">
                        <a
                            href="https://web.facebook.com/home.php"
                            className={`p-2 rounded-full ${iconBgColor1} text-white transition-colors duration-300`}
                            aria-label="Facebook">
                            <FaFacebookF size={18} />
                        </a>
                        <a
                            href="https://x.com/"
                            className={`p-2 rounded-full ${iconBgColor1} text-white transition-colors duration-300`}
                            aria-label="Twitter">
                            <FaXTwitter size={18} />
                        </a>
                        <a
                            href="https://www.instagram.com/"
                            className={`p-2 rounded-full ${iconBgColor1} text-white transition-colors duration-300`}
                            aria-label="Instagram">
                            <FaInstagram size={18} />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col items-center text-center w-full md:col-span-1">
                    <h4 className={`${brandPrimary} text-xl font-bold mb-2`}>Summery</h4>
                    <ul className="flex flex-col gap-2 items-center text-sm">
                        <li className="flex items-center justify-center gap-2">
                            <FaHandshake className={brandPrimary} />
                            <a href="/" className={`${linkHoverColor} transition-colors`}>
                                Home
                            </a>
                        </li>
                        <li className="flex items-center justify-center gap-2">
                            <FaHandshake className={brandPrimary} />
                            <a href="/all-books" className={`${linkHoverColor} transition-colors`}>
                                All Books
                            </a>
                        </li>
                        <li className="flex items-center justify-center gap-2">
                            <FaHandshake className={brandPrimary} />
                            <a href="/howItWorks" className={`${linkHoverColor} transition-colors`}>
                                How It Works
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className={`mt-12 pt-8 border-t ${borderTopColor} text-center ${mutedTextColor} text-sm max-w-[1200px] mx-auto`}>
                &copy; {currentYear} Book-Haven. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
