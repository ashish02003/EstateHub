import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [showPassword, setshowPassword] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log("data is :", data);
      if (data.success === false) {
        toast.error(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      toast.success("Signed in successfully ✅");

      // navigate('/');
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-7 text-white">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <div className="grid gap-1">
          <input
            type="email"
            placeholder="email"
            id="email"
            className="  border w-full  p-3 rounded-lg outline-none "
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-1  ">
          <div className=" bg-blue-50 p-2 border rounded flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              className="w-full  p-1 rounded-lg outline-none"
              id="password"
              onChange={handleChange}
            />
            <div
              onClick={() => setshowPassword((prev) => !prev)}
              className="cursor-pointer"
            >
              {showPassword ? <FaEye /> : <IoMdEyeOff />}
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p className="text-gray-300 font-bold">Don't have an account yet?</p>
        <Link to={"/sign-up"}>
          <span className="text-green-600 font-semibold">Sign up</span>
        </Link>
      </div>
    
    </div>
  );
}
