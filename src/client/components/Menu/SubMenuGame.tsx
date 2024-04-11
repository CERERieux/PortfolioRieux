import Button from "../SystemDesign/Button";
import ArrowRight from "../Icons/ArrowRight";
import TableAll from "../Icons/TableAll";
import RedirectButton from "../SystemDesign/RedirectButton";
import { useLanguage } from "../../hooks/useLanguage";

interface SubMenuGameProps {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}

export default function SubMenuGame({ setMenu }: SubMenuGameProps) {
  const titles = useLanguage({ project: "GameMenuTitles" });
  const handleMenu = () => {
    setMenu("MainMenu");
  };
  return (
    <>
      <RedirectButton
        colorCover="hover:bg-lime-100 hover:border-lime-400"
        toRedirect="/games/sudoku"
      >
        <TableAll size="32" /> {titles[0]}
      </RedirectButton>

      <Button
        color="hover:bg-slate-100 hover:border-slate-400 hover:shadow-md hover:shadow-black/20 "
        extraStyles="flex items-center gap-4 text-center text-lg hover:text-black"
        textHover={false}
        onClick={handleMenu}
      >
        <ArrowRight styles="rotate-180" size="32" /> {titles[1]}
      </Button>
    </>
  );
}
