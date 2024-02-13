interface PropsButton {
  color: string;
  xSize?: string;
  mediaSize?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
export default function Button({
  color,
  xSize,
  mediaSize,
  children,
  onClick,
  disabled,
}: PropsButton) {
  const size = xSize ?? "w-1/2";
  return (
    <button
      className={`rounded-xl border px-2 py-1 hover:border-black hover:text-white ${color} ${size} ${mediaSize}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
