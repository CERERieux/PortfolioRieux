import { type ChangeEvent } from "react";

interface NumericInputProps {
  min?: number;
  max?: number;
  stepNum?: number;
  disabled?: boolean;
  placeholder?: string;
  styles?: string;
  id?: string;
  name?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function NumericInput({
  min,
  max,
  styles = "h-6 w-16 text-sm shadow-md shadow-black/50",
  disabled = false,
  placeholder,
  stepNum,
  id,
  name,
  required,
  value,
  onChange,
}: NumericInputProps) {
  return (
    <div className="relative">
      <input
        type="number"
        min={min}
        max={max}
        className={`${styles} rounded-2xl p-0 px-2 py-1 invalid:border-red-500 invalid:focus:ring-red-500`}
        disabled={disabled}
        placeholder={placeholder}
        step={stepNum}
        required={required}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
