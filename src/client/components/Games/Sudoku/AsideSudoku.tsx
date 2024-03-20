import { useSudokuStore } from "../../../store/sudoku";
import { useCloseNavButton } from "../../SystemDesign/CloseNavButton";
import Button from "../../SystemDesign/Button";
import VerifySudokuForm from "./VerifySudokuForm";
import DialogSudoku from "./DialogSudoku";

interface AsideSudokuProps {
  setNewSudoku: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AsideSudoku({ setNewSudoku }: AsideSudokuProps) {
  const { validSudoku, resetGame } = useSudokuStore(); // Get what we need from the store
  const { handleOpacity, opacity } = useCloseNavButton(); // Get the function to handle opacity of a object
  // 2 IDs for the 2 dialogs we need to show depending on 2 actions
  const idOpenSolution = "OpenDialogGiveSolutionSudoku";
  const idOpenReset = "OpenDialogResetBaseSudoku";
  // Auxiliar to restart the game
  const restartGame = () => {
    resetGame();
    setNewSudoku(true);
  };
  // Return the component that contains the menu of actions that sudoku can do
  return (
    <aside className="order-2 flex h-24 w-[90%] flex-wrap justify-center gap-4 sm:w-[70%] md:-order-1 md:h-fit md:w-44 md:flex-col md:items-end">
      <VerifySudokuForm handleOpacity={handleOpacity} opacity={opacity} />
      <DialogSudoku idOpenReset={idOpenReset} idOpenSolution={idOpenSolution} />
      <Button
        color="bg-indigo-200 border-indigo-500 hover:bg-indigo-600 hover:border-indigo-300 shadow-md shadow-indigo-700 hover:shadow-sm active:bg-slate-600 active:border-slate-50 active:shadow-none"
        xSize="w-40"
        id={idOpenSolution}
        disabled={validSudoku}
      >
        Solve
      </Button>
      <Button
        color="bg-amber-200 border-amber-500 hover:bg-amber-600 hover:border-amber-300 shadow-md shadow-amber-700 hover:shadow-sm active:bg-slate-600 active:border-slate-50 active:shadow-none"
        xSize="w-40"
        disabled={validSudoku || opacity.includes("opacity-100")}
        onClick={handleOpacity}
      >
        Verify Coordinate
      </Button>
      <Button
        color="bg-emerald-200 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-300 shadow-md shadow-emerald-700 hover:shadow-sm active:bg-slate-600 active:border-slate-50 active:shadow-none"
        xSize="w-40"
        onClick={restartGame}
      >
        New Sudoku
      </Button>
      <Button
        color="bg-red-200 border-red-500 hover:bg-red-700 hover:border-red-300 shadow-md shadow-red-700 hover:shadow-sm active:bg-slate-600 active:border-slate-50 active:shadow-none"
        xSize="w-40"
        id={idOpenReset}
        disabled={validSudoku}
      >
        Reset
      </Button>
    </aside>
  );
}
