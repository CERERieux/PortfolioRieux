import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomBackground from "../SystemDesign/CustomBackground";
import FooterAttribution from "../SystemDesign/FooterAttribution";

export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  }, []);
  return (
    <CustomBackground
      bgImg="before:bg-[url('/NotFoundBG.webp')] before:opacity-90"
      styles="flex justify-center items-center w-full h-full"
    >
      <section className="h flex h-1/3 w-full flex-col items-center justify-center gap-6 rounded-xl bg-black/70 text-slate-200 md:w-1/2">
        <h2 className="flex flex-col items-center text-2xl">
          <span className="text-3xl text-red-400">Error 404</span> Page not
          found
        </h2>
        <h3 className="text-sm italic text-yellow-200">
          You are being redirected to Home...
        </h3>
      </section>
      <FooterAttribution
        placeRef="on Freepik"
        urlRef="https://www.freepik.com/free-photo/rustic-brick-wall-background_4413635.htm#fromView=search&page=1&position=5&uuid=776c0c10-c649-499e-b695-a46e1dedfe22"
        whatIs="Image"
        extra=" by rawpixel.com"
      />
    </CustomBackground>
  );
}
