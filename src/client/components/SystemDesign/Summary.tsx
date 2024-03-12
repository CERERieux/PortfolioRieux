interface SummaryProps {
  children: React.ReactNode;
  canOpen?: boolean;
  needPad?: boolean;
  extraStyles?: string;
}

export default function Summary({
  children,
  extraStyles,
  canOpen = true,
  needPad = true,
}: SummaryProps) {
  const openStyle = canOpen
    ? "after:absolute after:top-1.5 after:text-2xl after:right-2 after:content-['+']"
    : "";
  const padding = needPad ? "py-2 pl-2" : "";
  return (
    <summary
      className={`relative flex items-center gap-4 text-center text-lg ${openStyle} ${padding} transition-all ${extraStyles}`}
    >
      {children}
    </summary>
  );
}
