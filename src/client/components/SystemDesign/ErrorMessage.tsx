interface ErrorMessageProps {
  children: React.ReactNode;
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <div className="absolute top-10 mx-auto w-full text-pretty rounded-full bg-red-300 px-2 py-1 text-center text-sm text-red-800 md:w-1/2 md:text-base ">
      {children}
    </div>
  );
}
