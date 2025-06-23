import { useLanguage } from "../../hooks/useLanguage";
import UserIcon from "../Icons/UserIcon";

export default function AboutMe() {
  const text = useLanguage({ project: "HomeBottom" });
  return (
    <article
      className="object-to-observe aboutMeObserve mt-4 flex w-full flex-col gap-4 px-6 py-3 transition-all duration-500  lg:mt-8 lg:w-3/5 lg:self-center"
      id="AboutMe"
    >
      <h3 className="flex w-full items-center justify-center gap-2 text-xl text-lime-200 lg:justify-start">
        <UserIcon size="26" /> {text[0]}
      </h3>
      <p className="whitespace-pre-wrap text-sm">
        {text[1]} <br />
        <span className="text-lime-300">{text[2]}</span>
        {text[3]} <span className="text-lime-300">{text[4]}</span>
        {text[5]}
      </p>
      <p className="whitespace-pre-wrap text-sm">
        {text[6]}
        <span className="text-lime-300">{text[7]}</span>
        {text[8]}
        <br />
        <span className="text-lime-300">{text[9]}</span> {text[10]}
      </p>
      <p className="whitespace-pre-wrap text-sm">
        {text[11]}
        <span className="text-lime-300">{text[12]}</span>
        <br />
        {text[13]}
        <span className="text-lime-300">{text[14]}</span>
      </p>
    </article>
  );
}
