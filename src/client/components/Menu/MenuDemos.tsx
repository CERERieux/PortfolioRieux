import Tailwind from "../Icons/Tailwind";
import TypeScript from "../Icons/TypeScript";
import SimpleNavMenu from "./SimpleNavMenu";
import ReactIcon from "../Icons/ReactIcon";
import Express from "../Icons/Express";
import WindowPreview from "../SystemDesign/WindowPreview";

export default function MenuDemos() {
  return (
    <div className="relative flex h-full w-full flex-col items-center gap-8 overflow-y-auto bg-slate-800 px-8 py-4">
      <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col items-center gap-8 overflow-y-auto bg-slate-800 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] px-8 py-4">
        <SimpleNavMenu positionNav="absolute top-0 right-4" />
        <h1 className="z-20 text-3xl text-white first-letter:text-4xl">
          Projects
        </h1>
        <p className="w-full text-pretty text-white md:w-3/4">
          Here you can find some of the execises I did for the FreeCodeCamp
          certifications with some modifications and styles added. <br />
          From the ones I think are the best to show, whether it&apos;s for the
          style or utility, like the Pomodoro Clock or the Translator between UK
          English and USA english. <br />
          To the simpler ones, like just a machine that display quotes that I
          get from an API. <br />
        </p>
        <p className="w-full text-pretty text-white md:w-3/4">
          You can see what main tools I used for each demo when you hover the
          preview window, which mainly are React, Tailwind and TypeScript.{" "}
          <br />I thought in putting a description for each demo, but I think
          the title of each exercise and this little introduction can be enough.{" "}
          <br />
        </p>
        <p className="mb-2 w-full text-pretty text-center text-amber-100 md:w-3/4">
          Thanks for checking my demos if you do! <br /> And if you have a
          recommendation or issue, remember you can post it in the Corner of
          Issues & Suggestions.
        </p>
        <main className="flex h-fit w-full flex-wrap justify-around gap-8">
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
            titleWindow="Markdown Parser"
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
        <p className="mb-2 w-full text-pretty text-sm text-lime-100 md:w-3/4">
          (In fact, all the sections in this portfolio are FCC certificate
          exercises, except for the home page. <br />I modified them enough to
          be able to use them as 1 &quot;system&quot;, I wanted to include them
          to show that after all the learning where you only do small programs ,
          you could make something nice with them. <br />
          For it I decided to do my portfolio like this, where you can have an
          account with 1 library, notes, short links and post your
          recommendations or issues with the whole app. <br />
          Also a game that you can play and a very few demos that you really
          could use for personal usage. <br />I decided to omit some exercises,
          because in the long run, I didn&apos;t wanted to moderate the content
          that users could post. I prefer to use that time to learn more and do
          better apps.)
        </p>
      </div>
    </div>
  );
}
