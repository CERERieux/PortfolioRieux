import { useUser } from "../../store/user";
import ErrorMessage from "../SystemDesign/ErrorMessage";
import ActionMessage from "../SystemDesign/ActionMessage";
import RedirectLoginHome from "./RedirectLoginHome";
import LoginViewHandler from "./LoginViewHandler";
import useLogin from "../../hooks/useLogin";
import SimpleNavMenu from "../Menu/SimpleNavMenu";
import { useEffect } from "react";

export default function Login() {
  const { action, error, token } = useUser();
  const { view, createUser, handleView, loginUser, setView } = useLogin();
  const mainColor = view
    ? "bg-gradient-to-t from-lime-400 to-lime-50 from-10%"
    : "bg-gradient-to-t from-cyan-400 to-cyan-50 from-10%";

  // Use effect to change the title of the page
  useEffect(() => {
    document.title = "Login to Access my Services";
  }, []);

  return (
    <main
      className={`flex h-full w-full items-center justify-center ${mainColor} transition-all duration-500`}
    >
      <SimpleNavMenu />
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
