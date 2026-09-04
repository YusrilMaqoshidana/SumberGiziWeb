export const DESIGN_TOKENS = {
  colors: {
    primary: {
      50: "#F3F7F3",
      100: "#E5EEE6",
      200: "#CBDDCE",
      300: "#A8C2AB",
      400: "#759D7C",
      500: "#4F7C59", // Main primary action
      600: "#416749",
      700: "#35533B",
      800: "#293F2E",
      900: "#1F3023",
    },
    neutral: {
      bg: "#F8FAF8",
      surface: "#FFFFFF",
      surfaceAlt: "#F1F4F1",
      textPrimary: "#172019",
      textSecondary: "#5F6961",
      textMuted: "#879088",
      border: "#DDE3DE",
      divider: "#E8ECE8",
    },
    semantic: {
      success: "#3F8F5F",
      successBg: "#EDF7F0",
      warning: "#C58A28",
      warningBg: "#FFF7E8",
      danger: "#C94A4A",
      dangerBg: "#FCEEEE",
      info: "#3978A8",
      infoBg: "#EEF6FC",
    },
  },
  borderRadius: {
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    pill: "999px",
  },
  spacing: {
    smallGap: "8px",
    componentGap: "16px",
    cardPaddingMobile: "20px",
    cardPaddingDesktop: "24px",
    sectionGap: "32px",
    pagePaddingMobile: "16px",
    pagePaddingDesktop: "24px",
    sidebarWidth: "240px",
  },
};

export type StockStatusLevel = "SAFE" | "APPROACHING_ROP" | "REORDER" | "CRITICAL";

export function getStockStatusConfig(status: StockStatusLevel) {
  switch (status) {
    case "SAFE":
      return {
        label: "🟢 SAFE",
        bg: "bg-[#EDF7F0]",
        text: "text-[#3F8F5F]",
        border: "border-[#3F8F5F]/20",
      };
    case "APPROACHING_ROP":
      return {
        label: "🟡 APPROACHING ROP",
        bg: "bg-[#FFF7E8]",
        text: "text-[#C58A28]",
        border: "border-[#C58A28]/20",
      };
    case "REORDER":
      return {
        label: "🟠 REORDER",
        bg: "bg-[#FFF7E8]",
        text: "text-[#C58A28]",
        border: "border-[#C58A28]/30",
      };
    case "CRITICAL":
      return {
        label: "🔴 CRITICAL",
        bg: "bg-[#FCEEEE]",
        text: "text-[#C94A4A]",
        border: "border-[#C94A4A]/20",
      };
  }
}
