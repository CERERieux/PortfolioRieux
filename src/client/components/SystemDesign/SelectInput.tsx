import { useState, type ChangeEvent, useRef, useEffect } from "react";

interface SelectInputProps {
  children: React.ReactNode;
  autoComplete?: string;
  id?: string;
  multiple?: boolean;
  name: string;
  required?: boolean;
  size?: number;
  value: string;
  lineStyle: boolean;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  newCycle?: boolean;
  extraStyles?: string;
}

export default function SelectInput({
  children,
  lineStyle,
  name,
  onChange,
  size,
  value,
  autoComplete,
  id,
  multiple,
  newCycle = false, // Auxiliar to indicate we are in a new cycle and input "modified" flag can be reseted
  required,
  extraStyles,
}: SelectInputProps) {
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
        const error = errorInput(validity);
        setLocalError(error);
      } else {
        setLocalError("");
      }
    }
  }, [value]);

  return (
    <div className="relative h-full">
      <select
        autoComplete={autoComplete}
        id={id}
        multiple={multiple}
        name={name}
        required={required}
        size={size}
        onChange={onChange}
        className={`${invalidStyles} ${styleLine} ${extraStyles}`}
        value={value}
      >
        {children}
      </select>
      <p className="absolute text-sm italic text-red-500 [font-size:11px] [line-height:1rem]">
        {localError}
      </p>
    </div>
  );
}

// Function to see what error the info has and return a sentence to help user
function errorInput(validity: ValidityState) {
  if (validity.valueMissing)
    return "Please don't leave the select option empty.";
  return "";
}
