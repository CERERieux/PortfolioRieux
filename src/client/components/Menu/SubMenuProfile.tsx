import AddMessage from "../Icons/AddMessage";
import LinkUrl from "../Icons/LinkUrl";
import Note from "../Icons/Note";
import SubMenu from "../Icons/SubMenu";
import Book from "../Icons/Book";
import Button from "../SystemDesign/Button";
import ArrowRight from "../Icons/ArrowRight";
import RedirectButton from "../SystemDesign/RedirectButton";
import { useLanguage } from "../../hooks/useLanguage";

interface SubMenuProfileProps {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  title: string;
}

export default function SubMenuProfile({
  setMenu,
  title,
}: SubMenuProfileProps) {
  const text = useLanguage({ project: "ProfileMenuTitles" });
  const handleMenu = () => {
    setMenu("MainMenu");
  };
  return (
    <>
      <h2 className="text-2xl text-black first-letter:text-3xl sm:pt-20 dark:text-slate-200">
        {title}
      </h2>
      <RedirectButton
        colorCover="hover:bg-purple-100 hover:border-purple-400"
        toRedirect="/my-profile"
      >
        <SubMenu size="32" /> {text[0]}
      </RedirectButton>

      <RedirectButton
        colorCover="hover:bg-lime-100 hover:border-lime-400"
        toRedirect="/my-profile/library"
      >
        <Book size="32" /> {text[1]}
      </RedirectButton>

      <RedirectButton
        colorCover="hover:bg-sky-100 hover:border-sky-400"
        toRedirect="/my-profile/notes"
      >
        <Note size="32" /> {text[2]}
      </RedirectButton>

      <RedirectButton
        colorCover="hover:bg-yellow-100 hover:border-yellow-400"
        toRedirect="/my-profile/urls"
      >
        <LinkUrl size="32" /> {text[3]}
      </RedirectButton>

      <RedirectButton
        colorCover="hover:bg-orange-100 hover:border-orange-400"
        toRedirect="/my-profile/issues"
      >
        <AddMessage size="32" /> {text[4]}
      </RedirectButton>

      <Button
        color="hover:bg-slate-100 hover:border-slate-400 hover:shadow-md hover:shadow-black/20 "
        extraStyles="flex items-center gap-4 text-start text-lg hover:text-black py-2"
        textHover={false}
        onClick={handleMenu}
      >
        <ArrowRight styles="rotate-180" size="32" /> {text[5]}
      </Button>
    </>
  );
}
