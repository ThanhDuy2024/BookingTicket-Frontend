/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

export const MobileMovieList = ({
  items
}: any) => {
  return (
    <div className="space-y-4 lg:hidden">
      {items.map((item: any) => (
        <div
          key={item.id}
          className="
                rounded-3xl border border-slate-100
                bg-white p-4
                shadow-lg
              "
        >
          <div className="flex items-start gap-4">
            {/* IMAGE */}
            <div
              className="
                    h-20 w-20 overflow-hidden rounded-2xl
                    shadow-[0_6px_20px_rgba(0,0,0,0.15)]
                  "
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="flex-1">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.creator.name}
                  </p>
                </div>

                {item.status === "active" ? (
                  <div
                    className="
                          inline-flex items-center gap-2
                          rounded-full bg-emerald-100
                          px-3 py-1.5 text-xs font-semibold
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
                          px-3 py-1.5 text-xs font-semibold
                          text-red-600
                        "
                  >
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    Ngưng
                  </div>
                )}
              </div>

              <p className="text-sm text-slate-500">
                Cập nhật: {item.updatedFormat}
              </p>

              {/* ACTION */}
              <div className="mt-4 flex gap-3">
                <Link
                  className="
                        btn btn-sm flex-1 rounded-xl border-0
                        bg-amber-100 text-amber-600
                        shadow-[0_4px_12px_rgba(251,191,36,0.25)]
                        hover:bg-amber-200
                      "
                  href={`/admin/categories/edit/${item.id}`}
                >
                  <Pencil size={16} />
                  Sửa
                </Link>

                <button
                  className="
                        btn btn-sm flex-1 rounded-xl border-0
                        bg-red-100 text-red-600
                        shadow-[0_4px_12px_rgba(239,68,68,0.2)]
                        hover:bg-red-200
                      "
                >
                  <Trash2 size={16} />
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}