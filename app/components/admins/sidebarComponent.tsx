/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Film,
  Users,
  MapPin,
  Settings,
  User,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
    matchPattern: /^\/admin\/dashboard$/,
  },

  {
    id: "movies",
    label: "Quản lý phim",
    icon: Film,
    href: "/admin/movies",
    matchPattern: /^\/admin\/movies/,
  },

  {
    id: "categories",
    label: "Danh mục",
    icon: Film,
    href: "/admin/categories/list",
    matchPattern: /^\/admin\/categories/,
  },

  {
    id: "theaters",
    label: "Rạp chiếu",
    icon: MapPin,
    href: "/admin/theaters",
    matchPattern: /^\/admin\/theaters/,
  },

  {
    id: "users",
    label: "Người dùng",
    icon: Users,
    href: "/admin/users",
    matchPattern: /^\/admin\/users/,
  },

  {
    id: "settings",
    label: "Cài đặt",
    icon: Settings,
    href: "/admin/settings",
    matchPattern: /^\/admin\/settings/,
  },
];

export default function Sidebar({
  isOpen,
  isMobile,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLinkClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  const isMenuActive = (item: (typeof menuItems)[0]) => {
    return item.matchPattern?.test(pathname || "");
  };

  if (!mounted) return null;

  return (
    <aside
      className={`
        fixed left-0 top-0 z-50 h-screen w-72
        border-r border-slate-200
        bg-white
        transition-all duration-300

        ${isOpen ? "translate-x-0" : "-translate-x-full"}

        lg:static lg:translate-x-0
      `}
    >
      <div className="flex h-full flex-col">
        {/* HEADER */}
        <div className="border-b border-slate-100 p-6">
          {/* CLOSE BUTTON MOBILE */}
          {isMobile && (
            <button
              onClick={onClose}
              className="
                mb-4 rounded-xl p-2
                text-slate-500
                transition
                hover:bg-slate-100
              "
            >
              <X className="h-5 w-5" />
            </button>
          )}

          {/* LOGO */}
          <div className="flex items-center gap-4">
            <div
              className="
                flex h-12 w-12 items-center justify-center
                rounded-2xl
                bg-violet-600
                text-white
              "
            >
              <Film className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-800">
                Cinema Admin
              </h1>

              <p className="text-sm text-slate-500">
                Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive = isMenuActive(item);

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleLinkClick}
                className={`
                  flex items-center gap-4
                  rounded-2xl px-4 py-3
                  text-sm font-medium
                  transition-all duration-200

                  ${
                    isActive
                      ? `
                        bg-violet-100
                        text-violet-700
                      `
                      : `
                        text-slate-600
                        hover:bg-slate-100
                        hover:text-slate-900
                      `
                  }
                `}
              >
                {/* ICON */}
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center
                    rounded-xl

                    ${
                      isActive
                        ? "bg-violet-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                </div>

                {/* LABEL */}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="border-t border-slate-100 p-4">
          {/* PROFILE */}
          <div
            className="
              mb-3 flex items-center gap-3
              rounded-2xl
              bg-slate-50
              p-3
            "
          >
            <div
              className="
                flex h-11 w-11 items-center justify-center
                rounded-xl
                bg-violet-600
                text-white
              "
            >
              <User className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-800">
                Admin
              </p>

              <p className="truncate text-sm text-slate-500">
                admin@cinema.vn
              </p>
            </div>
          </div>

          {/* LOGOUT */}
          <Link
            href="/admin/logout"
            onClick={handleLinkClick}
            className="
              flex items-center gap-4
              rounded-2xl
              px-4 py-3
              text-sm font-semibold
              text-red-600
              transition-all duration-200
              hover:bg-red-50
            "
          >
            <div
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl
                bg-red-100
              "
            >
              <LogOut className="h-5 w-5" />
            </div>

            <span>Đăng xuất</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}