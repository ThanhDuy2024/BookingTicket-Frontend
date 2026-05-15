/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { ArrowLeft, ImagePlus, Plus } from "lucide-react";
import { toast } from "sonner";
import { PostCategory } from "@/app/api/admin/categoryApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateCategoryPage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState("active");
  const [preview, setPreview] = useState("");
  const [nameError, setNameError] = useState("");
  const router = useRouter();

  const validateName = () => {
    if (!name.trim()) {
      setNameError("Tên danh mục không được để trống");
      return false;
    }

    if (name.trim().length < 3) {
      setNameError("Tên danh mục phải có ít nhất 3 ký tự");
      return false;
    }

    setNameError("");
    return true;
  };
  // HANDLE IMAGE
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // HANDLE SUBMIT
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validateName()) {
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("status", status);

      if (image) {
        formData.append("image", image);
      }

      // CALL API
      const response = await PostCategory(formData);
      if (response.code === "success") {
        toast.success("Tạo danh mục thành công!")
        router.push("/admin/categories/list")
      } else {
        toast.error("Tạo danh mục thất bại!")
      }

    } catch (error) {
      console.log(error);
      toast.error("Tạo danh mục thất bại!")
    }
  };

  return (
    <div className="min-h-screen lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* HEADER */}
        <div
          className="
        mb-8 rounded-3xl border border-slate-200
        bg-gradient-to-r from-white to-slate-50
        p-5 shadow-sm sm:p-6
      "
        >
          <div
            className="
          flex flex-col gap-5
          lg:flex-row lg:items-center
          lg:justify-between
        "
          >
            {/* LEFT */}
            <div className="flex items-start gap-4">
              <div
                className="
              flex h-14 w-14 items-center
              justify-center rounded-2xl
              bg-gradient-to-r
              from-indigo-600 to-violet-600
              text-white shadow-lg
            "
              >
                <Plus size={28} />
              </div>

              <div>
                <h1
                  className="
                text-3xl font-black tracking-tight
                text-slate-800 lg:text-4xl
              "
                >
                  Tạo danh mục
                </h1>

                <p className="mt-2 text-sm text-slate-500 sm:text-base">
                  Thêm danh mục mới vào hệ thống quản lý
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <Link
              href="/admin/categories/list"
              className="
            btn h-12 rounded-2xl
            border-slate-200 bg-white
            px-5 text-sm font-semibold
            text-slate-700 shadow-sm
            transition-all duration-300
            hover:scale-[1.02]
            hover:bg-slate-100
            hover:shadow-md
            sm:text-base
          "
            >
              <ArrowLeft size={18} />
              Quay lại danh mục
            </Link>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="
        rounded-3xl border border-slate-200
        bg-white p-5 shadow-xl
        lg:p-8
      "
        >
          <div className="grid gap-6">
            {/* NAME */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Tên danh mục
              </label>

              <input
                type="text"
                placeholder="Nhập tên danh mục..."
                className={`
              input input-bordered w-full
              rounded-2xl bg-slate-50
              focus:outline-none
              ${nameError
                    ? "border-red-500 focus:border-red-500"
                    : "border-slate-200 focus:border-violet-500"
                  }
            `}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);

                  if (nameError) {
                    setNameError("");
                  }
                }}
              />

              {nameError && (
                <p className="mt-2 text-sm text-red-500">
                  {nameError}
                </p>
              )}
            </div>

            {/* IMAGE */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Hình ảnh
              </label>

              <label
                className="
              flex cursor-pointer flex-col items-center
              justify-center gap-3 rounded-3xl
              border-2 border-dashed border-slate-300
              bg-slate-50 p-8
              transition-all duration-300
              hover:border-violet-400
              hover:bg-violet-50
            "
              >
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />

                <ImagePlus
                  size={40}
                  className="text-slate-400"
                />

                <p className="text-sm text-slate-500">
                  Nhấn để tải ảnh lên
                </p>
              </label>

              {/* PREVIEW */}
              {preview && (
                <div className="mt-4 overflow-hidden rounded-3xl border border-slate-200">
                  <img
                    src={preview}
                    alt="preview"
                    className="
                  h-52 w-full object-cover
                  transition duration-300
                  hover:scale-105
                "
                  />
                </div>
              )}
            </div>

            {/* STATUS */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Trạng thái
              </label>

              <select
                className="
              select select-bordered w-full
              rounded-2xl border-slate-200
              bg-slate-50
              focus:border-violet-500
              focus:outline-none
            "
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="active">Hoạt động</option>

                <option value="inactive">
                  Ngưng hoạt động
                </option>
              </select>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="
            btn mt-2 h-12 rounded-2xl border-0
            bg-gradient-to-r from-indigo-600 to-violet-600
            text-white shadow-lg
            transition-all duration-300
            hover:scale-[1.01]
            hover:from-indigo-700
            hover:to-violet-700
          "
            >
              <Plus size={18} />
              Tạo danh mục
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}