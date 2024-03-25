import { useEffect, useState } from "react"; // React hook that let us store the state of a part of a component
import { SoundButton } from "./SoundButton"; // Our component that shows a button that plays a sound
import { SOUND_NAMES } from "./soundHub"; // A dictionary that give us the name of the mp3 to play
import CustomBackground from "../SystemDesign/CustomBackground";
import FooterAttribution from "../SystemDesign/FooterAttribution";
import SimpleNavMenu from "../Menu/SimpleNavMenu";

export default function DrumMachine() {
  // We start the state of the component as empty, it will show later the name of the mp3 file that was played
  const [display, setDisplay] = useState("");

  // Use effect to change the title of the page
  useEffect(() => {
    document.title = "Drum Machine";
  }, []);

  return (
    <CustomBackground
      bgImg="before:bg-[url('/DrumboxBG.webp')] before:opacity-50"
      styles="w-full h-full"
    >
      <SimpleNavMenu />
      <main className="grid h-full w-full grid-cols-1 place-items-center">
        <div className="grid h-1/3 w-2/3 grid-cols-2 grid-rows-2 place-items-center justify-around border border-black bg-zinc-800 bg-gradient-to-b from-slate-500 via-transparent via-10% to-zinc-950 to-90% shadow-lg shadow-zinc-800/70 sm:w-1/2 md:h-2/5 md:w-2/5 lg:w-1/3">
          <h2 className="col-span-1 row-span-1 pt-6 text-lg italic text-slate-100 first-letter:text-3xl first-letter:text-red-600 lg:text-2xl lg:first-letter:text-4xl">
            SOUND-BOX
          </h2>
          <div className="col-start-1 row-start-2 flex h-10 w-2/3 items-center justify-center rounded-sm bg-blue-700 px-2 py-1 shadow-inner shadow-black">
            <h3 className="text-slate-100">{display}</h3>
          </div>
          <div className="row-span-2 flex h-2/3 w-4/5 items-center justify-center bg-gray-400 shadow-inner shadow-slate-800">
            <section className="grid grid-cols-3 gap-2">
              <SoundButton
                id={"Q"}
                sound={SOUND_NAMES.HEATER_1}
                setDisplay={setDisplay}
              />
              <SoundButton
                id={"W"}
                sound={SOUND_NAMES.HEATER_2}
                setDisplay={setDisplay}
              />
              <SoundButton
                id={"E"}
                sound={SOUND_NAMES.HEATER_3}
                setDisplay={setDisplay}
              />
              <SoundButton
                id={"A"}
                sound={SOUND_NAMES.HEATER_4}
                setDisplay={setDisplay}
              />
              <SoundButton
                id={"S"}
                sound={SOUND_NAMES.CLAP}
                setDisplay={setDisplay}
              />
              <SoundButton
                id={"D"}
                sound={SOUND_NAMES.OPEN_HH}
                setDisplay={setDisplay}
              />
              <SoundButton
                id={"Z"}
                sound={SOUND_NAMES.KICKNHAT}
                setDisplay={setDisplay}
              />
              <SoundButton
                id={"X"}
                sound={SOUND_NAMES.KICK}
                setDisplay={setDisplay}
              />
              <SoundButton
                id={"C"}
                sound={SOUND_NAMES.CLOSED_HH}
                setDisplay={setDisplay}
              />
            </section>
          </div>
        </div>
      </main>
      <FooterAttribution
        whatIs="Image by"
        placeRef="Freepik"
        urlRef="https://www.freepik.com/free-photo/view-dj-equipment-electronics_34135677.htm#query=dj%20table&position=3&from_view=keyword&track=ais&uuid=7c3a326b-e1a3-4de3-97e2-cdd566aee20e"
      />
    </CustomBackground>
  );
}
