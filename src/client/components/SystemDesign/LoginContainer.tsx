interface LoginContainerProps {
  children: React.ReactNode;
}

export default function LoginContainer({ children }: LoginContainerProps) {
  return (
    <section className="flex h-2/3 w-full flex-col items-center justify-around gap-4">
      {children}
    </section>
  );
}
