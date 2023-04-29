"use client";

import { useMediaQuery } from "react-responsive";

export function useDevice() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1512px)",
  }); // 1512~
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px) and (max-width: 1511px)",
  }); // 1024~1511
  const isMobile = useMediaQuery({ query: "(max-width: 1023px)" }); // ~1023

  if (isMobile) return "mobile";
  else if (isLaptop) return "laptop";
  else return "desktop";
}
