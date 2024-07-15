import { useSettingStore } from "../../store/settingPortfolio";
import Moon from "../Icons/Moon";
import Sun from "../Icons/Sun";

export default function DarkLightButton() {
  const { lightDark, setLightDark } = useSettingStore();
  const bgColor =
    lightDark === "dark"
      ? "bg-yellow-100 text-black hover:shadow-yellow-500/40 active:bg-sky-200"
      : "bg-gray-700 text-white hover:shadow-gray-500/40 active:bg-purple-600";
  return (
    <button
      className={`hover absolute right-6 top-4 rounded-full sm:right-8 sm:top-4 ${bgColor} px-3 py-1 transition-all hover:scale-110 hover:shadow-lg active:scale-90 active:shadow-none`}
      onClick={setLightDark}
    >
      {lightDark === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}
