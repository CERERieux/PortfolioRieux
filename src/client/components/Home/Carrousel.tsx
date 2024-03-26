import { useState } from "react";
import WindowPreview from "../SystemDesign/WindowPreview";

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
    <article className="flex items-center justify-center text-black">
      <button
        className="flex h-12 w-6 items-center justify-center rounded-l-lg text-white transition-all hover:bg-slate-200/80 hover:text-slate-800"
        onClick={() => {
          handleImgIndex(-1);
        }}
      >
        {"<"}
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
        className="flex h-12 w-6 items-center justify-center rounded-r-lg text-white transition-all hover:bg-slate-200/80 hover:text-slate-800"
        onClick={() => {
          handleImgIndex(1);
        }}
      >
        {">"}
      </button>
    </article>
  );
}
