import { useEffect, useState } from "react";
import SimpleNavMenu from "../Menu/SimpleNavMenu";
import ProjectList from "./ProjectList";
import PortfolioHeader from "./PortfolioHeader";
import AboutMe from "./AboutMe";
import LocalNavPortfolio from "./LocalNavPortfolio";
import PortfolioFooter from "./PortfolioFooter";

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
        <SimpleNavMenu positionNav="top-0 right-4 z-10 absolute" />
        <div className="relative flex h-full w-full flex-col items-center gap-20 overflow-y-auto text-slate-200">
          <LocalNavPortfolio />
          <PortfolioHeader opacityHeader={opacityHeader} />
          <main className="mt-20 flex w-full flex-col items-start justify-center gap-4 px-8">
            <ProjectList />
            <AboutMe />
            <PortfolioFooter />
            {/** tech tal vez y el badge de disponibilidad y el coso de redireccionar al repo de git */}
          </main>
        </div>
      </div>
    </div>
  );
}
