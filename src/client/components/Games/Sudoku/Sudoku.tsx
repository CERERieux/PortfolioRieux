import { useEffect, useState } from "react";
import { useSudokuStore } from "../../../store/sudoku";
import SimpleNavMenu from "../../Menu/SimpleNavMenu";
import CustomBackground from "../../SystemDesign/CustomBackground";
import FooterAttribution from "../../SystemDesign/FooterAttribution";
import ActionMessage from "../../SystemDesign/ActionMessage";
import ErrorMessage from "../../SystemDesign/ErrorMessage";
import GridSudoku from "./GridSudoku";
import AsideSudoku from "./AsideSudoku";
import OpenInfo from "../../SystemDesign/OpenInfo";

export default function Sudoku() {
  const {
    getInitialSudoku,
    action,
    checkSudoku,
    getAnswer,
    localError,
    sudokuString,
  } = useSudokuStore(); // Get the info needed from the store
  const [newSudoku, setNewSudoku] = useState(true); // Auxiliar flag to get new sudoku when needed

  // Use effect to change the title of the page
  useEffect(() => {
    document.title = "Sudoku";
  }, []);

  // Effect that activates at the start and when newSudoku changes
  useEffect(() => {
    // If it's a new sudoku cycle
    if (newSudoku && sudokuString === "") {
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

  // Effect that activates each time sudoku changes
  useEffect(() => {
    // If the sudoku is completed, check if it's correct or not
    if (!sudokuString.includes(".") && sudokuString !== "") {
      checkSudoku();
    }
  }, [sudokuString]);

  return (
    <CustomBackground
      bgImg="before:bg-[url('/SudokuBG.webp')] before:opacity-80"
      styles="w-full h-full flex flex-col items-center gap-6 py-4 pb-8 md:pb-4 px-8 overflow-y-auto"
    >
      {action !== null && <ActionMessage>{action}</ActionMessage>}
      {localError !== null && <ErrorMessage>{localError}</ErrorMessage>}
      <header>
        <SimpleNavMenu positionNav="top-0 right-4 absolute" />
        <section className="relative flex w-fit justify-center gap-2">
          <h1 className="rounded-md bg-slate-700/80 px-6 py-1 font-comic text-3xl text-slate-100 shadow-inner shadow-slate-50/50 backdrop-blur-md">
            Sudoku
          </h1>
          <OpenInfo
            idClose="CloseDialogInfoPomodoroClock"
            idDialog="DialogForInfoPomodoroClock"
            idOpen="OpenDialogInfoPomodoroClock"
            posScreen="top-1.5 -right-12"
          >
            <h3 className="text-lg text-red-600">Sudoku Rules</h3>
            <ul className="w-full *:pl-2">
              <li>- You only can enter 1 number per square.</li>
              <li>- Numbers only can go from 1 to 9.</li>
              <li>
                - Do not repeat the same number in a column, a row and an area
              </li>
              <li className="ml-2 text-sm">
                (Areas are squares of 3x3, in this case, each area have an
                unique color to easily spot them. )
              </li>
            </ul>
            <p className="max-w-[600px] self-start text-pretty">
              You win if you can fill the 9x9 grid with 0 errors! <br />
              There are 7 different puzzles and 1 is picked randomly. You can
              use the options on the left to interact with the game. <br />
            </p>
            <p className="max-w-[600px] text-pretty text-lime-600">
              Good luck and have fun!
            </p>
          </OpenInfo>
        </section>
      </header>
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
        <AsideSudoku setNewSudoku={setNewSudoku} />
        <main className="flex h-[450px] w-[410px] items-center justify-center rounded-xl bg-white/60 shadow-lg shadow-black backdrop-blur-md sm:w-[450px]">
          <GridSudoku />
        </main>
      </div>
      <FooterAttribution
        placeRef="on Freepik"
        urlRef="https://www.freepik.es/foto-gratis/pequena-cascada_922466.htm#fromView=search&page=1&position=9&uuid=e256f375-2f29-432f-acc0-c54aa471c1aa"
        whatIs="Image"
        extra=" by JaredMoore"
        backdrop
      />
    </CustomBackground>
  );
}
