import { useEffect, type ChangeEvent, useState, useRef } from "react";

interface TextAreaProps {
  extraStyles?: string;
  autoComplete?: string;
  placeHolder?: string;
  id?: string;
  name: string;
  cols: number;
  rows: number;
  max?: number;
  min?: number;
  required?: boolean;
  value: string;
  lineStyle: boolean;
  newCycle?: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({
  extraStyles,
  autoComplete = "off",
  placeHolder,
  id,
  name,
  cols = 20,
  rows = 2,
  max,
  min,
  required,
  value,
  lineStyle,
  onChange,
  newCycle = false, // Auxiliar to indicate we are in a new cycle and input "modified" flag can be reseted
}: TextAreaProps) {
  const modified = useRef(false); // Flag to see if user already interact with the form
  const [localError, setLocalError] = useState(""); // State to save the error that info can have
  const localInput = document.getElementsByName(name)[0]; // Auxiliar to get the input by name
  const invalidStyles =
    localInput != null && modified.current && !newCycle
      ? "invalid:border-red-500 focus:invalid:ring-red-500 invalid:bg-red-100 invalid:placeholder:text-red-300"
      : ""; // Styles in case info is bad and we can display it
  const styleLine = lineStyle
    ? "border-x-0 border-t-0 bg-transparent py-0 pt-1 focus:ring-0"
    : ""; // Auxiliar to change the look of the input

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
      // Check for validity, if it have an error, display it
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
      <textarea
        autoComplete={autoComplete}
        id={id}
        name={name}
        cols={cols}
        rows={rows}
        maxLength={max}
        minLength={min}
        placeholder={placeHolder}
        spellCheck
        required={required}
        value={value}
        onChange={onChange}
        className={`${invalidStyles} ${styleLine} ${extraStyles} resize-none placeholder:text-sm placeholder:text-gray-300`}
      />
      <p className="absolute text-sm italic text-red-500 [font-size:11px] [line-height:1rem]">
        {localError}
      </p>
      {max != null && (
        <p className="absolute -bottom-3 right-6 text-sm italic">
          {max - value.length}
        </p>
      )}
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
  if (validity.badInput) return "You put an invalid character.";
  else if (validity.tooShort)
    return `Text needs to be ${min} character long at least.`;
  else if (validity.tooLong)
    return `Text do not have to exceed ${max} characters.`;
  else if (validity.valueMissing)
    return "Please don't leave the text area empty.";
  return "";
}
