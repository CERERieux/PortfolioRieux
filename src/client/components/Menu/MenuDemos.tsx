import Tailwind from "../Icons/Tailwind";
import TypeScript from "../Icons/TypeScript";
import SimpleNavMenu from "./SimpleNavMenu";
import ReactIcon from "../Icons/ReactIcon";
import Express from "../Icons/Express";
import WindowPreview from "../SystemDesign/WindowPreview";
import FooterAttribution from "../SystemDesign/FooterAttribution";
import { useEffect } from "react";
import Anchor from "../SystemDesign/Anchor";
import { useLanguage } from "../../hooks/useLanguage";

export default function MenuDemos() {
  const text = useLanguage({ project: "MenuProject" });
  const titles = useLanguage({ project: "DemoMenuTitles" });
  // Use effect to change the title of the page
  useEffect(() => {
    document.title = "Demos";
  }, []);
  return (
    <div className="relative flex h-full w-full flex-col items-center gap-8 overflow-y-auto bg-slate-800 px-8 py-4">
      <SimpleNavMenu positionNav="top-0 right-4 z-10" />
      <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col items-center gap-8 overflow-y-auto bg-slate-800 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] px-8 py-4">
        <h1 className="z-20 text-3xl text-white first-letter:text-4xl">
          {text[0]}
        </h1>
        <p className="mb-2 w-full whitespace-pre-wrap text-pretty text-center text-amber-100 md:w-3/4">
          {text[1]}
        </p>
        <p className="w-full whitespace-pre-wrap text-pretty text-sm text-slate-100 md:w-3/4">
          {text[2]}
        </p>
        <p className="my-2 rounded-md bg-stone-700/50 px-6 py-2 text-xl text-slate-100 backdrop-blur-sm">
          {text[3]}
          <Anchor href="https://www.freecodecamp.org/fccfddb4901-2002-40f4-837f-b5d33cfbddc5">
            {text[4]}
          </Anchor>
        </p>
        <main className="flex h-fit w-full flex-wrap justify-around gap-8">
          <WindowPreview
            imgAltText="Preview of a Pomodoro Clock in a desktop display"
            imgPreview="/PomodoroPreview.webp"
            titleWindow={titles[1]}
            toRedirect="/demo/pomodoro"
          >
            <TypeScript size="40" />
            <Tailwind width="40" height="24" />
            <ReactIcon width="40" height="36" />
          </WindowPreview>

          <WindowPreview
            imgAltText="Preview of UK-USA translator"
            imgPreview="/TranslatorPreview.webp"
            titleWindow={titles[2]}
            toRedirect="/demo/translate-eng"
          >
            <TypeScript size="40" />
            <Tailwind width="40" height="24" />
            <ReactIcon width="40" height="36" />
            <Express size="40" />
          </WindowPreview>

          <WindowPreview
            imgAltText="Preview of a Markdown Parser"
            imgPreview="/MarkdownPreview.webp"
            titleWindow={titles[3]}
            toRedirect="/demo/markdown"
          >
            <TypeScript size="40" />
            <Tailwind width="40" height="24" />
            <ReactIcon width="40" height="36" />
          </WindowPreview>

          <WindowPreview
            imgAltText="Preview of a calculator"
            imgPreview="/CalculatorPreview.webp"
            titleWindow={titles[4]}
            toRedirect="/demo/calculator"
          >
            <TypeScript size="40" />
            <Tailwind width="40" height="24" />
            <ReactIcon width="40" height="36" />
          </WindowPreview>

          <WindowPreview
            imgAltText="Preview of an unit converter"
            imgPreview="/ConverterPreview.webp"
            titleWindow={titles[5]}
            toRedirect="/demo/converter"
          >
            <TypeScript size="40" />
            <Tailwind width="40" height="24" />
            <ReactIcon width="40" height="36" />
            <Express size="40" />
          </WindowPreview>

          <WindowPreview
            imgAltText="Preview of a sound pad"
            imgPreview="/DrumBoxPreview.webp"
            titleWindow={titles[6]}
            toRedirect="/demo/drum-machine"
          >
            <TypeScript size="40" />
            <Tailwind width="40" height="24" />
            <ReactIcon width="40" height="36" />
          </WindowPreview>

          <WindowPreview
            imgAltText="Preview of a quote machine"
            imgPreview="/QuotePreview.webp"
            titleWindow={titles[7]}
            toRedirect="/demo/quote"
          >
            <TypeScript size="40" />
            <Tailwind width="40" height="24" />
            <ReactIcon width="40" height="36" />
          </WindowPreview>
        </main>
      </div>
      <FooterAttribution
        placeRef="Ibelick"
        urlRef="https://bg.ibelick.com/"
        whatIs={titles[9]}
        mx="md:mx-auto z-30"
      />
    </div>
  );
}
