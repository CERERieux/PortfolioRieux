import { useQuote } from '../../hooks/useQuote' // Import a custom hook to manage the quotes

export function Quote() {
    const { quote, getNewQuote } = useQuote() // Bring a quote and a function that returns a new quote from the hook

    // Function that handle the user's input when they do click in the button
    const handleChangeQuote = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()  // Prevent the default action of the button
        getNewQuote() // Get a new quote to display
    }

    return (
        <>
            <div className='quote-box'>
                <div className='quote'>
                    <p className='text'>{quote?.quote}</p>
                    <p className='author'>{quote?.author}</p>
                </div>
                <button onClick={handleChangeQuote} className='new-quote'>New Quote</button>
            </div>
        </>
    )
}
