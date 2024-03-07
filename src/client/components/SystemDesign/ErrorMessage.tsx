interface ErrorMessageProps {
  children: React.ReactNode;
  extraStyles?: string;
}

export default function ErrorMessage({
  children,
  extraStyles,
}: ErrorMessageProps) {
  return (
    <div
      className={`absolute top-10 z-10 mx-auto w-full text-pretty rounded-full bg-red-300 px-2 py-1 text-center text-sm text-red-800 shadow-md md:left-1/4 md:w-1/2 md:text-base ${extraStyles}`}
    >
      {children}
    </div>
  );
}
