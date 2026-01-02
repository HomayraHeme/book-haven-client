 import React, { useState, useContext } from "react";
import { useTheme } from "../Theme/ThemeContext";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import loginImg from "../assets/logo.jpeg";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthContext";

const Login = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();
    const { signIn, signInWithGoogle, setUser } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const btnGradient = isDark
        ? "bg-[#0C1A3C] border border-amber-200 hover:bg-[#1A2A4D] text-amber-100"
        : "bg-amber-200 border border-amber-400 hover:bg-amber-300 text-[#1b1b1b]";
    const textColor = isDark ? "text-[#f4e4b8]" : "text-[#f4e4b8]";
    const inputBg = isDark ? "bg-[#1b1b1b] text-[#f4e4b8]" : "bg-[#fefcf5] text-[#4a3b2d]";
    const inputBorder = isDark ? "border-[#3a3a3a]" : "border-[#d4c19c]";

    // Demo User Auto-fill Function
    const handleDemoLogin = () => {
        setEmail("hina@gu.khay");  
        setPassword("123456Hh");         
        toast.success("Demo credentials loaded!");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signIn(email, password);
            const loggedUser = userCredential.user;

            const token = await loggedUser.getIdToken();
            localStorage.setItem("access-token", token);

            setUser({
                email: loggedUser.email,
                displayName: loggedUser.displayName || "Anonymous User",
                photoURL: loggedUser.photoURL,
            });

            setEmail("");
            setPassword("");
            toast.success("Login successful!");
            navigate(from, { replace: true });
        } catch (err) {
            let errorMessage = "Login failed!";
             toast.error(errorMessage);
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
            navigate(from, { replace: true });
        } catch (err) {
            toast.error("Google login failed.");
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center relative py-20 pb-100"
            style={{
                backgroundImage: `url(${loginImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black/60"></div>

            <div className={`relative z-10 w-full max-w-md p-8 rounded-2xl shadow-xl backdrop-blur-md ${isDark ? "bg-black/60" : "bg-amber-200/10"}`}>
                <h2 className={`text-3xl font-extrabold mb-2 text-center ${textColor}`}>Login</h2>
                <p className={`text-sm mb-6 text-center ${textColor}`}>
                    Welcome back! Please login to your account.
                </p>

                {/* --- Demo User Button --- */}
                <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="w-full mb-6 py-2 rounded-lg border-2 border-dashed border-amber-500 text-amber-500 font-bold hover:bg-amber-500/10 transition-all duration-300"
                >
                    Get Demo User Access
                </button>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`px-4 py-3 rounded-lg border ${inputBorder} ${inputBg} focus:outline-none`}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`px-4 py-3 rounded-lg border ${inputBorder} ${inputBg} focus:outline-none`}
                        required
                    />

                    <div className="text-right text-sm">
                        <Link to="/forget-password" alt="" className="text-amber-500 hover:underline">
                            Forget Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className={`${btnGradient} py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105`}
                    >
                        Login
                    </button>

                    <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-600"></span></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-gray-400">Or continue with</span></div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-400 text-gray-800 bg-white hover:bg-gray-100 transition-all"
                    >
                        <FcGoogle size={20} /> Login with Google
                    </button>
                </form>

                <p className={`text-sm mt-6 text-center ${textColor}`}>
                    Don’t have an account?{" "}
                    <Link to="/registration" className="text-amber-500 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;