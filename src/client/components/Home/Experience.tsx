import { useSettingStore } from "../../store/settingPortfolio";
import LaptopIcon from "../Icons/Laptop";
import ExperienceItem from "./ExperienceItem";

const EXPERIENCE_SPANISH = [
  {
    date: "Enero 2025 - Junio 2025",
    title: "Desarollador Web Trainee",
    company: "Maanyuba",
    description:
      "Responsable de pasar diseños visuales de Figma a código usando React, React Native, Typescript, CSS, etc. Diseñar y mantener base de datos para el funcionamiento de 2 aplicaciones. Y la automatización de envío de correos mediante Make.",
  },
];
const EXPERIENCE_ENGLISH = [
  {
    date: "January 2025 - June 2025",
    title: "Trainee Web Developer",
    company: "Maanyuba",
    description:
      "Responsible for building code to translate visual designs from Figma using React, React Native, Typescript, CSS, etc. Design and maintain a database for 2 applications. And automate the sending of emails using Make.",
  },
];

export default function Experience() {
  const { i18n } = useSettingStore();
  const textHeader =
    i18n === "English" ? "Work Experience" : "Experiencia Laboral";
  const EXPERIENCE =
    i18n === "English" ? EXPERIENCE_ENGLISH : EXPERIENCE_SPANISH;
  return (
    <article
      className="object-to-observe experienceObserve mt-4 flex w-full flex-col gap-4 px-6 py-3 transition-all duration-500  lg:mt-8 lg:w-4/5 lg:self-center"
      id="AboutMe"
    >
      <h3 className="flex w-full items-center justify-center gap-2 text-xl text-lime-200 lg:justify-start">
        <LaptopIcon size="26" /> {textHeader}
      </h3>
      <ol className=" relative mt-16">
        {EXPERIENCE.map(experience => (
          <li className="">
            <ExperienceItem {...experience} />
          </li>
        ))}
      </ol>
    </article>
  );
}
