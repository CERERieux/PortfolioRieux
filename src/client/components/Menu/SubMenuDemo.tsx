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

interface SubMenuDemoProps {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}

export default function SubMenuDemo({ setMenu }: SubMenuDemoProps) {
  const handleMenu = () => {
    setMenu("MainMenu");
  };
  return (
    <>
      <RedirectButton
        colorCover="hover:bg-purple-100 hover:border-purple-400"
        toRedirect="/demo"
        needPad={false}
      >
        <SubMenu size="32" /> Projects Menu
      </RedirectButton>

      <RedirectButton
        colorCover="hover:bg-orange-100 hover:border-orange-400"
        toRedirect="/demo/pomodoro"
        needPad={false}
      >
        <ClockIcon size="32" /> Pomodoro Clock
      </RedirectButton>

      <RedirectButton
        colorCover="hover:bg-white hover:border-slate-500"
        toRedirect="/demo/translate-eng"
        needPad={false}
      >
        <World size="32" /> UK-USA Translator
      </RedirectButton>

      <RedirectButton
        colorCover="hover:bg-yellow-100 hover:border-yellow-400"
        toRedirect="/demo/markdown"
        needPad={false}
      >
        <MarkdownIcon size="32" /> Markdown
      </RedirectButton>

      <RedirectButton
        colorCover="hover:bg-sky-100 hover:border-sky-400"
        toRedirect="/demo/calculator"
        needPad={false}
      >
        <CalculatorIcon size="32" /> Calculator
      </RedirectButton>

      <RedirectButton
        colorCover="hover:bg-[#c4ba9f] hover:border-[#5e4f25]"
        toRedirect="/demo/converter"
        needPad={false}
      >
        <Transform size="32" /> Unit Converter
      </RedirectButton>

      <RedirectButton
        colorCover="hover:bg-red-100 hover:border-red-400"
        toRedirect="/demo/drum-machine"
        needPad={false}
      >
        <DialPad size="32" /> Drum Machine
      </RedirectButton>

      <RedirectButton
        colorCover="hover:bg-lime-100 hover:border-lime-400"
        toRedirect="/demo/quote"
        needPad={false}
      >
        <Quote size="32" /> Quote Machine
      </RedirectButton>

      <Button
        color="hover:bg-slate-800 hover:border-slate-900 hover:shadow-md hover:shadow-black/20 "
        extraStyles="flex items-center gap-4 text-center text-lg"
        textHover={false}
        onClick={handleMenu}
      >
        <ArrowRight styles="rotate-180" size="32" /> Back
      </Button>
    </>
  );
}
