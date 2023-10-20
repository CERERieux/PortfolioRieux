import { useClockStore, CLOCKMODES } from "../../store/clock"   // Import the store to manage the state of the Clock

export function BreakSession() {
    // Get the break period, the function to increment and decrement it from the store
    const { breakTime, incrementTimer, decrementTimer } = useClockStore()

    // A function that is responsible to increase the break period when user interact with the clock
    const handleIncrementTimer = () => {
        incrementTimer(CLOCKMODES.BREAKTIME)
    }

    // A function that is responsible to decrease the break period when user interact with the clock
    const handleDecrementTimer = () => {
        decrementTimer(CLOCKMODES.BREAKTIME)
    }

    return (
        <div className="break">
            <p className="break-label">Break Length</p>
            <p className="break-length">{breakTime}</p>
            <button id="break-increment" onClick={handleIncrementTimer}>+</button>
            <button id="break-decrement" onClick={handleDecrementTimer}>-</button>
        </div>
    )
}