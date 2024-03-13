import { useState } from "react";

interface CloseNavButtonProps {
  handleOpacity: () => void;
  position?: string;
  bgColor?: string;
}
export function useCloseNavButton() {
  const [opacity, setOpacity] = useState("opacity-0 -z-10");

  const handleOpacity = () => {
    if (opacity.includes("opacity-0")) {
      setOpacity("opacity-100 z-30");
    } else setOpacity("opacity-0 -z-10");
  };
  return { opacity, handleOpacity };
}

export function CloseNavButton({
  handleOpacity,
  position = "left-4 top-4",
  bgColor = "bg-slate-50",
}: CloseNavButtonProps) {
  return (
    <button
      className={`hover absolute ${position} rounded-full ${bgColor} px-3 py-1 text-black transition-all hover:scale-110 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/40 active:scale-90 active:bg-slate-900 active:shadow-none`}
      onClick={handleOpacity}
    >
      X
    </button>
  );
}
