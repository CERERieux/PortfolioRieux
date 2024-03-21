import Anchor from "./Anchor";

interface FooterAttributionProps {
  whatIsFrom1: string;
  whatIsFrom2: string;
  urlRef1: string;
  urlRef2: string;
  placeRef1: string;
  placeRef2: string;
  extra1?: string;
  extra2?: string;
  size?: string;
  mx?: string;
  backdrop?: boolean;
  samePlace?: boolean;
}

/** Component that display a footer in case I need to give attribution for
 * an image I'm using
 */
export default function FooterAttributionMultiple({
  whatIsFrom1,
  whatIsFrom2,
  urlRef1,
  urlRef2,
  placeRef1,
  placeRef2,
  extra1,
  extra2,
  size = "md:left-1/3 md:w-1/3",
  mx = "md:mx-auto",
  backdrop = false,
  samePlace = false,
}: FooterAttributionProps) {
  return samePlace ? (
    <footer
      className={`absolute bottom-0 w-full bg-black/60 py-1 text-center text-xs text-white/70 ${size} ${mx} md:rounded-lg ${
        backdrop && "backdrop-blur-sm"
      }`}
    >
      <p>
        {whatIsFrom1}{" "}
        <Anchor href={urlRef1} isBgBlack={true}>
          {extra1}
        </Anchor>{" "}
        and {whatIsFrom2}
        <Anchor href={urlRef2} isBgBlack={true}>
          {extra2}
        </Anchor>{" "}
        {placeRef1}
      </p>
    </footer>
  ) : (
    <footer
      className={`absolute bottom-0 w-full bg-black/60 py-1 text-center text-xs text-white/70 ${size} ${mx} md:rounded-lg ${
        backdrop && "backdrop-blur-sm"
      }`}
    >
      <p>
        {whatIsFrom1}{" "}
        <Anchor href={urlRef1} isBgBlack={true}>
          {extra1}
        </Anchor>{" "}
        and {whatIsFrom2}
        <Anchor href={urlRef2} isBgBlack={true}>
          {extra2}
        </Anchor>{" "}
        {placeRef1} and {placeRef2}
      </p>
    </footer>
  );
}
