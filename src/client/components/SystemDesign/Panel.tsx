interface PanelProps {
  children: React.ReactNode;
  extraStyle?: string;
  bgColor: string;
  borderColor: string;
  shadowColor?: string;
}

export default function Panel({
  children,
  bgColor,
  borderColor,
  shadowColor = "shadow-black/30",
  extraStyle,
}: PanelProps) {
  return (
    <div className="relative md:h-full md:w-full">
      <div
        className={`${bgColor} ${borderColor} ${shadowColor} ${extraStyle} rounded-xl border-8 shadow-lg md:h-3/4 md:w-1/2`}
      >
        {children}
      </div>
    </div>
  );
}
