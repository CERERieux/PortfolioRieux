import { useEffect, useState } from "react";
import { useSudokuStore } from "../../../store/sudoku";
import NumberBox from "./NumberBox";

const HEAD_ROW = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "H",
  8: "I",
};

export default function GridSudoku() {
  // Start a state to contain the sudoku
  const [inputBoxes, setInputBoxes] = useState<JSX.Element[]>([]);
  const { sudokuString, replaceNumber, validSudoku } = useSudokuStore(); // Get the sudoku and the function to replace the string with the user inputs

  // Auxiliar to handle user inputs into the replace number function
  const handleInputBox = (value: string, index: number) => {
    replaceNumber(value, index);
  };

  // Each time the sudoku changes then
  useEffect(() => {
    // If it isn't empty
    if (sudokuString !== "") {
      // For each value of the sudoku
      const inputBoxes = sudokuString.split("").map((value, index) => {
        const row = (Math.floor(index / 9) % 9) as keyof typeof HEAD_ROW; // Get the row that it belongs
        const col = (index % 9) + 1; // And its col
        const charRow = HEAD_ROW[row]; // Get the row as character [A-I]
        const coord = `${charRow}${col}`; // Make the coordinate to give it as a name
        const valueSudoku = value === "." ? "" : value; // The value depends if it's a number or a .
        let letter; // Auxliar to display the name of each column in the sudoku
        let number; // Auxliar to display the name of each row in the sudoku
        // If we are in the 1st column, we have a name for the row
        if (row === 0) number = col + "";
        // Same for the column, if we are in the 1st row
        if (col === 1) letter = charRow;
        // Return a box for each character to later map it
        return (
          <NumberBox
            key={coord}
            name={coord}
            handleInputBox={handleInputBox}
            value={valueSudoku}
            index={index}
            letter={letter}
            number={number}
            solved={validSudoku}
          />
        );
      });
      setInputBoxes(inputBoxes);
    } else {
      // If the sudoku is empty, then reset the boxes
      setInputBoxes([]);
    }
  }, [sudokuString, validSudoku]);

  return (
    <section className="flex max-w-96 border-collapse flex-wrap items-center justify-center">
      {inputBoxes.map(inputBox => inputBox)}
    </section>
  );
}
