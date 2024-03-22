import { useTimerClock } from "../../hooks/useTimerClock";
import { CLOCKMODES, useClockStore } from "../../store/clock";
import SimpleNavMenu from "../Menu/SimpleNavMenu";
import OpenInfo from "../SystemDesign/OpenInfo";
import FooterSession from "./FooterSession";
import SessionBox from "./SessionBox";
import Timer from "./Timer";

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

  const mainBG =
    clockMode === CLOCKMODES.SESSION
      ? "bg-[url('/office.webp')]"
      : "bg-[url('/forest.webp')]";

  return (
    <>
      <SimpleNavMenu />
      <main
        className={`flex h-full w-full flex-col items-center justify-center gap-4 ${mainBG} bg-cover bg-no-repeat transition-all duration-300`}
      >
        <section className="relative flex w-fit justify-center gap-2">
          <h1 className="mb-6 rounded-2xl bg-slate-50/80 px-4 pb-2 pt-1 font-digitalDisplay text-4xl text-black/85 shadow-lg shadow-black md:text-5xl">
            Pomodoro Clock
          </h1>
          <OpenInfo
            idClose="CloseDialogInfoPomodoroClock"
            idDialog="DialogForInfoPomodoroClock"
            idOpen="OpenDialogInfoPomodoroClock"
            posScreen="top-4 -right-12"
          >
            <h3 className="text-lg text-lime-600">What is a Pomodoro Clock?</h3>
            <p className="max-w-[600px] self-start text-pretty">
              More than a clock, it&apos;s a technique!
              <br />
              <em>Developed by Francesco Cirillo</em> in the late 1980s, the
              Pomodoro technique is a <em>time management method</em> where it
              uses a kitchen timer to break{" "}
              <span className="text-red-600">work</span> into intervals,
              typically <span className="text-red-600">25 minutes</span> in
              length, separated by{" "}
              <span className="text-blue-600">short breaks</span>, typically{" "}
              <span className="text-blue-600">5–10 minutes</span> in length.
            </p>
            <p className="max-w-[600px] self-start text-pretty">
              In the case of this clock, you can put{" "}
              <span className="text-red-600">work</span> and{" "}
              <span className="text-blue-600">short breaks</span> sessions of 60
              minutes at maximun and 1 minute at minimum. <br />
              An alarm will be set off when a session ends, to indicate you that
              you can start work again, or take a small break from your
              activity!
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
              You need to pause the clock if you want to modify the session
              length.{" "}
            </p>
          )}
        </div>
      </main>
      <FooterSession mode={clockMode} />
    </>
  );
}
