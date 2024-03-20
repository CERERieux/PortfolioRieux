import { useCallback, type ChangeEvent, useEffect, useState } from "react";

interface NumberBoxProps {
  name: string;
  letter?: string;
  number?: string;
  value: string;
  index: number;
  handleInputBox: (value: string, index: number) => void;
  solved: boolean;
}
type BlockSubKey = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

// Auxliar to get the index of the BORDERS Object
const INDEX_BORDERS = ["147", "258", "369"];
// Auxiliar to give style to the borders of each square
const BORDERS = {
  "147": {
    A: "border-t-4 border-l-4",
    B: "border-l-4",
    C: "border-b-4 border-l-4",
    D: "border-t-4 border-l-4",
    E: "border-l-4",
    F: "border-b-4 border-l-4",
    G: "border-t-4 border-l-4",
    H: "border-l-4",
    I: "border-b-4 border-l-4",
  },
  "258": {
    A: "border-t-4",
    B: "",
    C: "border-b-4",
    D: "border-t-4",
    E: "",
    F: "border-b-4",
    G: "border-t-4",
    H: "",
    I: "border-b-4",
  },
  "369": {
    A: "border-t-4 border-r-4",
    B: "border-r-4",
    C: "border-b-4 border-r-4",
    D: "border-t-4 border-r-4",
    E: "border-r-4",
    F: "border-b-4 border-r-4",
    G: "border-t-4 border-r-4",
    H: "border-r-4",
    I: "border-b-4 border-r-4",
  },
};
// Auxliar to give color to the borders and bg of each square
const BLOCKS = {
  A: {
    "1": "border-yellow-500 bg-yellow-100 disabled:bg-yellow-300",
    "2": "border-yellow-500 bg-yellow-100 disabled:bg-yellow-300",
    "3": "border-yellow-500 bg-yellow-100 disabled:bg-yellow-300",
    "4": "border-[#7d6125] bg-[#ded6c5] disabled:bg-[#b3a078]",
    "5": "border-[#7d6125] bg-[#ded6c5] disabled:bg-[#b3a078]",
    "6": "border-[#7d6125] bg-[#ded6c5] disabled:bg-[#b3a078]",
    "7": "border-pink-500 bg-pink-100 disabled:bg-pink-300",
    "8": "border-pink-500 bg-pink-100 disabled:bg-pink-300",
    "9": "border-pink-500 bg-pink-100 disabled:bg-pink-300",
  },
  B: {
    "1": "border-yellow-500 bg-yellow-100 disabled:bg-yellow-300",
    "2": "border-yellow-500 bg-yellow-100 disabled:bg-yellow-300",
    "3": "border-yellow-500 bg-yellow-100 disabled:bg-yellow-300",
    "4": "border-[#7d6125] bg-[#ded6c5] disabled:bg-[#b3a078]",
    "5": "border-[#7d6125] bg-[#ded6c5] disabled:bg-[#b3a078]",
    "6": "border-[#7d6125] bg-[#ded6c5] disabled:bg-[#b3a078]",
    "7": "border-pink-500 bg-pink-100 disabled:bg-pink-300",
    "8": "border-pink-500 bg-pink-100 disabled:bg-pink-300",
    "9": "border-pink-500 bg-pink-100 disabled:bg-pink-300",
  },
  C: {
    "1": "border-yellow-500 bg-yellow-100 disabled:bg-yellow-300",
    "2": "border-yellow-500 bg-yellow-100 disabled:bg-yellow-300",
    "3": "border-yellow-500 bg-yellow-100 disabled:bg-yellow-300",
    "4": "border-[#7d6125] bg-[#ded6c5] disabled:bg-[#b3a078]",
    "5": "border-[#7d6125] bg-[#ded6c5] disabled:bg-[#b3a078]",
    "6": "border-[#7d6125] bg-[#ded6c5] disabled:bg-[#b3a078]",
    "7": "border-pink-500 bg-pink-100 disabled:bg-pink-300",
    "8": "border-pink-500 bg-pink-100 disabled:bg-pink-300",
    "9": "border-pink-500 bg-pink-100 disabled:bg-pink-300",
  },
  D: {
    "1": "border-lime-500 bg-lime-100 disabled:bg-lime-300",
    "2": "border-lime-500 bg-lime-100 disabled:bg-lime-300",
    "3": "border-lime-500 bg-lime-100 disabled:bg-lime-300",
    "4": "border-slate-500 bg-slate-50 disabled:bg-slate-300",
    "5": "border-slate-500 bg-slate-50 disabled:bg-slate-300",
    "6": "border-slate-500 bg-slate-50 disabled:bg-slate-300",
    "7": "border-teal-500 bg-teal-100 disabled:bg-teal-300",
    "8": "border-teal-500 bg-teal-100 disabled:bg-teal-300",
    "9": "border-teal-500 bg-teal-100 disabled:bg-teal-300",
  },
  E: {
    "1": "border-lime-500 bg-lime-100 disabled:bg-lime-300",
    "2": "border-lime-500 bg-lime-100 disabled:bg-lime-300",
    "3": "border-lime-500 bg-lime-100 disabled:bg-lime-300",
    "4": "border-slate-500 bg-slate-50 disabled:bg-slate-300",
    "5": "border-slate-500 bg-slate-50 disabled:bg-slate-300",
    "6": "border-slate-500 bg-slate-50 disabled:bg-slate-300",
    "7": "border-teal-500 bg-teal-100 disabled:bg-teal-300",
    "8": "border-teal-500 bg-teal-100 disabled:bg-teal-300",
    "9": "border-teal-500 bg-teal-100 disabled:bg-teal-300",
  },
  F: {
    "1": "border-lime-500 bg-lime-100 disabled:bg-lime-300",
    "2": "border-lime-500 bg-lime-100 disabled:bg-lime-300",
    "3": "border-lime-500 bg-lime-100 disabled:bg-lime-300",
    "4": "border-slate-500 bg-slate-50 disabled:bg-slate-300",
    "5": "border-slate-500 bg-slate-50 disabled:bg-slate-300",
    "6": "border-slate-500 bg-slate-50 disabled:bg-slate-300",
    "7": "border-teal-500 bg-teal-100 disabled:bg-teal-300",
    "8": "border-teal-500 bg-teal-100 disabled:bg-teal-300",
    "9": "border-teal-500 bg-teal-100 disabled:bg-teal-300",
  },
  G: {
    "1": "border-purple-500 bg-purple-100 disabled:bg-purple-300",
    "2": "border-purple-500 bg-purple-100 disabled:bg-purple-300",
    "3": "border-purple-500 bg-purple-100 disabled:bg-purple-300",
    "4": "border-sky-500 bg-sky-100 disabled:bg-sky-300",
    "5": "border-sky-500 bg-sky-100 disabled:bg-sky-300",
    "6": "border-sky-500 bg-sky-100 disabled:bg-sky-300",
    "7": "border-orange-500 bg-orange-100 disabled:bg-orange-300",
    "8": "border-orange-500 bg-orange-100 disabled:bg-orange-300",
    "9": "border-orange-500 bg-orange-100 disabled:bg-orange-300",
  },
  H: {
    "1": "border-purple-500 bg-purple-100 disabled:bg-purple-300",
    "2": "border-purple-500 bg-purple-100 disabled:bg-purple-300",
    "3": "border-purple-500 bg-purple-100 disabled:bg-purple-300",
    "4": "border-sky-500 bg-sky-100 disabled:bg-sky-300",
    "5": "border-sky-500 bg-sky-100 disabled:bg-sky-300",
    "6": "border-sky-500 bg-sky-100 disabled:bg-sky-300",
    "7": "border-orange-500 bg-orange-100 disabled:bg-orange-300",
    "8": "border-orange-500 bg-orange-100 disabled:bg-orange-300",
    "9": "border-orange-500 bg-orange-100 disabled:bg-orange-300",
  },
  I: {
    "1": "border-purple-500 bg-purple-100 disabled:bg-purple-300",
    "2": "border-purple-500 bg-purple-100 disabled:bg-purple-300",
    "3": "border-purple-500 bg-purple-100 disabled:bg-purple-300",
    "4": "border-sky-500 bg-sky-100 disabled:bg-sky-300",
    "5": "border-sky-500 bg-sky-100 disabled:bg-sky-300",
    "6": "border-sky-500 bg-sky-100 disabled:bg-sky-300",
    "7": "border-orange-500 bg-orange-100 disabled:bg-orange-300",
    "8": "border-orange-500 bg-orange-100 disabled:bg-orange-300",
    "9": "border-orange-500 bg-orange-100 disabled:bg-orange-300",
  },
};

export default function NumberBox({
  name,
  letter,
  number,
  index,
  value,
  handleInputBox,
  solved,
}: NumberBoxProps) {
  // State that helps up to disable boxes that have an initial value
  const [isInitial, setIsInitial] = useState(false);
  // Need to get the letter and number from the coordinate
  const coordLetter = name.substring(0, 1);
  const coordNumber = name.substring(1);
  // With it we can get the styles for each square, 1st we get the key for the borders
  const borderStyle = INDEX_BORDERS.filter(index =>
    index.includes(coordNumber),
  )[0] as keyof typeof BORDERS;
  const blockKey = coordLetter as keyof typeof BLOCKS; // Then the key for the block
  const borderKey = coordNumber as BlockSubKey; // And the subkey for that block

  // Effect that activates when box is rendered for 1st time
  useEffect(() => {
    // If the box have an initial value at the start, indicate it
    if (value !== "") setIsInitial(true);
  }, []);

  // Function to handle the inputs from user
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    handleInputBox(e.target.value, index); // Replace the character in the sudoku with the user value
  }, []);

  // Return the Input to play sudoku
  return letter == null && number == null ? (
    <input
      type="text"
      className={`h-10 w-10 pb-3 pl-3 pr-0 text-2xl invalid:border-red-500 invalid:bg-red-100 focus:invalid:ring-red-500 ${BLOCKS[blockKey][borderKey]} ${BORDERS[borderStyle][blockKey]}`}
      autoComplete="off"
      maxLength={1}
      minLength={0}
      pattern="^[0-9]$"
      name={name}
      value={value}
      onChange={handleChange}
      disabled={isInitial || solved}
    />
  ) : (
    <div className="relative h-10 w-10">
      {"ABCDEFGHI".includes(coordLetter) && (
        <p className="absolute -left-4 bottom-2 text-2xl sm:-left-6">
          {letter}
        </p>
      )}
      {"123456789".includes(coordNumber) && (
        <p className="absolute -top-9 left-3.5 text-2xl">{number}</p>
      )}
      <input
        type="text"
        className={`h-full w-full pb-3 pl-3 pr-0 text-2xl invalid:border-red-500 invalid:bg-red-100 focus:invalid:ring-red-500 ${BLOCKS[blockKey][borderKey]} ${BORDERS[borderStyle][blockKey]}`}
        autoComplete="off"
        maxLength={1}
        minLength={0}
        pattern="^[1-9]$"
        name={name}
        value={value}
        onChange={handleChange}
        disabled={isInitial || solved}
      />
    </div>
  );
}
