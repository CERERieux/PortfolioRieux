import { useEffect, useState } from "react";
import SimpleNavMenu from "../Menu/SimpleNavMenu";
import FooterAttribution from "../SystemDesign/FooterAttribution";
import Pill from "./Pill";
import LinkedInIcon from "../Icons/LinkedInIcon";
import GithubIcon from "../Icons/GithubIcon";
import Mail from "../Icons/Mail";

export default function Home() {
  const [opacityHeader, setOpacityHeader] = useState(
    "opacity-0 -translate-x-32",
  );

  useEffect(() => {
    document.title = "Erik's Portfolio - Full Stack Developer and Programmer";
    setTimeout(() => {
      setOpacityHeader("opacity-100 translate-x-0");
    }, 100);
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col items-center text-slate-200">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <SimpleNavMenu positionNav="absolute top-0 right-4" />
      <FooterAttribution
        placeRef="Ibelick"
        urlRef="https://bg.ibelick.com/"
        whatIs="Background made by "
      />
      <header
        className={`relative mt-10 flex w-full flex-col items-center justify-center gap-4 px-4 py-2 md:mt-20 md:flex-row md:flex-wrap ${opacityHeader} transition-all duration-1000 ease-out`}
      >
        <div className="mx-2 mt-2 flex h-32 w-32 items-center justify-center">
          <img
            src={`/type-img-1.webp`}
            alt="A photo from the creator of this portfolio"
            className="max-h-full max-w-full rounded-full"
          />
        </div>
        <section className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-balance text-center text-4xl">
            Welcome, I&apos;m Erik Rodriguez!
          </h1>
          <p className="text-balance text-center text-xl">
            <span className="text-purple-200">Full Stack Developer.</span>{" "}
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
              <Mail size="20" styles="text-white" /> ecerikrodriguez@outlook.com
            </Pill>
          </div>
        </section>
      </header>
    </div>
  );
}
