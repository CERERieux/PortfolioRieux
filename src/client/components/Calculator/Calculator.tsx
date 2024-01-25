import { useEffect } from "react";
import { useCalculatorStore, TYPE_INPUT } from "../../store/calculator";
import { CalculatorButton } from "./CalculatorButton";
import { calculatorInputLogic } from "./calculatorLogic";

export default function Calculator() {
  const { display, log } = useCalculatorStore();
  const { handleOperationInput, disableBackButton } = calculatorInputLogic();

  const handleKeydownEvent = (e: KeyboardEvent) => {
    // console.log(e.key)
    switch (e.key) {
      case "0": {
        handleOperationInput("0", TYPE_INPUT.NUMBER);
        break;
      }
      case "1": {
        handleOperationInput("1", TYPE_INPUT.NUMBER);
        break;
      }
      case "2": {
        handleOperationInput("2", TYPE_INPUT.NUMBER);
        break;
      }
      case "3": {
        handleOperationInput("3", TYPE_INPUT.NUMBER);
        break;
      }
      case "4": {
        handleOperationInput("4", TYPE_INPUT.NUMBER);
        break;
      }
      case "5": {
        handleOperationInput("5", TYPE_INPUT.NUMBER);
        break;
      }
      case "6": {
        handleOperationInput("6", TYPE_INPUT.NUMBER);
        break;
      }
      case "7": {
        handleOperationInput("7", TYPE_INPUT.NUMBER);
        break;
      }
      case "8": {
        handleOperationInput("8", TYPE_INPUT.NUMBER);
        break;
      }
      case "9": {
        handleOperationInput("9", TYPE_INPUT.NUMBER);
        break;
      }
      case "+": {
        handleOperationInput("+", TYPE_INPUT.OPERATOR);
        break;
      }
      case "-": {
        handleOperationInput("-", TYPE_INPUT.OPERATOR);
        break;
      }
      case "/": {
        handleOperationInput("/", TYPE_INPUT.OPERATOR);
        break;
      }
      case "*": {
        handleOperationInput("*", TYPE_INPUT.OPERATOR);
        break;
      }
      case "Backspace": {
        if (disableBackButton(TYPE_INPUT.BACK)) return;
        handleOperationInput("Back", TYPE_INPUT.BACK);
        break;
      }
      case ".": {
        handleOperationInput(".", TYPE_INPUT.DOT);
        break;
      }
      case "Enter": {
        handleOperationInput("=", TYPE_INPUT.EQUAL);
        break;
      }
      case "Escape": {
        handleOperationInput("AC", TYPE_INPUT.CLEAR);
        break;
      }
      default: {
        break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeydownEvent);
    return () => {
      document.removeEventListener("keydown", handleKeydownEvent);
    };
  }, [display, log]);

  return (
    <main className="mx-auto flex max-w-screen-lg flex-col items-center">
      <h2 className="pb-3 pt-6 font-logCalculator text-3xl">Calculator</h2>
      <div className="mt-6 flex min-w-full flex-col items-center justify-between gap-12 md:flex-row md:px-7">
        <div className="grid w-[400px] grid-cols-4 gap-3 rounded-xl border-4 border-slate-800 bg-slate-700 px-5 pb-8 pt-6 shadow-2xl md:max-w-md">
          <div className="col-span-4 overflow-hidden rounded-md bg-lime-400 px-2 py-1 text-end font-digitalDisplay">
            <p className="text-3xl">{display}</p>
          </div>
          <div className="col-span-4 mx-1 grid w-full grid-cols-4 gap-1">
            <section className="col-span-4 flex items-center justify-between gap-1 ">
              <CalculatorButton id={"AC"} type={TYPE_INPUT.CLEAR} />
              <CalculatorButton id={"Back"} type={TYPE_INPUT.BACK} />
              <CalculatorButton id={"Ans"} type={TYPE_INPUT.ANS} />
              <CalculatorButton id={"ON"} type={TYPE_INPUT.POWER} />
            </section>
            <section className="col-span-3 grid grid-cols-3 gap-1 ">
              <CalculatorButton id={"7"} type={TYPE_INPUT.NUMBER} />
              <CalculatorButton id={"8"} type={TYPE_INPUT.NUMBER} />
              <CalculatorButton id={"9"} type={TYPE_INPUT.NUMBER} />
              <CalculatorButton id={"4"} type={TYPE_INPUT.NUMBER} />
              <CalculatorButton id={"5"} type={TYPE_INPUT.NUMBER} />
              <CalculatorButton id={"6"} type={TYPE_INPUT.NUMBER} />
              <CalculatorButton id={"1"} type={TYPE_INPUT.NUMBER} />
              <CalculatorButton id={"2"} type={TYPE_INPUT.NUMBER} />
              <CalculatorButton id={"3"} type={TYPE_INPUT.NUMBER} />
              <CalculatorButton id={"."} type={TYPE_INPUT.DOT} />
              <CalculatorButton id={"0"} type={TYPE_INPUT.NUMBER} />
              <CalculatorButton id={"="} type={TYPE_INPUT.EQUAL} />
            </section>
            <section className="col-start-4 flex flex-col items-center gap-1">
              <CalculatorButton id={"+"} type={TYPE_INPUT.OPERATOR} />
              <CalculatorButton id={"-"} type={TYPE_INPUT.OPERATOR} />
              <CalculatorButton id={"*"} type={TYPE_INPUT.OPERATOR} />
              <CalculatorButton id={"/"} type={TYPE_INPUT.OPERATOR} />
            </section>
          </div>
        </div>
        <section className="w-full max-w-md rounded-sm border border-slate-300 bg-slate-100 p-6 text-end md:basis-2/4 lg:basis-3/5">
          <h3 className="text-left">Log:</h3>
          <ul>
            {log.map((operation, i) => (
              <li key={i}>{operation}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
