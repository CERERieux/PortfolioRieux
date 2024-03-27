interface AnchorProps {
  isBgBlack?: boolean;
  children: React.ReactNode;
  color?: string;
  href: string;
}

export default function Anchor({
  color = "text-sky-400",
  href,
  children,
  isBgBlack = false,
}: AnchorProps) {
  const activeColor = isBgBlack
    ? "active:text-green-300"
    : "active:text-red-400";
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`${color} underline visited:text-purple-400 ${activeColor}`}
    >
      {children}
    </a>
  );
}
