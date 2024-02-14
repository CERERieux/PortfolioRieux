import { type ChangeEvent, useEffect, useRef, useState } from "react";

interface DateInputProps {
  autoComplete?: string;
  id?: string;
  max?: string;
  min?: string;
  name: string;
  required?: boolean;
  step?: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  lineStyle: boolean;
  newCycle?: boolean;
}

export default function DateInput({
  lineStyle,
  name,
  onChange,
  value,
  autoComplete,
  id,
  max,
  min,
  required,
  step,
  newCycle = false, // Auxiliar to indicate we are in a new cycle and input "modified" flag can be reseted
}: DateInputProps) {
  const modified = useRef(false); // Flag to see if user already interact with the form
  const [localError, setLocalError] = useState(""); // State to save the error that info can have
  const localInput = document.getElementsByName(name)[0]; // Auxiliar to get the input by name
  const invalidStyles =
    localInput != null && modified.current && !newCycle
      ? "invalid:border-red-500 focus:invalid:ring-red-500 invalid:bg-red-100 invalid:placeholder:text-red-300"
      : ""; // Styles in case info is bad and we can display it
  const styleLine = lineStyle
    ? "border-x-0 border-t-0 px-2 py-0 font-digitalDisplay uppercase bg-transparent pt-1 focus:ring-0"
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
      if (!modified.current) {
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
  }, [value, modified.current]);

  // Return a div with the input and the space for the error of the user info
  return (
    <div className="relative h-full">
      <input
        type="date"
        max={max}
        min={min}
        required={required}
        step={step}
        id={id}
        name={name}
        onChange={onChange}
        value={value}
        autoComplete={autoComplete}
        className={`${invalidStyles} ${styleLine} peer invalid:mb-4`}
      />
      <p
        className={`absolute text-sm italic text-red-500 [font-size:11px] [line-height:1rem] peer-invalid:-bottom-4`}
      >
        {localError}
      </p>
    </div>
  );
}

interface errorInputProps {
  validity: ValidityState;
  min?: string;
  max?: string;
}

// Function to see what error the info has and return a sentence to help user
function errorInput({ validity, min, max }: errorInputProps) {
  if (validity.stepMismatch)
    return `Please introduce a date within a valid range`;
  else if (validity.badInput) return `Only full dates are valid`;
  else if (validity.rangeUnderflow) return `Date can't be set before ${min}.`;
  else if (validity.rangeOverflow) return `Date can't be set after ${max}.`;
  else if (validity.valueMissing)
    return "Please don't leave the date field empty.";
  return "";
}
