interface DetailsProps {
  children: React.ReactNode;
  open?: boolean;
  bgCoverColor?: string;
  extraStyles?: string;
  textCoverColor?: string;
}

export default function Details({
  children,
  open,
  bgCoverColor = "hover:bg-slate-50/85",
  textCoverColor = "hover:text-black",
  extraStyles,
}: DetailsProps) {
  return (
    <details
      open={open}
      className={`w-3/4 rounded-lg border transition-all duration-200 open:w-3/4 ${bgCoverColor} sm:w-1/2 open:sm:w-1/2 md:w-3/5 open:md:w-3/5 ${extraStyles} ${textCoverColor}`}
    >
      {children}
    </details>
  );
}
