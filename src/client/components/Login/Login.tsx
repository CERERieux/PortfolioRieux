import { useUser } from "../../store/user";
import ErrorMessage from "../SystemDesign/ErrorMessage";
import ActionMessage from "../SystemDesign/ActionMessage";
import RedirectLoginHome from "./RedirectLoginHome";
import LoginViewHandler from "./LoginViewHandler";
import useLogin from "../../hooks/useLogin";

export default function Login() {
  const { action, error, token } = useUser();
  const { view, createUser, handleView, loginUser, setView } = useLogin();
  const mainColor = view ? "bg-lime-500" : "bg-cyan-300";

  return (
    <main
      className={`flex h-full w-full items-center justify-center ${mainColor} transition-color duration-500`}
    >
      {error != null && (
        <ErrorMessage>
          <p>{error}</p>
        </ErrorMessage>
      )}
      {action != null && (
        <ActionMessage>
          <p>{action}</p>
        </ActionMessage>
      )}
      {token === "" ? (
        <LoginViewHandler
          createUser={createUser}
          handleView={handleView}
          loginUser={loginUser}
          setView={setView}
          view={view}
        />
      ) : (
        <RedirectLoginHome />
      )}
    </main>
  );
}
