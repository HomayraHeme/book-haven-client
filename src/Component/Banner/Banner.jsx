import React, { useEffect } from "react";
import { Link } from "react-router";
import bannerImg from "../../assets/reading-room-old-library-3300608.webp";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "../../Theme/ThemeContext";

const Banner = () => {
    const { theme } = useTheme();

    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: "ease-in-out",
            once: true,
        });
    }, []);

    const headingText = "text-amber-100";
    const paragraphText = "text-amber-200";

    const allBooksBtn = theme === "dark"
        ? "bg-[#0C1A3C] border border-amber-200 hover:bg-[#1A2A4D] text-amber-100"
        : "bg-[#f4e4b8] border border-[#c5a25e] hover:bg-[#e0d9c3] text-[#1b1b1b]";

    const createBookBtn = theme === "dark"
        ? "bg-transparent border border-amber-200 hover:bg-amber-100 hover:text-[#0C1A3C] text-amber-100"
        : "bg-transparent border border-[#c5a25e] text-amber-100 hover:bg-[#c5a25e] hover:text-[#1b1b1b] text-[#1b1b1b]";

    return (
        <section className="relative h-[900px] w-full flex items-center justify-center overflow-hidden">
            <img
                src={bannerImg}
                alt="Library Banner"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60"></div>

            <div className="relative z-10 text-center px-4 sm:px-8">
                <h1
                    className={`text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 ${headingText}`}
                    data-aos="fade-down"
                >
                    Welcome to The
                    <br />
                    <span
                        className="block text-6xl sm:text-7xl md:text-8xl mt-2 text-amber-200 tracking-wide"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        Book Haven
                    </span>
                </h1>
                <p
                    className={`text-lg sm:text-xl md:text-2xl mb-8 ${paragraphText} font-light italic`}
                    data-aos="fade-up"
                    data-aos-delay="600"
                >
                    Your Next Great Read Awaits
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pb-100" data-aos="zoom-in" data-aos-delay="900">
                    <Link
                        to="/all-books"
                        className={`${allBooksBtn} font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-300`}
                    >
                        All Books
                    </Link>
                    <Link
                        to="/add-book"
                        className={`${createBookBtn} font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-300`}
                    >
                        Create Book
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Banner;
