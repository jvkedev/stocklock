import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-black border-b border-[#222222] px-6 md:px-16 py-4 w-full backdrop-blur-md bg-opacity-80">
      {/* Brand Logo / Name */}
      <Link
        to="/"
        className="text-xl font-extrabold tracking-tight text-white hover:opacity-90 transition-opacity"
      >
        Brand
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 md:gap-8 text-sm font-semibold">
        <Link
          to="/register"
          className={`transition-colors duration-200 ${
            location.pathname === "/register"
              ? "text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Register
        </Link>

        <Link
          to="/login"
          className={`px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all active:scale-[0.98] ${
            location.pathname === "/login" ? "ring-2 ring-blue-500/50" : ""
          }`}
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
