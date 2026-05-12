/* eslint-disable react-hooks/immutability */
"use client";
import { LoginApi } from "@/app/api/admin/adminApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiAdminLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from 'next/navigation'
const loginSchema = z.object({
  email: z
    .string()
    .email("Email không hợp lệ"),

  password: z
    .string()
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
});

type LoginFormData = z.infer<
  typeof loginSchema
>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(
      loginSchema
    )
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      setLoading(true);

      const response =
        await LoginApi(
          data.email,
          data.password
        );

      if (
        response.code === "success"
      ) {
        toast.success(
          "Đăng nhập thành công!"
        );
        router.push("/admin/dashboard")
        
      } else {
        toast.error(
          "Tài khoản hoặc mật khẩu không đúng!"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        "Có lỗi xảy ra!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center mb-6">
            <RiAdminLine
              size={40}
              color="white"
            />
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">
            Hệ Thống Quản Trị
          </h2>

          <p className="text-white/80">
            Đăng nhập vào hệ thống quản trị
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 space-y-6 shadow-2xl">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(
              onSubmit
            )}
          >
            {/* Email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white/90 font-medium">
                  Email
                </span>
              </label>

              <input
                type="email"
                placeholder="admin@company.com"
                className="input input-bordered w-full bg-white/10 border-white/30 text-white placeholder-white/60 focus:bg-white/20 focus:border-indigo-400"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-red-300 text-sm mt-2">
                  {
                    errors.email
                      .message
                  }
                </p>
              )}
            </div>

            {/* Password */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white/90 font-medium">
                  Mật khẩu
                </span>
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full bg-white/10 border-white/30 text-white placeholder-white/60 focus:bg-white/20 focus:border-indigo-400"
                {...register(
                  "password"
                )}
              />

              {errors.password && (
                <p className="text-red-300 text-sm mt-2">
                  {
                    errors.password
                      .message
                  }
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-lg w-full bg-gradient-to-r from-indigo-500 to-purple-600 border-none text-white"
            >
              {loading
                ? "Đang đăng nhập..."
                : "Đăng nhập"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}