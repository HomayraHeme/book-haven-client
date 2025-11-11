import React, { use, useState } from "react";
import { useTheme } from "../Theme/ThemeContext";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import loginImg from "../assets/logo.jpeg"; // background image
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthContext";

const Registration = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();
    const { createUser, setUser, updateUser, signInWithGoogle } = use(AuthContext);

    const [showPassword, setShowPassword] = useState(false);
    const [passError, setPassError] = useState("");
    const [error, setError] = useState("");

    const btnGradient = isDark
        ? "bg-[#0C1A3C] border border-amber-200 hover:bg-[#1A2A4D] text-amber-100"
        : "bg-amber-200 border border-amber-400 hover:bg-amber-300 text-[#1b1b1b]";
    const textColor = isDark ? "text-[#f4e4b8]" : "text-[#f4e4b8]";
    const inputBg = isDark ? "bg-[#1b1b1b] text-[#f4e4b8]" : "bg-[#fefcf5] text-[#4a3b2d]";
    const inputBorder = isDark ? "border-[#3a3a3a]" : "border-[#d4c19c]";

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;

        // Password validation
        if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
            setPassError("Password must have at least one uppercase and one lowercase letter");
            return;
        }
        if (password.length < 6) {
            setPassError("Password must be at least 6 characters long");
            return;
        }
        setPassError("");

        try {
            const result = await createUser(email, password);
            await updateUser({ displayName: name, photoURL: photo });
            setUser({ ...result.user, displayName: name, photoURL: photo });
            toast.success("Account created successfully!");
            navigate("/");
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithGoogle();
            const loggedUser = result.user;

            const token = await loggedUser.getIdToken();
            localStorage.setItem("access-token", token);

            setUser({
                email: loggedUser.email,
                displayName: loggedUser.displayName || "Anonymous User",
                photoURL: loggedUser.photoURL,
            });
            toast.success("Google login successful!");
            navigate('/');
        }
        catch (err) {
            toast.error("Google login failed. Please try again.");
            console.error(err);
        }
    };

    const handleTogglePasswordShow = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center relative pb-120"
            style={{
                backgroundImage: `url(${loginImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Signup form */}
            <div
                className={`relative mt-10 z-10 w-full max-w-md p-10 rounded-2xl shadow-xl ${isDark ? "bg-black/60" : "bg-amber-200/10"
                    } backdrop-blur-md`}
            >
                <h2 className={`text-3xl font-extrabold mb-4 text-center ${textColor}`}>Register</h2>
                <p className={`text-sm mb-6 text-center ${textColor}`}>
                    Create your account to join Book Haven
                </p>

                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        className={`px-4 py-3 rounded-lg border ${inputBorder} ${inputBg} focus:outline-none`}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={`px-4 py-3 rounded-lg border ${inputBorder} ${inputBg} focus:outline-none`}
                        required
                    />
                    <input
                        type="text"
                        name="photo"
                        placeholder="Photo URL"
                        className={`px-4 py-3 rounded-lg border ${inputBorder} ${inputBg} focus:outline-none`}
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            className={`px-4 py-3 rounded-lg border ${inputBorder} ${inputBg} focus:outline-none w-full`}
                            required
                        />
                        <button
                            onClick={handleTogglePasswordShow}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {passError && <p className="text-xs text-red-500">{passError}</p>}

                    <button
                        type="submit"
                        className={`${btnGradient} py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
                    >
                        Register
                    </button>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-400 shadow-md hover:shadow-lg transition-all duration-300 mt-2 text-gray-800 bg-white"
                    >
                        <FcGoogle size={20} /> Register with Google
                    </button>
                </form>
                <div>
                    {passError && <p className='text-xs text-red-500'>{passError} </p>}




                    {error &&
                        <p className='text-red-500 text-xs mt-2 text-center'>
                            {error}
                        </p>
                    }
                </div>

                <p className={`text-sm mt-6 text-center ${textColor}`}>
                    Already have an account?{" "}
                    <Link to="/login" className="text-amber-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Registration;
