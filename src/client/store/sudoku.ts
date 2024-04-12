import { create } from "zustand";
import * as SudokuService from "../services/sudoku";

interface SudokuState {
  action: string | null;
  answer: string;
  conflicts: string[] | null;
  currentSudoku: number;
  isSolveAuto: boolean;
  localError: string | null;
  sudokuString: string;
  sudokuBackup: string;
  validCoord: boolean | null;
  validSudoku: boolean;
  checkSudoku: () => void;
  getInitialSudoku: () => void;
  getAnswer: () => void;
  replaceNumber: (input: string, place: number) => void;
  resolveSudoku: () => void;
  verifyInput: (number: string, coord: `^[A-I][0-9]$`) => void;
  resetGame: () => void;
  restartSudoku: () => void;
}

export const useSudokuStore = create<SudokuState>((set, get) => ({
  answer: "", // Auxiliary to save the answer of the current sudoku
  action: null, // Auxiliary to display messages of success
  conflicts: null, // Auxiliary to display conflicts in case of validate a coordinate
  currentSudoku: Math.floor(Math.random() * 7), // Auxiliary to get a sudoku from backend
  isSolveAuto: false, // Auxiliary to see if user clicked on the button that solves the sudoku
  localError: null, // Auxiliary to display messages of errors
  sudokuString: "", // Auxiliary to save the sudoku as string and be able to send it to the backend
  sudokuBackup: "", // Auxiliary to reset the sudoku to the initial state
  validCoord: null, // Boolean to display if user value is valid at 1 coordinate
  validSudoku: false, // Boolean to display if sudoku is valid or not, by default is not because it's incomplete

  /** Function to see if user filled the sudoku correctly or not */
  checkSudoku: () => {
    const { answer, sudokuString, isSolveAuto } = get(); // Get the user answer and the correct answer
    const lang = localStorage.getItem("Language");
    const textAction =
      lang === "Español"
        ? "¡Felicidades, resolviste este Sudoku!"
        : "Congratulations, you solved this sudoku!";
    const textError =
      lang === "Español"
        ? "Parece que hay un error en tu respuesta. ¡Intenta de nuevo!"
        : "Looks like there is an error in your answer! Try again.";
    // If those are the same, show a message to display it
    if (answer === sudokuString) {
      if (!isSolveAuto)
        set({
          action: textAction,
          validSudoku: true,
          localError: null,
        });
    } else {
      // If not are the same, then show an "error" to let know user there is something wrong
      set({
        action: null,
        localError: textError,
      });
      // For 3s
      setTimeout(() => {
        set({ localError: null });
      }, 3000);
    }
  },

  /** Function to set the answer in the state and know if user complete it correctly at the end */
  getAnswer: async () => {
    const { sudokuString } = get(); // Get current sudoku and solve it
    const answer = await SudokuService.solveSudoku(sudokuString);
    // If an error didn't happen, set the answer
    if (!("error" in answer)) set({ answer: answer.solution });
  },

  /** Function that obtain a random sudoku from backend */
  getInitialSudoku: async () => {
    const { currentSudoku } = get(); // Get the current index
    let puzzleNumber = Math.floor(Math.random() * 7); // And generate a new index
    // If those are the same, generate random index until get a new 1
    while (currentSudoku === puzzleNumber) {
      puzzleNumber = Math.floor(Math.random() * 7);
    }
    // Get the sudoku from backend and set it
    const puzzle = await SudokuService.getInitialSudoku(puzzleNumber);
    // And set it in the state
    set({
      currentSudoku: puzzleNumber,
      sudokuString: puzzle,
      sudokuBackup: puzzle,
    });
  },

  /** Funtion to replace a character in the sudoku string with a user input */
  replaceNumber: (input, place) => {
    const { sudokuString } = get(); // Get the original sudoku
    // If the input is empty or is a character that isn't valid, put a dot, else, put the input
    const newValue = input === "" || !"123456789".includes(input) ? "." : input;
    // Make a new one that includes user input and set it in the state
    const newSudoku =
      sudokuString.substring(0, place) +
      newValue +
      sudokuString.substring(place + 1);
    set({ sudokuString: newSudoku });
  },

  /** Function that solves the current sudoku */
  resolveSudoku: async () => {
    const { sudokuBackup } = get(); // Get the sudoku
    const solution = await SudokuService.solveSudoku(sudokuBackup); // And solve it
    const lang = localStorage.getItem("Language");
    const text =
      lang === "Español"
        ? "¡La solución de este Sudoku es esta!"
        : "The solution to the current Sudoku is this!";
    // If there is an error, display it for 3 seconds
    if ("error" in solution) {
      set({ localError: solution.error, action: null });
      setTimeout(() => {
        set({ localError: null });
      }, 3000);
    } else {
      // If it's a success, then display the solution and a message about it for 3s
      set({
        conflicts: null,
        isSolveAuto: true,
        localError: null,
        validCoord: null,
        validSudoku: true,
        sudokuString: solution.solution,
        action: text,
      });
      setTimeout(() => {
        set({ action: null });
      }, 3000);
    }
  },

  verifyInput: async (number, coord) => {
    const { sudokuString } = get(); // Get the sudoku
    const resultVerify = await SudokuService.checkSudoku({
      coordinate: coord,
      puzzle: sudokuString,
      value: number,
    });
    // If there is an error, display it for 3 seconds
    if ("error" in resultVerify) {
      set({ localError: resultVerify.error, action: null });
      setTimeout(() => {
        set({ localError: null, validCoord: null });
      }, 3000);
    } else {
      // If was successful the verification, set the result of it
      set({
        localError: null,
        conflicts: resultVerify.conflict ?? null,
        validCoord: resultVerify.valid,
      });
    }
  },

  /** Function to reset the game */
  resetGame: () => {
    // Reset almost everything in case user is playing again
    set({
      action: null,
      answer: "",
      conflicts: null,
      isSolveAuto: false,
      localError: null,
      sudokuString: "",
      sudokuBackup: "",
      validCoord: null,
      validSudoku: false,
    });
  },

  /** Function to return the sudoku to its initial state */
  restartSudoku: () => {
    const { sudokuBackup } = get();
    const lang = localStorage.getItem("Language");
    const text = lang === "Español" ? "¡Sudoku reiniciado!" : "Sudoku reset!";
    set({
      sudokuString: sudokuBackup,
      action: text,
    });
    setTimeout(() => {
      set({ action: null });
    }, 3000);
  },
}));
