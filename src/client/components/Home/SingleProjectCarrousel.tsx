import { Link } from "react-router-dom";
import Carrousel from "./Carrousel";

interface SingleProjectCarrouselProps {
  children: React.ReactNode[];
  titleArticle: string;
  images: string[];
  imgAltText: string[];
  titleWindow: string;
  toRedirect: string;
  list?: string;
}

export default function SingleProjectCarrousel({
  children,
  titleArticle,
  images,
  imgAltText,
  titleWindow,
  toRedirect,
  list = "listObserve",
}: SingleProjectCarrouselProps) {
  return (
    <section
      className={`object-to-observe ${list} flex w-full flex-wrap items-center justify-center gap-4 py-2 transition-all duration-500`}
    >
      <Carrousel
        images={images}
        imgAltText={imgAltText}
        titleWindow={titleWindow}
        toRedirect={toRedirect}
      >
        {children.map((child, i) => {
          if (i !== children.length - 1) return child;
          else return null;
        })}
      </Carrousel>
      <article className="w-full lg:w-2/5 xl:w-1/2">
        <h3 className="text-xl italic text-sky-300 underline">
          <Link to={toRedirect}>{titleArticle}</Link>
        </h3>
        {children[children.length - 1]}
      </article>
    </section>
  );
}
