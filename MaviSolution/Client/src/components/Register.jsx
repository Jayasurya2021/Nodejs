import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-[#050d1d] border border-gray-800 rounded-[40px] p-10 shadow-2xl">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center text-3xl font-bold">
            M
          </div>
        </div>

        <h2 className="text-4xl font-bold mb-2 text-center uppercase tracking-tight">
          Create Account
        </h2>
        <p className="text-gray-400 text-center mb-10 text-sm tracking-widest uppercase">
          Join the Mavi community
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full bg-[#1e293b] border border-gray-700 rounded-2xl pl-14 pr-6 py-5 text-lg outline-none focus:border-blue-500 transition"
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full bg-[#1e293b] border border-gray-700 rounded-2xl pl-14 pr-6 py-5 text-lg outline-none focus:border-blue-500 transition"
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-[#1e293b] border border-gray-700 rounded-2xl pl-14 pr-6 py-5 text-lg outline-none focus:border-blue-500 transition"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 text-lg tracking-[4px] uppercase font-bold hover:scale-[1.02] transition flex items-center justify-center gap-3 group"
          >
            Register Now
            <ArrowRight className="group-hover:translate-x-1 transition" size={20} />
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
