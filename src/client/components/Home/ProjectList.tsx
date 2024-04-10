import { Link } from "react-router-dom";
import SingleProjectCarrousel from "./SingleProjectCarrousel";
import SingleProject from "./SingleProject";
import ScriptIcon from "../Icons/ScriptIcon";
import TypeScript from "../Icons/TypeScript";
import Tailwind from "../Icons/Tailwind";
import ReactIcon from "../Icons/ReactIcon";
import Express from "../Icons/Express";
import MongoDB from "../Icons/MongoDB";
import ReactQuery from "../Icons/ReactQuery";
import ReactRouter from "../Icons/ReactRouter";
import { useLanguage } from "../../hooks/useLanguage";

const IMG_CODE_DANDELION = [
  "ProfilePreview.webp",
  "LibraryPreview.webp",
  "NotesPreview.webp",
  "LinkUserPreview.webp",
  "IssuesUserPreview.webp",
];

const IMG_ALT_CODE_DANDELION = [
  "Image of your profile on Code Dandelion, includes a menu to navigate through all sections of your account.",
  "Image of your library, where you can add new books to it with the buttons at the top.",
  "Image of your space for notes, where you can use it as a ToDo book.",
  "Image of a table that contains all your short links created through my service.",
  "Image that shows how your issues and suggestions looks like on Code Dandelion.",
];

const IMG_DEMO_PROJECTS = [
  "DemosPreview.webp",
  "PomodoroPreview.webp",
  "TranslatorPreview.webp",
  "MarkdownPreview.webp",
  "CalculatorPreview.webp",
];

const IMG_ALT_DEMO_PROJECTS = [
  "Image of the menu of all the project demos",
  "Image of a Pomodoro Clock in a desktop display",
  "Preview of UK-USA translator, a bit similar in appearance to Google translator",
  "Preview of a Markdown Parser",
  "Preview of a calculator",
];

export default function ProjectList() {
  const text = useLanguage({ project: "Home" });
  return (
    <>
      <h2
        className="object-to-observe titleObserve flex items-center gap-2 self-center text-3xl text-amber-200 transition-all duration-500 lg:self-start lg:pl-20"
        id="PortfolioProjectList"
      >
        <ScriptIcon size="32" styles="text-purple-200" />
        {text[2]}
      </h2>
      <SingleProjectCarrousel
        images={IMG_CODE_DANDELION}
        imgAltText={IMG_ALT_CODE_DANDELION}
        titleArticle="Code Dandelion"
        titleWindow="Code Dandelion"
        toRedirect="/login"
        list="titleObserve"
      >
        <TypeScript size="40" />
        <Tailwind width="40" height="24" />
        <ReactIcon width="40" height="36" />
        <Express size="40" isblackBG />
        <MongoDB height="40" width="20" />
        <ReactQuery height="40" width="36" />
        <ReactRouter height="30" width="40" />
        <p className="whitespace-pre-wrap text-pretty pl-4 text-sm">
          {text[3]}
          <span className="italic text-lime-100">{text[4]}</span>
        </p>
      </SingleProjectCarrousel>
      <SingleProject
        imgPreview="ShortenerPreview.webp"
        imgAltText="Image of an app that makes short links from the user input."
        titleWindow={text[5]}
        toRedirect="/shortener-url"
        titleArticle={text[5]}
      >
        <TypeScript size="40" />
        <Tailwind width="40" height="24" />
        <ReactIcon width="40" height="36" />
        <Express size="40" isblackBG />
        <MongoDB height="40" width="20" />
        <p className="whitespace-pre-wrap text-pretty pl-4 text-sm">
          {text[6]}
        </p>
      </SingleProject>
      <SingleProject
        imgPreview="SudokuPreview.webp"
        imgAltText="Image of a sudoku game."
        titleWindow="Sudoku"
        toRedirect="/games/sudoku"
        titleArticle="Sudoku"
      >
        <TypeScript size="40" />
        <Tailwind width="40" height="24" />
        <ReactIcon width="40" height="36" />
        <Express size="40" isblackBG />
        <p className="whitespace-pre-wrap text-pretty pl-4 text-sm">
          {text[7]}
        </p>
      </SingleProject>
      <SingleProjectCarrousel
        images={IMG_DEMO_PROJECTS}
        imgAltText={IMG_ALT_DEMO_PROJECTS}
        titleArticle={text[8]}
        titleWindow={text[8]}
        toRedirect="/demo"
      >
        <TypeScript size="40" />
        <Tailwind width="40" height="24" />
        <ReactIcon width="40" height="36" />
        <Express size="40" isblackBG />
        <p className="whitespace-pre-wrap text-pretty pl-4 text-sm">
          {text[9]}
        </p>
      </SingleProjectCarrousel>
      <p className="object-to-observe aboutMeObserve mt-4 self-center whitespace-pre-wrap text-pretty pl-4 text-sm text-yellow-200 transition-all duration-500">
        {text[10]}
        <span className="text-sky-300 underline">
          <Link to="/issues-and-suggestions">{text[11]}</Link>
        </span>
        {text[12]}
      </p>
    </>
  );
}
