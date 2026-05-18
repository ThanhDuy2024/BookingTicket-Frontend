/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"
import { Pencil, Trash2, CalendarDays } from "lucide-react"
import Link from "next/link"
export const MovieListPc = ({
  items,
}: any) => {
  return (
    <div
      className="
            hidden overflow-hidden rounded-3xl
            border border-slate-100
            bg-white
            shadow-lg
            lg:block
          "
    >
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="border-b border-slate-100 text-center">
              <th className="bg-white py-6 text-sm font-bold uppercase tracking-wider text-slate-500">
                Tên phim
              </th>

              <th className="bg-white py-6 text-sm font-bold uppercase tracking-wider text-slate-500">
                Hình ảnh
              </th>

              <th className="bg-white py-6 text-sm font-bold uppercase tracking-wider text-slate-500">
                Đánh giá
              </th>

              <th className="bg-white py-6 text-sm font-bold uppercase tracking-wider text-slate-500">
                Trạng thái
              </th>

              <th className="bg-white py-6 text-sm font-bold uppercase tracking-wider text-slate-500">
                Người cập nhật
              </th>

              <th className="bg-white py-6 text-center text-sm font-bold uppercase tracking-wider text-slate-500">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((item: any) => (
              <tr
                key={item.id}
                className="
                      border-b border-slate-100
                      text-center
                      transition-all duration-300
                      hover:bg-slate-50
                    "
              >
                {/* NAME */}
                <td>
                  <div className="font-semibold text-slate-800">
                    {item.name}
                  </div>
                </td>

                {/* IMAGE */}
                <td>
                  <div
                    className="
                          relative mx-auto h-16 w-16 overflow-hidden
                          rounded-2xl
                          shadow-[0_6px_20px_rgba(0,0,0,0.15)]
                        "
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                            h-full w-full object-cover
                            transition duration-300
                            hover:scale-110
                          "
                    />
                  </div>
                </td>

                {/* IMDb RATING */}
                <td>
                  <div
                    className="
      inline-flex items-center gap-1.5
      rounded-full bg-amber-100
      px-2.5 py-1 text-xs font-medium
      text-amber-700
    "
                  >
                    <span className="text-[11px]">⭐</span>
                    {item.imdbRating}
                  </div>
                </td>

                {/* STATUS */}
                <td>
                  {item.status === "active" ? (
                    <div
                      className="
        inline-flex items-center gap-1.5
        rounded-full bg-emerald-100
        px-2.5 py-1 text-xs font-medium
        text-emerald-700
      "
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Hoạt động
                    </div>
                  ) : (
                    <div
                      className="
        inline-flex items-center gap-1.5
        rounded-full bg-red-100
        px-2.5 py-1 text-xs font-medium
        text-red-600
      "
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                      Tạm dừng
                    </div>
                  )}
                </td>

                {/* UPDATED BY */}
                <td className="font-bold text-slate-700">
                  {item.creator.name}
                </td>

                {/* ACTION */}
                <td>
                  <div className="flex justify-center gap-3">
                    {/* Lên lịch */}
                    <button
                      className="
        btn btn-sm h-11 w-11 rounded-xl border-0
        bg-blue-100 text-blue-600
        shadow-[0_4px_12px_rgba(59,130,246,0.2)]
        transition-all duration-300
        hover:scale-105
        hover:bg-blue-200
      "
                      title="Lên lịch"
                    >
                      <CalendarDays size={18} />
                    </button>

                    {/* Chỉnh sửa */}
                    <Link
                      className="
        btn btn-sm h-11 w-11 rounded-xl border-0
        bg-amber-100 text-amber-600
        shadow-[0_4px_12px_rgba(251,191,36,0.25)]
        transition-all duration-300
        hover:scale-105
        hover:bg-amber-200
      "
                      href={`/admin/movies/edit/${item.id}`}
                      title="Chỉnh sửa"
                    >
                      <Pencil size={18} />
                    </Link>

                    {/* Xóa */}
                    <button
                      className="
        btn btn-sm h-11 w-11 rounded-xl border-0
        bg-red-100 text-red-600
        shadow-[0_4px_12px_rgba(239,68,68,0.2)]
        transition-all duration-300
        hover:scale-105
        hover:bg-red-200
      "
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}