import { useCloseNavButton } from "./CloseNavButton";
import ActionButton from "../SystemDesign/ActionButton";
import MenuHam from "../Icons/MenuHam";
import Menu from "../Menu/Menu";

interface NavMenuProps {
  positionNav?: string;
  textCol?: boolean;
  order?: string;
  colorText?: string;
}

export default function NavMenu({
  positionNav = "top-0 right-0",
  textCol = false,
  order = "-order-2",
  colorText = "text-black",
}: NavMenuProps) {
  const { handleOpacity, opacity } = useCloseNavButton(); // Hook to handle the opacity of the menu section

  let positionMenu = {
    position: "top-4 right-4",
    tooltip: "left-0 -bottom-5",
  };
  if (textCol) {
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
