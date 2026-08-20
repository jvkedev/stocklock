import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/auth.store";

const Navbar = () => {
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.clearSession);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 md:px-12">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          <span>Navbar</span>
        </Link>

        {/* User / Auth Navigation */}
        {user ? (
          <div className="flex items-center gap-5">
            <span className="text-sm font-medium text-gray-300">
              Hi, <span className="font-semibold text-white">{user.name}</span>
            </span>

            <button
              onClick={clearSession}
              className="rounded-lg bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold text-red-400 border border-red-500/20 transition-all hover:bg-red-500 hover:text-white hover:border-transparent active:scale-95"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 md:gap-5 text-sm font-medium">
            <Link
              to="/register"
              className={`px-3 py-1.5 rounded-md transition-colors ${
                location.pathname === "/register"
                  ? "text-white font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Register
            </Link>

            <Link
              to="/login"
              className={`rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all active:scale-95 ${
                location.pathname === "/login"
                  ? "bg-blue-600 ring-2 ring-blue-400/50"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
