import { type FormEvent, useState, type ChangeEvent } from "react";
import { useSudokuStore } from "../../../store/sudoku";
import Button from "../../SystemDesign/Button";
import Form from "../../SystemDesign/Form";
import TitleInput from "../../SystemDesign/TitleInput";
import TitleForm from "../../SystemDesign/TitleForm";
import LabelForm from "../../SystemDesign/LabelForm";
import Input from "../../SystemDesign/Input";
import { CloseNavButton } from "../../SystemDesign/CloseNavButton";
import { useLanguage } from "../../../hooks/useLanguage";
import { useSettingStore } from "../../../store/settingPortfolio";

interface VerifySudokuFormProps {
  handleOpacity: () => void;
  opacity: string;
}

function getSpanish(conflicts: string[] | null) {
  if (conflicts === null) return conflicts;
  const spanishConflicts = conflicts.map(conflict => {
    if (conflict === "row") return "fila";
    if (conflict === "column") return "columna";
    if (conflict === "region") return "región";
    return "";
  });
  return spanishConflicts;
}

export default function VerifySudokuForm({
  handleOpacity,
  opacity,
}: VerifySudokuFormProps) {
  const { conflicts, validCoord, verifyInput } = useSudokuStore(); // Get the values we need from the state
  // 3 Local states to handle the form that verify if a coordinate and a value are valid
  const [coord, setCoord] = useState(""); // State to save the coordinate
  const [numberVerify, setNumberVerify] = useState(""); // State to save the value to verify
  const [errorForm, setErrorForm] = useState<string | null>(null); // State to display an error when form is filled
  const text = useLanguage({ project: "Sudoku" });
  const { i18n } = useSettingStore();
  const currentConflict =
    i18n === "Español" ? getSpanish(conflicts) : conflicts;
  // Auxiliar function that handle the submit of the form
  const handleVerify = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent to submit it
    const newCoord = coord.toUpperCase(); // Get the coordinate with the format we want
    // If the input of user don't fullfil the patter of a coordinate, show an error
    if (!/^[A-I][1-9]$/.test(newCoord)) {
      setErrorForm(text[11]);
    } else if (!/^[1-9]$/.test(numberVerify)) {
      // Same with the value
      setErrorForm(text[12]);
    } else {
      // If both values are good, verify the input and set the local error to null
      verifyInput(numberVerify, newCoord as "^[A-I][0-9]$");
      setErrorForm(null);
    }
  };
  // 2 functions to handle the user input into the states
  const handleCoord = (e: ChangeEvent<HTMLInputElement>) => {
    setCoord(e.target.value);
  };
  const handleNumberVerify = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberVerify(e.target.value);
  };
  // Return the side section that appears when user select this option
  return (
    <section
      className={`absolute left-0 top-0 h-full w-full bg-gradient-to-t from-slate-100/80 from-10% to-slate-950/80 py-8 text-white backdrop-blur-sm sm:w-1/2 md:w-2/5 lg:w-1/3 ${opacity} flex flex-col items-center gap-4 shadow-xl shadow-black/40 transition-all duration-500 ease-in-out`}
    >
      <CloseNavButton handleOpacity={handleOpacity} bgColor="bg-white" />
      <div className="h-60 w-full">
        <Form submitFn={handleVerify}>
          <TitleForm firstColor="first-letter:text-blue-300">
            {text[13]}
          </TitleForm>
          <p className="w-fit whitespace-pre-wrap text-balance px-6 text-center text-sm italic text-blue-200">
            {text[14]}
          </p>
          <LabelForm>
            <TitleInput firstColor="first-letter:text-blue-300" required>
              {text[15]}
            </TitleInput>
            <Input
              lineStyle
              name="CoordinateVerifyValue"
              onChange={handleCoord}
              type="text"
              value={coord}
              size={2}
              max={2}
              autoComplete="off"
            />
          </LabelForm>
          <LabelForm>
            <TitleInput firstColor="first-letter:text-blue-300" required>
              {text[16]}
            </TitleInput>
            <Input
              lineStyle
              name="CoordinateVerifyValue"
              onChange={handleNumberVerify}
              type="text"
              value={numberVerify}
              size={1}
              max={1}
              autoComplete="off"
            />
          </LabelForm>
          <Button
            color="bg-lime-200 border-lime-500 hover:bg-lime-600 hover:border-lime-300 shadow-md shadow-lime-700 hover:shadow-sm active:bg-slate-600 active:border-slate-50 active:shadow-none"
            xSize="w-40"
            extraStyles="text-black"
          >
            {text[17]}
          </Button>
        </Form>
      </div>
      <p
        className={`mt-2 w-fit text-balance bg-slate-50/80 px-6 text-center text-sm italic text-red-500 transition-all ${
          errorForm == null ? "opacity-0" : "opacity-100"
        }`}
      >
        {errorForm}
      </p>
      {validCoord != null && (
        <section className="absolute bottom-16 w-full px-6 text-black">
          <h4 className="first-letter:text-lg first-letter:text-blue-500">
            {text[18]}:{" "}
            <span
              className={`${
                validCoord ? "text-green-600" : "text-red-600"
              } text-sm italic underline`}
            >
              {validCoord ? text[19] : text[20]}
            </span>
          </h4>
          {currentConflict != null && (
            <>
              <h5 className="text-sm first-letter:text-base first-letter:text-blue-500">
                {text[21]}:
              </h5>
              <ul className="pl-6 *:list-inside *:list-disc *:text-sm *:text-red-600">
                {currentConflict.map((conflict, i) => {
                  return <li key={i}>{conflict}</li>;
                })}
              </ul>
            </>
          )}
        </section>
      )}
    </section>
  );
}
