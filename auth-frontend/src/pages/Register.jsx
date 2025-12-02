import { useState } from "react";
import api from "../utils/axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 p-5">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-10 w-full max-w-md text-center">

        <h2 className="text-3xl font-bold text-white mb-6">Create Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-white/20 text-white
                     placeholder-gray-300 border border-white/20
                     focus:ring-2 focus:ring-purple-400 outline-none"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-white/20 text-white
                     placeholder-gray-300 border border-white/20
                     focus:ring-2 focus:ring-purple-400 outline-none"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/20 text-white
                     placeholder-gray-300 border border-white/20
                     focus:ring-2 focus:ring-purple-400 outline-none"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold
            bg-gradient-to-r from-indigo-500 to-purple-600
            hover:from-indigo-600 hover:to-purple-700
            transition-all shadow-lg hover:shadow-xl"
          >
            Register
          </button>
        </form>

        <p className="text-purple-200 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-pink-300 hover:text-pink-400">
            Login
          </a>
        </p>

        <p className="text-purple-300 mt-3">
          <a href="/" className="hover:text-white">← Back to Home</a>
        </p>
      </div>
    </div>
  );
}
