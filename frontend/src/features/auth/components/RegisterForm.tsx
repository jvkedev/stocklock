import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <form className="flex flex-col w-full max-w-lg rounded-2xl px-10 py-8 bg-[#121212] border border-[#222222] text-[#F3F4F6] gap-8 shadow-xl">
      <h2 className="text-3xl font-extrabold text-center tracking-tight text-white">
        Create an Account
      </h2>

      <div className="flex flex-col gap-6">
        {/* Name Field */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="px-1 text-sm font-semibold text-gray-300"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            placeholder="Enter your name"
            className="bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 rounded-lg outline-none placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="px-1 text-sm font-semibold text-gray-300"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="Enter your email"
            className="bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 rounded-lg outline-none placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="px-1 text-sm font-semibold text-gray-300"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            required
            placeholder="Enter your password"
            className="bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 rounded-lg outline-none placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
      </div>

      {/* Logic & Footer Fix */}
      <div className="flex items-center gap-1.5 w-full justify-end text-sm">
        <span className="text-gray-400">Already have an account?</span>
        <Link
          to="/login"
          className="text-blue-400 hover:text-blue-300 hover:underline font-semibold transition-colors"
        >
          Sign In
        </Link>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-3 rounded-lg font-bold cursor-pointer hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/10"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
