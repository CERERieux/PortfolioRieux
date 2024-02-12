import { useEffect, type ChangeEvent, useState, useRef } from "react";

interface TextInputProps {
  autoComplete?: string;
  max?: number;
  min?: number;
  name: string;
  placeHolder?: string;
  required?: boolean;
  type: string;
  value: string;
  lineStyle: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function TextInput({
  autoComplete,
  max,
  min,
  name,
  placeHolder,
  required,
  type,
  value,
  lineStyle,
  onChange,
}: TextInputProps) {
  const modified = useRef(false);
  const [localError, setLocalError] = useState("");
  const localInput = document.getElementsByName(name)[0];
  const invalidStyles =
    localInput != null && modified.current
      ? "invalid:border-red-500 focus:invalid:ring-red-500 invalid:bg-red-100 invalid:placeholder:text-red-300"
      : "";
  const styleLine = lineStyle
    ? "border-x-0 border-t-0 bg-transparent py-0 pt-1 focus:ring-0"
    : "";

  useEffect(() => {
    if (localInput !== undefined) {
      console.log(value, value === "");
      if (value !== "" && !modified.current) modified.current = true;
      if (
        !(localInput as HTMLInputElement).checkValidity() &&
        modified.current
      ) {
        const validity = (localInput as HTMLInputElement).validity;
        const error = errorInput({ validity, type, min, max });
        setLocalError(error);
      } else {
        setLocalError("");
      }
    }
  }, [value]);

  return (
    <div className="relative h-full">
      <input
        autoComplete={autoComplete}
        maxLength={max}
        minLength={min}
        name={name}
        placeholder={placeHolder}
        required={required}
        type={type}
        value={value}
        onChange={onChange}
        className={`${invalidStyles} ${styleLine} placeholder:text-sm placeholder:text-gray-300 `}
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
