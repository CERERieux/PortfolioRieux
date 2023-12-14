import type { IShortenerUrl } from "../../../server/types/basic";
import type { DeleteOperationHook } from "../../types";
interface PropsUrl {
    shortUrl: IShortenerUrl[]
    user: string
    removeUrl: ({ id, userId }: DeleteOperationHook) => void
}

export default function AdminUrls({ shortUrl, user, removeUrl }: PropsUrl) {
    const handleDeleteUrl = (id: string) => {
        removeUrl({ id, userId: user })
    }

    return (
        <section>
            <h3>Short URLs</h3>
            <table>
                <thead>
                    <tr>
                        <th>Original Url</th>
                        <th>Short Url</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {shortUrl.length > 0 ?
                        shortUrl.map(url => {
                            const idUrl = url._id.toString()
                            return (
                                <tr key={idUrl}>
                                    <td>{url.originalUrl}</td>
                                    <td>{url.shortUrl}</td>
                                    <td><button onClick={() => { handleDeleteUrl(idUrl) }}>Delete</button></td>
                                </tr>
                            )
                        })
                        : <tr><td>User has not make any short URL</td></tr>
                    }
                </tbody>
            </table>
        </section>
    )
}