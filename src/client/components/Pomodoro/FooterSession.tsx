import { useLanguage } from "../../hooks/useLanguage";
import { CLOCKMODES } from "../../store/clock";
import Anchor from "../SystemDesign/Anchor";

interface FooterSessionProps {
  mode: string;
}

export default function FooterSession({ mode }: FooterSessionProps) {
  const text = useLanguage({ project: "PomClock" });
  return (
    <footer className="absolute bottom-0 w-full bg-black/60 py-1 text-center text-xs text-white/70 md:left-1/3 md:mx-auto md:w-1/3 md:rounded-lg">
      {mode === CLOCKMODES.SESSION ? (
        <p>
          {text[20]}{" "}
          <Anchor
            href="https://unsplash.com/es/@sunday_digital?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            isBgBlack={true}
          >
            Nastuh Abootalebi
          </Anchor>{" "}
          {text[21]}{" "}
          <Anchor
            href="https://unsplash.com/es/fotos/pasillo-entre-puertas-de-paneles-de-vidrio-yWwob8kwOCk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
            isBgBlack={true}
          >
            Unsplash
          </Anchor>
        </p>
      ) : (
        <p>
          {text[22]}{" "}
          <Anchor
            href="https://suwalls.com/nature/calm-river-splitting-the-forest"
            isBgBlack={true}
          >
            Suwalls
          </Anchor>
        </p>
      )}
    </footer>
  );
}
