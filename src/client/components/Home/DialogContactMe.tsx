import { useLanguage } from "../../hooks/useLanguage";
import LinkedInIcon from "../Icons/LinkedInIcon";
import Mail from "../Icons/Mail";
import Button from "../SystemDesign/Button";
import Dialog from "../SystemDesign/Dialog";
import Pill from "./Pill";

interface DialogContactMeProps {
  idOpen: string;
}

export default function DialogContactMe({ idOpen }: DialogContactMeProps) {
  const text = useLanguage({ project: "HomeMisc" });
  return (
    <Dialog
      colorBg="amberWhite"
      idClose="CloseDialogContactPortfolio"
      idDialog="DialogContactPortfolio"
      idOpen={idOpen}
    >
      <section className="flex flex-col items-center justify-center gap-4">
        <h4 className="text-xl text-red-500">{text[8]}</h4>
        <p className="whitespace-pre-wrap text-pretty">{text[9]}</p>
        <div className="flex w-full flex-wrap items-center justify-center gap-6">
          <Pill
            to="https://www.linkedin.com/in/erik-r-b36447184/"
            extraStyles="hover:bg-slate-900 hover:text-white"
          >
            <LinkedInIcon size="20" fill="currentColor" /> LinkedIn
          </Pill>
          <Pill
            to="mailto:ecerikrodriguez@outlook.com"
            extraStyles="hover:bg-slate-900 hover:text-white group"
          >
            <Mail
              size="20"
              styles="text-black group-hover:text-white group-active:text-black"
            />{" "}
            ecerikrodriguez@outlook.com
          </Pill>
        </div>
        <p className="whitespace-pre-wrap text-pretty text-center text-xs">
          {text[10]}
        </p>
        <Button
          color="bg-yellow-200 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-300 shadow-md shadow-yellow-700 hover:shadow-sm active:bg-slate-600 active:border-slate-50 active:shadow-none"
          xSize="w-40"
          id="CloseDialogContactPortfolio"
        >
          {text[11]}
        </Button>
      </section>
    </Dialog>
  );
}
