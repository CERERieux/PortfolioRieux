import GithubIcon from "../Icons/GithubIcon";
import LinkedInIcon from "../Icons/LinkedInIcon";
import Mail from "../Icons/Mail";
import Pill from "./Pill";

interface PortfolioHeaderProps {
  opacityHeader: string;
}

export default function PortfolioHeader({
  opacityHeader,
}: PortfolioHeaderProps) {
  return (
    <header
      className={`relative flex w-full flex-col items-center justify-center gap-4 px-4 py-2  md:flex-row md:flex-wrap ${opacityHeader} transition-all duration-1000 ease-out`}
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
          <span className="text-purple-200">Jr. Full Stack Developer.</span>{" "}
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
  );
}
