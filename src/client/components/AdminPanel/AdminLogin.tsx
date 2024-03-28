import { useUser } from "../../store/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ERROR_GUSER } from "../../../server/schemas/global";
import AdminForm from "./AdminForm";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { error, token, logoffUser, verifyToken, loginAdmin, username } =
    useUser();

  // An useEffect hook to redirect admin in case they is already logged in
  useEffect(() => {
    const verifyStart = async () => {
      let result;
      if (token !== "") {
        result = await verifyToken(token);
        // In case user token is expired or is bad we need to login again
        if (
          result === ERROR_GUSER.EXPIRED_TOKEN ||
          result === ERROR_GUSER.ERROR_VERIFY_TOKEN
        ) {
          logoffUser(); // Logout admin to remove token
        }
        // If user is logged, we need to see if it's admin or not
        if (username === process.env.ADMIN) {
          setTimeout(() => {
            navigate(`/${import.meta.env.VITE_ROUTE_ADMIN}/admin/menu`);
          }, 100);
        } else {
          // If is not admin, redirect it to h ome
          navigate("/home");
        }
      }
    };
    verifyStart();
  }, []);

  return (
    <div>
      {error != null && <p>{error}</p>}
      {token === "" ? (
        <div>
          <AdminForm loginAdmin={loginAdmin} />
        </div>
      ) : (
        <div>
          <h2>Redirecting...</h2>
        </div>
      )}
    </div>
  );
}
