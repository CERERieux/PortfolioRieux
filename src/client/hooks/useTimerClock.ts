import { useEffect, useState } from "react"; // React hooks to manage the clock logic
import { useClockStore } from "../store/clock"; // Our store that manages the global state
import alarmSound from "../assets/AlarmSound.mp3"; // Import the audio to make an alarm
const audio = new Audio(alarmSound); // Create a new audio element that contains our alarm

let idInterval: number | undefined; // Variable to store the ID interval that execute our clock function

/* Function that is in charge to update the clock display in format mm:ss 
   It needs the current display and an function that sets that display in the
   store, there it will update the clock and verify if the session or break period
   ended to give space to the next period of time
*/
function handleTime(time: string, setTimer: (newTime: string) => void) {
  let [auxMin, auxSec] = time.split(":").map(t => parseInt(t)); // We get the numbers from the display
  let newTime = ""; // We create a variable to slowly build the new timer display
  // We need to put a 0 when the minutes are less than 10 minutes or the next second will be less than 10 min
  if ((auxMin < 10 && auxMin >= 0) || time === "10:00") newTime = "0";
  auxSec -= 1; // We decrease 1 second the display
  if (auxSec < 0) {
    // If it's a negative number, it means we need to move to the next minute
    // But if the time is over, we need to change to the next period of time
    if (auxMin === 0) {
      setTimer("00:00"); // We send to the store that the time is over
      return null; // And finish the function
    }
    auxMin -= 1; // If there is time, we only decrement the minutes by 1
    auxSec = 59; // And put 59 seconds
    newTime = `${newTime}${auxMin}:${auxSec}`; // Put the format to the final time
    setTimer(newTime); // And send it to the store
  } else {
    // If there is seconds left, we check if it's less than 10 seconds to ensure the mm:ss format
    const newSec = auxSec < 10 ? `0${auxSec}` : auxSec;
    newTime = `${newTime}${auxMin}:${newSec}`; // Put the final display in the auxiliar
    setTimer(newTime); // And send it to the store
  }
}

// Custom hook that is in charge of the display clock logic
export function useTimerClock() {
  const { time, setTimer, resetClock, clockMode } = useClockStore();
  const [clockRunning, setClockRunning] = useState(false);

  // We need to update the display each time the display change or the clock is paused/restart/running
  useEffect(() => {
    // Execute the update of the display each second as long it's running
    idInterval = window.setInterval(() => handleTime(time, setTimer), 1000);
    // If it paused or the initial state, just clear the interval because it needs to stay still
    if (!clockRunning) clearTimer();
    // When component unmounts, clear the interval to ensure good behaviour of the code
    return () => {
      clearTimer();
    };
  }, [time, clockRunning]);

  // Also, we need to play the audio each time the clock mode change
  useEffect(() => {
    // Only if the clock is running
    if (clockRunning) {
      audio.play();
    }
  }, [clockMode]);

  // Function that clears the ID interval so the display can be paused or restart it
  const clearTimer = () => {
    clearInterval(idInterval); // Clear the ID interval so it stops the clock
    idInterval = undefined; // Clean the auxiliar so it can store a new ID interval
  };

  // Function that resets the entire clock, its alarm and the display time/values
  const handleClockReset = () => {
    resetClock();
    audio.pause();
    audio.currentTime = 0;
    if (clockRunning) {
      clearTimer();
      setClockRunning(false);
    }
  };

  // Function that indicates if the clock is running or paused
  const handleTimer = () => {
    setClockRunning(prevState => !prevState);
  };

  // Return the function that is in charge of the clock reset and to pause or play the clock
  return {
    clockReset: handleClockReset,
    pausePlayClock: handleTimer,
    clockRunning,
  };
}
