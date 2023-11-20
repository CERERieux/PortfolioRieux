import { BreakSession } from "./BreakSession";
import { StudySession } from "./StudySession";
import { Timer } from "./Timer";


export default function PomodoroClock() {
    return (
        <main className="pomodoro-clock">
            <StudySession />
            <Timer />
            <BreakSession />
        </main>
    )
}