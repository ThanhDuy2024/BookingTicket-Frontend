/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { CategoryListPc } from "./categoryComponents/pcCategoryList";
import { MobileCategoryList } from "./categoryComponents/mobileCategoryList";
import { useEffect } from "react";
import { useState } from "react";
import { GetCategory } from "@/app/api/admin/categoryApi";

const categories = [
  {
    id: 1,
    name: "Phim hành động",
    image: "https://picsum.photos/100/100?1",
    status: true,
    updatedBy: "Nguyễn Văn A",
    updatedAt: "15/05/2026 10:30",
  },
  {
    id: 2,
    name: "Phim kinh dị",
    image: "https://picsum.photos/100/100?2",
    status: false,
    updatedBy: "Trần Văn B",
    updatedAt: "14/05/2026 14:20",
  },
  {
    id: 3,
    name: "Phim hoạt hình",
    image: "https://picsum.photos/100/100?3",
    status: true,
    updatedBy: "Lê Văn C",
    updatedAt: "13/05/2026 09:15",
  },
  {
    id: 4,
    name: "Phim tình cảm",
    image: "https://picsum.photos/100/100?4",
    status: true,
    updatedBy: "Phạm Văn D",
    updatedAt: "12/05/2026 08:00",
  },
];

export default function CategoryListPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const data = await GetCategory();

        console.log(data);

        setCategories(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br p-3 sm:p-4 lg:p-6 bg-white rounded-2xl shadow-lg">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800 sm:text-4xl lg:text-5xl">
              Danh sách danh mục
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base lg:text-lg">
              Quản lý toàn bộ danh mục trong hệ thống
            </p>
          </div>

          <button
            className="
              btn h-12 w-full rounded-2xl border-0
              bg-gradient-to-r from-indigo-600 to-violet-600
              px-6 text-sm font-semibold text-white
              shadow-[0_8px_25px_rgba(79,70,229,0.35)]
              transition-all duration-300
              hover:scale-[1.02]
              hover:shadow-[0_12px_35px_rgba(79,70,229,0.45)]
              sm:h-14 sm:w-auto sm:text-base
            "
          >
            <Plus size={20} />
            Tạo mới danh mục
          </button>
        </div>

        {/* FILTER */}
        <div
          className="
            mb-6 rounded-3xl border border-slate-100
            bg-white p-4 shadow-lg
            sm:p-5 lg:mb-8 lg:p-6
          "
        >
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            {/* SEARCH */}
            <label
              className="
                input input-bordered flex h-12 items-center gap-3
                rounded-2xl border-slate-200
                bg-slate-50 px-4
                transition-all duration-300
                focus-within:border-violet-400
                focus-within:bg-white
                focus-within:shadow-lg
                sm:h-14
              "
            >
              <Search size={20} className="text-slate-400" />

              <input
                type="text"
                placeholder="Tìm kiếm danh mục..."
                className="grow text-sm sm:text-base"
              />
            </label>

            {/* STATUS */}
            <select
              className="
                select select-bordered h-12 rounded-2xl
                border-slate-200 bg-slate-50
                text-sm
                transition-all duration-300
                focus:border-violet-400
                focus:bg-white
                focus:shadow-lg
                sm:h-14 sm:text-base
              "
            >
              <option>Tất cả trạng thái</option>
              <option>Hoạt động</option>
              <option>Ngưng hoạt động</option>
            </select>

            {/* REFRESH */}
            <button
              className="
                btn h-12 rounded-2xl border-slate-200
                bg-white text-sm text-slate-700
                transition-all duration-300
                hover:scale-[1.02]
                hover:bg-slate-100
                hover:shadow-md
                sm:h-14 sm:text-base
              "
            >
              <RotateCcw size={18} />
              Làm mới
            </button>
          </div>
        </div>

        {/* MOBILE CARD */}
        <MobileCategoryList categories={categories}/>

        {/* DESKTOP TABLE */}
        <CategoryListPc categories={categories}/>

        {/* FOOTER */}
        <div
          className="
            mt-6 flex flex-col gap-4
            rounded-3xl border border-slate-100
            bg-white p-4 shadow-lg
            sm:flex-row sm:items-center sm:justify-between
            lg:mt-8
          "
        >
          <p className="text-center text-sm text-slate-500 sm:text-left">
            Hiển thị 1 đến 10 trong tổng số 50 danh mục
          </p>

          {/* PAGINATION */}
          <div className="join mx-auto sm:mx-0">
            <button
              className="
                join-item btn rounded-l-2xl
                border-slate-200 bg-white
                transition-all duration-300
                hover:bg-slate-100
              "
            >
              <ChevronLeft size={18} />
            </button>

            <button
              className="
                join-item btn border-slate-200
                bg-violet-600 text-white
                hover:bg-violet-700
              "
            >
              1
            </button>

            <button
              className="
                join-item btn border-slate-200
                bg-white hover:bg-slate-100
              "
            >
              2
            </button>

            <button
              className="
                join-item btn border-slate-200
                bg-white hover:bg-slate-100
              "
            >
              3
            </button>

            <button
              className="
                join-item btn rounded-r-2xl
                border-slate-200 bg-white
                transition-all duration-300
                hover:bg-slate-100
              "
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}