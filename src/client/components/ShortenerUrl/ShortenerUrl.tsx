import { useState, type FormEvent, type ChangeEvent } from "react"
import type { ShortUrlResult } from "../../types"
import { useUser } from "../../store/user"

export default function ShortenerUrl() {
    const [userUrl, setUserUrl] = useState("")
    const [shortUrl, setShortUrl] = useState("")
    const [error, setError] = useState("")
    const { token } = useUser()

    const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
        setUserUrl(e.target.value)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const fetchResult = await fetch("/cYSvQmg9kR/basic/shorturl", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                url: userUrl
            })
        }).then(async (data) => {
            if (data.ok) {
                const shortUrl: ShortUrlResult = await data.json()
                return shortUrl
            }
            return { error: "Can't make your short URL right now" }
        })
        if ("error" in fetchResult) {
            setError(fetchResult.error)
            setShortUrl("")
        }
        else {
            setUserUrl("")
            setShortUrl(fetchResult.short_url)
            setError("")
        }
        return null
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">
                        URL you want to shortener:
                        <input type="text" value={userUrl} onChange={handleUserInput} />
                    </label>
                </form>
            </div>
            {shortUrl !== "" &&
                <div>
                    <p>Your short URL is: {shortUrl}</p>
                </div>}
            {error !== "" &&
                <div>
                    <p>{error}</p>
                </div>}
        </div>
    )
}