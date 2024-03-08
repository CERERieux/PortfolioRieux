import { calculatorInputLogic } from "./calculatorLogic"; // Import the logic of our calculator

// Interface to type the props that this component receive
interface Props {
  id: string;
  type: string;
  disableOutside?: boolean;
}

export function CalculatorButton({ id, type, disableOutside }: Props) {
  const { handleOperationInput, styleButton } = calculatorInputLogic();
  const disable = disableOutside; // Variable to disable the button
  const styles = styleButton(type); // Variable to give style to the button
  const handleClick = () => {
    handleOperationInput(id, type);
  };
  return (
    <button onClick={handleClick} disabled={disable} className={styles}>
      {id}
    </button>
  );
}
