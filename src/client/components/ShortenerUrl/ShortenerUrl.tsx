import { useState, type FormEvent, type ChangeEvent } from "react"
import type { ShortUrlResult } from "../../types"

export default function ShortenerUrl() {
    const [userUrl, setUserUrl] = useState("")
    const [shortUrl, setShortUrl] = useState("")
    const [error, setError] = useState("")

    const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
        setUserUrl(e.target.value)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const fetchResult = await fetch("/cYSvQmg9kR/basic/shorturl", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: userUrl
            })
        }).then(async (data) => {
            if (data.ok) {
                const shortUrl: ShortUrlResult = await data.json()
                console.log(shortUrl)
                return shortUrl
            }
            return { error: "Can't make your short URL right now" }
        })
        console.log(fetchResult)
        if ("error" in fetchResult) {
            setError(fetchResult.error)
            setShortUrl("")
        }
        else {
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
                    <p>Your original URL is: {userUrl}</p>
                </div>}
            {error !== "" &&
                <div>
                    <p>{error}</p>
                </div>}
        </div>
    )
}