import { Link, useLocation } from "react-router-dom";
import AdminUrls from "./AdminUrls";
import AdminLibrary from "./AdminLibrary";
import AdminIssues from "./AdminIssues";
import { useUserDataAdmin } from "../../hooks/useUserDataAdmin";
import { isAxiosError } from "axios";
import UnauthorizedAccess from "../NotFound/AuthError";


export default function UserDataAdmin() {
    const { state: userId }: { state: string } = useLocation()
    const {
        actionBook,
        actionIssue,
        actionUrl,
        data,
        error,
        errorAuth,
        isLoading,
        removeBook,
        removeIssue,
        removeLibrary,
        removeUrl,
        updateIssue,
        updateSuccessIssue, } = useUserDataAdmin(userId)

    return (
        <div>
            {error !== null && isAxiosError(error) && <h2>{error.response?.data.error}</h2>}
            {errorAuth.cause !== null ? <UnauthorizedAccess errorAuth={errorAuth} />
                : data !== undefined ?
                    <>
                        <h2>{data._id}&apos;s data</h2>
                        <Link to={`/${import.meta.env.VITE_ROUTE_ADMIN}/admin/users`}><button>Return</button></Link>
                        <AdminUrls shortUrl={data.shortUrl} user={data._id} removeUrl={removeUrl} actionDone={actionUrl} />
                        <AdminLibrary books={data.books} user={data._id} removeBook={removeBook} removeLibrary={removeLibrary} actionDone={actionBook} />
                        <AdminIssues issues={data.issues} removeIssue={removeIssue} updateIssue={updateIssue} updateSuccess={updateSuccessIssue} actionDone={actionIssue} />
                    </>
                    : isLoading ?
                        <h2>Loading...</h2>
                        : <h2>There is no data related to this user.</h2>
            }
        </div>
    )
}