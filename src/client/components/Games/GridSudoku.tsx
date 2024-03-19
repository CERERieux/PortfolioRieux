import { useEffect } from "react";
import { useSudokuStore } from "../../store/sudoku";
import NumberBox from "./Sudoku/NumberBox";

export default function GridSudoku() {
  const { sudokuString } = useSudokuStore();
  useEffect(() => {
    console.log(sudokuString);
  }, [sudokuString]);
  return (
    <section className="h-90 w-90 flex bg-lime-50">
      <NumberBox name="A1" letter="A" number="1" />
      <NumberBox name="B1" />
      <NumberBox name="C1" />
      <NumberBox name="A4" />
      <NumberBox name="A5" />
      <NumberBox name="A6" />
      <NumberBox name="A7" />
      <NumberBox name="A8" />
      <NumberBox name="A9" />
    </section>
  );
}
