/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ImagePlus, Save } from "lucide-react";
import { toast } from "sonner";
import { CategoryDetail, PutCategory } from "@/app/api/admin/categoryApi";
import Link from "next/link";

// import { useParams } from "next/navigation";
// import axiosInstance from "@/app/lib/axios";

const noImage =
  "https://placehold.co/600x400?text=No+Image";

export default function EditCategoryPage({
  id
}: any) {
  // const params = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState("active");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // VALIDATE
  const [nameError, setNameError] = useState("");

  const validateName = () => {
    if (!name.trim()) {
      setNameError("Tên danh mục không được để trống");
      return false;
    }

    if (name.trim().length < 3) {
      setNameError(
        "Tên danh mục phải có ít nhất 3 ký tự"
      );
      return false;
    }

    setNameError("");
    return true;
  };

  // FETCH CATEGORY DETAIL
  useEffect(() => {
    const fetchCategoryDetail = async () => {
      try {
        setLoading(true);

        // CALL API DETAIL
        const response = await CategoryDetail(id);

        setName(response.data.name);
        setPreview(response.data.image);
        setStatus(response.data.status);
      } catch (error) {
        console.log(error);
        toast.error("Không thể tải danh mục!");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetail();
  }, [id]);

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
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("status", status);

      if (image) {
        formData.append("image", image);
      }

      // CALL API UPDATE
      const response = await PutCategory(formData, id);

      if (response.code === "success") {
        toast.success(
          "Cập nhật danh mục thành công!"
        );
      } else {
        console.log(response);
        toast.error(
          "Cập nhật danh mục thất bại!"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Cập nhật danh mục thất bại!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen lg:p-8">
      <div className="mx-auto max-w-3xl">
        {/* HEADER */}
        <div
          className="
    mb-8 flex flex-col gap-4
    sm:flex-row sm:items-center
    sm:justify-between
  "
        >
          <div>
            <h1 className="text-3xl font-black text-slate-800 lg:text-4xl">
              Chỉnh sửa danh mục
            </h1>

            <p className="mt-2 text-slate-500">
              Cập nhật thông tin danh mục
            </p>
          </div>

          {/* BACK BUTTON */}
          <Link
            href="/admin/categories/list"
            className="
      btn h-11 rounded-2xl
      border-slate-200 bg-white
      px-5 text-slate-700
      shadow-sm transition-all duration-300
      hover:scale-[1.02]
      hover:bg-slate-100
      hover:shadow-md
    "
          >
            <ArrowLeft size={18} />
            Quay lại tranh danh sách
          </Link>
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
                  flex cursor-pointer flex-col
                  items-center justify-center gap-3
                  rounded-3xl border-2
                  border-dashed border-slate-300
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
                  Nhấn để thay đổi ảnh
                </p>
              </label>

              {/* PREVIEW */}
              <div className="mt-4 overflow-hidden rounded-2xl">
                <img
                  src={preview || noImage}
                  alt="preview"
                  onError={(e) => {
                    e.currentTarget.src = noImage;
                  }}
                  className="
                    h-52 w-full object-cover
                    transition duration-300
                    hover:scale-105
                  "
                />
              </div>
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
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <option value="active">
                  Hoạt động
                </option>

                <option value="inactive">
                  Ngưng hoạt động
                </option>
              </select>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                btn mt-2 h-12 rounded-2xl
                border-0 bg-gradient-to-r
                from-indigo-600 to-violet-600
                text-white shadow-lg
                transition-all duration-300
                hover:scale-[1.01]
                hover:from-indigo-700
                hover:to-violet-700
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <Save size={18} />

              {loading
                ? "Đang cập nhật..."
                : "Cập nhật danh mục"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}