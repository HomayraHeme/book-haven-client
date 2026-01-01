 import React from "react";
import { useTheme } from "../Theme/ThemeContext";
import { FaQuestionCircle, FaEnvelope, FaUsers, FaBook } from "react-icons/fa";

const ExtraSections = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const textColor = isDark ? "text-gray-200" : "text-[#4a3b2d]";
  const titleColor = isDark ? "text-amber-200" : "text-amber-800";
  const cardBg = isDark ? "bg-gray-800" : "bg-white";
  const borderColor = isDark ? "border-gray-700" : "border-[#e0d9c3]";
  const hoverBorder = isDark ? "hover:border-amber-400" : "hover:border-amber-600";
   const btnGradient = isDark
        ? "bg-[#0C1A3C] border border-amber-200 hover:bg-[#1A2A4D] text-amber-100"
        : "bg-amber-200 border border-amber-400 hover:bg-amber-300 text-[#1b1b1b]";

  const bgSections = [
    isDark ? "bg-[#1b1b1b]/90" : "bg-[#fffaf1]/90", // About
    isDark ? "bg-[#222]/90" : "bg-[#fff5e0]/90",   // FAQ
    isDark ? "bg-[#1e1e1e]/90" : "bg-[#faf6ef]/90",// Testimonials
    isDark ? "bg-[#2a2a2a]/90" : "bg-[#fffdf6]/90" // Newsletter
  ];

  return (
    <div className="space-y-20 mt-16">
     

      {/* ===== FAQ Section ===== */}
      <section className={`px-6 py-14 rounded-2xl shadow-2xl ${bgSections[1]} transition-colors`}>
        <h2 className={`text-4xl font-extrabold text-center mb-10 ${titleColor}`}>
          <FaQuestionCircle className="inline-block mr-2" /> Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              q: "How can I add my own book?",
              a: "Simply sign in and navigate to the 'Add Book' section. Fill out the details and upload a cover image.",
            },
            {
              q: "Is Book Haven free to use?",
              a: "Yes! You can browse, read, and manage books for free. Premium features may arrive in the future.",
            },
            {
              q: "Can I save books to my personal list?",
              a: "Absolutely. Just click 'Add to My Books' on any book page to save it for later reading.",
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className={`${cardBg} border ${borderColor} ${textColor} rounded-2xl shadow-xl p-6 transition-all hover:-translate-y-1 ${hoverBorder}`}
            >
              <h3 className="text-xl font-bold mb-2">{faq.q}</h3>
              <p className="opacity-90">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Testimonials Section ===== */}
      <section className={`px-6 py-14 rounded-2xl shadow-2xl ${bgSections[2]} transition-colors`}>
        <h2 className={`text-4xl font-extrabold text-center mb-10 ${titleColor}`}>
          <FaUsers className="inline-block mr-2" /> What Readers Say
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Sophia Ahmed",
              feedback:
                "Book Haven helped me rediscover my love for reading. The collection is diverse and well-organized!",
            },
            {
              name: "Liam Carter",
              feedback:
                "I love the UI and how easy it is to track what I’ve read. It feels like a cozy digital library.",
            },
            {
              name: "Noah Khan",
              feedback:
                "The Book of the Week feature is my favorite! Always something inspiring to read.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`${cardBg} border ${borderColor} ${textColor} rounded-2xl shadow-xl p-6 text-center hover:-translate-y-2 transition-all duration-500 ${hoverBorder}`}
            >
              <p className="italic mb-3">“{item.feedback}”</p>
              <h4 className="font-bold text-lg">— {item.name}</h4>
            </div>
          ))}
        </div>
      </section>

       {/* ===== About Book Haven ===== */}
      <section className={`px-6 py-14 rounded-2xl shadow-2xl ${bgSections[0]} transition-colors`}>
        <h2 className={`text-4xl font-extrabold text-center mb-8 ${titleColor}`}>
          <FaBook className="inline-block mr-2" /> About Book Haven
        </h2>
        <div className={`max-w-4xl mx-auto text-center leading-relaxed ${textColor}`}>
          <p>
            Welcome to <strong>Book Haven</strong> — your digital escape into the world of stories,
            imagination, and endless learning. We bring readers and book lovers together in a cozy
            online space filled with inspiration, new releases, and timeless classics.
          </p>
          <p className="mt-4">
            Our mission is to make discovering, reading, and sharing books as magical and effortless
            as turning the first page of your favorite novel.
          </p>
        </div>
      </section>

      {/* ===== Newsletter Section ===== */}
      <section className={`px-6 py-14 rounded-2xl shadow-2xl ${bgSections[3]} transition-colors`}>
        <h2 className={`text-4xl font-extrabold text-center mb-8 ${titleColor}`}>
          <FaEnvelope className="inline-block mr-2" /> Join Our Newsletter
        </h2>
        <div className="max-w-xl mx-auto text-center">
          <p className={`mb-6 ${textColor}`}>
            Stay updated with our latest book releases, author interviews, and community stories.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email..."
              className={`px-5 py-3 rounded w-full sm:w-2/3 ${cardBg} border ${borderColor} ${textColor} focus:outline-none`}
            />
            <button
              type="submit"
               className={`${btnGradient} btn py-3 rounded font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2`}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ExtraSections;
