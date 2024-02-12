import { type FormEvent } from "react";

interface LoginFormProps {
  children: React.ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  id?: string;
}

export default function LoginForm({ children, onSubmit, id }: LoginFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex h-full w-full flex-col items-center justify-around gap-4 [&_span]:w-1/4 [&_span]:text-right [&_span]:md:w-1/5"
      id={id}
    >
      {children}
    </form>
  );
}
