interface MiniButtonProps {
  onClick?: () => void;
  size?: string;
  children: React.ReactNode;
  disabled?: boolean;
}
export default function MiniButton({
  children,
  disabled = false,
  onClick,
  size = "h-6 w-16",
}: MiniButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex ${size} items-center justify-center rounded-full border border-slate-50/70 bg-gray-600 text-white shadow-md shadow-black/50 hover:brightness-125 active:scale-90 active:shadow-none disabled:opacity-30`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
