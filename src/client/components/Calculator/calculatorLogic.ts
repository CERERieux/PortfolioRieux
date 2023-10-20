import {
  useCalculatorStore,
  TYPE_INPUT,
  OPERATOR_NO_START,
  SIMPLE_OPERATOR,
} from "../../store/calculator";

export function calculatorInputLogic() {
  const {
    display,
    modifyDisplay,
    replaceDisplay,
    removeLastInput,
    empty,
    setEmpty,
    dot,
    dotExist,
    zero,
    initialZeroExist,
    operation,
    newOperation,
    doOperation,
    clearCalculator,
  } = useCalculatorStore();

  const handleOperationInput = (id: string, type: string) => {
    console.log(
      type,
      id,
      "dot " + dot,
      "zero " + zero,
      "empty " + empty,
      "operation " + operation,
    );
    // In case user clear the calculator with the reset button, we clean it and end function
    if (type === TYPE_INPUT.CLEAR) {
      clearCalculator();
      return;
    }

    // First we ensure the first input, we can't let extra zeros at the start and also we need to
    // make sure we can put a new number, decimal dot, an operator or handle the equal button.
    // We need to start with the condition that user hasn't put anything, so if it's empty
    if (empty) {
      if (id !== "0" && type === TYPE_INPUT.NUMBER) {
        modifyDisplay(id, false);
        setEmpty(false);
        initialZeroExist(false);
        return;
      }
      if (type === TYPE_INPUT.OPERATOR) {
        // We only don't want to concat an operator to the 0 at the start when it can be the
        // an initial operation, like minus, log, sin, cos, ln, etc...
        const concat = OPERATOR_NO_START.includes(id);
        modifyDisplay(id, concat);
        setEmpty(false);
        return;
      }
      if (type === TYPE_INPUT.DOT) {
        modifyDisplay(id, true);
        setEmpty(false);
        initialZeroExist(false);
        dotExist(true);
        return;
      }
      if (type === TYPE_INPUT.EQUAL) {
        doOperation();
      }
    } else {
      // If user already interact with the calculator, then display isn't empty
      // We need to ensure that we can put numbers and symbols while we don't break rules,
      // like being able to input stuff like 000254.12.160 or 0+*/454-.5644503..0.0.15
      // First we check for numbers and create 3 auxiliars

      const displayLength = display.length - 1; // We get the length of the operation
      const lastDisplayChar = display.charAt(displayLength); // The last character of it
      const secondLastChar = display.charAt(displayLength - 1); // And the 2nd last character

      if (type === TYPE_INPUT.BACK) {
        // If we are going to remove an input, we do it first
        removeLastInput();
        // Then check if it was the last value left in display
        if (displayLength === 0) {
          // If it was, we treat it as calculator was cleared to initial state
          clearCalculator();
          return;
        }
        if (lastDisplayChar === ".") {
          // If we remove the dot, then indicate that the rule of the dot is off again
          dotExist(false);
          if (secondLastChar === "0") {
            // But if we remove the dot of "0.", we need to active the rule of initial zero
            // because that way we ensure we can't put numbers like "056, 0xyz..."
            initialZeroExist(true);
          }
          return;
        }
        if (SIMPLE_OPERATOR.includes(secondLastChar)) {
          // If we remove something and 2nd last character is an operator, we activate the
          // initial zero rule to avoid numbers like "+0895, /0564, etc."
          initialZeroExist(true);
        }
      } else if (type === TYPE_INPUT.NUMBER) {
        // We check if we did an operation before, if we did, then we need to clean display
        // as it was the 1st input
        if (operation) {
          // If user's input after operation is 0, we treat it as we restart the calculator
          if (id === "0") {
            clearCalculator();
          } else {
            // Else, we only show the new value
            modifyDisplay(id, false);
            newOperation(false);
          }
        } else {
          // If operation hasn't happened, we need to concat user's number
          // If the rule that let us know we can't repeat zero is active
          if (zero) {
            // If the number isn't the 0, we have 2 cases
            if (id !== "0") {
              // Where last character in display it's a 0
              if (lastDisplayChar === "0") {
                replaceDisplay(id, 1);
                initialZeroExist(false);
                return;
              }
              // And when last character in display it's an operator
              if (SIMPLE_OPERATOR.includes(lastDisplayChar)) {
                modifyDisplay(id, true);
                initialZeroExist(false);
              } else {
                // In case we deleted an operator and second last is a number
                // we need be able to concat numbers again
                modifyDisplay(id, true);
                initialZeroExist(false);
              }
            } else {
              // If it's the 0, we only check if last character is an operator
              if (SIMPLE_OPERATOR.includes(lastDisplayChar)) {
                modifyDisplay(id, true);
              }
            }
          } else {
            // If isn't active, we concat numbers as long user wants
            modifyDisplay(id, true);
          }
        }
      } else if (type === TYPE_INPUT.OPERATOR) {
        // If the type is an operator, we do next, since minus operator acts a bit different than
        // the others, we need to treat it diferent due it also can be a prefix for numbers (-x)
        if (OPERATOR_NO_START.includes(id)) {
          // We need to avoid user can input 2 operators in a row like */, *+, /+, etc
          if (SIMPLE_OPERATOR.includes(lastDisplayChar)) {
            // If we are in that case, we replace last operator with the new one
            // but if the last operator is the minus, we need to check if the character
            // before it is also an operator, if it is, we need to remove both so
            if (
              "-".includes(lastDisplayChar) &&
              SIMPLE_OPERATOR.includes(secondLastChar)
            ) {
              replaceDisplay(id, 2);
              dotExist(false); // False because we are starting a new number
              initialZeroExist(true); // Then if it's new number, we need to active this rule
              newOperation(false); // And in case we did an operation before, now it's a new one
            } else {
              // If that isn't the case, we just replace the old operator with the new one
              replaceDisplay(id, 1);
              dotExist(false); // False because we are starting a new number
              initialZeroExist(true); // Then if it's new number, we need to active this rule
              newOperation(false); // And in case we did an operation before, now it's a new one
            }
          } else if (!".".includes(lastDisplayChar)) {
            // If it wasn't the case where we have 2 operators in a row, we need to check
            // if last character is the dot, if it isn't, we can concat the new operator
            modifyDisplay(id, true);
            dotExist(false); // False because we are starting a new number
            initialZeroExist(true); // Then if it's new number, we need to active this rule
            newOperation(false); // And in case we did an operation before, now it's a new one
          }
        } else {
          // If we got an minus operator, we do next. We can concat the minus operator as long
          // last character isn't the same operator or the dot (--, x.- case)
          if (!".-".includes(lastDisplayChar)) {
            modifyDisplay(id, true);
            dotExist(false); // False because we are starting a new number
            initialZeroExist(true); // Then if it's new number, we need to active this rule
            newOperation(false); // And in case we did an operation before, now it's a new one
          } else if (
            "-".includes(lastDisplayChar) &&
            SIMPLE_OPERATOR.includes(secondLastChar)
          ) {
            // We do the same as the case where we have double operator, to only leave the minus
            replaceDisplay(id, 2);
            dotExist(false); // False because we are starting a new number
            initialZeroExist(true); // Then if it's new number, we need to active this rule
            newOperation(false); // And in case we did an operation before, now it's a new one
          }
        }
      } else if (type === TYPE_INPUT.DOT && !dot) {
        // If the type is the dot and the rule that indicates that there is already
        // a dot in the number isn't active then we check if we did an operation
        if (operation) {
          // If we did an operation and user pressed the dot, we display "0."
          modifyDisplay("0.", false);
          dotExist(true);
          newOperation(false);
        } else {
          // If we still in the same operation, we concat dot as long last char isn't an operator
          if (!SIMPLE_OPERATOR.includes(lastDisplayChar)) {
            modifyDisplay(id, true);
            dotExist(true);
            initialZeroExist(false); // To let user input more zero in case rule still active
          } else {
            // We can concat the dot if we put a zero after the operator
            modifyDisplay("0.", true);
            dotExist(true);
            initialZeroExist(false); // To let user input more zero in case rule still active
          }
        }
      } else if (type === TYPE_INPUT.EQUAL) {
        doOperation(); // Do the user's operation if they require it
      }
    }
  };

  // Function to disable the Back button to avoid the modification of the answer
  const disableBackButton = (type: string) => {
    return operation && type === TYPE_INPUT.BACK;
  };

  return { handleOperationInput, disableBackButton };
}
