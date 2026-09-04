import * as React from "react";

export type StatusType =
  | "APPROVED"
  | "COMPLETED"
  | "SAFE"
  | "PENDING"
  | "APPROACHING_ROP"
  | "REORDER"
  | "CRITICAL"
  | "REJECTED"
  | "CANCELLED"
  | "DRAFT";

interface BadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

export function StatusBadge({ status, label, className = "" }: BadgeProps) {
  const getBadgeStyle = (status: StatusType) => {
    switch (status) {
      case "APPROVED":
      case "COMPLETED":
      case "SAFE":
        return {
          bg: "bg-[#EDF7F0]",
          text: "text-[#3F8F5F]",
          dot: "bg-[#3F8F5F]",
          defaultLabel: status,
        };
      case "PENDING":
      case "APPROACHING_ROP":
        return {
          bg: "bg-[#FFF7E8]",
          text: "text-[#C58A28]",
          dot: "bg-[#C58A28]",
          defaultLabel: status === "APPROACHING_ROP" ? "APPROACHING ROP" : status,
        };
      case "REORDER":
      case "CRITICAL":
      case "REJECTED":
      case "CANCELLED":
        return {
          bg: "bg-[#FCEEEE]",
          text: "text-[#C94A4A]",
          dot: "bg-[#C94A4A]",
          defaultLabel: status,
        };
      case "DRAFT":
      default:
        return {
          bg: "bg-[#F1F4F1]",
          text: "text-[#5F6961]",
          dot: "bg-[#5F6961]",
          defaultLabel: status,
        };
    }
  };

  const style = getBadgeStyle(status);
  const displayText = label || style.defaultLabel;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${style.bg} ${style.text} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {displayText}
    </span>
  );
}
