import { useTimerClock } from "../../hooks/useTimerClock";
import { CLOCKMODES, useClockStore } from "../../store/clock";
import FooterSession from "./FooterSession";
import SessionBox from "./SessionBox";
import Timer from "./Timer";

export default function PomodoroClock() {
  const { clockMode, time } = useClockStore();
  const { clockReset, pausePlayClock, clockRunning } = useTimerClock();

  const mainBG =
    clockMode === CLOCKMODES.SESSION
      ? "bg-[url('/office.jpg')]"
      : "bg-[url('/forest.jpg')]";

  return (
    <>
      <main
        className={`flex h-full w-full flex-col items-center justify-center gap-6 ${mainBG} bg-cover bg-no-repeat transition-all duration-300`}
      >
        <h1 className="mb-6 rounded-2xl bg-slate-50/80 px-4 pb-2 pt-1 font-digitalDisplay text-4xl text-black/85 shadow-lg shadow-black md:text-5xl">
          Pomodoro Clock
        </h1>
        <div className="relative flex h-3/5 w-full flex-col items-center justify-center gap-2 bg-slate-100/80 shadow-lg shadow-black md:h-1/2 md:w-3/5 md:flex-row md:rounded-3xl">
          <SessionBox mode={CLOCKMODES.SESSION} isRunning={clockRunning} />
          <Timer
            clockMode={clockMode}
            isRunning={clockRunning}
            time={time}
            clockReset={clockReset}
            pausePlayClock={pausePlayClock}
          />
          <SessionBox mode={CLOCKMODES.BREAKTIME} isRunning={clockRunning} />
          {clockRunning && (
            <p className="absolute bottom-0 font-digitalDisplay text-sm md:bottom-4">
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
