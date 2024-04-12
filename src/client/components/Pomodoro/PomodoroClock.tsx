import { useEffect } from "react";
import { useTimerClock } from "../../hooks/useTimerClock";
import { CLOCKMODES, useClockStore } from "../../store/clock";
import SimpleNavMenu from "../Menu/SimpleNavMenu";
import OpenInfo from "../SystemDesign/OpenInfo";
import FooterSession from "./FooterSession";
import SessionBox from "./SessionBox";
import Timer from "./Timer";
import { useLanguage } from "../../hooks/useLanguage";

export default function PomodoroClock() {
  const {
    clockMode,
    time,
    editingBreak,
    editingSession,
    setEditingBreak,
    setEditingSession,
  } = useClockStore();
  const { clockReset, pausePlayClock, clockRunning } = useTimerClock();
  const text = useLanguage({ project: "PomClock" });
  const mainBG =
    clockMode === CLOCKMODES.SESSION
      ? "bg-[url('/office.webp')]"
      : "bg-[url('/forest.webp')]";

  // Use effect to change the title of the page
  useEffect(() => {
    document.title = "Pomodoro Clock";
  }, []);

  return (
    <>
      <SimpleNavMenu />
      <main
        className={`flex h-full w-full flex-col items-center justify-center gap-4 ${mainBG} bg-cover bg-no-repeat transition-all duration-300`}
      >
        <section className="relative flex w-fit justify-center gap-2">
          <h1 className="mb-6 rounded-2xl bg-slate-50/80 px-4 pb-2 pt-1 font-digitalDisplay text-4xl text-black/85 shadow-lg shadow-black md:text-5xl">
            {text[0]}
          </h1>
          <OpenInfo
            idClose="CloseDialogInfoPomodoroClock"
            idDialog="DialogForInfoPomodoroClock"
            idOpen="OpenDialogInfoPomodoroClock"
            posScreen="top-4 -right-12"
          >
            <h3 className="text-lg text-lime-600">{text[1]}</h3>
            <p className="max-w-[600px] self-start text-pretty">
              {text[2]}
              <br />
              <em>{text[3]}</em>
              {text[4]}
              <em>{text[5]}</em>
              {text[6]}
              <span className="text-red-600">{text[7]}</span>
              {text[8]}
              <span className="text-red-600">{text[9]}</span>
              {text[10]}
              <span className="text-blue-600">{text[11]}</span>
              {text[12]}
              <span className="text-blue-600">{text[13]}</span>
              {text[14]}
            </p>
            <p className="max-w-[600px] self-start text-pretty">
              {text[15]}
              <span className="text-red-600">{text[7]}</span>
              {text[16]}
              <span className="text-blue-600">{text[11]}</span>
              {text[17]}
              <br />
              {text[18]}
            </p>
          </OpenInfo>
        </section>
        <div className="relative flex h-3/4 w-full flex-col items-center justify-center gap-2 bg-slate-100/65 shadow-inner shadow-black/40 md:h-1/2 md:w-3/4 md:flex-row md:rounded-3xl md:bg-slate-100/80 md:shadow-lg md:shadow-black lg:w-3/5">
          <SessionBox
            mode={CLOCKMODES.SESSION}
            isRunning={clockRunning}
            editing={editingSession}
            setEditing={setEditingSession}
          />
          <Timer
            clockMode={clockMode}
            isRunning={clockRunning}
            time={time}
            clockReset={clockReset}
            pausePlayClock={pausePlayClock}
          />
          <SessionBox
            mode={CLOCKMODES.BREAKTIME}
            isRunning={clockRunning}
            editing={editingBreak}
            setEditing={setEditingBreak}
          />
          {clockRunning && (
            <p className="absolute bottom-0 font-digitalDisplay text-sm text-amber-800 md:bottom-4">
              {text[19]}
            </p>
          )}
        </div>
      </main>
      <FooterSession mode={clockMode} />
    </>
  );
}
