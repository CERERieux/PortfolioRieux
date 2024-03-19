import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { CauseError, ErrorAuth } from "../../types";
import FooterAttribution from "../SystemDesign/FooterAttribution";
import CustomBackground from "../SystemDesign/CustomBackground";

interface Props {
  errorAuth: ErrorAuth;
}

const CAUSE_ERROR_DATA = {
  ExpiredToken: {
    error: "Your session expired!",
    bg: "before:bg-[url('/ExpiredBG.webp')]",
    footer: (
      <FooterAttribution
        placeRef="on Freepik"
        urlRef="https://www.freepik.com/free-photo/modern-city-night_973429.htm#fromView=search&page=1&position=0&uuid=ee5b20e1-62e6-447f-aed5-9831b2b2f1f3"
        whatIs="Image"
        extra=" by onlyyouqj"
      />
    ),
  },
  BadToken: {
    error: "Can&apos;t confirm your session right now...",
    bg: "before:bg-[url('/BGNumbers.webp')]",
    footer: (
      <FooterAttribution
        placeRef="kjpargeter"
        urlRef="https://www.freepik.com/free-photo/abstract-binary-code-background_6038281.htm#query=matrix%20background&position=2&from_view=keyword&track=ais&uuid=661ae88a-f2fc-4f4f-b659-3aff7cb0edb6"
        whatIs="Image by"
        extra=" on Freepik"
      />
    ),
  },
  NotAdmin: {
    error: "You are not an admin.",
    bg: "before:bg-[url('/BGNumbers.webp')]",
    footer: (
      <FooterAttribution
        placeRef="kjpargeter"
        urlRef="https://www.freepik.com/free-photo/abstract-binary-code-background_6038281.htm#query=matrix%20background&position=2&from_view=keyword&track=ais&uuid=661ae88a-f2fc-4f4f-b659-3aff7cb0edb6"
        whatIs="Image by"
        extra=" on Freepik"
      />
    ),
  },
  NotLoggedIn: {
    error: "You are not logged in!",
    bg: "before:bg-[url('/ExpiredBG.webp')]",
    footer: (
      <FooterAttribution
        placeRef="on Freepik"
        urlRef="https://www.freepik.com/free-photo/modern-city-night_973429.htm#fromView=search&page=1&position=0&uuid=ee5b20e1-62e6-447f-aed5-9831b2b2f1f3"
        whatIs="Image"
        extra=" by onlyyouqj"
      />
    ),
  },
};

export default function UnauthorizedAccess({ errorAuth }: Props) {
  // For avatars
  // <a href="https://www.freepik.com/free-photo/sunshine-through-huge-tree_2829629.htm#fromView=search&page=1&position=5&uuid=737e70a4-6062-4ca0-b6c3-b396cc9dbb57">Image by freepik</a>
  // <a href="https://www.freepik.com/free-photo/beautiful-island_1114645.htm#fromView=search&page=1&position=45&uuid=737e70a4-6062-4ca0-b6c3-b396cc9dbb57">Image by mrsiraphol on Freepik</a>
  // <a href="https://www.freepik.com/free-photo/man-with-hands-wide-open-standing-top-mountain-enjoying-incredible-view-lake_18088638.htm#fromView=search&page=1&position=49&uuid=737e70a4-6062-4ca0-b6c3-b396cc9dbb57">Image by wirestock on Freepik</a>
  // <a href="https://www.freepik.com/free-photo/oak-forest-autumn_1239302.htm#fromView=search&page=1&position=12&uuid=29ad8a95-e5dd-43e8-ab57-a0870e7b0cb3">Image by bearfotos on Freepik</a>
  // https://www.freepik.com/search?ai=excluded&format=search&last_filter=query&last_value=nature&orientation=square&query=nature&type=photo
  const { message, cause } = errorAuth;
  const data = CAUSE_ERROR_DATA[cause as CauseError];
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 5000);
  }, []);
  return (
    <CustomBackground
      bgImg={`${data.bg} before:opacity-100`}
      styles="flex justify-center items-center w-full h-full"
    >
      <section className="h flex h-1/3 w-full flex-col items-center justify-center gap-6 rounded-xl bg-black/70 px-4 py-2 text-slate-200 md:w-1/2">
        <h2 className="text-xl">
          <span className="text-2xl text-red-400">Error:</span> {data.error}
        </h2>
        <h3 className="text-balance text-center italic text-yellow-200">
          {message}
        </h3>
        <h4 className="text-sm italic text-lime-200">
          You are being redirected to Home...
        </h4>
      </section>
      {data.footer}
    </CustomBackground>
  );
}
