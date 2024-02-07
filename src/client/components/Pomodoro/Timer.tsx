import MiniButton from "../SystemDesign/MiniButton";

interface TimerProps {
  clockMode: string;
  isRunning: boolean;
  time: string;
  clockReset: () => void;
  pausePlayClock: () => void;
}

export default function Timer({
  clockMode,
  time,
  clockReset,
  pausePlayClock,
  isRunning,
}: TimerProps) {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-2">
      <h4 className="font-elegant text-3xl md:text-4xl">{clockMode}</h4>
      <p className="">
        Time Left: <span className="text-lg text-blue-600">{time}</span>
      </p>
      <div className="flex gap-2">
        <MiniButton onClick={pausePlayClock} size="w-24 h-6">
          {!isRunning ? "Play" : "Pause"}
        </MiniButton>
        <MiniButton onClick={clockReset} size="w-24 h-6">
          Reset
        </MiniButton>
      </div>
    </section>
  );
}
