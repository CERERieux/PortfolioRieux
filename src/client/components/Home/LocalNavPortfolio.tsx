import { useLanguage } from "../../hooks/useLanguage";
import { useSettingStore } from "../../store/settingPortfolio";
import DialogContactMe from "./DialogContactMe";

export default function LocalNavPortfolio() {
  const { i18n, changeLanguage } = useSettingStore();
  const text = useLanguage({ project: "HomeMisc" });
  return (
    <>
      <nav className="sticky top-4 z-30 mx-auto flex items-center justify-center *:bg-slate-700/20 *:text-xs *:backdrop-blur-sm">
        <a
          href="#PortfolioProjectList"
          className="flex w-20 justify-center rounded-l-xl border border-black px-2 py-1 transition-all hover:bg-sky-500 hover:text-white"
        >
          {text[5]}
        </a>
        <a
          href="#AboutMe"
          className="flex w-20 justify-center border border-x-0 border-black px-2 py-1 transition-all hover:bg-sky-500 hover:text-white"
        >
          {text[6]}
        </a>
        <button
          className="flex w-20 justify-center border border-r-0 border-black px-2 py-1 transition-all hover:bg-sky-500 hover:text-white"
          id="OpenDialogContactPortfolio"
        >
          {text[7]}
        </button>
        <button
          className="flex w-20 justify-center rounded-r-xl border border-r-0 border-black px-2 py-1 transition-all hover:bg-sky-500 hover:text-white"
          onClick={changeLanguage}
        >
          {i18n === "English" ? "A Español" : "To English"}
        </button>
      </nav>
      <DialogContactMe idOpen="OpenDialogContactPortfolio" />
    </>
  );
}
