"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Topbar } from "./topbar";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (route: string) => {
    router.push(route);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAF8]">
      {/* Desktop Sidebar (Fixed 240px) */}
      <div className="hidden lg:block sticky top-0 h-screen">
        <Sidebar activeRoute={pathname} onNavigate={handleNavigate} />
      </div>

      {/* Mobile Drawer Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-[260px] bg-white h-full shadow-2xl flex flex-col z-10">
            <div className="p-4 flex justify-end border-b border-[#E8ECE8]">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-[6px] text-[#5F6961] hover:bg-[#F1F4F1]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar activeRoute={pathname} onNavigate={handleNavigate} />
          </div>
        </div>
      )}

      {/* Main Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
