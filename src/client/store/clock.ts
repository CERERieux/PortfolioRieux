import { type ChangeEvent } from "react";
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
  editingSession: boolean;
  editingBreak: boolean;
  valueSession: string;
  valueBreak: string;
  errorSession: string | null;
  errorBreak: string | null;
  incrementTimer: (modeToIncrement: string) => void;
  decrementTimer: (modeToDecrement: string) => void;
  setTimer: (time: string) => void;
  setEditingSession: () => void;
  setEditingBreak: () => void;
  setValueSession: (e: ChangeEvent<HTMLInputElement>) => void;
  setValueBreak: (e: ChangeEvent<HTMLInputElement>) => void;
  resetClock: () => void;
}

// Store that manages our global state
export const useClockStore = create<State>((set, get) => ({
  // Start it with the default values
  clockMode: CLOCKMODES.SESSION,
  time: "25:00",
  session: 25,
  breakTime: 5,
  editingSession: false,
  editingBreak: false,
  valueSession: "",
  valueBreak: "",
  errorSession: null,
  errorBreak: null,

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

  // Function to set manual editing of the periods
  setEditingSession: () => {
    const { editingSession, session, valueSession } = get();
    if (!editingSession) {
      set({ editingSession: !editingSession, valueSession: "" + session });
    } else {
      const timer = parseInt(valueSession);
      const time = timer < 10 ? `0${timer}:00` : `${timer}:00`;
      set({ editingSession: !editingSession, time, session: timer });
    }
  },
  setEditingBreak: () => {
    const { editingBreak, breakTime, valueBreak } = get();
    if (!editingBreak) {
      set({ editingBreak: !editingBreak, valueBreak: "" + breakTime });
    } else {
      const timer = parseInt(valueBreak);
      set({ editingBreak: !editingBreak, breakTime: timer });
    }
  },

  // Function to modify the clock with the value of the input element
  setValueSession: (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (e.target.checkValidity()) {
      set({ valueSession: newValue, errorSession: null });
    } else {
      const error = errorInput(e.target.validity);
      set({ valueSession: newValue, errorSession: error });
    }
  },
  setValueBreak: (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (e.target.checkValidity()) {
      set({ valueBreak: newValue, errorBreak: null });
    } else {
      const error = errorInput(e.target.validity);
      set({ valueBreak: newValue, errorBreak: error });
    }
  },

  resetClock: () => {
    // Reset the clock to the default state
    set({
      clockMode: CLOCKMODES.SESSION,
      time: "25:00",
      session: 25,
      breakTime: 5,
      editingSession: false,
      editingBreak: false,
      errorBreak: null,
      errorSession: null,
      valueBreak: "",
      valueSession: "",
    });
  },
}));

function errorInput(validity: ValidityState) {
  if (validity.badInput) return "Only number inputs are allowed.";
  else if (validity.rangeUnderflow) return "The lowest valid value is 1.";
  else if (validity.rangeOverflow) return "The highest valid value is 60.";
  else if (validity.stepMismatch) return "Only integer numbers are allowed.";
  else if (validity.valueMissing) return "Don't leave the input field empty.";
}
