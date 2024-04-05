import { useEffect, useState } from "react";
import SimpleNavMenu from "../Menu/SimpleNavMenu";
import ProjectList from "./ProjectList";
import PortfolioHeader from "./PortfolioHeader";
import AboutMe from "./AboutMe";
import LocalNavPortfolio from "./LocalNavPortfolio";
import PortfolioFooter from "./PortfolioFooter";
import Technology from "./Technology";

export default function Home() {
  const [opacityHeader, setOpacityHeader] = useState(
    "opacity-0 -translate-x-32",
  ); // State for the animation at the top

  // Observer for the elements at the top that aren't the header
  const observerTitle = new IntersectionObserver(
    entries => {
      // For each element
      entries.forEach(entry => {
        // If the element isn't visible, set the class "object-to-observe"
        if (!entry.isIntersecting)
          entry.target.classList.add("object-to-observe");
        else {
          // If the element is visible, set the class "slide-left" and remove "object-to-observe"
          entry.target.classList.remove("object-to-observe");
          entry.target.classList.toggle("slide-left", entry.isIntersecting);
        }
      });
    },
    { threshold: 0.4 },
  );
  // Observer for the elements in the projects list
  const observerList = new IntersectionObserver(
    entries => {
      // For each element
      entries.forEach(entry => {
        // If the element isn't visible, set the class "object-to-observe"
        if (!entry.isIntersecting)
          entry.target.classList.add("object-to-observe");
        else {
          // If the element is visible, set the class "slide-left" and remove "object-to-observe"
          entry.target.classList.remove("object-to-observe");
          entry.target.classList.toggle("slide-left", entry.isIntersecting);
        }
      });
    },
    { threshold: 0.5 },
  );
  // Observer for the element About Me
  const observerAboutMe = new IntersectionObserver(
    entries => {
      // For each element
      entries.forEach(entry => {
        // If the element isn't visible, set the class "object-to-observe"
        if (!entry.isIntersecting)
          entry.target.classList.add("object-to-observe");
        else {
          // If the element is visible, set the class "slide-left" and remove "object-to-observe"
          entry.target.classList.remove("object-to-observe");
          entry.target.classList.toggle("slide-left", entry.isIntersecting);
        }
      });
    },
    { threshold: 0.5 },
  );
  // Observer for the element Technology
  const observerTech = new IntersectionObserver(
    entries => {
      // For each element
      entries.forEach(entry => {
        // If the element isn't visible, set the class "object-to-observe"
        if (!entry.isIntersecting)
          entry.target.classList.add("object-to-observe");
        else {
          // If the element is visible, set the class "slide-left" and remove "object-to-observe"
          entry.target.classList.remove("object-to-observe");
          entry.target.classList.toggle("slide-left", entry.isIntersecting);
        }
      });
    },
    { threshold: 0.4 },
  );

  // Use effect to change title
  useEffect(() => {
    document.title =
      "Erik's Portfolio - Jr. Full Stack Developer and Programmer";
    setTimeout(() => {
      setOpacityHeader("opacity-100 translate-x-0");
    }, 100);
  }, []);

  // Use effect to observe elements
  useEffect(() => {
    // Get the elements to observe through its class
    const titleToObserve = document.querySelectorAll(".titleObserve");
    const listToObserve = document.querySelectorAll(".listObserve");
    const aboutMeToObserve = document.querySelectorAll(".aboutMeObserve");
    const techToObserve = document.querySelectorAll(".techObserve");
    // And to each observer, give those elements
    titleToObserve.forEach(element => {
      observerTitle.observe(element);
    });
    listToObserve.forEach(element => {
      observerList.observe(element);
    });
    aboutMeToObserve.forEach(element => {
      observerAboutMe.observe(element);
    });
    techToObserve.forEach(element => {
      observerTech.observe(element);
    });
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
            <Technology />
            <PortfolioFooter />
          </main>
        </div>
      </div>
    </div>
  );
}
