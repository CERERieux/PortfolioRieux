interface ActionButtonProps {
  children: React.ReactNode;
  coverColor: string;
  hoverColor: string;
  groupName: string[];
  position: string;
  tooltipText: string;
  tooltipPos: string;
  onClick?: () => void;
  disabled?: boolean;
  id?: string;
  name?: string;
}

export default function ActionButton({
  children,
  onClick,
  disabled,
  coverColor,
  hoverColor,
  groupName,
  position,
  tooltipText,
  tooltipPos,
  id,
  name,
}: ActionButtonProps) {
  return (
    <button
      className={`${groupName[0]} absolute ${position} rounded-full shadow-sm ${coverColor} p-1 transition-all hover:scale-110 hover:shadow-lg ${hoverColor} active:scale-90 active:shadow-none disabled:bg-slate-400 disabled:shadow-none disabled:hover:scale-100 disabled:hover:text-black [&_p]:disabled:opacity-0`}
      onClick={onClick}
      disabled={disabled}
      id={id}
      name={name}
    >
      <p
        className={`absolute ${tooltipPos} hidden rounded-md bg-black/60 px-1 text-[10px] text-white ${groupName[1]}`}
      >
        {tooltipText}
      </p>
      {children}
    </button>
  );
}
