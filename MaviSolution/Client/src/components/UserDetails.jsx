import React, { useState } from "react";
import axios from "axios";
import {
  Mail,
  Moon,
  MessageCircle,
  Clock3,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+1 (USA/Canada)",
    phone: "",
    email: "",
    service: "SRE Managed Services",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );

      alert(response.data.message);

      setFormData({
        name: "",
        countryCode: "+1 (USA/Canada)",
        phone: "",
        email: "",
        service: "SRE Managed Services",
        time: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to send request");
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white">

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side */}
        <div>
          <p className="tracking-[5px] text-gray-400 text-sm mb-10 uppercase">
            Direct Channels
          </p>

          {/* Email Card */}
          <div className="bg-[#0b1220] border border-gray-800 rounded-3xl p-8 flex items-center gap-6 mb-8 hover:border-blue-500 transition">
            <div className="w-16 h-16 rounded-2xl bg-blue-950 flex items-center justify-center">
              <Mail className="text-blue-500" size={28} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[2px] text-gray-500">
                Official Email
              </p>

              <h2 className="text-2xl font-semibold">
                Connect with Email
              </h2>
            </div>
          </div>

          {/* LinkedIn Card */}
          <div className="bg-[#0b1220] border border-gray-800 rounded-3xl p-8 flex items-center gap-6 hover:border-blue-500 transition">
            <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[2px] text-gray-500">
                Corporate Profile
              </p>

              <h2 className="text-2xl font-semibold">
                LinkedIn Official
              </h2>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#050d1d] border border-gray-800 rounded-[40px] p-10 shadow-2xl">
          <h2 className="text-5xl font-bold mb-10 uppercase">
            Submit A Request
          </h2>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Name */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full bg-[#1e293b] border border-gray-700 rounded-2xl px-6 py-5 text-lg outline-none focus:border-blue-500"
              required
            />

            {/* Phone */}
            <div className="grid grid-cols-3 gap-5">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="bg-[#1e293b] border border-gray-700 rounded-2xl px-4 py-5 outline-none focus:border-blue-500"
              >
                <option>+1 (USA/Canada)</option>
                <option>+91 (India)</option>
                <option>+44 (UK)</option>
              </select>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Contact Number"
                className="col-span-2 bg-[#1e293b] border border-gray-700 rounded-2xl px-6 py-5 outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@company.com"
              className="w-full bg-[#1e293b] border border-gray-700 rounded-2xl px-6 py-5 outline-none focus:border-blue-500"
              required
            />

            {/* Service & Time */}
            <div className="grid grid-cols-2 gap-5">
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="bg-[#1e293b] border border-gray-700 rounded-2xl px-6 py-5 outline-none focus:border-blue-500"
              >
                <option>SRE Managed Services</option>
                <option>Cloud Solutions</option>
                <option>DevOps</option>
                <option>Cyber Security</option>
              </select>

              <div className="relative">
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-[#1e293b] border border-gray-700 rounded-2xl px-6 py-5 outline-none focus:border-blue-500"
                />

                <Clock3
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>

            {/* Message */}
            <textarea
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Briefly describe your current infrastructure or upcoming project..."
              className="w-full bg-[#1e293b] border border-gray-700 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 resize-none"
              required
            ></textarea>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-400 text-lg tracking-[4px] uppercase font-bold hover:scale-[1.02] transition"
            >
              Initialize Connection
            </button>
          </form>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4">
        <button className="w-14 h-14 rounded-full bg-[#1e293b] flex items-center justify-center shadow-lg">
          <Moon />
        </button>

        <button className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-green-400 flex items-center justify-center shadow-2xl">
          <MessageCircle size={30} />
        </button>
      </div>
    </div>
  );
}