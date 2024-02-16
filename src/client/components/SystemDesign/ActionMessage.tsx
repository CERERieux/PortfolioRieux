interface ActionMessageProps {
  children: React.ReactNode;
  extraStyles?: string;
}

export default function ActionMessage({
  children,
  extraStyles,
}: ActionMessageProps) {
  return (
    <div
      className={`absolute top-10 mx-auto w-full text-pretty rounded-full bg-green-200 px-2 py-1 text-center text-sm text-green-700 md:w-1/2 md:text-base ${extraStyles}`}
    >
      {children}
    </div>
  );
}
