import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProfileSchema,
  type UpdateProfileFormValues,
} from "../features/auth/schema";
import type { updateProfilePayload } from "../features/auth/types";
import { useAuthStore } from "../features/auth/store/auth.store";
import { useUpdateProfile } from "../features/auth/hooks/useUpdateProfile";
import { toast } from "sonner";
import { getApiErrorMessage } from "../shared/api/error";

const ProfilePage = () => {
  const user = useAuthStore((s) => s.user);
  const { mutate, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: user?.name ?? "" },
  });

  const onSubmit = (values: UpdateProfileFormValues) => {
    mutate(values as updateProfilePayload, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
      },
      onError: (error) => {
        toast.error(getApiErrorMessage(error));
      },
    });
  };

  return (
    <div className="flex justify-center w-full items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-lg rounded-2xl px-10 py-8 bg-[#121212] border border-[#222222] text-[#F3F4F6] gap-8 shadow-xl"
      >
        <h2 className="text-3xl font-extrabold text-center tracking-tight text-white">
          Update Profile
        </h2>

        {/* Name Field */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="px-1 text-sm font-semibold text-gray-300"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter new name"
            {...register("name")}
            className="bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 rounded-lg outline-none placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        {/* Name Field */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="px-1 text-sm font-semibold text-gray-300"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user?.email ?? ""}
            disabled
            readOnly
            className="bg-[#0e0e0e] border border-[#2D2D2D] text-white px-4 py-3 rounded-lg outline-none placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white py-3 rounded-lg font-bold cursor-pointer hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/10"
        >
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
