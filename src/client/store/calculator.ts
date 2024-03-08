import { create } from "zustand";

export const TYPE_INPUT = {
  NUMBER: "number",
  OPERATOR: "operator",
  DOT: "dot",
  EQUAL: "equal",
  CLEAR: "clear",
  BACK: "back",
  ANS: "ans",
  POWER: "on",
};

export const OPERATOR_NO_START = "+*/";
export const SIMPLE_OPERATOR = "+-*/";

interface State {
  power: boolean;
  display: string;
  empty: boolean;
  dot: boolean;
  zero: boolean;
  operation: boolean;
  log: string[];
  modifyDisplay: (id: string, concat: boolean) => void;
  replaceDisplay: (id: string, amount: number) => void;
  removeLastInput: () => void;
  setEmpty: (value: boolean) => void;
  dotExist: (value: boolean) => void;
  initialZeroExist: (value: boolean) => void;
  newOperation: (value: boolean) => void;
  doOperation: () => void;
  clearCalculator: () => void;
  turnCalculatorOnOff: () => void;
}

export const useCalculatorStore = create<State>((set, get) => ({
  power: false, // Value to know if calculator is on or off
  display: "0", // Value of display
  empty: true, // Flag to indicate that user hasn't put a value
  dot: false, // Flag to prevent duplication of .
  zero: true, // Flag to prevent duplication of 0
  operation: false, // Flag to indicate if we are in a new operation or not
  log: [], // Array that saves our history of operations

  modifyDisplay: (id, concat) => {
    const { display } = get();
    if (!concat) {
      if (id === display) {
        set(state => ({
          display: state.display.slice().concat(id),
          operation: false,
        }));
      } else set({ display: id });
    } else {
      set(state => ({ display: state.display.slice().concat(id) }));
    }
  },

  replaceDisplay: (id, amount) => {
    const { display } = get();
    const displayLength = display.length - amount;
    const newDisplay = display.slice(0, displayLength);
    set({ display: newDisplay.concat(id) });
  },

  removeLastInput: () => {
    const { display } = get();
    const displayLength = display.length - 1;
    const newDisplay = display.slice(0, displayLength);
    set({ display: newDisplay });
  },

  setEmpty: value => {
    set({ empty: value });
  },
  dotExist: value => {
    set({ dot: value });
  },
  initialZeroExist: value => {
    set({ zero: value });
  },
  newOperation: value => {
    set({ operation: value });
  },

  doOperation: () => {
    const { display, log } = get(); // Get display and log from state
    const container: Array<number | string> = []; // A container that will save our numbers and operators
    let auxStr = ""; // An aux string that helps us to get each number and make it number
    let auxInd = -1; // Variable to get index for operations
    let auxOp = 0; // Variable to save the operation

    // First we decompose our display to get the numbers/operators and save it in the container
    for (let i = 0; i < display.length; i++) {
      // If the char is an operator then we have a number, we push it to the container
      // but we will treat minus operator diferent
      if (OPERATOR_NO_START.includes(display[i])) {
        // We check if number has a decimal point
        if (auxStr.includes(".")) {
          container.push(parseFloat(auxStr)); // If it's a float, call parseFloat
        } else {
          container.push(parseInt(auxStr)); // Else it's an int, call parseInt
        }
        container.push(display[i]); // We also push the operator to the container
        auxStr = ""; // Reset the string auxiliary
      } else if ("-".includes(display[i]) && i > 0) {
        // If is minus as operator (x-y), we get the number, if it's in the way of (x[*/+]-y), we don't
        if (!OPERATOR_NO_START.includes(display[i - 1])) {
          // We push the number in the auxStr, then the operator
          if (auxStr.includes(".")) {
            container.push(parseFloat(auxStr)); // If it's a float, call parseFloat
          } else {
            container.push(parseInt(auxStr)); // Else it's an int, call parseInt
          }
          container.push(display.charAt(i));
          auxStr = ""; // Reset the string auxiliary
        }
      } else {
        auxStr += display.charAt(i); // Else, we still getting the number
      }
    }

    // At the end always will be a number so we push it if it isn't empty
    if (auxStr !== "") {
      if (auxStr.includes(".")) {
        container.push(parseFloat(auxStr)); // If it's a float, call parseFloat
      } else {
        container.push(parseInt(auxStr)); // Else it's an int, call parseInt
      }
    } else {
      // If it's empty, then end the function since user made a bad operation ([num][operator]=)
      // If we want to get a log of operations we can do the next
      const logs = log.slice(); // Get the log from calculator
      logs.push(display + "= Error"); // Put the new operation in the log
      // Then put the result in the state value and indicate we did an operation

      // console.log("display ", container[0]);
      set({
        display: "" + container[0], // Show result
        operation: true, // Indicate that we made an operation
        dot: false, // Reset the rule of the dot
        log: logs, // Assing new log to the state
      });
      return null;
    }

    /* Then we start to do the operations
    We will do the formula logic so we need to make * and / first and then + (we will use + also with negative numbers)
    We will do operations until container has the result, start with - to make the numbers negative in case 
    there is one that needs it */
    while (container.includes("-")) {
      // To make it negative we subtract 0 minus the number
      auxInd = container.indexOf("-"); // Get index of the operator
      auxOp = 0 - (container[auxInd + 1] as number); // Make operation with the number after the operator
      container.splice(auxInd, 2, auxOp); // We remove the operation and put the result in the container
    }
    // Then *
    while (container.includes("*")) {
      auxInd = container.indexOf("*"); // Get index of the operator
      auxOp =
        (container[auxInd - 1] as number) * (container[auxInd + 1] as number); // Make operation with the number before and after the operator
      container.splice(auxInd - 1, 3, auxOp); // We remove the operation and put the result in the container
    }
    // Then /
    while (container.includes("/")) {
      auxInd = container.indexOf("/"); // Get index of the operator
      auxOp =
        (container[auxInd - 1] as number) / (container[auxInd + 1] as number); // Make operation with the number before and after the operator
      container.splice(auxInd - 1, 3, auxOp); // We remove the operation and put the result in the container
    }
    // Then +
    while (container.includes("+")) {
      auxInd = container.indexOf("+"); // Get index of the operator
      auxOp =
        (container[auxInd - 1] as number) + (container[auxInd + 1] as number); // Make operation with the number before and after the operator
      container.splice(auxInd - 1, 3, auxOp); // We remove the operation and put the result in the container
    }
    // Finally, if there still 2 numbers or more, will be 1 positive and 1 negative
    while (container.length >= 2) {
      auxOp = (container[0] as number) + (container[1] as number); // Make operation with the number 1 and 2
      container.splice(0, 2, auxOp); // We remove the operation and put the result in the container
    }
    // If our number has decimal point, we fixed to 4 numbers after the dot
    auxStr = "" + container[0]; // We put our number in a string to see if has a dot
    if (auxStr.includes(".")) {
      // If yes, we look how many numbers are after dot
      auxInd = auxStr.indexOf("."); // We look where the dot is
      if (auxStr.length - auxInd - 1 >= 4) {
        // If the number has 4 numbers or more after the dot, we only conserve the first 4 numbers
        auxOp = container[0] as number;
        container[0] = auxOp.toFixed(4);
      }
    }

    // If we want to get a log of operations we can do the next
    const logs = log.slice(); // Get the log from calculator
    logs.push(display + "=" + container[0]); // Put the new operation in the log
    // Then put the result in the state value and indicate we did an operation

    // console.log("display ", container[0]);
    set({
      display: "" + container[0], // Show result
      operation: true, // Indicate that we made an operation
      dot: false, // Reset the rule of the dot
      log: logs, // Assing new log to the state
    });
  },

  clearCalculator: () => {
    set({
      display: "0",
      empty: true,
      dot: false,
      zero: true,
      operation: false,
    });
  },
  turnCalculatorOnOff: () => {
    const { power } = get();
    set({
      display: "0",
      empty: true,
      dot: false,
      zero: true,
      operation: false,
      power: !power,
    });
  },
}));
