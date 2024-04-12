import { CLOCKMODES, useClockStore } from "../../store/clock";
import { useSettingStore } from "../../store/settingPortfolio";
import MiniButton from "../SystemDesign/MiniButton";
import NumericInput from "./InputTime";

interface SessionBoxProps {
  mode: string;
  editing: boolean;
  isRunning: boolean;
  setEditing: () => void;
}

export default function SessionBox({
  mode,
  isRunning,
  editing,
  setEditing,
}: SessionBoxProps) {
  // Get the period, the function to increment and decrement it from the store
  const {
    decrementTimer,
    incrementTimer,
    breakTime,
    session,
    errorBreak,
    errorSession,
    setValueBreak,
    setValueSession,
    valueSession,
    valueBreak,
  } = useClockStore();
  const pluralBreak = breakTime >= 2 ? "s" : "";
  const pluralSession = session >= 2 ? "s" : "";
  const currentTime = mode === CLOCKMODES.BREAKTIME ? breakTime : session;
  const id = mode === CLOCKMODES.SESSION ? "SessionManual" : "BreakManual";
  const error = mode === CLOCKMODES.SESSION ? errorSession : errorBreak;
  const valueInput = mode === CLOCKMODES.SESSION ? valueSession : valueBreak;
  const setValue =
    mode === CLOCKMODES.SESSION ? setValueSession : setValueBreak;
  const { i18n } = useSettingStore();

  // A function that is responsible to increase the break period when user interact with the clock
  const handleIncrementTimer = () => {
    incrementTimer(mode);
  };

  // A function that is responsible to decrease the break period when user interact with the clock
  const handleDecrementTimer = () => {
    decrementTimer(mode);
  };

  return (
    <section className="flex h-48 w-2/3 flex-col items-center justify-center gap-2 py-2 md:h-full">
      <h4 className="mx-1 text-center font-elegant text-3xl md:text-4xl">
        {i18n === "English"
          ? `${mode} Length`
          : mode === "Session"
          ? "Trabajo"
          : "Descanso"}
      </h4>

      <div className="relative h-1/3 w-full md:h-1/6">
        {editing ? (
          <div className="-mt-2 flex h-full w-full flex-col items-center gap-4 md:h-full">
            <label className="flex h-full w-full items-center justify-center gap-2">
              <NumericInput
                id={id}
                min={1}
                max={60}
                stepNum={1}
                value={valueInput}
                onChange={setValue}
                required
                styles="h-6 w-16 border-slate-50/70 bg-gray-600 font-digitalDisplay text-sm text-white shadow-md shadow-black/50"
              />
              {i18n === "English" ? "minutes" : "minutos"}
            </label>
            <p className="absolute top-9 rounded-sm bg-red-200/40 px-2 text-center font-digitalDisplay text-xs text-red-800 md:top-10">
              {error}
            </p>
            <MiniButton
              size="h-6 w-16 text-sm absolute top-14 md:top-20"
              disabled={isRunning || error !== null}
              onClick={setEditing}
            >
              {i18n === "English" ? "Set" : "Poner"}
            </MiniButton>
          </div>
        ) : (
          <>
            <p className="text-center">
              <span className="text-lg text-red-500">
                <b>{currentTime}</b>
              </span>{" "}
              Minut{i18n === "English" ? "e" : "o"}
              {mode === CLOCKMODES.BREAKTIME ? pluralBreak : pluralSession}
            </p>
            <div className="relative flex w-full justify-center gap-2 px-4">
              <MiniButton onClick={handleIncrementTimer} disabled={isRunning}>
                +
              </MiniButton>
              <MiniButton onClick={handleDecrementTimer} disabled={isRunning}>
                -
              </MiniButton>
              <MiniButton
                size="h-6 w-24 text-sm md:absolute md:top-10"
                disabled={isRunning}
                onClick={setEditing}
              >
                {i18n === "English" ? "Set Manually" : "Poner Manual"}
              </MiniButton>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
