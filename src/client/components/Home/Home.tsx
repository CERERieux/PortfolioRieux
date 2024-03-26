import { useEffect, useState } from "react";
import SimpleNavMenu from "../Menu/SimpleNavMenu";
import FooterAttribution from "../SystemDesign/FooterAttribution";
import Pill from "./Pill";
import LinkedInIcon from "../Icons/LinkedInIcon";
import GithubIcon from "../Icons/GithubIcon";
import Mail from "../Icons/Mail";
import ScriptIcon from "../Icons/ScriptIcon";
import TypeScript from "../Icons/TypeScript";
import Tailwind from "../Icons/Tailwind";
import ReactIcon from "../Icons/ReactIcon";
import Express from "../Icons/Express";
import MongoDB from "../Icons/MongoDB";
import ReactQuery from "../Icons/ReactQuery";
import ReactRouter from "../Icons/ReactRouter";
import SingleProjectCarrousel from "./SingleProjectCarrousel";
import SingleProject from "./SingleProject";
import { Link } from "react-router-dom";
import UserIcon from "../Icons/UserIcon";

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
  "Preview of UK-USA translator, a bit similar in appareance to Google translator",
  "Preview of a Markdown Parser",
  "Preview of a calculator",
];

export default function Home() {
  const [opacityHeader, setOpacityHeader] = useState(
    "opacity-0 -translate-x-32",
  );

  useEffect(() => {
    document.title =
      "Erik's Portfolio - Jr. Full Stack Developer and Programmer";
    setTimeout(() => {
      setOpacityHeader("opacity-100 translate-x-0");
    }, 100);
  }, []);

  return (
    <div className="relative h-full w-full">
      <div className="absolute top-0 h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <SimpleNavMenu positionNav="top-0 right-4 z-10" />
        <FooterAttribution
          placeRef="Ibelick"
          urlRef="https://bg.ibelick.com/"
          whatIs="Background made by "
          mx="md:mx-auto z-10"
        />
        <div className="relative flex h-full w-full flex-col items-center gap-20 overflow-y-auto text-slate-200">
          <header
            className={`relative mt-10 flex w-full flex-col items-center justify-center gap-4 px-4 py-2 md:mt-20 md:flex-row md:flex-wrap ${opacityHeader} transition-all duration-1000 ease-out`}
          >
            <div className="mx-2 mt-2 flex h-32 w-32 items-center justify-center">
              <img
                src={`/type-img-2.webp`}
                alt="A photo from the creator of this portfolio"
                className="max-h-full max-w-full rounded-full"
              />
            </div>
            <section className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-balance text-center text-4xl">
                Welcome, I&apos;m Erik Rodriguez!
              </h1>
              <p className="text-balance text-center text-xl">
                <span className="text-purple-200">
                  Jr. Full Stack Developer.
                </span>{" "}
                <span className="text-lime-200">From Mexico, Mexico City.</span>
              </p>
              <div className="flex w-2/3 flex-wrap items-center justify-center gap-6">
                <Pill to="https://www.linkedin.com/in/erik-r-b36447184/">
                  <LinkedInIcon size="20" fill="currentColor" /> LinkedIn
                </Pill>
                <Pill to="https://github.com/CERERieux">
                  <GithubIcon width="20" height="20" /> GitHub
                </Pill>
                <Pill to="mailto:ecerikrodriguez@outlook.com">
                  <Mail size="20" styles="text-white" />{" "}
                  ecerikrodriguez@outlook.com
                </Pill>
              </div>
            </section>
          </header>
          <main className="mb-8 mt-20 flex w-full flex-col items-start justify-center gap-4 px-8">
            <h2 className="flex items-center gap-2 self-center text-3xl text-amber-200 lg:self-start lg:pl-20">
              <ScriptIcon size="32" styles="text-purple-200" />
              Projects
            </h2>
            <SingleProjectCarrousel
              images={IMG_CODE_DANDELION}
              imgAltText={IMG_ALT_CODE_DANDELION}
              titleArticle="Code Dandelion"
              titleWindow="Code Dandelion"
              toRedirect="/login"
            >
              <TypeScript size="40" />
              <Tailwind width="40" height="24" />
              <ReactIcon width="40" height="36" />
              <Express size="40" isblackBG />
              <MongoDB height="40" width="20" />
              <ReactQuery height="40" width="36" />
              <ReactRouter height="30" width="40" />
              <p className="text-pretty pl-4 text-sm">
                This project gives you a small space where you can share a bit
                about yourself to other people! <br /> I could say it&apos;s
                like a demo for a simple system where users can review books (or
                anything) that they have read. When you visit a profile, you can
                see what books this user have in their library and their bio (if
                they have share anything). <br /> As user, aside from your
                library, you can have your personal notes, look the short links
                you have created through my Shortener URL and check the issues
                or suggestions that you have made in a personal space. <br />
                <span className="italic text-lime-100">
                  (You need to create an account, but you only need an username
                  and a password, no email or that kind of data!)
                </span>
              </p>
            </SingleProjectCarrousel>
            <SingleProject
              imgPreview="ShortenerPreview.webp"
              imgAltText="Image of an app that makes short links from the user input."
              titleWindow="Shortener URL"
              toRedirect="/shortener-url"
              titleArticle="Shortener URL"
            >
              <TypeScript size="40" />
              <Tailwind width="40" height="24" />
              <ReactIcon width="40" height="36" />
              <Express size="40" isblackBG />
              <MongoDB height="40" width="20" />
              <p className="text-pretty pl-4 text-sm">
                This project let you create short links! <br />
                You enter your long link and I will give you an 8 character
                string. <br />
                If you have an account and you are logged in, your short link
                will be saved into your account, you do not have to worry about
                it if you forget.
                <br /> <br /> You can find more info in the page.
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
              <p className="text-pretty pl-4 text-sm">
                A Sudoku game! <br />
                At the start, you get 1 random puzzle out of 7, the difficulty
                can vary, maybe you get an easy 1, maybe you get the hardest
                from the 7. Give it a try and test your luck and mind! <br />
                For more, you can press the button at the top. It contains more
                info about the game, like the rules. <br />
                <br />
                Good luck and have fun!
              </p>
            </SingleProject>
            <SingleProjectCarrousel
              images={IMG_DEMO_PROJECTS}
              imgAltText={IMG_ALT_DEMO_PROJECTS}
              titleArticle="Demo Projects"
              titleWindow="Demo Projects"
              toRedirect="/demo"
            >
              <TypeScript size="40" />
              <Tailwind width="40" height="24" />
              <ReactIcon width="40" height="36" />
              <Express size="40" isblackBG />
              <p className="text-pretty pl-4 text-sm">
                Here you can find some of the execises I did for the
                FreeCodeCamp certifications with some modifications and styles
                added. <br />
                From the ones I think are the best to show, whether it&apos;s
                for the style or utility, like the Pomodoro Clock or the
                Translator between UK English and USA English. <br />
                To the simpler ones, like just a machine that display quotes
                that I get from an API. <br />
                You can see what main tools I used for each demo when you hover
                the preview window. <br />I thought in putting a description for
                each demo, but I think the title of each exercise and this
                little introduction can be enough. <br />
              </p>
            </SingleProjectCarrousel>
            <p className="mt-4 self-center text-pretty pl-4 text-sm text-yellow-200 lg:mt-8">
              I invite you to check some of my projects above. <br /> If you
              already did, thank you. I appreciate the opportunity you are
              giving me by doing so! <br /> Oh! If you have a recommendation or
              issue, remember you can post it in the{" "}
              <span className="text-sky-300 underline">
                <Link to="/issues-and-suggestions">
                  Corner of Issues & Suggestions
                </Link>
              </span>
              . <br /> You can find it in the menu or clicking in the link of
              this paragraph.
            </p>
            <article className="mt-4 flex w-full px-6 py-3 lg:mt-8 lg:w-3/5 lg:self-center">
              <h3 className="flex w-full items-center justify-center gap-2 text-xl text-lime-200 lg:justify-start">
                <UserIcon size="26" /> About me!
              </h3>
            </article>
            {/** el about me con tech tal vez y el badge de disponibilidad y el coso de redireccionar al repo de git */}
          </main>
        </div>
      </div>
    </div>
  );
}
