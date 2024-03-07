interface PropsButton {
  color: string;
  xSize?: string;
  mediaSize?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  formmethod?: string;
  name?: string;
  id?: string;
  type?: "button" | "submit" | "reset" | undefined;
  transition?: boolean;
  extraStyles?: string;
}
export default function Button({
  id,
  name,
  color,
  xSize,
  mediaSize,
  children,
  onClick,
  disabled,
  formmethod,
  type,
  transition = true,
  extraStyles,
}: PropsButton) {
  const size = xSize ?? "w-1/2";
  return (
    <button
      className={`rounded-xl border px-2 py-1 hover:border-black hover:text-white ${color} ${size} ${mediaSize} disabled:border-gray-500 disabled:bg-gray-300 disabled:text-black/40 disabled:shadow-none hover:disabled:text-black/40 ${
        transition && "transition-all"
      } ${extraStyles}`}
      id={id}
      name={name}
      onClick={onClick}
      disabled={disabled}
      formMethod={formmethod}
      type={type}
    >
      {children}
    </button>
  );
}
