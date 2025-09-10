import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        toast.error(data.message)
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
       toast.success("successfully Created user! 🎉")
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
      toast.error(error.message)
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-white'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className=' outline-none border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          className=' outline-none border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
      

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
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p className='text-gray-300 font-bold'>Already have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-green-600 font-semibold'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
