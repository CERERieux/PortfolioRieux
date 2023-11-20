import "./calculator.css"
import { useEffect } from "react"
import { useCalculatorStore, TYPE_INPUT } from "../../store/calculator"
import { CalculatorButton } from "./CalculatorButton"
import { calculatorInputLogic } from "./calculatorLogic"

export default function Calculator() {
    const { display, log } = useCalculatorStore()
    const { handleOperationInput, disableBackButton } = calculatorInputLogic()

    const handleKeydownEvent = (e: KeyboardEvent) => {
        // console.log(e.key)
        switch (e.key) {
            case "0": {
                handleOperationInput("0", TYPE_INPUT.NUMBER)
                break;
            }
            case "1": {
                handleOperationInput("1", TYPE_INPUT.NUMBER)
                break;
            }
            case "2": {
                handleOperationInput("2", TYPE_INPUT.NUMBER)
                break;
            }
            case "3": {
                handleOperationInput("3", TYPE_INPUT.NUMBER)
                break;
            }
            case "4": {
                handleOperationInput("4", TYPE_INPUT.NUMBER)
                break;
            }
            case "5": {
                handleOperationInput("5", TYPE_INPUT.NUMBER)
                break;
            }
            case "6": {
                handleOperationInput("6", TYPE_INPUT.NUMBER)
                break;
            }
            case "7": {
                handleOperationInput("7", TYPE_INPUT.NUMBER)
                break;
            }
            case "8": {
                handleOperationInput("8", TYPE_INPUT.NUMBER)
                break;
            }
            case "9": {
                handleOperationInput("9", TYPE_INPUT.NUMBER)
                break;
            }
            case "+": {
                handleOperationInput("+", TYPE_INPUT.OPERATOR)
                break;
            }
            case "-": {
                handleOperationInput("-", TYPE_INPUT.OPERATOR)
                break;
            }
            case "/": {
                handleOperationInput("/", TYPE_INPUT.OPERATOR)
                break;
            }
            case "*": {
                handleOperationInput("*", TYPE_INPUT.OPERATOR)
                break;
            }
            case "Backspace": {
                if (disableBackButton(TYPE_INPUT.BACK))
                    return
                handleOperationInput("Back", TYPE_INPUT.BACK)
                break;
            }
            case ".": {
                handleOperationInput(".", TYPE_INPUT.DOT)
                break;
            }
            case "Enter": {
                handleOperationInput("=", TYPE_INPUT.EQUAL)
                break;
            }
            case "Escape": {
                handleOperationInput("AC", TYPE_INPUT.CLEAR)
                break;
            }
            default: {
                break;
            }
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeydownEvent)
        return (() => {
            document.removeEventListener("keydown", handleKeydownEvent)
        })
    }, [display, log])

    return (
        <div>
            <header>
                <h2 className="title-calculator">Calculator</h2>
            </header>
            <main className="calculator-container">
                <div className="calculator">
                    <div className="calculator-display">
                        <p className="display">{display}</p>
                    </div>
                    <div className="calculator-button-zone">
                        <div className="special-operation-zone">
                            <CalculatorButton id={"AC"} type={TYPE_INPUT.CLEAR} />
                            <CalculatorButton id={"Back"} type={TYPE_INPUT.BACK} />
                            <CalculatorButton id={"Ans"} type={"Ans"}></CalculatorButton>
                            <CalculatorButton id={"ON"} type={"Power"}></CalculatorButton>
                        </div>
                        <div className="number-zone">
                            <CalculatorButton id={"7"} type={TYPE_INPUT.NUMBER} />
                            <CalculatorButton id={"8"} type={TYPE_INPUT.NUMBER} />
                            <CalculatorButton id={"9"} type={TYPE_INPUT.NUMBER} />
                            <CalculatorButton id={"4"} type={TYPE_INPUT.NUMBER} />
                            <CalculatorButton id={"5"} type={TYPE_INPUT.NUMBER} />
                            <CalculatorButton id={"6"} type={TYPE_INPUT.NUMBER} />
                            <CalculatorButton id={"1"} type={TYPE_INPUT.NUMBER} />
                            <CalculatorButton id={"2"} type={TYPE_INPUT.NUMBER} />
                            <CalculatorButton id={"3"} type={TYPE_INPUT.NUMBER} />
                            <CalculatorButton id={"0"} type={TYPE_INPUT.NUMBER} />
                            <CalculatorButton id={"."} type={TYPE_INPUT.DOT} />
                            <CalculatorButton id={"="} type={TYPE_INPUT.EQUAL} />
                        </div>
                        <div className="operator-zone">
                            <CalculatorButton id={"+"} type={TYPE_INPUT.OPERATOR} />
                            <CalculatorButton id={"-"} type={TYPE_INPUT.OPERATOR} />
                            <CalculatorButton id={"*"} type={TYPE_INPUT.OPERATOR} />
                            <CalculatorButton id={"/"} type={TYPE_INPUT.OPERATOR} />
                        </div>
                    </div>
                </div>
                <div className="calculator-log">
                    <ul>
                        {log.map((operation, i) => (<li key={i}>{operation}</li>))}
                    </ul>
                </div>
            </main>
        </div >
    )
}