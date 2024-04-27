interface PillProps {
  children: React.ReactNode;
  to: string;
  extraStyles?: string;
}

export default function Pill({ children, to, extraStyles }: PillProps) {
  return (
    <a
      className={`flex items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-1 shadow-md shadow-white/50 transition-all hover:scale-110 active:scale-95 active:bg-white/80 active:text-black ${
        extraStyles ?? "hover:bg-white/20"
      }`}
      href={to}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  );
}
