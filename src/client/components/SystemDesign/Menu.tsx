import { Link, useNavigate } from "react-router-dom";
import AddMessage from "../Icons/AddMessage";
import ControlIcon from "../Icons/ControlIcon";
import LinkUrl from "../Icons/LinkUrl";
import LoginIcon from "../Icons/LoginIcon";
import PencilCode from "../Icons/PencilCode";
import UserIcon from "../Icons/UserIcon";
import { CloseNavButton } from "./CloseNavButton";
import Details from "./Details";
import Summary from "./Summary";
import { useUser } from "../../store/user";
import LogoutIcon from "../Icons/LogoutIcon";
import SubMenu from "../Icons/SubMenu";
import SubButtonDetails from "./SubButtonDetails";

interface MenuProps {
  opacity: string;
  handleOpacity: () => void;
}

export default function Menu({ opacity, handleOpacity }: MenuProps) {
  const { username, logoffUser } = useUser();
  const navigate = useNavigate();
  const hoverColorLog =
    username === ""
      ? "hover:bg-sky-100 hover:border-sky-400"
      : "hover:bg-red-300 hover:border-red-500";

  const handleLogoff = () => {
    logoffUser();
    navigate("/home");
  };

  return (
    <section
      className={`absolute right-0 top-0 h-full w-full bg-gradient-to-b from-slate-100/80 to-slate-950/80 text-white backdrop-blur-sm md:w-3/5 lg:w-1/2 ${opacity} flex flex-col items-center justify-center gap-4 shadow-xl shadow-black/40 transition-all duration-500 ease-in-out`}
    >
      <h2 className="text-2xl text-black first-letter:text-3xl">Main Menu</h2>
      {username !== "" && (
        <Details extraStyles="group/MyProfile">
          <Summary>
            <UserIcon size="32" /> Your Profile
          </Summary>
          <SubButtonDetails
            colorGroup="group-hover/MyProfile:bg-purple-100 group-hover/MyProfile:border-purple-400"
            buttonColor="hover:bg-purple-600 hover:border-purple-100"
          >
            <SubMenu /> Menu
          </SubButtonDetails>
          {/* <Link
            to="/my-profile"
            className="my-2 flex w-full justify-center pl-4"
          >
            <Button
              color="group-hover/MyProfile:bg-purple-100 group-hover/MyProfile:border-purple-400"
              xSize="w-3/4"
              extraStyles="flex gap-4 items-center"
            >
              <SubMenu /> Menu
            </Button>
          </Link> */}
          <p>dfdhfd</p>
          <p>dfdhfd</p>
        </Details>
      )}
      <Details bgCoverColor="hover:bg-yellow-100 hover:border-yellow-400">
        <Summary canOpen={false}>
          <Link
            to={"/shortener-url"}
            className="flex w-full items-center gap-4"
          >
            <LinkUrl size="32" /> Shortener URL
          </Link>
        </Summary>
      </Details>
      <Details bgCoverColor="hover:bg-purple-100 hover:border-purple-400">
        <Summary>
          <ControlIcon size="32" /> Game
        </Summary>
        <p>dfdhfd</p>
        <p>dfdhfd</p>
        <p>dfdhfd</p>
      </Details>
      <Details bgCoverColor="hover:bg-lime-100 hover:border-lime-400">
        <Summary>
          <PencilCode size="32" /> Demo Projects
        </Summary>
        <p>dfdhfd</p>
        <p>dfdhfd</p>
        <p>dfdhfd</p>
      </Details>
      <Details bgCoverColor="hover:bg-orange-100 hover:border-orange-400">
        <Summary canOpen={false}>
          <Link
            to={"/issues-and-suggestions"}
            className="flex w-full items-center gap-4"
          >
            <AddMessage size="32" /> Issues & Suggestion
          </Link>
        </Summary>
      </Details>
      <Details bgCoverColor={hoverColorLog}>
        <Summary canOpen={false} needPad={username === ""}>
          {username === "" ? (
            <Link to={"/login"} className="flex w-full items-center gap-4">
              <LoginIcon size="32" /> Login
            </Link>
          ) : (
            <button
              className="flex h-full w-full items-center gap-4 py-2 pl-2"
              onClick={handleLogoff}
            >
              <LogoutIcon size="32" /> Log Out
            </button>
          )}
        </Summary>
      </Details>
      <CloseNavButton handleOpacity={handleOpacity} bgColor="bg-white" />
    </section>
  );
}
