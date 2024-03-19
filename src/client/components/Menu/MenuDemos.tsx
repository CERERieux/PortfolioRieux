import Tailwind from "../Icons/Tailwind";
import TypeScript from "../Icons/TypeScript";
import SimpleNavMenu from "./SimpleNavMenu";
import ReactIcon from "../Icons/ReactIcon";
import Express from "../Icons/Express";
import WindowPreview from "../SystemDesign/WindowPreview";

export default function MenuDemos() {
  return (
    // TranslatorPreview
    <div className="relative flex h-full w-full flex-col items-center gap-8 overflow-y-auto bg-slate-800 px-8 py-4">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <SimpleNavMenu positionNav="absolute top-0 right-4" />
      <h1 className="z-20 text-3xl text-white first-letter:text-4xl">
        Projects
      </h1>
      <main className="flex w-full flex-wrap justify-around gap-8">
        <WindowPreview
          imgAltText="Preview of a Pomodoro Clock in a desktop display"
          imgPreview="/PomodoroPreview.webp"
          titleWindow="Pomodoro Clock"
          toRedirect="/demo/pomodoro"
        >
          <TypeScript size="40" />
          <Tailwind width="40" height="24" />
          <ReactIcon width="40" height="36" />
        </WindowPreview>

        <WindowPreview
          imgAltText="Preview of UK-USA translator"
          imgPreview="/TranslatorPreview.webp"
          titleWindow="UK-USA Translator"
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
          titleWindow="Markdown"
          toRedirect="/demo/markdown"
        >
          <TypeScript size="40" />
          <Tailwind width="40" height="24" />
          <ReactIcon width="40" height="36" />
        </WindowPreview>

        <WindowPreview
          imgAltText="Preview of a calculator"
          imgPreview="/CalculatorPreview.webp"
          titleWindow="Calculator"
          toRedirect="/demo/calculator"
        >
          <TypeScript size="40" />
          <Tailwind width="40" height="24" />
          <ReactIcon width="40" height="36" />
        </WindowPreview>

        <WindowPreview
          imgAltText="Preview of an unit converter"
          imgPreview="/ConverterPreview.webp"
          titleWindow="Unit Converter"
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
          titleWindow="Drum Machine"
          toRedirect="/demo/drum-machine"
        >
          <TypeScript size="40" />
          <Tailwind width="40" height="24" />
          <ReactIcon width="40" height="36" />
        </WindowPreview>

        <WindowPreview
          imgAltText="Preview of a quote machine"
          imgPreview="/QuotePreview.webp"
          titleWindow="Quote Machine"
          toRedirect="/demo/quote"
        >
          <TypeScript size="40" />
          <Tailwind width="40" height="24" />
          <ReactIcon width="40" height="36" />
        </WindowPreview>
      </main>
    </div>
  );
}
