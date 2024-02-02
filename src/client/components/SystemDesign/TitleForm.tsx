interface TitleFormProps {
  children: React.ReactNode;
  firstColor: string;
}

export default function TitleForm({ children, firstColor }: TitleFormProps) {
  return (
    <h2
      className={`text-pretty text-center text-xl first-letter:text-2xl ${firstColor}`}
    >
      {children}
    </h2>
  );
}
