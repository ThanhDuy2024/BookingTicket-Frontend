/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
export const CategoryListPc = ({
  categories,
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
                Tên danh mục
              </th>

              <th className="bg-white py-6 text-sm font-bold uppercase tracking-wider text-slate-500">
                Hình ảnh
              </th>

              <th className="bg-white py-6 text-sm font-bold uppercase tracking-wider text-slate-500">
                Trạng thái
              </th>

              <th className="bg-white py-6 text-sm font-bold uppercase tracking-wider text-slate-500">
                Người cập nhật
              </th>

              <th className="bg-white py-6 text-sm font-bold uppercase tracking-wider text-slate-500">
                Cập nhật lần cuối
              </th>

              <th className="bg-white py-6 text-center text-sm font-bold uppercase tracking-wider text-slate-500">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category: any) => (
              <tr
                key={category.id}
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
                    {category.name}
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
                      src={category.image}
                      alt={category.name}
                      className="
                            h-full w-full object-cover
                            transition duration-300
                            hover:scale-110
                          "
                    />
                  </div>
                </td>

                {/* STATUS */}
                <td>
                  {category.status === "active" ? (
                    <div
                      className="
                            inline-flex items-center gap-2
                            rounded-full bg-emerald-100
                            px-4 py-2 text-sm font-semibold
                            text-emerald-700
                          "
                    >
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      Hoạt động
                    </div>
                  ) : (
                    <div
                      className="
                            inline-flex items-center gap-2
                            rounded-full bg-red-100
                            px-4 py-2 text-sm font-semibold
                            text-red-600
                          "
                    >
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      Ngưng hoạt động
                    </div>
                  )}
                </td>

                {/* UPDATED BY */}
                <td className="font-bold text-slate-700">
                  {category.updatedByAdmin.name}
                </td>

                {/* UPDATED AT */}
                <td className="text-slate-500">
                  {category.updatedFormat}
                </td>

                {/* ACTION */}
                <td>
                  <div className="flex justify-center gap-3">
                    <Link
                      className="
                            btn btn-sm h-11 w-11 rounded-xl border-0
                            bg-amber-100 text-amber-600
                            shadow-[0_4px_12px_rgba(251,191,36,0.25)]
                            transition-all duration-300
                            hover:scale-105
                            hover:bg-amber-200
                          "
                      href={`/admin/categories/edit/${category.id}`}
                    >
                      <Pencil size={18} />
                    </Link>

                    <button
                      className="
                            btn btn-sm h-11 w-11 rounded-xl border-0
                            bg-red-100 text-red-600
                            shadow-[0_4px_12px_rgba(239,68,68,0.2)]
                            transition-all duration-300
                            hover:scale-105
                            hover:bg-red-200
                          "
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