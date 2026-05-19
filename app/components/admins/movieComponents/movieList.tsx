"use client";

import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { MobileCategoryList } from "../categoryComponents/mobileCategoryList";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { MovieListPc } from "./moviePcList";
import { GetMovie } from "@/app/api/admin/movieApi";
import { MobileMovieList } from "./movieMobile";

export default function MovieList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [duration, setDuration] = useState("");
  const [imdbRating, setimdbRating] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const handleChangeDuration = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(e.target.value);
    setPage(1);
  };

  const handleChangeimdbRating = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setimdbRating(e.target.value);
    setPage(1);
  };


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const data = await GetMovie(page, status, search, duration, imdbRating);

        setItems(data.data);
        setTotalPage(data.totalPage)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [search, status, page, duration, imdbRating]);

  return (
    <div className="min-h-screen bg-gradient-to-br p-3 sm:p-4 lg:p-6 bg-white rounded-2xl shadow-lg">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800 sm:text-4xl lg:text-5xl">
              Danh sách phim
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base lg:text-lg">
              Quản lý toàn bộ phim trong hệ thống
            </p>
          </div>

          <Link
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
            href={"/admin/movies/create"}
          >
            <Plus size={20} />
            Tạo mới phim
          </Link>
        </div>

        {/* FILTER */}
        <div
          className="
            mb-6 rounded-3xl border border-slate-100
            bg-white p-4 shadow-lg
            sm:p-5 lg:mb-8 lg:p-6
          "
        >
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
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
                placeholder="Tìm kiếm phim..."
                className="grow text-sm sm:text-base"
                onChange={handleChange}
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
              value={status}
              onChange={handleChangeStatus}
            >
              <option value={""}>Tất cả trạng thái</option>
              <option value={"active"}>Hoạt động</option>
              <option value={"inactive"}>Ngưng hoạt động</option>
            </select>

            {/* Duration */}
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
              value={duration}
              onChange={handleChangeDuration}
            >
              <option value={""}>Sắp xếp thời gian phim</option>
              <option value={"desc"}>Sắp xếp theo thời gian giảm dần</option>
              <option value={"asc"}>Sắp xếp theo thời gian tăng dần</option>
            </select>

            {/* imdbRating */}
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
              value={imdbRating}
              onChange={handleChangeimdbRating}
            >
              <option value={""}>Sắp xếp theo đánh giá</option>
              <option value={"desc"}>Đánh giá cao đến thấp</option>
              <option value={"asc"}>Đánh giá thấp đến cao</option>
            </select>
          </div>
        </div>

        {/* MOBILE CARD */}
        <MobileMovieList items={items} />

        {/* DESKTOP TABLE */}
        <MovieListPc items={items} />

        {/* FOOTER */}
        <div
          className="
            mt-6 flex flex-col gap-4
            rounded-3xl
            p-4
            sm:flex-row sm:items-center sm:justify-between
            lg:mt-8
          "
        >
          <p className="text-center text-sm text-slate-500 sm:text-left">
            Hiển thị 1 đến 10 trong tổng số 50 danh mục
          </p>

          {/* PAGINATION */}
          <div className="join mx-auto sm:mx-0">
            {/* PREV */}
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="
      join-item btn rounded-l-2xl
      border-slate-200 bg-white
      transition-all duration-300
      hover:bg-slate-100
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
            >
              <ChevronLeft size={18} />
            </button>

            {/* PAGE */}
            {Array.from({ length: totalPage }, (_, index) => {
              const pageNumber = index + 1;

              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`
          join-item btn border-slate-200
          ${page === pageNumber
                      ? "bg-violet-600 text-white hover:bg-violet-700"
                      : "bg-white hover:bg-slate-100"
                    }
        `}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* NEXT */}
            <button
              disabled={page === totalPage}
              onClick={() => setPage(page + 1)}
              className="
      join-item btn rounded-r-2xl
      border-slate-200 bg-white
      transition-all duration-300
      hover:bg-slate-100
      disabled:cursor-not-allowed
      disabled:opacity-50
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