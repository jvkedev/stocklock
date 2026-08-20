import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormValues } from "../schema";
import { useLogin } from "../hooks/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending, error } = useLogin();

  const onSubmit = (values: LoginFormValues) => {
    mutate(values, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full max-w-lg rounded-2xl px-10 py-8 bg-[#121212] border border-[#222222] text-[#F3F4F6] gap-8 shadow-xl"
    >
      <h2 className="text-3xl font-extrabold text-center tracking-tight text-white">
        Login in
      </h2>

      <div className="flex flex-col gap-6">
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
            placeholder="Enter your email"
            {...register("email")}
            className="bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 rounded-lg outline-none placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          {errors.email && <p>{errors.email.message}</p>}
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
            placeholder="Enter your password"
            {...register("password")}
            className="bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 rounded-lg outline-none placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
      </div>

      <div className="flex items-center gap-1.5 w-full justify-end text-sm">
        <span className="text-gray-400">Don't have an account?</span>
        <Link
          to="/register"
          className="text-blue-400 hover:text-blue-300 hover:underline font-semibold transition-colors"
        >
          Sign Up
        </Link>
      </div>

      {error && <p>Login failed. Check your credentials.</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-500 text-white py-3 rounded-lg font-bold cursor-pointer hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/10"
      >
        {isPending ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
};

export default LoginForm;
