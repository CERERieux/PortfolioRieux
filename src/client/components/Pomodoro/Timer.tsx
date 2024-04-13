import { useSettingStore } from "../../store/settingPortfolio";
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
  const { i18n } = useSettingStore();
  const playWord = i18n === "English" ? "Play" : "Empezar";
  const pauseWord = i18n === "English" ? "Pause" : "Pausar";
  return (
    <section className="flex h-16 w-full flex-col items-center justify-center gap-2 md:mt-3 md:h-1/4">
      <h4 className="font-elegant text-3xl md:text-4xl">
        {i18n === "English"
          ? clockMode
          : clockMode === "Session"
          ? "Trabajo"
          : "Descanso"}
      </h4>
      <p className="">
        {i18n === "English" ? "Time Left: " : "Tiempo Restante: "}
        <span className="text-lg text-blue-600 dark:text-blue-300">
          <b>{time}</b>
        </span>
      </p>
      <div className="flex gap-2">
        <MiniButton onClick={pausePlayClock} size="w-24 h-6">
          {!isRunning ? playWord : pauseWord}
        </MiniButton>
        <MiniButton onClick={clockReset} size="w-24 h-6">
          {i18n === "English" ? "Reset" : "Reiniciar"}
        </MiniButton>
      </div>
    </section>
  );
}
