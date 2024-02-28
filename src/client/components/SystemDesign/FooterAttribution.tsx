import Anchor from "./Anchor";

interface FooterAttributionProps {
  whatIs: string;
  urlRef: string;
  placeRef: string;
  extra?: string;
  size?: string;
  mx?: string;
}

/** Component that display a footer in case I need to give attribution for
 * an image I'm using
 */
export default function FooterAttribution({
  whatIs,
  urlRef,
  placeRef,
  extra,
  size = "md:left-1/3 md:w-1/3",
  mx = "md:mx-auto",
}: FooterAttributionProps) {
  return (
    <footer
      className={`absolute bottom-0 w-full bg-black/60 py-1 text-center text-xs text-white/70 ${size} ${mx} md:rounded-lg`}
    >
      <p>
        {whatIs}{" "}
        <Anchor href={urlRef} isBgBlack={true}>
          {placeRef}
        </Anchor>
        {extra}
      </p>
    </footer>
  );
}
