import { useClockStore } from "../../store/clock"
import { useTimerClock } from "../../hooks/useTimerClock";

export function Timer() {
    const { clockMode, time } = useClockStore()
    const { clockReset, pausePlayClock } = useTimerClock()

    return (
        <div className="timer">
            <p className="timer-label">{clockMode}</p>
            <p className="time-left">{time}</p>
            <button id="start-stop" onClick={pausePlayClock}>Play/Stop</button>
            <button id="reset" onClick={clockReset}>Reset</button>
        </div>
    )
}