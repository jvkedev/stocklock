import { useForm } from "react-hook-form";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "../features/auth/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePassword } from "../features/auth/hooks/useChangePassword";
import { toast } from "sonner";
import { getApiErrorMessage } from "../shared/api/error";

const ChangePasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate, isPending } = useChangePassword();

  const onSubmit = (values: ChangePasswordFormValues) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Password changed successfully!");
        reset();
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error));
      },
    });
  };

  return (
    <div className="flex justify-center items-center w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-lg rounded-2xl px-10 py-8 bg-[#121212] border border-[#222222] text-[#F3F4F6] gap-8 shadow-xl"
      >
        <h2 className="text-3xl font-extrabold text-center tracking-tight text-white">
          Change Password
        </h2>

        <div className="flex flex-col gap-6">
          {/* Current Password Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="currentPassword"
              className="px-1 text-sm font-semibold text-gray-300"
            >
              Current Password <span className="text-red-500">*</span>
            </label>
            <input
              id="currentPassword"
              type="password"
              placeholder="Enter your password"
              {...register("currentPassword")}
              className="bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 rounded-lg outline-none placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            {errors.currentPassword && <p>{errors.currentPassword.message}</p>}
          </div>

          {/* New Password Field */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="newPassword"
              className="px-1 text-sm font-semibold text-gray-300"
            >
              New Password <span className="text-red-500">*</span>
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter your new password"
              {...register("newPassword")}
              className="bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 rounded-lg outline-none placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            {errors.newPassword && <p>{errors.newPassword.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white py-3 rounded-lg font-bold cursor-pointer hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/10"
        >
          {isPending ? "Saving..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
