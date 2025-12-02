import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-900 p-5">

      {/* Glass Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 
        shadow-2xl rounded-2xl p-10 w-full max-w-md text-center 
        animate-fadeIn">

        <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-md">
          Welcome 👋
        </h1>

        <p className="text-purple-200 mb-8">
          Your secure gateway awaits. Please login or create an account.
        </p>

        <div className="flex flex-col space-y-4">

          <Link
            to="/login"
            className="w-full py-3 rounded-lg text-white font-semibold
              bg-gradient-to-r from-purple-500 to-fuchsia-500
              hover:from-purple-600 hover:to-fuchsia-600
              transition-all shadow-lg hover:shadow-xl"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="w-full py-3 rounded-lg text-white font-semibold
              bg-gradient-to-r from-indigo-500 to-purple-600
              hover:from-indigo-600 hover:to-purple-700
              transition-all shadow-lg hover:shadow-xl"
          >
            Register
          </Link>

        </div>
      </div>
    </div>
  );
}
