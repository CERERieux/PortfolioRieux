import { useEffect, useState } from "react";
import { useUser } from "../store/user";
import { ERROR_GUSER } from "../../server/schemas/global";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();
  const { token, createUser, loginUser, logoffUser, verifyToken } = useUser();
  const [signIn, setSignIn] = useState(false);

  // An useEffect hook to redirect user in case they is already logged in
  useEffect(() => {
    const verifyStart = async () => {
      let result;
      if (token !== "") result = await verifyToken(token);
      // In case user token is expired or is bad we need to login again
      if (
        result === ERROR_GUSER.EXPIRED_TOKEN ||
        result === ERROR_GUSER.ERROR_VERIFY_TOKEN
      ) {
        logoffUser(); // Logout user to remove token
      } else if (token !== "") {
        // If user is logged in and it's valid, redirect to home
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    };
    verifyStart();
  }, []);

  const handleView = () => {
    setSignIn(state => !state);
  };

  return {
    handleView,
    view: signIn,
    setView: setSignIn,
    createUser,
    loginUser,
  };
}
