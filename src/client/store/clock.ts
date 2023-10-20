import { create } from "zustand";

export const CLOCKMODES = {
  SESSION: "Session",
  BREAKTIME: "Break",
};

interface State {
  clockMode: string;
  time: string;
  session: number;
  breakTime: number;
  incrementTimer: (modeToIncrement: string) => void;
  decrementTimer: (modeToDecrement: string) => void;
  setTimer: (time: string) => void;
  resetClock: () => void;
}

// Store that manages our global state
export const useClockStore = create<State>((set, get) => ({
  // Start it with the default values
  clockMode: CLOCKMODES.SESSION,
  time: "25:00",
  session: 25,
  breakTime: 5,
  // And handlers to update this state
  incrementTimer: modeToIncrement => {
    const { session, breakTime } = get();
    // We don't want that any period is above 60 minutes
    if (modeToIncrement === CLOCKMODES.SESSION) {
      if (session < 60)
        set(state => ({
          session: state.session + 1,
          time:
            state.session < 9
              ? `0${state.session + 1}:00`
              : `${state.session + 1}:00`,
        }));
    } else {
      if (breakTime < 60) set(state => ({ breakTime: state.breakTime + 1 }));
    }
  },

  decrementTimer: modeToDecrement => {
    const { session, breakTime } = get();
    // And don't want any period below 1 minute
    if (modeToDecrement === "Session") {
      if (session > 1)
        set(state => ({
          session: state.session - 1,
          time:
            state.session < 11
              ? `0${state.session - 1}:00`
              : `${state.session - 1}:00`,
        }));
    } else {
      if (breakTime > 1) set(state => ({ breakTime: state.breakTime - 1 }));
    }
  },

  setTimer: newTime => {
    if (newTime === "00:00") {
      // When time is up for any period, we change the clock to the next period
      const { breakTime, session, clockMode } = get();
      const nextPeriod = clockMode === CLOCKMODES.SESSION ? breakTime : session;
      set({
        time: nextPeriod < 10 ? `0${nextPeriod}:00` : `${nextPeriod}:00`,
        clockMode:
          clockMode === CLOCKMODES.SESSION
            ? CLOCKMODES.BREAKTIME
            : CLOCKMODES.SESSION,
      });
    } else set({ time: newTime });
  },

  resetClock: () => {
    // Reset the clock to the default state
    set({
      clockMode: CLOCKMODES.SESSION,
      time: "25:00",
      session: 25,
      breakTime: 5,
    });
  },
}));
