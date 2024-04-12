import { useLanguage } from "../../../hooks/useLanguage";
import { useSudokuStore } from "../../../store/sudoku";
import Button from "../../SystemDesign/Button";
import Dialog from "../../SystemDesign/Dialog";
interface DialogSudokuProps {
  idOpenSolution: string;
  idOpenReset: string;
}

export default function DialogSudoku({
  idOpenSolution,
  idOpenReset,
}: DialogSudokuProps) {
  const { resolveSudoku, restartSudoku } = useSudokuStore(); // Get the 2 functions we need
  // Add 4 IDs we need for the dialogs, 2 for the solve button and 2 for the reset button
  const idDialogSolution = "DialogQuestionGiveSolutionSudoku";
  const idCloseSolution = "CloseDialogGiveSolutionSudoku";
  const idDialogReset = "DialogQuestionResetBaseSudoku";
  const idCloseReset = "CloseDialogResetBaseSudoku";
  const text = useLanguage({ project: "Sudoku" });

  // Auxliar to give the solution of the sudoku to the user
  const giveSolution = () => {
    const dialogSolution = document.getElementById(
      idDialogSolution,
    ) as HTMLDialogElement;
    dialogSolution.close();
    resolveSudoku();
  };

  // Auxliar to reset the sudoku to its original string
  const resetSudoku = () => {
    const dialogReset = document.getElementById(
      idDialogReset,
    ) as HTMLDialogElement;
    dialogReset.close();
    restartSudoku();
  };
  // Return the 2 dialogs
  return (
    <>
      <Dialog
        colorBg="greenBlack"
        idClose={idCloseSolution}
        idDialog={idDialogSolution}
        idOpen={idOpenSolution}
      >
        <section className="flex h-full w-full flex-col items-center justify-center gap-4">
          <h2>{text[22]}</h2>
          <div className="flex w-full justify-center gap-4">
            <Button
              color="bg-yellow-200 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-300 shadow-md shadow-yellow-700 hover:shadow-sm active:bg-slate-600 active:border-slate-50 active:shadow-none"
              xSize="w-40"
              id={idCloseSolution}
            >
              {text[23]}
            </Button>
            <Button
              color="bg-sky-200 border-sky-500 hover:bg-sky-600 hover:border-sky-300 shadow-md shadow-sky-700 hover:shadow-sm active:bg-slate-600 active:border-slate-50 active:shadow-none"
              xSize="w-40"
              onClick={giveSolution}
            >
              {text[24]}
            </Button>
          </div>
        </section>
      </Dialog>
      <Dialog
        colorBg="redBlack"
        idClose={idCloseReset}
        idDialog={idDialogReset}
        idOpen={idOpenReset}
      >
        <section className="flex h-full w-full flex-col items-center justify-center gap-4">
          <h2>{text[25]}</h2>
          <div className="flex w-full justify-center gap-4">
            <Button
              color="bg-yellow-200 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-300 shadow-md shadow-yellow-700 hover:shadow-sm active:bg-slate-600 active:border-slate-50 active:shadow-none"
              xSize="w-40"
              id={idCloseReset}
            >
              {text[23]}
            </Button>
            <Button
              color="bg-red-200 border-red-500 hover:bg-red-600 hover:border-red-300 shadow-md shadow-red-700 hover:shadow-sm active:bg-slate-600 active:border-slate-50 active:shadow-none"
              xSize="w-40"
              onClick={resetSudoku}
            >
              {text[26]}
            </Button>
          </div>
        </section>
      </Dialog>
    </>
  );
}
