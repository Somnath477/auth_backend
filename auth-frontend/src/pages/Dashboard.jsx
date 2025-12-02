import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 flex items-center justify-center p-5">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-10 rounded-2xl max-w-lg w-full text-center">

        <h1 className="text-4xl font-bold text-white mb-4">
          Dashboard 🎉
        </h1>

        <p className="text-purple-200 mb-8">
          You are successfully logged in.
        </p>

        <button
          onClick={handleLogout}
          className="px-6 py-3 rounded-lg text-white font-semibold
          bg-gradient-to-r from-red-500 to-pink-600
          hover:from-red-600 hover:to-pink-700
          transition-all shadow-lg hover:shadow-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
