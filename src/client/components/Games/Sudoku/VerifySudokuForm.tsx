import { type FormEvent, useState, type ChangeEvent } from "react";
import { useSudokuStore } from "../../../store/sudoku";
import Button from "../../SystemDesign/Button";
import Form from "../../SystemDesign/Form";
import TitleInput from "../../SystemDesign/TitleInput";
import TitleForm from "../../SystemDesign/TitleForm";
import LabelForm from "../../SystemDesign/LabelForm";
import Input from "../../SystemDesign/Input";
import { CloseNavButton } from "../../SystemDesign/CloseNavButton";

interface VerifySudokuFormProps {
  handleOpacity: () => void;
  opacity: string;
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
  // Auxiliar function that handle the submit of the form
  const handleVerify = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent to submit it
    const newCoord = coord.toUpperCase(); // Get the coordinate with the format we want
    // If the input of user don't fullfil the patter of a coordinate, show an error
    if (!/^[A-I][1-9]$/.test(newCoord)) {
      setErrorForm(
        "Please ensure that the coordinate is a valid one. Example: A1, B3, I9, etc.",
      );
    } else if (!/^[1-9]$/.test(numberVerify)) {
      // Same with the value
      setErrorForm(
        "Please, only put valid values in the number field. Example: 1,4,5,9.",
      );
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
            Verify a Coordinate
          </TitleForm>
          <p className="w-fit text-balance px-6 text-center text-sm italic text-blue-200">
            This only verify if the input you want to do is valid in the current
            Sudoku! <br />
            It doesn&#39;t reveal if it&apos;s actually correct or not.
          </p>
          <LabelForm>
            <TitleInput firstColor="first-letter:text-blue-300" required>
              Coordinate
            </TitleInput>
            <Input
              lineStyle
              name="CoordinateVerifyValue"
              onChange={handleCoord}
              type="text"
              value={coord}
              size={2}
              max={2}
            />
          </LabelForm>
          <LabelForm>
            <TitleInput firstColor="first-letter:text-blue-300" required>
              Number
            </TitleInput>
            <Input
              lineStyle
              name="CoordinateVerifyValue"
              onChange={handleNumberVerify}
              type="text"
              value={numberVerify}
              size={1}
              max={1}
            />
          </LabelForm>
          <Button
            color="bg-lime-200 border-lime-500 hover:bg-lime-600 hover:border-lime-300 shadow-md shadow-lime-700 hover:shadow-sm active:bg-slate-600 active:border-slate-50 active:shadow-none"
            xSize="w-40"
            extraStyles="text-black"
          >
            Verify Coordinate
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
            Result:{" "}
            <span
              className={`${
                validCoord ? "text-green-600" : "text-red-600"
              } text-sm italic underline`}
            >
              {validCoord ? "It's a valid value" : "Invalid value"}
            </span>
          </h4>
          {conflicts != null && (
            <>
              <h5 className="text-sm first-letter:text-base first-letter:text-blue-500">
                Your input conflict in the next area
                {conflicts.length > 1 && "s"}:
              </h5>
              <ul className="pl-6 *:list-inside *:list-disc *:text-sm *:text-red-600">
                {conflicts.map((conflict, i) => {
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
