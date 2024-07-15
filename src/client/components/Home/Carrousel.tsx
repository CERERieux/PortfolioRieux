import { useState } from "react";
import WindowPreview from "../SystemDesign/WindowPreview";
import ArrowRight from "../Icons/ArrowRight";

interface CarrouselProps {
  children: React.ReactNode;
  images: string[];
  imgAltText: string[];
  titleWindow: string;
  toRedirect: string;
}

export default function Carrousel({
  children,
  images,
  imgAltText,
  titleWindow,
  toRedirect,
}: CarrouselProps) {
  const [imgIndex, setImgIndex] = useState(0); // Auxiliar to move the image index of the carrousel

  // Auxiliar function to modify the index based if we move left or right
  const handleImgIndex = (numOp: number) => {
    const newIndex = imgIndex + numOp;
    if (newIndex < 0) setImgIndex(images.length - 1);
    else if (newIndex === images.length) setImgIndex(0);
    else setImgIndex(newIndex);
  };

  return (
    <article className="relative flex w-full items-center justify-center text-black sm:w-fit">
      <button
        className="absolute left-1 top-1/3 z-40 flex h-12 w-6 items-center justify-center rounded-l-lg bg-slate-200/80 text-slate-800 transition-all sm:relative sm:bg-transparent sm:text-white sm:hover:bg-slate-200/80 sm:hover:text-slate-800"
        onClick={() => {
          handleImgIndex(-1);
        }}
      >
        <ArrowRight size="22" styles="rotate-180" />
      </button>
      <WindowPreview
        imgAltText={imgAltText[imgIndex]}
        imgPreview={images[imgIndex]}
        titleWindow={titleWindow}
        toRedirect={toRedirect}
      >
        {children}
      </WindowPreview>
      <button
        className="absolute right-1 top-1/3 z-30 flex h-12 w-7 items-center justify-center rounded-r-lg bg-slate-200/80 text-slate-800 transition-all sm:relative sm:bg-transparent sm:text-white sm:hover:bg-slate-200/80 sm:hover:text-slate-800"
        onClick={() => {
          handleImgIndex(1);
        }}
      >
        <ArrowRight size="22" />
      </button>
    </article>
  );
}
