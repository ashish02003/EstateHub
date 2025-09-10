
import { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleClick = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      if (!res.ok) {
        throw new Error("Server error during Google login");
      }

      const data = await res.json();
      dispatch(signInSuccess(data));
      toast.success("Signed in successfully ✅");
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      if (error.code === "auth/popup-closed-by-user") {
        toast.warning("Google sign-in popup closed ❌");
      } else if (error.code === "auth/cancelled-popup-request") {
        toast.info("Popup request cancelled");
      } else if (error.code === "auth/invalid-api-key") {
        toast.error("Invalid Firebase API key ❗ Check your config.");
      } else {
        toast.error("Could not sign in with Google ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className={`flex items-center justify-center gap-2 bg-pink-600 font-semibold text-white p-3 rounded-lg uppercase hover:opacity-95 ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
      disabled={loading}
    >
      {loading ? (
        <>
          <svg
            className="w-5 h-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          Signing in...
        </>
      ) : (
        "Continue with Google"
      )}
    </button>
  );
}

