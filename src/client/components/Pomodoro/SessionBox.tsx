import { CLOCKMODES, useClockStore } from "../../store/clock";
import MiniButton from "../SystemDesign/MiniButton";

interface SessionBoxProps {
  mode: string;
  isRunning: boolean;
}

export default function SessionBox({ mode, isRunning }: SessionBoxProps) {
  // Get the period, the function to increment and decrement it from the store
  const { decrementTimer, incrementTimer, breakTime, session } =
    useClockStore();
  const pluralBreak = breakTime >= 2 ? "s" : "";
  const pluralSession = session >= 2 ? "s" : "";
  const currentTime = mode === CLOCKMODES.BREAKTIME ? breakTime : session;

  // A function that is responsible to increase the break period when user interact with the clock
  const handleIncrementTimer = () => {
    incrementTimer(mode);
  };

  // A function that is responsible to decrease the break period when user interact with the clock
  const handleDecrementTimer = () => {
    decrementTimer(mode);
  };

  return (
    <section className="flex w-2/3 flex-col items-center justify-center gap-2 py-2">
      <h4 className="font-elegant text-3xl md:text-4xl">{mode} Length</h4>
      <p className="">
        <span className="text-lg text-red-500">{currentTime}</span> Minute
        {mode === CLOCKMODES.BREAKTIME ? pluralBreak : pluralSession}
      </p>
      <div className="flex w-full justify-center gap-2 px-4">
        <MiniButton onClick={handleIncrementTimer} disabled={isRunning}>
          +
        </MiniButton>
        <MiniButton onClick={handleDecrementTimer} disabled={isRunning}>
          -
        </MiniButton>
      </div>
    </section>
  );
}
