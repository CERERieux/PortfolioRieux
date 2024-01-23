import { calculatorInputLogic } from "./calculatorLogic"; // Import the logic of our calculator

// Interface to type the props that this component receive
interface Props {
  id: string;
  type: string;
}

export function CalculatorButton({ id, type }: Props) {
  const { handleOperationInput, disableBackButton, styleButton } =
    calculatorInputLogic();
  const disable = disableBackButton(type); // Variable to disable the Back button after doing an operation
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
