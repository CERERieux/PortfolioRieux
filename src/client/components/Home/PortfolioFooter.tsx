import { useLanguage } from "../../hooks/useLanguage";
import Anchor from "../SystemDesign/Anchor";
import DialogContactMe from "./DialogContactMe";

export default function PortfolioFooter() {
  const text = useLanguage({ project: "HomeMisc" });
  return (
    <footer className="flex w-full items-center justify-around rounded-t-xl bg-stone-900 px-6 py-2 text-xs">
      <p>
        {text[2]}
        <Anchor href="https://github.com/CERERieux">{text[3]}</Anchor>
      </p>
      <p>
        ({text[4]}
        <Anchor href="https://bg.ibelick.com/">Ibelick</Anchor>)
      </p>
      <section className="flex items-center justify-center gap-2">
        <a
          href="#PortfolioProjectList"
          className="flex w-20 justify-center rounded-xl px-2 py-1 transition-all hover:bg-sky-500 hover:text-white"
        >
          {text[5]}
        </a>
        <a
          href="#AboutMe"
          className="flex w-20 justify-center rounded-xl px-2 py-1 transition-all hover:bg-sky-500 hover:text-white"
        >
          {text[6]}
        </a>
        <button
          className="flex w-20 justify-center rounded-xl px-2 py-1 transition-all hover:bg-sky-500 hover:text-white"
          id="OpenDialogFooterContactMe"
        >
          {text[7]}
        </button>
      </section>
      <DialogContactMe idOpen="OpenDialogFooterContactMe" />
    </footer>
  );
}
