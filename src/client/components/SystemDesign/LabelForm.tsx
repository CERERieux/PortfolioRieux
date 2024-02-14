interface LabelFormProps {
  children: React.ReactNode;
  style?: string;
}

export default function LabelForm({
  children,
  style = "items-center justify-center",
}: LabelFormProps) {
  return <label className={`flex w-full ${style} gap-2`}>{children}</label>;
}
