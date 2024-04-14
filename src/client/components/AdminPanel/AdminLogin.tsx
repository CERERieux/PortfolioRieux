import { useUser } from "../../store/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ERROR_GUSER } from "../../../server/schemas/global";
import AdminForm from "./AdminForm";
import ErrorMessage from "../SystemDesign/ErrorMessage";

export default function AdminLogin() {
  const navigate = useNavigate();
  const mainColor = "bg-gradient-to-t from-lime-400 to-lime-50 from-10%";
  const mainShadow = "shadow-lime-700";
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
        console.log(username, import.meta.env.ADMIN);
        if (username === import.meta.env.VITE_ADMIN) {
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
    <div
      className={`flex h-full w-full items-center justify-center ${mainColor} transition-all duration-500`}
    >
      {error != null && <ErrorMessage>{error}</ErrorMessage>}
      {token === "" ? (
        <div
          className={`mx-auto flex h-1/2 w-3/4 flex-col justify-center gap-8 rounded-xl bg-slate-50 px-4 py-2 shadow-md ${mainShadow} transition-shadow md:w-1/2`}
        >
          <AdminForm loginAdmin={loginAdmin} />
        </div>
      ) : (
        <section className="flex h-full w-full items-center justify-center bg-gradient-to-b from-slate-900 transition-all">
          <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border border-x-4 border-y-4 border-blue-800/45 bg-blue-100 px-4 py-2 shadow-inner shadow-blue-800/75 md:w-2/5">
            <h2 className="text-3xl italic first-letter:text-4xl first-letter:text-red-500">
              Redirecting...
            </h2>
            <p className="text-balance text-center text-sm">
              Remember to log off when you end using this account!
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
