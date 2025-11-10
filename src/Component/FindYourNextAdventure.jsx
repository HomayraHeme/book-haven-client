import React from 'react';
import { useTheme } from '../Theme/ThemeContext';
import { GiCastle, GiMagickTrick } from 'react-icons/gi';
import { SiDragonframe } from 'react-icons/si';
import { IoIosRocket } from 'react-icons/io';
import { FaCompass, FaCrosshairs, FaUserSecret } from 'react-icons/fa';


const genres = [
    { name: 'Fantasy', icon: <GiCastle />, color: '#7a5a3a' },

    { name: 'Adventure', icon: <SiDragonframe />, color: '#c4a754' },

    { name: 'Sci-Fi', icon: <IoIosRocket />, color: '#82c0b4' },

    { name: 'Mystery', icon: <FaUserSecret />, color: '#e56a6a' },

    { name: 'Magic-Fi', icon: <GiMagickTrick />, color: '#b98c3e' },

    { name: 'Quantum', icon: <FaCrosshairs />, color: '#9099a2' },

    { name: 'Exploration', icon: <FaCompass />, color: '#688c83' },
];

const FindYourNextAdventure = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const bgColor = isDark ? 'bg-gray-800' : 'bg-[#faf6ef]';
    const cardBg = isDark ? 'bg-[#262626]/80' : 'bg-white/80';
    const textColor = isDark ? 'text-[#f4e4b8]' : 'text-[#4a3b2d]';
    const titleColor = isDark ? 'text-[#c5a25e]' : 'text-amber-700';

    return (
        <section className={`${bgColor} py-4 px-6 sm:px-12 mt-10 shadow-2xl rounded-2xl`}>
            <h3 className={`text-3xl font-extrabold mb-4 text-center ${titleColor}`}>
                Find Your Next Adventure
            </h3>

            <div className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-amber-500 scrollbar-track-transparent py-1 px-2">
                {genres.map((genre, index) => (
                    <div
                        key={index}
                        className={`flex-shrink-0 flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg ${cardBg} transition-transform transform hover:scale-105 min-w-[120px]`}
                    >
                        <div
                            className="w-16 h-16 flex items-center justify-center rounded-full mb-4 text-2xl"
                            style={{ backgroundColor: genre.color }}
                        >
                            {genre.icon}
                        </div>
                        <p className={`font-semibold text-center ${textColor}`}>{genre.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FindYourNextAdventure;
