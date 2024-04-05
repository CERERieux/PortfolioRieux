import { Link } from "react-router-dom";
import WindowPreview from "../SystemDesign/WindowPreview";

interface SingleProjectProps {
  children: React.ReactNode[];
  titleArticle: string;
  imgPreview: string;
  imgAltText: string;
  titleWindow: string;
  toRedirect: string;
  list?: string;
}

export default function SingleProject({
  children,
  titleArticle,
  imgPreview,
  imgAltText,
  titleWindow,
  toRedirect,
  list = "listObserve",
}: SingleProjectProps) {
  return (
    <section
      className={`object-to-observe ${list} flex w-full flex-wrap items-center justify-center gap-4 py-2  text-black transition-all duration-500`}
    >
      <WindowPreview
        imgPreview={imgPreview}
        imgAltText={imgAltText}
        titleWindow={titleWindow}
        toRedirect={toRedirect}
      >
        {children.map((child, i) => {
          if (i !== children.length - 1) return child;
          else return null;
        })}
      </WindowPreview>
      <article className="w-full text-slate-200 lg:w-2/5 lg:pl-6 xl:w-1/2">
        <h3 className="text-xl italic text-sky-300 underline">
          <Link to={toRedirect}>{titleArticle}</Link>
        </h3>
        {children[children.length - 1]}
      </article>
    </section>
  );
}
