import SubMenu from "../Icons/SubMenu";
import Button from "../SystemDesign/Button";
import ArrowRight from "../Icons/ArrowRight";
import Quote from "../Icons/Quote";
import CalculatorIcon from "../Icons/CalculatorIcon";
import MarkdownIcon from "../Icons/MarkdownIcon";
import DialPad from "../Icons/DialPad";
import ClockIcon from "../Icons/ClockIcon";
import Transform from "../Icons/Transform";
import World from "../Icons/World";
import RedirectButton from "../SystemDesign/RedirectButton";
import { useLanguage } from "../../hooks/useLanguage";
import { useSettingStore } from "../../store/settingPortfolio";

interface SubMenuDemoProps {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}

export default function SubMenuDemo({ setMenu }: SubMenuDemoProps) {
  const titles = useLanguage({ project: "DemoMenuTitles" });
  const { i18n } = useSettingStore();
  const title = i18n === "English" ? "Main Menu" : "Menu Principal";
  const handleMenu = () => {
    setMenu("MainMenu");
  };
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-4 overflow-y-auto bg-blue-600 max-[389px]:pt-[230px] max-[340px]:pt-[220px] sm:pt-4">
      <h2 className="text-2xl text-black first-letter:text-3xl dark:text-slate-200">
        {title}
      </h2>
      <RedirectButton
        colorCover="hover:bg-purple-100 hover:border-purple-400"
        toRedirect="/demo"
        needPad={false}
      >
        <SubMenu size="32" /> {titles[0]}
      </RedirectButton>

      <RedirectButton
        colorCover="hover:bg-orange-100 hover:border-orange-400"
        toRedirect="/demo/pomodoro"
        needPad={false}
      >
        <ClockIcon size="32" /> {titles[1]}
      </RedirectButton>

      <RedirectButton
        colorCover="hover:bg-white hover:border-slate-500"
        toRedirect="/demo/translate-eng"
        needPad={false}
      >
        <World size="32" /> {titles[2]}
      </RedirectButton>

      <RedirectButton
        colorCover="hover:bg-yellow-100 hover:border-yellow-400"
        toRedirect="/demo/markdown"
        needPad={false}
      >
        <MarkdownIcon size="32" /> {titles[3]}
      </RedirectButton>

      <RedirectButton
        colorCover="hover:bg-sky-100 hover:border-sky-400"
        toRedirect="/demo/calculator"
        needPad={false}
      >
        <CalculatorIcon size="32" /> {titles[4]}
      </RedirectButton>

      <RedirectButton
        colorCover="hover:bg-[#c4ba9f] hover:border-[#5e4f25]"
        toRedirect="/demo/converter"
        needPad={false}
      >
        <Transform size="32" /> {titles[5]}
      </RedirectButton>

      <RedirectButton
        colorCover="hover:bg-red-100 hover:border-red-400"
        toRedirect="/demo/drum-machine"
        needPad={false}
      >
        <DialPad size="32" /> {titles[6]}
      </RedirectButton>

      <RedirectButton
        colorCover="hover:bg-lime-100 hover:border-lime-400"
        toRedirect="/demo/quote"
        needPad={false}
      >
        <Quote size="32" /> {titles[7]}
      </RedirectButton>

      <Button
        color="hover:bg-slate-100 hover:border-slate-400 hover:shadow-md hover:shadow-black/20 "
        extraStyles="flex items-center gap-4 text-center text-lg hover:text-black"
        textHover={false}
        onClick={handleMenu}
      >
        <ArrowRight styles="rotate-180" size="32" /> {titles[8]}
      </Button>
    </section>
  );
}
