import { useSudokuStore } from "../../../store/sudoku";
import Button from "../../SystemDesign/Button";

export default function AsideSudoku() {
  const {
    checkSudoku,
    conflicts,
    resolveSudoku,
    validCoord,
    validSudoku,
    verifyInput,
    resetGame,
    restartSudoku,
    getInitialSudoku,
  } = useSudokuStore();

  const restartGame = () => {
    resetGame();
    getInitialSudoku();
  };

  const giveSolution = () => {
    resolveSudoku();
  };

  const resetSudoku = () => {
    restartSudoku();
  };

  return (
    <aside className="order-2 flex h-24 w-full flex-wrap justify-center gap-4 sm:w-3/4 md:-order-1 md:h-fit md:w-44 md:flex-col md:items-end">
      <Button color="bg-indigo-200" xSize="w-40" onClick={giveSolution}>
        Solve
      </Button>
      <Button color="bg-indigo-200" xSize="w-40">
        Verify Coordinate
      </Button>
      <Button color="bg-indigo-200" xSize="w-40" onClick={restartGame}>
        New Sudoku
      </Button>
      <Button color="bg-indigo-200" xSize="w-40" onClick={resetSudoku}>
        Reset
      </Button>
    </aside>
  );
}
