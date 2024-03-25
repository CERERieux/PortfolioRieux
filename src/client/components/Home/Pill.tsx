interface PillProps {
  children: React.ReactNode;
  to: string;
  size?: string;
}

export default function Pill({ children, to, size }: PillProps) {
  return (
    <a
      className={`flex items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-1 shadow-md shadow-white/50 transition-all hover:scale-110 hover:bg-white/20 active:scale-95 active:bg-white/80 active:text-black`}
      href={to}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  );
}
