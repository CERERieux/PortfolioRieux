import { Link } from "react-router-dom";
import AddMessage from "../Icons/AddMessage";
import LinkUrl from "../Icons/LinkUrl";
import UserIcon from "../Icons/UserIcon";
import ControlIcon from "../Icons/ControlIcon";
import PencilCode from "../Icons/PencilCode";
import LoginIcon from "../Icons/LoginIcon";
import LogoutIcon from "../Icons/LogoutIcon";
import Button from "../SystemDesign/Button";
import ArrowRight from "../Icons/ArrowRight";
import RedirectButton from "../SystemDesign/RedirectButton";
import HomeIcon from "../Icons/HomeIcon";
import { useLanguage } from "../../hooks/useLanguage";

interface MainMenuProps {
  username: string;
  handleLogoff: () => void;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}
export default function MainMenu({
  username,
  handleLogoff,
  setMenu,
}: MainMenuProps) {
  const titles = useLanguage({ project: "MainMenuTitles" });
  return (
    <>
      <RedirectButton
        colorCover="hover:bg-sky-200 hover:border-sky-600"
        toRedirect="/home"
      >
        <HomeIcon size="32" /> {titles[0]}
      </RedirectButton>
      {username !== "" && (
        <Button
          color="hover:border-slate-700 hover:shadow-md hover:shadow-black/20 hover:bg-slate-50"
          extraStyles="flex items-center justify-between gap-4 text-center text-lg hover:text-black py-2"
          textHover={false}
          onClick={() => {
            setMenu("Profile");
          }}
        >
          <span className="flex items-center justify-center gap-4">
            <UserIcon size="32" /> {titles[1]}
          </span>
          <ArrowRight size="28" />
        </Button>
      )}
      <RedirectButton
        colorCover="hover:bg-yellow-100 hover:border-yellow-400"
        toRedirect="/shortener-url"
      >
        <LinkUrl size="32" /> {titles[2]}
      </RedirectButton>
      <Button
        color="hover:bg-purple-100 hover:border-purple-400 hover:shadow-md hover:shadow-black/20 "
        extraStyles="flex items-center justify-between gap-4 text-center text-lg hover:text-black py-2"
        textHover={false}
        onClick={() => {
          setMenu("Games");
        }}
      >
        <span className="flex items-center justify-center gap-4">
          <ControlIcon size="32" /> {titles[3]}
        </span>
        <ArrowRight size="28" />
      </Button>
      <Button
        color="hover:bg-lime-100 hover:border-lime-400 hover:shadow-md hover:shadow-black/20 "
        extraStyles="flex items-center justify-between gap-4 text-center text-lg hover:text-black py-2"
        textHover={false}
        onClick={() => {
          setMenu("Demos");
        }}
      >
        <span className="flex items-center justify-center gap-4">
          <PencilCode size="32" /> {titles[4]}
        </span>
        <ArrowRight size="28" />
      </Button>
      <RedirectButton
        colorCover="hover:bg-orange-100 hover:border-orange-400"
        toRedirect="/issues-and-suggestions"
      >
        <AddMessage size="32" /> {titles[5]}
      </RedirectButton>
      {username === "" ? (
        <Link
          to="/login"
          className="flex w-1/2 items-center justify-center gap-4"
        >
          <Button
            color="hover:bg-sky-100 hover:border-sky-400 hover:shadow-md hover:shadow-black/20 "
            extraStyles="flex items-center gap-4 text-center text-lg hover:text-black py-2"
            textHover={false}
            xSize="w-full"
          >
            <LoginIcon size="32" /> {titles[6]}
          </Button>
        </Link>
      ) : (
        <Button
          color="hover:bg-red-300 hover:border-red-500 hover:shadow-md hover:shadow-black/20 "
          extraStyles="flex items-center gap-4 text-center text-lg hover:text-black py-2"
          textHover={false}
          onClick={handleLogoff}
        >
          <LogoutIcon size="32" /> {titles[7]}
        </Button>
      )}
    </>
  );
}
