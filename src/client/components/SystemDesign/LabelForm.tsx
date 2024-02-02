interface LabelFormProps {
  children: React.ReactNode;
}

export default function LabelForm({ children }: LabelFormProps) {
  return (
    <label className="flex w-full items-center justify-center gap-2">
      {children}
    </label>
  );
}
