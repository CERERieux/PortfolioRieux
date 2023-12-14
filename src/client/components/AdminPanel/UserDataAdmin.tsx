import { useLocation } from "react-router-dom";
import type { AllUsers } from "../../types";
import AdminUrls from "./AdminUrls";
import { useAdmin } from "../../hooks/useAdmin";
import AdminLibrary from "./AdminLibrary";
import AdminIssues from "./AdminIssues";

export default function UserDataAdmin() {
    const { removeBook, removeIssue, removeLibrary, removeUrl, updateIssue } = useAdmin()
    const { state }: { state: AllUsers } = useLocation()
    const { books, issues, shortUrl } = state
    return (
        <div>
            <h2>{state._id}&apos;s data</h2>
            <AdminUrls shortUrl={shortUrl} user={state._id} removeUrl={removeUrl} />
            <AdminLibrary books={books} user={state._id} removeBook={removeBook} removeLibrary={removeLibrary} />
            <AdminIssues issues={issues} removeIssue={removeIssue} updateIssue={updateIssue} />
        </div>
    )
}