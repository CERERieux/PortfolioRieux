import { useEffect, type ChangeEvent, useState, useRef } from "react";

interface TextInputProps {
  autoComplete?: string;
  id?: string;
  max?: number;
  min?: number;
  name: string;
  placeHolder?: string;
  required?: boolean;
  type: string;
  value: string;
  lineStyle: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  newCycle?: boolean;
}

export default function Input({
  autoComplete,
  id,
  max,
  min,
  name,
  placeHolder,
  required,
  type,
  value,
  lineStyle,
  onChange,
  newCycle = false, // Auxiliar to indicate we are in a new cycle and input "modified" flag can be reseted
}: TextInputProps) {
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
        const error = errorInput({ validity, type, min, max });
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
        id={id}
        maxLength={max}
        minLength={min}
        name={name}
        placeholder={placeHolder}
        required={required}
        type={type}
        value={value}
        onChange={onChange}
        className={`${invalidStyles} ${styleLine} placeholder:text-sm placeholder:text-gray-300`}
      />
      <p className="absolute text-sm italic text-red-500 [font-size:11px] [line-height:1rem]">
        {localError}
      </p>
    </div>
  );
}

interface errorInputProps {
  validity: ValidityState;
  type: string;
  min?: number;
  max?: number;
}
// Function to see what error the info has and return a sentence to help user
function errorInput({ validity, type, min, max }: errorInputProps) {
  if (validity.badInput) return "Only number inputs are allowed.";
  else if (validity.patternMismatch) {
    const example =
      type === "email" ? "example@live.com" : "https://www.google.com";
    return `Please introduce valid information. Example: ${example}`;
  } else if (validity.tooShort)
    return `Text needs to be ${min} character long at least.`;
  else if (validity.tooLong)
    return `Text do not have to exceed ${max} characters.`;
  else if (validity.valueMissing)
    return "Please don't leave the input field empty.";
  return "";
}
