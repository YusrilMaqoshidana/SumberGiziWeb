import React from "react";
import {
  LayoutDashboard,
  Package,
  ArrowLeftRight,
  Truck,
  ShoppingCart,
  Factory,
  Calculator,
  Sparkles,
  BarChart3,
  FileText,
  ShieldCheck,
  Settings,
} from "lucide-react";

interface SidebarProps {
  activeRoute?: string;
  onNavigate?: (route: string) => void;
}

export function Sidebar({ activeRoute = "/dashboard", onNavigate }: SidebarProps) {
  const menuGroups = [
    {
      groupLabel: null,
      items: [
        { label: "Dashboard", route: "/dashboard", icon: LayoutDashboard },
      ],
    },
    {
      groupLabel: "INVENTORY",
      items: [
        { label: "Inventory", route: "/inventory", icon: Package },
        { label: "Stock Transactions", route: "/inventory/transactions", icon: ArrowLeftRight },
      ],
    },
    {
      groupLabel: "SUPPLY CHAIN",
      items: [
        { label: "Suppliers", route: "/suppliers", icon: Truck },
        { label: "Purchasing", route: "/purchasing", icon: ShoppingCart },
        { label: "Production", route: "/production", icon: Factory },
      ],
    },
    {
      groupLabel: "INVENTORY CONTROL",
      items: [
        { label: "EOQ / ROP", route: "/inventory-control/eoq", icon: Calculator },
        { label: "Recommendations", route: "/inventory-control/recommendations", icon: Sparkles },
      ],
    },
    {
      groupLabel: "ANALYTICS",
      items: [
        { label: "Forecasting", route: "/analytics/forecasting", icon: BarChart3 },
        { label: "Supplier Performance", route: "/analytics/supplier-score", icon: ShieldCheck },
      ],
    },
    {
      groupLabel: "REPORTS",
      items: [
        { label: "Reports", route: "/reports", icon: FileText },
      ],
    },
  ];

  return (
    <aside className="w-[240px] bg-white border-r border-[#DDE3DE] h-screen flex flex-col flex-shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#E8ECE8] flex items-center gap-3">
        <div className="w-8 h-8 rounded-[8px] bg-[#4F7C59] flex items-center justify-center text-white font-bold text-lg">
          T
        </div>
        <div>
          <h1 className="font-bold text-[#172019] text-base leading-tight">Tahu SCM</h1>
          <span className="text-xs text-[#5F6961]">Sumber Gizi Intelligence</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            {group.groupLabel && (
              <div className="px-3 text-[11px] font-bold text-[#879088] uppercase tracking-wider mb-2">
                {group.groupLabel}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => onNavigate?.(item.route)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-[8px] text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#E5EEE6] text-[#4F7C59] font-semibold"
                      : "text-[#5F6961] hover:bg-[#F1F4F1] hover:text-[#172019]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#4F7C59]" : "text-[#879088]"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Profile */}
      <div className="p-3 border-t border-[#E8ECE8] bg-[#F8FAF8]">
        <div className="flex items-center gap-3 px-2 py-1.5">
          <div className="w-8 h-8 rounded-full bg-[#CBDDCE] flex items-center justify-center text-[#35533B] font-semibold text-xs">
            MP
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#172019] truncate">Manager Pabrik</p>
            <p className="text-[11px] text-[#5F6961] truncate">manager@sumbergizi.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
