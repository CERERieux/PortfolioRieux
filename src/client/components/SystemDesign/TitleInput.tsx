interface TitleInputProps {
  children: React.ReactNode;
  firstColor: string;
}

export default function TitleInput({ children, firstColor }: TitleInputProps) {
  return (
    <span className={`first-letter:text-lg ${firstColor}`}>{children}</span>
  );
}
