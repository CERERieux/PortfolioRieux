import Button from "../SystemDesign/Button";
import ArrowRight from "../Icons/ArrowRight";
import TableAll from "../Icons/TableAll";
import RedirectButton from "../SystemDesign/RedirectButton";
import { useLanguage } from "../../hooks/useLanguage";

interface SubMenuGameProps {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  title: string;
}

export default function SubMenuGame({ setMenu, title }: SubMenuGameProps) {
  const titles = useLanguage({ project: "GameMenuTitles" });
  const handleMenu = () => {
    setMenu("MainMenu");
  };
  return (
    <>
      <h2 className="text-2xl text-black first-letter:text-3xl sm:pt-20 dark:text-slate-200">
        {title}
      </h2>
      <RedirectButton
        colorCover="hover:bg-lime-100 hover:border-lime-400"
        toRedirect="/games/sudoku"
      >
        <TableAll size="32" /> {titles[0]}
      </RedirectButton>

      <Button
        color="hover:bg-slate-100 hover:border-slate-400 hover:shadow-md hover:shadow-black/20 "
        extraStyles="flex items-center gap-4 text-start text-lg hover:text-black"
        textHover={false}
        onClick={handleMenu}
      >
        <ArrowRight styles="rotate-180" size="32" /> {titles[1]}
      </Button>
    </>
  );
}
