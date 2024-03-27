import Anchor from "../SystemDesign/Anchor";
import DialogContactMe from "./DialogContactMe";

export default function PortfolioFooter() {
  return (
    <footer className="flex w-full items-center justify-around rounded-t-xl bg-stone-900 px-6 py-2 text-xs">
      <p>
        Portfolio made by Erik{" "}
        <Anchor href="https://github.com/CERERieux">
          (CERERieux on GitHub!)
        </Anchor>
      </p>
      <p>
        (Background made by{" "}
        <Anchor href="https://bg.ibelick.com/">Ibelick</Anchor>)
      </p>
      <section className="flex items-center justify-center gap-2">
        <a
          href="#PortfolioProjectList"
          className="flex w-20 justify-center rounded-xl px-2 py-1 transition-all hover:bg-sky-500 hover:text-white"
        >
          Projects
        </a>
        <a
          href="#AboutMe"
          className="flex w-20 justify-center rounded-xl px-2 py-1 transition-all hover:bg-sky-500 hover:text-white"
        >
          About Me
        </a>
        <button
          className="flex w-20 justify-center rounded-xl px-2 py-1 transition-all hover:bg-sky-500 hover:text-white"
          id="OpenDialogFooterContactMe"
        >
          Contact
        </button>
      </section>
      <DialogContactMe idOpen="OpenDialogFooterContactMe" />
    </footer>
  );
}
