/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect, useCallback } from "react";
import { X, Menu, ChevronLeft } from "lucide-react";
import Sidebar from "../../../components/admins/sidebarComponent";
import { Toaster } from "sonner";
import { Be_Vietnam_Pro } from "next/font/google";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    if (sidebarOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [sidebarOpen, isMobile]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`${beVietnam.className} min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-emerald-50 relative overflow-hidden`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-slate-100/[0.15] bg-[size:100px_100px] animate-pulse" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {sidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Cinema Admin
              </h1>
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          isMobile={isMobile}
          onClose={closeSidebar}
        />

        {/* Overlay */}
        {sidebarOpen && isMobile && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto lg:ml-0 transition-all duration-300">
          {/* Content Padding */}
          <div className={`min-h-screen p-6 lg:p-8 ${isMobile ? 'pt-20' : 'pt-0'}`}>
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Toaster */}
      <Toaster
        position="top-right"
        richColors
        expand={true}
        closeButton
        toastOptions={{
          classNames: {
            toast: "backdrop-blur-xl bg-white/95 border border-slate-200 shadow-2xl rounded-2xl",
            description: "text-slate-700",
            actionButton: "btn btn-sm !bg-gradient-to-r !from-emerald-500 !to-teal-600 hover:!from-emerald-600 hover:!to-teal-700",
            closeButton: "hover:!bg-slate-100"
          }
        }}
      />
    </div>
  );
}