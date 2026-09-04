"use client";

import { useState, useEffect } from "react";

export function useResponsive() {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setDevice("desktop");
      } else if (width >= 768) {
        setDevice("tablet");
      } else {
        setDevice("mobile");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    device,
    isDesktop: device === "desktop",
    isTablet: device === "tablet",
    isMobile: device === "mobile",
  };
}
