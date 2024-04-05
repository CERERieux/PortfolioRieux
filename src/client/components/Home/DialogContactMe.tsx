import LinkedInIcon from "../Icons/LinkedInIcon";
import Mail from "../Icons/Mail";
import Button from "../SystemDesign/Button";
import Dialog from "../SystemDesign/Dialog";
import Pill from "./Pill";

interface DialogContactMeProps {
  idOpen: string;
}

export default function DialogContactMe({ idOpen }: DialogContactMeProps) {
  return (
    <Dialog
      colorBg="amberWhite"
      idClose="CloseDialogContactPortfolio"
      idDialog="DialogContactPortfolio"
      idOpen={idOpen}
    >
      <section className="flex flex-col items-center justify-center gap-4">
        <h4 className="text-xl text-red-500">Contact me!</h4>
        <p className="text-pretty">
          You can contact me through my LinkedIn, GitHub or email! <br /> You
          can find those at the top of the home page or you can click the
          following buttons:
        </p>
        <div className="flex w-full flex-wrap items-center justify-center gap-6">
          <Pill to="https://www.linkedin.com/in/erik-r-b36447184/">
            <LinkedInIcon size="20" fill="currentColor" /> LinkedIn
          </Pill>
          <Pill to="mailto:ecerikrodriguez@outlook.com">
            <Mail size="20" styles="text-black" /> ecerikrodriguez@outlook.com
          </Pill>
        </div>
        <p className="text-pretty text-center text-xs">
          I prefer this way than doing a personalized form. <br />I think it can
          be easier to contact me and for me to know that someone is trying to
          reach out to me. <br />
          I&apos;ll contact you back as soon as I can! And thanks for check out
          my portfolio.
        </p>
        <Button
          color="bg-yellow-200 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-300 shadow-md shadow-yellow-700 hover:shadow-sm active:bg-slate-600 active:border-slate-50 active:shadow-none"
          xSize="w-40"
          id="CloseDialogContactPortfolio"
        >
          Close
        </Button>
      </section>
    </Dialog>
  );
}
