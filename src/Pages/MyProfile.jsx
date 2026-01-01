 import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { getAuth, updateProfile } from "firebase/auth";
import app from "../Firebase/Firebase.config";
import toast from "react-hot-toast";
import { Link } from "react-router";
import Spinner from "../Component/Spinner";
import { useTheme } from "../Theme/ThemeContext";

const auth = getAuth(app);

const MyProfile = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { user, setUser, loading } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [updating, setUpdating] = useState(false);

   const btnGradient = isDark
        ? "bg-[#0C1A3C] border border-amber-200 hover:bg-[#1A2A4D] text-amber-100"
        : "bg-amber-200 border border-amber-400 hover:bg-amber-300 text-[#1b1b1b]";


  // Initialize state when user loads
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  if (loading) return <Spinner />;

  if (!user)
    return (
      <div className="flex justify-center m-10 px-4">
        <div
          className={`p-8 rounded-xl shadow-lg max-w-md w-full text-center ${
            isDark ? "bg-[#262626] text-amber-100" : "bg-[#fff7e6] text-amber-900"
          }`}
        >
          <div className="flex justify-center mb-6">
            <img
              className="w-32 h-32 rounded-full object-cover border-4 border-amber-500"
              src="https://img.freepik.com/premium-vector/delete-user-icon-set-restricted-member-user-vector-symbol-remove-account-sign-cancel-account-icon-black-filled-outlined-style_268104-13639.jpg"
              alt="No User"
            />
          </div>
          <h2 className="text-2xl font-semibold mb-4">No User Found</h2>
          <p>
            Please{" "}
            <Link
              to="/login"
              className="text-amber-500 hover:text-amber-700 hover:underline"
            >
              login
            </Link>{" "}
            to view and update your profile.
          </p>
        </div>
      </div>
    );

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      // Update Firebase profile
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL || null,
      });

      // Reload Firebase user
      await auth.currentUser.reload();

      // Update local state
      setName(auth.currentUser.displayName);
      setPhotoURL(auth.currentUser.photoURL);

      // Update global context
      setUser(auth.currentUser);

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <section
      className={`min-h-screen flex justify-center  pt-16 px-4 sm:px-6 pb-100 ${
        isDark ? "bg-none text-amber-100" : "bg-[#faf6ef] text-amber-900"
      }`}
    >
      <div
        className={`max-w-md w-full rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col items-center gap-6 ${
          isDark ? "bg-[#262626] border border-amber-700" : "bg-[#fff7e6] border border-amber-300"
        }`}
      >
        {/* Profile Picture */}
        <img
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-amber-500"
          src={photoURL || "https://img.freepik.com/premium-vector/businessman-faceless-avatar-icon-male-character-symbol-modern-simple-vector-icon_901054-434.jpg"}
          alt={name || "No Name"}
        />

        {/* Name & Email */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-center">{name || "No Name"}</h2>
        <p className="text-center text-sm sm:text-base">{user.email}</p>

        {/* Update Form */}
        <form className="flex flex-col w-full gap-4 mt-4" onSubmit={handleUpdate}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-[#262626] border-amber-400 text-amber-100 placeholder-amber-300"
                : "bg-[#fff7e6] border-amber-400 text-amber-900 placeholder-amber-700"
            }`}
            required
          />
          <input
            type="url"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="Enter image URL"
            className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
              isDark
                ? "bg-[#262626] border-amber-400 text-amber-100 placeholder-amber-300"
                : "bg-[#fff7e6] border-amber-400 text-amber-900 placeholder-amber-700"
            }`}
          />
          <button
            type="submit"
            disabled={updating}
             className={`${btnGradient} btn py-3 rounded font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2`}
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default MyProfile;
