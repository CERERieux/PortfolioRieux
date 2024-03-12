import { Link } from "react-router-dom";
import MenuHam from "../Icons/MenuHam";
import Return from "../Icons/Return";
import ActionButton from "../SystemDesign/ActionButton";
import { useCloseNavButton } from "../SystemDesign/CloseNavButton";
import Menu from "../Menu/Menu";

interface NavMenuProps {
  positionNav?: string;
  flexCol?: boolean;
  order?: string;
  colorText?: string;
}

export default function NavMenu({
  positionNav = "top-0 right-0",
  flexCol = false,
  order = "-order-2",
  colorText = "text-black",
}: NavMenuProps) {
  const { handleOpacity, opacity } = useCloseNavButton(); // Hook to handle the opacity of the menu section

  let positionReturn = {
    position: "top-4 right-14",
    tooltip: "-left-1 -bottom-5",
  };
  let positionMenu = {
    position: "top-4 right-4",
    tooltip: "left-0 -bottom-5",
  };
  if (flexCol) {
    positionReturn = {
      position: "top-4 right-4",
      tooltip: "-left-10 bottom-2",
    };
    positionMenu = {
      position: "top-14 right-4",
      tooltip: "-left-10 bottom-2",
    };
  }
  return (
    <>
      <nav
        className={`${positionNav} ${order} ${colorText} flex items-center justify-center gap-2 md:absolute`}
      >
        <Link to="/my-profile">
          <ActionButton
            coverColor="bg-lime-300 shadow-slate-200"
            hoverColor="hover:bg-sky-400 hover:shadow-sky-400/30 hover:text-white"
            groupName={["group/delete", "group-hover/delete:block"]}
            position={positionReturn.position}
            tooltipText="Profile"
            tooltipPos={positionReturn.tooltip}
          >
            <Return />
          </ActionButton>
        </Link>
        <ActionButton
          coverColor="bg-slate-200 shadow-slate-200"
          hoverColor="hover:bg-slate-700 hover:shadow-slate-400/30 hover:text-white"
          groupName={["group/delete", "group-hover/delete:block"]}
          position={positionMenu.position}
          tooltipText="Menu"
          tooltipPos={positionMenu.tooltip}
          onClick={handleOpacity}
          disabled={opacity.includes("opacity-100")}
        >
          <MenuHam />
        </ActionButton>
      </nav>
      <Menu opacity={opacity} handleOpacity={handleOpacity} />
    </>
  );
}
