/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect, useCallback } from "react";
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
  ChevronDown,
  X,
  ChevronRight 
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
    matchPattern: /^\/admin\/dashboard$/
  },
  { 
    id: "movies", 
    label: "Quản lý phim", 
    icon: Film,
    href: "/admin/movies",
    matchPattern: /^\/admin\/movies/
  },
  { 
    id: "categories", 
    label: "Danh mục", 
    icon: () => (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    href: "/admin/categories",
    matchPattern: /^\/admin\/categories/
  },
  { 
    id: "theaters", 
    label: "Rạp chiếu", 
    icon: MapPin,
    href: "/admin/theaters",
    matchPattern: /^\/admin\/theaters/
  },
  { 
    id: "users", 
    label: "Người dùng", 
    icon: Users,
    href: "/admin/users",
    matchPattern: /^\/admin\/users/
  },
  { 
    id: "settings", 
    label: "Cài đặt", 
    icon: Settings,
    href: "/admin/settings",
    matchPattern: /^\/admin\/settings/
  }
];

export default function Sidebar({ isOpen, isMobile, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Auto-open submenu dựa trên current route
  useEffect(() => {
    const activeMenu = menuItems.find(item => item.matchPattern?.test(pathname));
    if (activeMenu) {
      setOpenSubmenu(null); // Reset để chỉ mở menu chính
    }
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSubmenu = useCallback((id: string) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
  }, [openSubmenu]);

  const handleLinkClick = useCallback(() => {
    if (isMobile) {
      onClose();
    }
  }, [isMobile, onClose]);

  // Kiểm tra menu có active không
  const isMenuActive = (item: typeof menuItems[0]) => {
    return item.matchPattern?.test(pathname || '') || false;
  };

  if (!mounted) return null;

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-80 bg-white/90 backdrop-blur-xl border-r border-slate-200/50 shadow-2xl
      transform transition-all duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 lg:static lg:inset-0
    `}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200/50">
          {isMobile && (
            <button
              onClick={onClose}
              className="mb-4 p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-all duration-200 hover:scale-105"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl ring-2 ring-white/30">
              <Film className="h-7 w-7 text-white drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                Cinema Admin
              </h1>
              <p className="text-sm text-slate-500 mt-1">Dashboard Pro</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isMenuActive(item);
            
            return (
              <Link
                key={item.id}
                href={item.href || '#'}
                onClick={handleLinkClick}
                className={`
                  group flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 border border-transparent
                  hover:border-slate-200 hover:bg-slate-50/50 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]
                  ${isActive 
                    ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 !border-emerald-200/50 text-emerald-700 shadow-lg shadow-emerald-200/50 ring-2 ring-emerald-200/50' 
                    : 'text-slate-700 hover:text-slate-900'
                  }
                `}
              >
                {/* Icon Container */}
                <div className={`
                  h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0
                  ${isActive 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-300/50 text-white ring-1 ring-white/50' 
                    : 'bg-slate-100/50 group-hover:bg-slate-200 text-slate-600 group-hover:text-slate-800'
                  }
                `}>
                  <Icon className="h-5 w-5" />
                </div>

                {/* Label */}
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-[16px] block truncate">{item.label}</span>
                  {isActive && (
                    <div className="h-1.5 w-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-1 animate-pulse shadow-md" />
                  )}
                </div>

                {/* Active Badge */}
                {isActive && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold shadow-md ring-1 ring-emerald-200/50">
                    <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
                    Hoạt động
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Profile & Logout */}
        <div className="p-6 border-t border-slate-200/50 space-y-4 mt-auto">
          <div 
            className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            onClick={handleLinkClick}
          >
            <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl ring-2 ring-white/30">
              <User className="h-6 w-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-slate-900 truncate">Admin Super</p>
              <p className="text-sm text-slate-500 truncate">admin@cinema.vn</p>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </div>

          <Link
            href="/admin/logout"
            onClick={handleLinkClick}
            className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-rose-500/10 to-red-500/10 border border-rose-200/50 hover:from-rose-500/20 hover:to-red-500/20 hover:border-rose-300/50 text-rose-700 hover:text-rose-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] font-semibold"
          >
            <div className="h-10 w-10 bg-gradient-to-r from-rose-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg text-white">
              <LogOut className="h-5 w-5" />
            </div>
            <span>Đăng xuất</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}