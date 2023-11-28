import { type ChangeEvent, useState, type FormEvent } from "react"
import { useStockViewer } from "../../hooks/useStockViewer"
import UnauthorizedAccess from "../NotFound/AuthError"
import type { IStocksData, SingleConsultStock } from "../../../server/types/advancedMisc"
import { ERROR_STOCK } from "../../../server/schemas/advancedMisc"

export default function StockViewer() {
    const { errorAuth, viewStock } = useStockViewer()
    const [stock1, setStock1] = useState("")
    const [stock2, setStock2] = useState("")
    const [like, setLike] = useState(false)
    const [localError, setLocalError] = useState<string | null>(null)
    const [singleStock, setSingleStock] = useState<null | SingleConsultStock>(null)
    const [groupStock, setGroupStock] = useState<null | IStocksData>(null)
    const [loading, setLoading] = useState(false)

    const handleStock1 = (e: ChangeEvent<HTMLInputElement>) => {
        setStock1(e.target.value)
    }
    const handleStock2 = (e: ChangeEvent<HTMLInputElement>) => {
        setStock2(e.target.value)
    }
    const handleLike = (e: ChangeEvent<HTMLInputElement>) => {
        setLike(e.target.checked)
    }

    const handleViewer = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (stock1 !== "" && stock2 !== "") {
            const stocks = [stock1, stock2]
            setLoading(true)
            const result = await viewStock({ stock: stocks, like })
            setLoading(false)
            setLocalError(null)
            if (result === ERROR_STOCK.INVALID) {
                setLocalError(result)
                setTimeout(() => { setLocalError(null) }, 3000)
            }
            else {
                setSingleStock(null)
                setGroupStock(result as IStocksData)
            }
        }
        else {
            const stock = stock1 !== "" ? stock1 : stock2
            if (stock === "") {
                setLocalError("Please fill at least 1 field to view the data")
            }
            else {
                setLoading(true)
                const result = await viewStock({ stock, like })
                setLoading(false)
                setLocalError(null)
                if (result === ERROR_STOCK.INVALID) {
                    setLocalError(result)
                    setTimeout(() => { setLocalError(null) }, 3000)
                }
                else {
                    setGroupStock(null)
                    setSingleStock(result as SingleConsultStock)
                }
            }
        }
    }
    return (
        <div>
            {localError !== null && <h2>{localError}</h2>}
            {errorAuth.cause !== null ? <UnauthorizedAccess errorAuth={errorAuth} /> :
                <div>
                    <form onSubmit={handleViewer}>
                        <label htmlFor="">
                            Stock 1: <input type="text" onChange={handleStock1} value={stock1} />
                        </label>
                        <label htmlFor="">
                            Stock 2: <input type="text" onChange={handleStock2} value={stock2} />
                        </label>
                        <label htmlFor="">
                            Like? <input type="checkbox" onChange={handleLike} checked={like} />
                        </label>
                        <button disabled={loading}>{loading ? "Loading" : "View Stock Data"}</button>
                    </form>
                    <div>
                        {singleStock !== null && <section>
                            <p>Stock name: {singleStock.stock}</p>
                            <p>Price: {singleStock.price}</p>
                        </section>}
                        {groupStock?.stockData.map(stock => {
                            return (
                                <section key={stock.stock}>
                                    <p>Stock name: {stock.stock}</p>
                                    <p>Price: {stock.price}</p>
                                </section>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )
}