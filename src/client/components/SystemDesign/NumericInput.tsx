import { useEffect, type ChangeEvent, useState, useRef } from "react";

interface NumericInputProps {
  autoComplete?: string;
  min?: number;
  max?: number;
  placeholder?: string;
  step?: number;
  disabled?: boolean;
  extraStyles?: string;
  id?: string;
  name: string;
  required?: boolean;
  value: string;
  lineStyle: boolean;
  newCycle?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function NumericInput({
  autoComplete,
  disabled,
  extraStyles,
  id,
  lineStyle = false,
  max,
  min,
  name,
  placeholder,
  required = false,
  step,
  value,
  onChange,
  newCycle = false, // Auxiliar to indicate we are in a new cycle and input "modified" flag can be reseted
}: NumericInputProps) {
  const modified = useRef(false); // Flag to see if user already interact with the form
  const [localError, setLocalError] = useState(""); // State to save the error that info can have
  const localInput = document.getElementsByName(name)[0]; // Auxiliar to get the input by name
  const invalidStyles =
    localInput != null && modified.current && !newCycle
      ? "invalid:border-red-500 focus:invalid:ring-red-500 invalid:bg-red-100 invalid:placeholder:text-red-300"
      : ""; // Styles in case info is bad and we can display it
  const styleLine = lineStyle
    ? "w-20 border-x-0 border-t-0 bg-transparent py-0 pt-1 focus:ring-0"
    : "h-6 w-16 rounded-2xl p-0 px-2 py-1 text-sm shadow-md shadow-black/50";
  // Auxiliar to change the look of the input

  // Use effect to reset input component in case we keep using it after sending the form
  useEffect(() => {
    if (newCycle) {
      modified.current = false;
    }
  }, [newCycle]);

  // Use effect to only check validity of input after user interact with it
  useEffect(() => {
    if (localInput !== undefined) {
      // Get element as an input element and its validity
      const currentInput = localInput as HTMLInputElement;
      const validity = currentInput.validity;
      // If it's modified we change the flag to display error if is needed
      if (value !== "" && !modified.current) {
        modified.current = true;
      }
      // Check for validity only if it was modified, if it have an error, display it
      if (!currentInput.checkValidity() && modified.current) {
        const error = errorInput({ validity, min, max });
        setLocalError(error);
      } else {
        setLocalError("");
      }
    }
  }, [value]);

  // Return a div with the input and the space for the error of the user info
  return (
    <div className="relative h-full">
      <input
        autoComplete={autoComplete}
        disabled={disabled}
        id={id}
        max={max}
        min={min}
        name={name}
        placeholder={placeholder}
        required={required}
        type="number"
        step={step}
        value={value}
        onChange={onChange}
        className={`${extraStyles} ${invalidStyles} ${styleLine} ${lineStyle}`}
      />
      <p className="absolute text-sm italic text-red-500 [font-size:11px] [line-height:1rem]">
        {localError}
      </p>
    </div>
  );
}

interface errorInputProps {
  validity: ValidityState;
  min?: number;
  max?: number;
}
// Function to see what error the info has and return a sentence to help user
function errorInput({ validity, min, max }: errorInputProps) {
  if (validity.badInput) return "Only number inputs are allowed.";
  else if (validity.rangeUnderflow) return `Lowest valid number is ${min}`;
  else if (validity.rangeOverflow) return `Highest valid number is ${max}`;
  else if (validity.stepMismatch) return "Only integer numbers are allowed.";
  else if (validity.valueMissing)
    return "Please don't leave the numeric field empty.";
  return "";
}
