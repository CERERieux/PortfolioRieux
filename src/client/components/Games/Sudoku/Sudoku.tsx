import { useEffect, useState } from "react";
import { useSudokuStore } from "../../../store/sudoku";
import SimpleNavMenu from "../../Menu/SimpleNavMenu";
import CustomBackground from "../../SystemDesign/CustomBackground";
import FooterAttribution from "../../SystemDesign/FooterAttribution";
import NumberBox from "./NumberBox";
import ActionMessage from "../../SystemDesign/ActionMessage";
import ErrorMessage from "../../SystemDesign/ErrorMessage";
import GridSudoku from "../GridSudoku";
import Button from "../../SystemDesign/Button";

export default function Sudoku() {
  const {
    getInitialSudoku,
    action,
    checkSudoku,
    conflicts,
    getAnswer,
    localError,
    replaceNumber,
    resolveSudoku,
    sudokuString,
    validCoord,
    validSudoku,
    verifyInput,
  } = useSudokuStore();

  const [newSudoku, setNewSudoku] = useState(true); // Auxiliar flag to get new sudoku when needed

  // Effect that activates at the start and when newSudoku changes
  useEffect(() => {
    // If it's a new sudoku cycle
    if (newSudoku) {
      getInitialSudoku(); // Get a sudoku to resolve
    }
  }, [newSudoku]);

  // Effect that activates at the start and when we get the new sudoku string
  useEffect(() => {
    // If it's a new sudoku cycle
    if (newSudoku && sudokuString !== "") {
      getAnswer(); // Get the answer, to know if user is correct at the end of the puzzle
      setNewSudoku(false); // Also, set the cycle to false since we don't need another sudoku for now
    }
  }, [sudokuString]);

  return (
    <CustomBackground
      bgImg="before:bg-[url('/SudokuBG.webp')] before:opacity-50"
      styles="w-full h-full relative flex flex-col items-center gap-6 py-4 px-8"
    >
      {action !== null && <ActionMessage>{action}</ActionMessage>}
      {localError !== null && <ErrorMessage>{localError}</ErrorMessage>}
      <header>
        <SimpleNavMenu />
        <h1 className="font-comic text-3xl text-slate-700">Sudoku</h1>
      </header>
      <div className="flex flex-col items-center justify-center lg:flex-row">
        <aside className="order-2 flex w-96 justify-end bg-slate-200 lg:-order-1 lg:flex-col">
          <Button color="">Solve</Button>
          <Button color="">Verify Coordinate</Button>
          <Button color="">New Sudoku</Button>
          <Button color="">Reset Sudoku</Button>
        </aside>
        <main className="flex w-[600px] items-center justify-center bg-white">
          <GridSudoku />
        </main>
      </div>
      <FooterAttribution
        placeRef="on Freepik"
        urlRef="https://www.freepik.es/foto-gratis/pequena-cascada_922466.htm#fromView=search&page=1&position=9&uuid=e256f375-2f29-432f-acc0-c54aa471c1aa"
        whatIs="Image"
        extra=" by JaredMoore"
      />
    </CustomBackground>
  );
}
