import { useClockStore, CLOCKMODES } from "../../store/clock"   // Import the store to manage the state of the Clock

export function StudySession() {
    // Get the session period, the function to increment and decrement it from the store
    const { session, incrementTimer, decrementTimer } = useClockStore(state => state)

    // A function that is responsible to increase the session period when user interact with the clock
    const handleIncrementTimer = () => {
        incrementTimer(CLOCKMODES.SESSION)
    }

    // A function that is responsible to decrease the session period when user interact with the clock
    const handleDecrementTimer = () => {
        decrementTimer(CLOCKMODES.SESSION)
    }

    return (
        <div className="study">
            <p className="session-label">Session Length</p>
            <p className="session-length">{session}</p>
            <button id="session-increment" onClick={handleIncrementTimer}>+</button>
            <button id="session-decrement" onClick={handleDecrementTimer}>-</button>
        </div>
    )
}