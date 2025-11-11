import React from 'react';
import { Link } from 'react-router';
import { useTheme } from '../Theme/ThemeContext';

const ErrorPage = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';


    const btnClass = isDark
        ? "bg-[#0C1A3C] border border-amber-200 hover:bg-[#1A2A4D] text-amber-100"
        : "bg-amber-200 border border-amber-400 hover:bg-amber-300 text-[#1b1b1b]";

    return (
        <div className={`${isDark ? "bg-none" : "bg-[#faf6ef]"} min-h-screen px-4 sm:px-8 py-16 pb-100`}>
            <div className='grid place-items-center h-150 relative'>
                <img
                    className='w-3/4 h-3/6 md:w-4/12 md:h-10/12 rounded-2xl'
                    src="https://img.freepik.com/premium-vector/file-folder-mascot-character-design-vector_166742-4413.jpg"
                    alt="Error"
                />

                <Link to='/'>
                    <button className={`${btnClass} btn rounded text-bold text-2xl px-5`}>
                        Back to home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
