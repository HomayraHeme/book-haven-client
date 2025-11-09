import React from "react";
// FaMapMarkerAlt, FaGlobe, FaFacebookF ইত্যাদি নতুন আইকন যোগ করা হলো 
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaHandshake } from "react-icons/fa";
import { useTheme } from "../Theme/ThemeContext";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { theme } = useTheme();

    const isDark = theme === "dark";

    // Theme Variables
    const bgColor = isDark
        ? "bg-gray-900"
        : "bg-gray-100";

    const textColor = isDark ? "text-gray-200" : "text-gray-700";
    const accentGreen = isDark ? "text-green-400" : "text-green-600";
    const accentRed = isDark ? "text-red-400" : "text-red-600";
    const linkHoverColor = isDark ? "hover:text-red-400" : "hover:text-green-700";
    const iconBgColor = isDark ? 'bg-green-700 hover:bg-green-500' : 'bg-red-600 hover:bg-green-600';

    // Shadow to emphasize the thematic red/green edges
    const peakShadow = isDark
        ? '0 10px 15px -5px rgba(255, 69, 0, 0.4), 0 -10px 15px -5px rgba(255, 69, 0, 0.4)'
        : '0 10px 15px -5px rgba(0, 128, 0, 0.4), 0 -10px 15px -5px rgba(0, 128, 0, 0.4)';

    return (
        <footer
            className={`relative ${bgColor} ${textColor}
                px-4 sm:px-8 
                shadow-2xl shadow-gray-400/50 dark:shadow-red-900/50 
                transition-colors duration-500`}
            style={{
                clipPath: 'polygon(0% 0%, 50% 15%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)',

                // 💡 উচ্চতা বৃদ্ধি: Padding 3rem থেকে 6rem করা হলো 
                paddingTop: '6rem',
                paddingBottom: '6rem',

                boxShadow: peakShadow,
            }}
        >

            {/* Main Content Div - Increased columns and max-width for better structure */}
            {/* max-w-[1200px] ব্যবহার করে কন্টেন্ট মাঝখানে রাখা হয়েছে। */}
            <div className="w-full mx-auto flex flex-col md:grid md:grid-cols-4 justify-between gap-12 md:gap-8 items-start z-10 relative pb-10 max-w-[1200px]">

                {/* 1. 📖 Logo / Branding (Full width on mobile) */}
                <div className="flex flex-col items-center md:items-start gap-2 w-full md:col-span-1">
                    <div className="flex items-baseline">
                        <span className={`${accentGreen} font-extrabold text-3xl`}>BOOK</span>
                        <span className={`${accentRed} font-extrabold text-3xl ml-1`}>HAVEN</span>
                    </div>
                    <p className="text-sm mt-1 text-gray-400 text-center md:text-left">
                        Your online library & book haven.
                    </p>
                    {/* Address added here for branding block on mobile/small screen */}
                    <div className="flex items-start gap-2 text-sm mt-4 text-center md:text-left">
                        <FaMapMarkerAlt className={`mt-1 ${accentGreen}`} />
                        <p>123 Literary Lane, Book City, BD 4567</p>
                    </div>
                </div>

                {/* 2. 📞 Contact Information (Email & Phone) */}
                <div className="flex flex-col items-center md:items-start gap-3 w-full md:col-span-1">
                    <h4 className="text-xl font-bold mb-2 text-center md:text-left">Contact Info</h4>

                    <div className="flex items-center gap-2 text-sm">
                        <FaEnvelope className={accentGreen} />
                        <a href="mailto:contact@bookhaven.com" className={`${linkHoverColor} transition-colors`}>
                            contact@bookhaven.com
                        </a>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <FaPhone className={accentGreen} />
                        <a href="tel:+8801700123456" className={`${linkHoverColor} transition-colors`}>
                            +880 1700-123456
                        </a>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <FaGlobe className={accentGreen} />
                        <a href="#" className={`${linkHoverColor} transition-colors`}>
                            www.bookhaven.com
                        </a>
                    </div>
                </div>

                {/* 3. Social Icons / Follow Us */}
                <div className="flex flex-col items-center md:items-start w-full md:col-span-1">
                    <h4 className="text-xl font-bold mb-2 text-center md:text-left">Follow Us</h4>
                    <div className="flex gap-4">
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
                            < FaXTwitter size={18} />
                        </a>
                        <a
                            href="#"
                            className={`p-2 rounded-full ${iconBgColor} text-white transition-colors duration-300`}
                            aria-label="Instagram">
                            <FaInstagram size={18} />
                        </a>
                    </div>
                </div>

                {/* 4. Legal / Quick Links */}
                <div className="flex flex-col items-center md:items-start w-full md:col-span-1">
                    <h4 className="text-xl font-bold mb-2 text-center md:text-left">Legal</h4>
                    <ul className="flex flex-col gap-2 items-center md:items-start text-sm">
                        <li className="flex items-center gap-2">
                            <FaHandshake className={accentGreen} />
                            <a href="#" className={`${linkHoverColor} transition-colors`}>
                                Privacy Policy
                            </a>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaHandshake className={accentGreen} />
                            <a href="#" className={`${linkHoverColor} transition-colors`}>
                                Terms of Service
                            </a>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaHandshake className={accentGreen} />
                            <a href="#" className={`${linkHoverColor} transition-colors`}>
                                Return Policy
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            {/* Copyright সেকশনকেও মাঝখানে আনার জন্য max-w-[1200px] mx-auto যোগ করা হয়েছে। */}
            <div className="mt-12 pt-8 border-t border-gray-700/50 text-center text-gray-400 text-sm max-w-[1200px] mx-auto">
                &copy; {currentYear} Book-Haven. All rights reserved. <span className={accentRed}>Made with ❤️</span> by Book-Haven Team.
            </div>
        </footer>
    );
};

export default Footer;