import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("accessToken", res.data.accessToken);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 p-5">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-10 w-full max-w-md text-center">

        <h2 className="text-3xl font-bold text-white mb-6">Welcome Back</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
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
            bg-gradient-to-r from-purple-500 to-fuchsia-500
            hover:from-purple-600 hover:to-fuchsia-600
            transition-all shadow-lg hover:shadow-xl"
          >
            Login
          </button>
        </form>

        <p className="text-purple-200 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-pink-300 hover:text-pink-400">
            Register
          </a>
        </p>

        <p className="text-purple-300 mt-3">
          <a href="/" className="hover:text-white">← Back to Home</a>
        </p>
      </div>
    </div>
  );
}
