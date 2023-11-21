import { useEffect, useState } from "react";
import { useUser } from "../store/user";
import { ERROR_GUSER } from "../../server/schemas/global";
import { type ErrorAuth } from "../types";

/** Custom hook that validates our token to access to our services from
 * the user interface, it returns a boolean that indicates if the validation
 * was successful or another variable that contains the error and the cause
 * of it
 * And the token of the user also is added here
 */
export function useVerification() {
  const { token, verifyToken } = useUser();
  const [errorAuth, setErrorAuth] = useState<ErrorAuth>({
    message: "",
    cause: null,
  });
  const [enableEx, setEnableEx] = useState(false);

  useEffect(() => {
    const verification = async () => {
      if (token === "")
        setErrorAuth({
          message: ERROR_GUSER.USER_NOT_FOUND,
          cause: "NotLoggedIn",
        });
      else {
        const resultToken = await verifyToken(token);
        if (resultToken === ERROR_GUSER.EXPIRED_TOKEN) {
          setErrorAuth({ message: resultToken, cause: "ExpiredToken" });
        } else if (resultToken === ERROR_GUSER.ERROR_VERIFY_TOKEN) {
          setErrorAuth({ message: resultToken, cause: "BadToken" });
        } else {
          setEnableEx(true);
        }
      }
    };

    verification();
  }, []);

  return {
    token,
    validFetch: enableEx,
    errorAuth,
  };
}
