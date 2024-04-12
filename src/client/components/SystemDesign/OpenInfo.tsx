import { useSettingStore } from "../../store/settingPortfolio";
import InfoIcon from "../Icons/InfoIcon";
import ActionButton from "./ActionButton";
import Button from "./Button";
import Dialog from "./Dialog";

interface OpenInfoProps {
  children: React.ReactNode;
  idOpen: string;
  idClose: string;
  idDialog: string;
  posScreen?: string;
}

export default function OpenInfo({
  children,
  idClose,
  idDialog,
  idOpen,
  posScreen = "top-1/3 -right-12",
}: OpenInfoProps) {
  const { i18n } = useSettingStore();
  const closeWord = i18n === "English" ? "Close" : "Cerrar";
  const moreInfo = i18n === "English" ? "More Info" : "Más  Info";
  return (
    <>
      <ActionButton
        coverColor="bg-slate-200 shadow-slate-100"
        hoverColor="hover:bg-blue-400 hover:shadow-blue-400/30 hover:text-white"
        groupName={["group/delete", "group-hover/delete:block"]}
        position={posScreen}
        tooltipText={moreInfo}
        tooltipPos="-left-4 -bottom-5 -right-4"
        id={idOpen}
      >
        <InfoIcon />
      </ActionButton>
      <Dialog
        idClose={idClose}
        idDialog={idDialog}
        idOpen={idOpen}
        colorBg="skyBlack"
      >
        <article className="flex h-full w-full flex-col items-center gap-4">
          {children}
          <Button
            color="bg-sky-200 border-sky-500 hover:bg-sky-700 hover:border-sky-300 shadow-md shadow-sky-700 hover:shadow-sm active:bg-slate-600 active:border-slate-50 active:shadow-none"
            xSize="w-40"
            id={idClose}
          >
            {closeWord}
          </Button>
        </article>
      </Dialog>
    </>
  );
}
