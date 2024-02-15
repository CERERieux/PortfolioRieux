import { type FormEvent } from "react";

interface LoginFormProps {
  children: React.ReactNode;
  submitAsync?: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  submitFn?: (e: FormEvent<HTMLFormElement>) => void;
  id?: string;
  style?: string;
  mdMedia?: string;
  row?: boolean;
}

export default function Form({
  children,
  submitAsync,
  submitFn,
  id,
  style = "items-center justify-around gap-4",
  mdMedia = "[&_span]:md:w-1/5",
  row = false,
}: LoginFormProps) {
  const onSubmit = submitAsync ?? submitFn;
  const flexDir = row ? "flex-row" : "flex-col";
  return (
    <form
      onSubmit={onSubmit}
      className={`flex h-full w-full ${flexDir} ${style} [&_span]:w-1/4 [&_span]:text-right ${mdMedia}`}
      id={id}
    >
      {children}
    </form>
  );
}
