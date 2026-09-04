"use client";

import React from "react";
import { Search, Bell, Menu, User, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

interface TopbarProps {
  onToggleMobileMenu?: () => void;
}

export function Topbar({ onToggleMobileMenu }: TopbarProps) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-[#DDE3DE] px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20">
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-[8px] text-[#5F6961] hover:bg-[#F1F4F1] hover:text-[#172019]"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#879088] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari bahan baku, PO, supplier..."
            className="w-full h-9 pl-9 pr-4 text-xs sm:text-sm bg-[#F1F4F1] border-none rounded-[8px] text-[#172019] placeholder-[#879088] focus:outline-none focus:ring-2 focus:ring-[#4F7C59]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 text-[#5F6961] hover:bg-[#F1F4F1] rounded-[8px] transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C94A4A]"></span>
        </button>

        <div className="h-6 w-[1px] bg-[#E8ECE8]"></div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#CBDDCE] flex items-center justify-center text-[#35533B] font-bold text-xs">
            {user?.name ? user.name.substring(0, 2).toUpperCase() : "US"}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-[#172019] leading-tight">
              {user?.name || "User Admin"}
            </p>
            <p className="text-[11px] text-[#5F6961]">{user?.role || "MANAGER"}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 text-[#879088] hover:text-[#C94A4A] rounded-[6px] hover:bg-[#FCEEEE] transition-colors ml-1"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
