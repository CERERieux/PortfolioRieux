import DialogContactMe from "./DialogContactMe";

export default function LocalNavPortfolio() {
  return (
    <>
      <nav className="sticky top-4 z-30 mx-auto flex items-center justify-center *:bg-slate-700/20 *:text-xs *:backdrop-blur-sm">
        <a
          href="#PortfolioProjectList"
          className="flex w-20 justify-center rounded-l-xl border border-black px-2 py-1 transition-all hover:bg-sky-500 hover:text-white"
        >
          Projects
        </a>
        <a
          href="#AboutMe"
          className="flex w-20 justify-center border border-x-0 border-black px-2 py-1 transition-all hover:bg-sky-500 hover:text-white"
        >
          About Me
        </a>
        <button
          className="flex w-20 justify-center rounded-r-xl border border-r-0 border-black px-2 py-1 transition-all hover:bg-sky-500 hover:text-white"
          id="OpenDialogContactPortfolio"
        >
          Contact
        </button>
      </nav>
      <DialogContactMe idOpen="OpenDialogContactPortfolio" />
    </>
  );
}
