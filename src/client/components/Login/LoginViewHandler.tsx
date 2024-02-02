import Button from "../SystemDesign/Button";
import LogInForm from "./LoginForm";
import SignInForm from "./SignInForm";
import type { User } from "../../types";

interface LoginViewHandlerProps {
  createUser: ({ username, password }: User) => Promise<boolean>;
  handleView: () => void;
  loginUser: ({ username, password }: User) => Promise<boolean>;
  setView: React.Dispatch<React.SetStateAction<boolean>>;
  view: boolean;
}

export default function LoginViewHandler({
  createUser,
  handleView,
  loginUser,
  setView,
  view,
}: LoginViewHandlerProps) {
  const colorButton = view
    ? "border-lime-700 hover:bg-lime-700"
    : "border-sky-700 hover:bg-sky-700";
  const mainShadow = view ? "shadow-lime-700" : "shadow-cyan-500";

  return (
    <article
      className={`mx-auto flex h-1/2 w-3/4 flex-col justify-center gap-8 rounded-xl bg-slate-50 px-4 py-2 shadow-md ${mainShadow} transition-shadow md:w-1/2`}
    >
      {!view ? (
        <LogInForm loginUser={loginUser} />
      ) : (
        <SignInForm createUser={createUser} setSignIn={setView} />
      )}
      <div className="flex w-full justify-center">
        <Button onClick={handleView} color={colorButton}>
          {view ? "Login with your user!" : "Register new user!"}
        </Button>
      </div>
    </article>
  );
}
