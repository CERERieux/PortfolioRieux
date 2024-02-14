interface TitleInputProps {
  children: React.ReactNode;
  firstColor?: string;
  required?: boolean;
}

export default function TitleInput({
  children,
  firstColor,
  required = false,
}: TitleInputProps) {
  const styleRequired = required
    ? "after:content-['*'] after:text-red-500"
    : "";
  return (
    <span className={`first-letter:text-lg ${firstColor} ${styleRequired}`}>
      {children}
    </span>
  );
}
