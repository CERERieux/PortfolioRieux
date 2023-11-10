import "mongoose"; // Import mongoose to be able to use the models and manage our database
import {
  IssueTracker,
  ERROR_ISSUES,
  Book,
  ERROR_BOOKS,
  METRIC_UNIT,
  IMPERIAL_UNIT,
  GAL_TO_L,
  LBS_TO_KG,
  MI_TO_KM,
  ERROR_SUDOKU,
  REGIONS,
} from "../schemas/advanced";
import {
  AMERICAN_ONLY,
  AMER_TO_BRIT_SPELLING,
  AMER_TO_BRIT_TITLES,
  BRITISH_ONLY,
  SAME_INPUT,
} from "../schemas/advanced_translator";
import type {
  ConvertStringProps,
  ConvertProps,
  SudokuPlacement,
  UpdateIssue,
  ReqQueryIssue,
  CreateIssue,
  CreateBook,
  ReqBodyUpdateBook,
  UpdateNote,
} from "../types/advanced";
import { ERROR_GUSER, GUser } from "../schemas/global";

/** ------------------------------------------------------------------------ */

/* Function that verify if the user's input is valid, to avoid inputs like 2/2/3 or spaces between
  unit and number, also verify that there isn't more than 1 decimal point per value */
export function canBeConverted(input: string) {
  if (input === "") return false; // First of all, check if input isn't empty
  const regexSlash = /\//g; // Regex to get slashes
  const regexSpace = /\s/g; // Regex to get spaces
  const regexDot = /\./g; // Regex to get dots
  const space = input.match(regexSpace) ?? []; // Get spaces
  const slash = input.match(regexSlash) ?? []; // Get slashes
  let dots; // Auxiliar to get dots later on

  // If there is more slashes or spaces than the valid format, then input is invalid
  if (slash.length > 1 || space.length > 0) {
    return false;
  } else {
    // If still valid input, check for decimal dots
    if (slash.length === 1) {
      const numbers = input.split("/"); // If it's a fraction, get both numbers
      /* For each number of the fraction, we match the regex to see if it has a dot, then filter
        for numbers that have more than 1 dot */
      dots = numbers
        .map(d => d.match(regexDot) ?? [])
        .filter(d => d.length > 1);
      if (dots.length > 0) {
        return false; // If a number of the fraction it's invalid, the input is invalid
      } else {
        return true; // Both numbers of the fraction are valid
      }
    } else {
      // Number isn't a fraction but still need to check for valid input dots
      dots = input.match(regexDot) ?? [];
      if (dots.length > 1) {
        return false; // If a number has more than 1 decimal dot, the input is invalid
      } else {
        return true; // Input has 0-1 decimal dots, it's valid
      }
    }
  }
}

/* Function that gets the number from the input */
export function getNumber(input: string) {
  const numberString = input.match(/\d+(\.\d+)?/g); // Get all the numbers in the input
  // If we didn't found a number, then return 1, this is in case where user only send the unit
  if (numberString == null) {
    return 1;
  }
  const number = numberString.map(ns => {
    // We need to parse the string into numbers
    if (!ns.includes(".")) {
      return parseInt(ns); // If it is a integer
    } else {
      return parseFloat(ns); // If it's a float
    }
  });
  if (number.length > 1) {
    return parseFloat((number[0] / number[1]).toFixed(5)); // If it's a fraction, make the operation
  } else {
    return number[0]; // Else, it's only 1 number, return it
  }
}

/* Function that gets the unit from the input */
export function getUnit(input: string) {
  const unit = input.match(/[a-z]+/gi); // Get the unit string of the input
  // If there isn't an unit or more than 1 in input, then it's invalid
  if (unit == null || unit.length > 1) {
    return "";
  } else {
    // If it's only 1 unit, we check what unit it is
    switch (unit[0].toLowerCase()) {
      case IMPERIAL_UNIT.GAL:
        return IMPERIAL_UNIT.GAL;
      case METRIC_UNIT.L:
        return METRIC_UNIT.L;
      case IMPERIAL_UNIT.LBS:
        return IMPERIAL_UNIT.LBS;
      case METRIC_UNIT.KG:
        return METRIC_UNIT.KG;
      case IMPERIAL_UNIT.MI:
        return IMPERIAL_UNIT.MI;
      case METRIC_UNIT.KM:
        return METRIC_UNIT.KM;
      default: // In case it's an invalid unit, return result
        return "";
    }
  }
}

/* Function that return the unit converted ex.(mi->Km) */
export function getReturnUnit(initialUnit: string) {
  switch (initialUnit) {
    case IMPERIAL_UNIT.GAL:
      return METRIC_UNIT.L;
    case METRIC_UNIT.L:
      return IMPERIAL_UNIT.GAL;
    case IMPERIAL_UNIT.LBS:
      return METRIC_UNIT.KG;
    case METRIC_UNIT.KG:
      return IMPERIAL_UNIT.LBS;
    case IMPERIAL_UNIT.MI:
      return METRIC_UNIT.KM;
    case METRIC_UNIT.KM:
      return IMPERIAL_UNIT.MI;
    default:
      return "";
  }
}

/* Function that spells out the whole word for each unit ex.(km->kilometers) */
export function spellOutUnit(unit: string) {
  switch (unit) {
    case IMPERIAL_UNIT.GAL:
      return IMPERIAL_UNIT.GAL_SO;
    case METRIC_UNIT.L:
      return METRIC_UNIT.L_SO;
    case IMPERIAL_UNIT.LBS:
      return IMPERIAL_UNIT.LBS_SO;
    case METRIC_UNIT.KG:
      return METRIC_UNIT.KG_SO;
    case IMPERIAL_UNIT.MI:
      return IMPERIAL_UNIT.MI_SO;
    case METRIC_UNIT.KM:
      return METRIC_UNIT.KM_SO;
    default:
      return "";
  }
}

/* Function that convert the input to its counterpart, ex.(gal->L, lbs->kg, km->mi, etc) */
export function convert({ initialNumber, initialUnit }: ConvertProps) {
  switch (initialUnit) {
    case IMPERIAL_UNIT.GAL:
      return parseFloat((initialNumber * GAL_TO_L).toFixed(5));
    case METRIC_UNIT.L:
      return parseFloat((initialNumber / GAL_TO_L).toFixed(5));
    case IMPERIAL_UNIT.LBS:
      return parseFloat((initialNumber * LBS_TO_KG).toFixed(5));
    case METRIC_UNIT.KG:
      return parseFloat((initialNumber / LBS_TO_KG).toFixed(5));
    case IMPERIAL_UNIT.MI:
      return parseFloat((initialNumber * MI_TO_KM).toFixed(5));
    case METRIC_UNIT.KM:
      return parseFloat((initialNumber / MI_TO_KM).toFixed(5));
    default:
      return 0;
  }
}

/* Function that makes the string result so user can see the conversion */
export function getString({
  initialNumber,
  initialUnitSO,
  resultNumber,
  resultUnitSO,
}: ConvertStringProps) {
  const result = `${initialNumber} ${initialUnitSO} converts to ${resultNumber} ${resultUnitSO}`;
  return result;
}

/** ------------------------------------------------------------------------ */

/** Function that says if the sudoku is valid or not, from its format to if
 * is it solvable with the current values
 * Will return an error or empty string if it's valid
 */
export function sudokuValidate(puzzle: string) {
  // If we find a character that isn't a number or dot, then is invalid
  if (/[^.\d]/gi.test(puzzle)) {
    return ERROR_SUDOKU.INVALID_CHARACTER;
  }
  // If the puzzle is bigger or smaller than the sudoku table, then is invalid
  if (puzzle.length !== 81) {
    return ERROR_SUDOKU.INVALID_FORMAT;
  }
  // If the puzzle is valid, we check if the values of the puzzle are valid
  let row = 65; // ASCII value for A
  let col = 1;
  let newPuzzle = "";
  const puzzleValues = puzzle.split(""); // Get all values of the puzzle

  for (let i = 0; i < puzzleValues.length; i++) {
    // We will check all values that aren't "." to check if the values are valid or not
    if (puzzleValues[i] !== ".") {
      /* We need to make a new string or it will detect the existent values as invalid due
        it contains itself, so replace value to verify with a dot */
      newPuzzle = puzzle.slice(0, i) + "." + puzzle.slice(i + 1);
      if (
        !checkRowPlacement({
          puzzle: newPuzzle,
          row: String.fromCharCode(row),
          value: puzzleValues[i],
        })
      ) {
        return ERROR_SUDOKU.UNSOLVABLE;
      } else if (
        !checkColumnPlacement({
          puzzle: newPuzzle,
          column: col,
          value: puzzleValues[i],
        })
      ) {
        return ERROR_SUDOKU.UNSOLVABLE;
      } else if (
        !checkRegionPlacement({
          puzzle: newPuzzle,
          row: String.fromCharCode(row),
          column: col,
          value: puzzleValues[i],
        })
      ) {
        return ERROR_SUDOKU.UNSOLVABLE;
      }
    }
    col++; // Move to the next column
    if (col > 9) {
      // If we reach the end of border right
      row++; // Move to the next row
      col = 1; // In the first column
    }
  }
  return "";
}

/* The 3 next functions verify if the value is valid to place
  in the current sudoku, checks the row, column and the region
  where it's placed */
export function checkRowPlacement({
  puzzle,
  row,
  value,
}: Partial<SudokuPlacement>) {
  if (puzzle == null || row == null || value == null) return false;
  let isValid = true;
  let subPuzzle = "";
  switch (row.toLowerCase()) {
    case "a":
      subPuzzle = puzzle.slice(0, 9);
      if (subPuzzle.includes(value)) isValid = false;
      return isValid;
    case "b":
      subPuzzle = puzzle.slice(9, 18);
      if (subPuzzle.includes(value)) isValid = false;
      return isValid;
    case "c":
      subPuzzle = puzzle.slice(18, 27);
      if (subPuzzle.includes(value)) isValid = false;
      return isValid;
    case "d":
      subPuzzle = puzzle.slice(27, 36);
      if (subPuzzle.includes(value)) isValid = false;
      return isValid;
    case "e":
      subPuzzle = puzzle.slice(36, 45);
      if (subPuzzle.includes(value)) isValid = false;
      return isValid;
    case "f":
      subPuzzle = puzzle.slice(45, 54);
      if (subPuzzle.includes(value)) isValid = false;
      return isValid;
    case "g":
      subPuzzle = puzzle.slice(54, 63);
      if (subPuzzle.includes(value)) isValid = false;
      return isValid;
    case "h":
      subPuzzle = puzzle.slice(63, 72);
      if (subPuzzle.includes(value)) isValid = false;
      return isValid;
    case "i":
      subPuzzle = puzzle.slice(72, 81);
      if (subPuzzle.includes(value)) isValid = false;
      return isValid;
    default:
      return false;
  }
}
export function checkColumnPlacement({
  puzzle,
  column,
  value,
}: Partial<SudokuPlacement>) {
  if (puzzle == null || column == null || value == null) return false;

  let isValid = true;
  for (let checkVal = column - 1; checkVal < 81; checkVal += 9) {
    if (puzzle.charAt(checkVal) === value) {
      isValid = false;
    }
  }
  return isValid;
}
export function checkRegionPlacement({
  puzzle,
  row,
  column,
  value,
}: SudokuPlacement) {
  let isValid = true;
  const region = [];
  const coord = "" + row.toLowerCase() + column;
  const regexCoord = new RegExp(coord, "i");
  if (regexCoord.test(REGIONS.REGION_1)) {
    region.push(puzzle.slice(0, 3));
    region.push(puzzle.slice(9, 12));
    region.push(puzzle.slice(18, 21));
    region.map(section => {
      if (section.includes(value)) {
        isValid = false;
      }
      return 0;
    });
  } else if (regexCoord.test(REGIONS.REGION_2)) {
    region.push(puzzle.slice(3, 6));
    region.push(puzzle.slice(12, 15));
    region.push(puzzle.slice(21, 24));
    region.map(section => {
      if (section.includes(value)) {
        isValid = false;
      }
      return 0;
    });
  } else if (regexCoord.test(REGIONS.REGION_3)) {
    region.push(puzzle.slice(6, 9));
    region.push(puzzle.slice(15, 18));
    region.push(puzzle.slice(24, 27));
    region.map(section => {
      if (section.includes(value)) {
        isValid = false;
      }
      return 0;
    });
  } else if (regexCoord.test(REGIONS.REGION_4)) {
    region.push(puzzle.slice(27, 30));
    region.push(puzzle.slice(36, 39));
    region.push(puzzle.slice(45, 48));
    region.map(section => {
      if (section.includes(value)) {
        isValid = false;
      }
      return 0;
    });
  } else if (regexCoord.test(REGIONS.REGION_5)) {
    region.push(puzzle.slice(30, 33));
    region.push(puzzle.slice(39, 42));
    region.push(puzzle.slice(48, 51));
    region.map(section => {
      if (section.includes(value)) {
        isValid = false;
      }
      return 0;
    });
  } else if (regexCoord.test(REGIONS.REGION_6)) {
    region.push(puzzle.slice(33, 36));
    region.push(puzzle.slice(42, 45));
    region.push(puzzle.slice(51, 54));
    region.map(section => {
      if (section.includes(value)) {
        isValid = false;
      }
      return 0;
    });
  } else if (regexCoord.test(REGIONS.REGION_7)) {
    region.push(puzzle.slice(54, 57));
    region.push(puzzle.slice(63, 66));
    region.push(puzzle.slice(72, 75));
    region.map(section => {
      if (section.includes(value)) {
        isValid = false;
      }
      return 0;
    });
  } else if (regexCoord.test(REGIONS.REGION_8)) {
    region.push(puzzle.slice(57, 60));
    region.push(puzzle.slice(66, 69));
    region.push(puzzle.slice(75, 78));
    region.map(section => {
      if (section.includes(value)) {
        isValid = false;
      }
      return 0;
    });
  } else if (regexCoord.test(REGIONS.REGION_9)) {
    region.push(puzzle.slice(60, 63));
    region.push(puzzle.slice(69, 72));
    region.push(puzzle.slice(78, 81));
    region.map(section => {
      if (section.includes(value)) {
        isValid = false;
      }
      return 0;
    });
  }
  return isValid;
}

/* Function that gets the index in the string of the user's value */
export function getIndexFromCoords(coord: string) {
  const row = (coord.toLowerCase().charCodeAt(0) - 97) * 9;
  const col = parseInt(coord.slice(1)) - 1;
  return row + col;
}

/** Function that checks if user input it's valid in the current puzzle */
export function userSudokuValidateInput({
  puzzle,
  row,
  column,
  value,
}: SudokuPlacement) {
  let validPlace = true;
  const conflicts = [];
  const validRow = checkRowPlacement({ puzzle, row, value });
  const validCol = checkColumnPlacement({ puzzle, column, value });
  const validRegion = checkRegionPlacement({ puzzle, row, column, value });
  if (!validRow) {
    validPlace = false;
    conflicts.push("row");
  }
  if (!validCol) {
    validPlace = false;
    conflicts.push("column");
  }
  if (!validRegion) {
    validPlace = false;
    conflicts.push("region");
  }
  return {
    validPlace,
    conflicts,
  };
}

/* Function that use recursivity to solve a given sudoku,
  it receive a sudoku and calls itself with a new value
  each time filling the empty values, it continues until 
  it's done */
export function solveSudoku(puzzle: string) {
  // If there aren't more dots, then the puzzle is complete
  if (!puzzle.includes(".")) {
    return puzzle; // Return the base case
  } else {
    // Else, there are values to fill
    const index = puzzle.indexOf("."); // Index of the dot we are trying to fill
    const rowNumber = index / 9 + 97; // Get the row from index, +97 for ascii value of "a"
    const row = String.fromCharCode(rowNumber); // Transform the row to letter
    const column = (index % 9) + 1; // Get the column from the index
    let isValid = true; // Boolean to verify the new value

    // The only possible values are 1 to 9
    for (let value = 1; value < 10; value++) {
      // First we do the validations for the new value, rows, columns and regions
      if (!checkRowPlacement({ puzzle, row, value: `${value}` })) {
        isValid = false;
      } else if (!checkColumnPlacement({ puzzle, column, value: `${value}` })) {
        isValid = false;
      } else if (
        !checkRegionPlacement({ puzzle, row, column, value: `${value}` })
      ) {
        isValid = false;
      }
      /** If the value is valid, then start the recursivity with the new
        puzzle having the new value */
      if (isValid) {
        const newPuzzle =
          puzzle.slice(0, index) + value + puzzle.slice(index + 1);
        const result: string = solveSudoku(newPuzzle); // Auxiliar to get the result from the recursivity
        // When the recursivity ends, we check for dots
        if (!result.includes(".")) {
          return result;
        }
        // If isn't done, then we move to the next value
      } else {
        isValid = true; // If the value wasn't valid, restart boolean for the next value
      }
    }
    /* In case there wasn't a possible value, end function to try a new
    value in the last iteration */
    return puzzle;
  }
}

/** ------------------------------------------------------------------------ */

export class Translator {
  input: string;
  constructor() {
    this.input = "";
  }

  setInput(input: string) {
    this.input = input;
  }

  getInput() {
    return this.input;
  }

  translateAmerican(input: string) {
    // First we look for "american only" terms in input
    let word: keyof typeof AMERICAN_ONLY;
    for (word in AMERICAN_ONLY) {
      const regex = new RegExp(word, "i"); // Create a regExp with the word to see if the input has the word
      // While we have words to modify, we replace the american word with the british one
      while (regex.test(this.input)) {
        /* Case where it match but not the whole word, example:
          "trash": "rubbish" and "trashcan": "bin", it partially match but we don't want that.
          We need to verify if the character next to the match isn't a space, if it isn't,
          that means we didn't match the word, just a part of it, so skip to the next word */
        const indexMatch = this.input.toLowerCase().indexOf(word);
        const length = word.length;
        // If we sum this 2 numbers, we get the char next to the match
        const nextIndex = indexMatch + length;
        const nextChar = this.input.charAt(nextIndex);
        /** If the next character isn't a space and the final dot, and the index we are
         * checking isn't the last one, we skip to the next word, because the next Character
         * makes this a partial match and that won't work */
        if (
          nextChar !== " " &&
          nextChar !== "." &&
          nextIndex !== this.input.length
        )
          break;
        // If word was a complete match, we replace the american word with the british one
        this.input = this.input.replace(
          regex,
          `<span class="highlight">${AMERICAN_ONLY[word]}</span>`,
        );
      }
    }
    // Then we look for american to british spellings
    let spelling: keyof typeof AMER_TO_BRIT_SPELLING;
    for (spelling in AMER_TO_BRIT_SPELLING) {
      const regex = new RegExp(spelling, "i"); // Create a regExp with the word to see if the input has the word
      // While we have words to modify, we replace the american word with the british one
      while (regex.test(this.input)) {
        this.input = this.input.replace(
          regex,
          `<span class="highlight">${AMER_TO_BRIT_SPELLING[spelling]}</span>`,
        );
      }
    }
    // Then we look for titles
    let titles: keyof typeof AMER_TO_BRIT_TITLES;
    for (titles in AMER_TO_BRIT_TITLES) {
      const regex = new RegExp(titles, "gi"); // Create a regExp with the word to see if the input has the word
      // If we have words to modify
      if (regex.test(this.input)) {
        let wordsInput = this.input.split(" "); // We split all our words to check where is the title
        wordsInput = wordsInput.map(word => {
          // If we found a title, replace it, if not just return the word
          if (word.toLowerCase() === titles) {
            return `<span class="highlight">${word.slice(
              0,
              word.length - 1,
            )}</span>`;
          }
          return word;
        });
        this.input = wordsInput.join(" "); // We join our words to make the input again
      }
    }
    // Lastly, we look for times ex(10:30->10.30)
    if (this.input.includes(":")) {
      let hasTimes = this.input.split(" "); // We split the input in individual words
      hasTimes = hasTimes.map(word => {
        // If it's the time
        if (word.includes(":") && word.length > 3) {
          word = word.replace(":", "."); // Repalce ":" with "." as the british format time
          word = `<span class="highlight">${word}</span>`;
        }
        return word;
      });
      this.input = hasTimes.join(" "); // Join the words to make again the input
    }

    // Then we check if the input still the same as when it start the function
    if (this.input === input) {
      // If it is, then nothing changed and notify this to user, their input has nothing to translate
      return SAME_INPUT;
    } else {
      return this.input; // If isn't the same, then we return the translated text
    }
  }

  translateBritish(input: string) {
    // First we look for "british only" terms in input
    let word: keyof typeof BRITISH_ONLY;
    for (word in BRITISH_ONLY) {
      const regex = new RegExp(word, "i"); // Create a regExp with the word to see if the input has the word
      /* 2 cases:
      1 where there are 2 words or more for search and 1 where there are 1 word to search */
      // Case where there are 2 words
      if (word.split(" ").length > 1 && regex.test(this.input)) {
        while (regex.test(this.input)) {
          // While we have words to modify
          /* Case for values that contains itself, like:
            "chippy": "fish-and-chip shop" and "chip shop": "fish-and-chip shop" 
            skip the word because this can make an infinite loop */
          if (this.input.includes(BRITISH_ONLY[word])) break;
          // If the word is valid then we replace the american word with the british one
          this.input = this.input.replace(
            regex,
            `<span class="highlight">${BRITISH_ONLY[word]}</span>`,
          );
        }
      } else if (regex.test(this.input)) {
        // Case where is 1 word
        let wordsInput = this.input.split(" "); // Get each word from the input
        wordsInput = wordsInput.map(wordInput => {
          // Check for each word if its the one to replace and if the word have a dot at the end
          const lastCharWord = wordInput.length - 1;
          if (wordInput.indexOf(".") === lastCharWord) {
            // Remove the dot to make the comparision, if it match, replace it by the british one
            if (wordInput.slice(0, lastCharWord).toLowerCase() === word) {
              return `<span class="highlight">${BRITISH_ONLY[word]}</span>.`;
            }
          } else if (wordInput.toLowerCase() === word) {
            // If it don't contain the dot, just check if it match the word to replace it
            return `<span class="highlight">${BRITISH_ONLY[word]}</span>`;
          }
          return wordInput;
        });
        this.input = wordsInput.join(" "); // We assign the new input to the local input
      }
    }
    // Then we look for british to american spellings
    let spelling: keyof typeof AMER_TO_BRIT_SPELLING;
    for (spelling in AMER_TO_BRIT_SPELLING) {
      // Create a regExp with the word to see if the input has the word
      const regex = new RegExp(AMER_TO_BRIT_SPELLING[spelling], "gi");
      while (regex.test(this.input)) {
        // While we have words to modify, we replace the british word with the american one
        this.input = this.input.replace(
          regex,
          `<span class="highlight">${spelling}</span>`,
        );
      }
    }
    // Then, we look for times ex(10.30->10:30)
    if (
      this.input.includes(".") &&
      this.input.indexOf(".") !== this.input.length - 1
    ) {
      // If input have a possible british format time
      let hasTimes = this.input.split(" "); // We split the input in individual words
      hasTimes = hasTimes.map(word => {
        // And search for the time word, if it's the possible time word
        if (word.includes(".")) {
          const numbers = word.split("."); // Split the word in elements
          const num1 = parseInt(numbers[0]);
          const num2 = parseInt(numbers[1]);
          let newWord = word;
          // If both sides are numbers, then we make the new time word
          if (!isNaN(num1) && !isNaN(num2)) {
            newWord = `<span class="highlight">${numbers
              .slice(0, 2)
              .join(":")}</span>`;
          }
          // If the time has a dot at the end, we add it
          if (word.charAt(word.length - 1) === ".") {
            newWord = newWord.concat(".");
          }
          return newWord;
        }
        return word;
      });
      this.input = hasTimes.join(" "); // Join the words to make again the input
    }
    // Lastly, we look for titles
    let titles: keyof typeof AMER_TO_BRIT_TITLES;
    for (titles in AMER_TO_BRIT_TITLES) {
      // Create a regExp with the word to see if the input has the word
      const regex = new RegExp(AMER_TO_BRIT_TITLES[titles], "gi");
      if (regex.test(this.input)) {
        // If we have words to modify
        let wordsInput = this.input.split(" "); // We split all our words to check where is the title
        wordsInput = wordsInput.map(word => {
          // If we have a match, just add a dot to the word
          if (word.toLowerCase() === AMER_TO_BRIT_TITLES[titles]) {
            return `<span class="highlight">${word}.</span>`;
          }
          return word;
        });
        this.input = wordsInput.join(" "); // We join our words to make the input again
      }
    }
    // Then we check if the input still the same as when it start the function
    if (this.input === input) {
      // If it is, then nothing change and notify this to user, their input has nothing to translate
      return SAME_INPUT;
    } else {
      // If isn't the same, then we return the translated text
      return this.input;
    }
  }
}

/** ------------------------------------------------------------------------ */

/** Function that gets all the issues related to the project, in case user send
 * search parameters, we filter those issues to only show the ones user wants
 * Any parameter can be filtered, it return an error if project isn't found
 */
export async function getAllIssues(searchParams: ReqQueryIssue) {
  // Find all issues
  const projectIssues = await IssueTracker.find({}).catch(err => {
    console.error(err);
    return { error: ERROR_ISSUES.FAIL_FIND, category: "issue" };
  });
  if ("error" in projectIssues) {
    return projectIssues;
  }
  // If we didn't find any issue, return an error
  if (projectIssues.length === 0) {
    return {
      error: ERROR_ISSUES.NOT_ISSUES_FIND,
      category: "issue",
    };
  }
  // If we have issues, we need to filter those if user needs it
  let filteredIssues = projectIssues.slice();

  // Filter the issues based on their type
  let param: keyof ReqQueryIssue;
  // For each property in the search, if it isn't empty
  for (param in searchParams) {
    if (searchParams[param] !== undefined) {
      // For those properties that are a string, just search by it
      if (
        param !== "_id" &&
        param !== "created_on" &&
        param !== "updated_on" &&
        param !== "open"
      ) {
        filteredIssues = filteredIssues.filter(
          issue =>
            (issue[param] as string).toLowerCase() === searchParams[param],
        );
      } else if (param !== "_id" && param !== "open") {
        // If the parameter is a date, ensure we get it as string and compare it
        filteredIssues = filteredIssues.filter(issue => {
          const dateUser = new Date(searchParams[param] as string).toJSON();
          const dateIssue = new Date(
            (issue[param] as Date).toJSON().slice(0, 10),
          ).toJSON();
          return dateUser === dateIssue;
        });
      } else if (param === "_id") {
        // If it's the id of the issue, get the string from the id
        filteredIssues = filteredIssues.filter(
          issue => issue._id.toString() === searchParams._id,
        );
      } else {
        // If the search parameter is a boolean, get the value and compare it
        const bool = searchParams.open === "true";
        filteredIssues = filteredIssues.filter(issue => issue.open === bool);
      }
    }
  }

  // At the end, format each issue to display it to the user
  const displayIssue = filteredIssues.map(issue => ({
    _id: issue._id,
    project: issue.project,
    title: issue.title,
    text: issue.text,
    created_by: issue.created_by,
    status: issue.status,
    open: issue.open,
    created_on: issue.created_on,
    updated_on: issue.updated_on,
  }));
  return displayIssue;
}

/** Function that creates a new Issue in the database, it receive the
 * Issue to create and return the new Issue created and formatted
 */
export async function createNewIssue(issue: CreateIssue) {
  // Create a new Issue and save it
  const newIssue = new IssueTracker(issue);
  const resultSave = await newIssue.save().catch(err => {
    console.error(err);
    return { error: ERROR_ISSUES.FAIL_CREATE, category: "issue" };
  });
  // If there exist an error at saving it, display it
  if ("error" in resultSave) {
    return resultSave;
  }
  // If user isn't anonymous, add it to their issues
  if (issue.created_by !== "Anonymous") {
    // Find user by Id, if not found, we send an error
    const user = await GUser.findById(resultSave.created_by).catch(err => {
      console.error(err);
      return { error: ERROR_GUSER.COULD_NOT_FIND, category: "guser" };
    });
    if (user == null) {
      return {
        error: ERROR_GUSER.USER_NOT_FOUND,
        category: "guser",
      };
    }
    if ("error" in user) {
      return user;
    }
    // Put the new issue into user and save it
    user.issues.push(resultSave);
    const updatedUser = await user.save().catch(err => {
      console.error(err);
      return { error: ERROR_ISSUES.FAIL_CREATE, category: "issue" };
    });
    if ("error" in updatedUser) {
      return updatedUser;
    }
  }
  // At the end send the new issue to display it
  return {
    _id: resultSave._id,
    project: resultSave.project,
    title: resultSave.title,
    text: resultSave.text,
    created_by: resultSave.created_by,
    status: resultSave.status,
    open: resultSave.open,
    created_on: resultSave.created_on,
    updated_on: resultSave.updated_on,
  };
}

/** Function that updates an Issue based on the ID that user sent
 * Return the issue updated if was found, else it return an error
 */
export async function updateIssue(issue: UpdateIssue) {
  // Find the issue by ID, if not found return error
  const issueToUpdate = await IssueTracker.findById(issue._id).catch(err => {
    console.error(err);
    return { error: ERROR_ISSUES.FAIL_FIND_ID, category: "issue" };
  });
  if (issueToUpdate == null) {
    return { error: ERROR_ISSUES.NOT_FOUND, category: "issue" };
  }
  if ("error" in issueToUpdate) {
    return issueToUpdate;
  }
  // For each property in the issue to update
  let param: keyof UpdateIssue;
  for (param in issue) {
    // As long it has a value and isn't the _id or the project name, we can change it
    if (issue[param] !== undefined && param !== "_id") {
      if (param !== "open") {
        if (issue[param] !== "") issueToUpdate[param] = issue[param] as string;
      } else {
        issueToUpdate[param] = issue[param] as boolean;
      }
    }
  }
  // At the end we change the "update on" property to the actual date
  issueToUpdate.updated_on = new Date(Date.now());
  const issueUpdated = await issueToUpdate.save().catch(err => {
    console.error(err);
    return { error: ERROR_ISSUES.FAIL_UPDATE, category: "issue" };
  }); // Save it
  return issueUpdated; // Return the updated issue
}

/* Function that gets an ID and delete the Issue that user wants to remove */
export async function deleteIssue(_id: string) {
  // We need to find the issue by its id to get user and then remove the issue from they
  const issueToDelete = await IssueTracker.findById(_id).catch(err => {
    console.error(err);
    return { error: ERROR_ISSUES.FAIL_FIND_ID, category: "issue" };
  });
  if (issueToDelete == null) {
    return { error: ERROR_ISSUES.NOT_FOUND, category: "issue" };
  }
  if ("error" in issueToDelete) {
    return issueToDelete;
  }
  // If we found an issue, then it exist and we can delete it
  const username = issueToDelete.created_by; // Get the username

  // And delete document
  const issuesDeleted = await IssueTracker.deleteOne({ _id })
    .then(deleteObj => {
      return deleteObj.deletedCount;
    })
    .catch(err => {
      console.error(err);
      return 0;
    });
  if (issuesDeleted > 0) {
    // If we deleted something, we need to remove it from user
    // Find user by Id, if not found, we send an error
    const user = await GUser.findById(username).catch(err => {
      console.error(err);
      return { error: ERROR_GUSER.COULD_NOT_FIND, category: "guser" };
    });
    if (user == null) {
      return { error: ERROR_GUSER.USER_NOT_FOUND, category: "guser" };
    }
    if ("error" in user) {
      return user;
    }
    // Erase the issue and save user
    user.issues = user.issues.filter(issue => issue._id.toString() !== _id);
    const updatedUser = await user.save().catch(err => {
      console.error(err);
      return { error: ERROR_BOOKS.COULD_NOT_DELETE, category: "issue" };
    });
    if ("error" in updatedUser) {
      return updatedUser;
    }
    return { action: `Issue ${_id} was deleted successfully!` };
  }
  return { error: ERROR_ISSUES.EMPTY_DELETE, category: "issue" };
}

/** ------------------------------------------------------------------------ */

/** Function that gets all the books from database */
export async function getAllBooks(username: string) {
  // Get all the books that have the same username
  const books = await Book.find({ username }).catch(err => {
    console.error(err);
    return { error: ERROR_BOOKS.COULD_NOT_FIND, category: "book" };
  });
  // If the query had an error, return the error
  if ("error" in books) {
    return [books];
  }
  // If "library" is empty, then we send an "error"
  if (books.length === 0) {
    return [{ error: ERROR_BOOKS.EMPTY_LIBRARY, category: "book" }];
  }
  // If we have books in database, order the data
  const displayBooks = books.map(book => ({
    _id: book._id,
    title: book.title,
    status: book.status,
    review: book.review,
    recommend: book.recommend,
  }));
  return displayBooks;
}

/** Function that creates a new book in database with user data */
export async function createNewBook({ title, status, username }: CreateBook) {
  // create a new book with user title, status and save it
  const newBook = new Book({
    title,
    status,
    username,
  });
  const resultSave = await newBook.save().catch(err => {
    console.error(err);
    return { error: ERROR_BOOKS.COULD_NOT_SAVE, category: "book" };
  });
  // If the result was an error, return it
  if ("error" in resultSave) {
    return resultSave; // Else, return the error
  }
  // If book was successfully created, then we added to user
  // Find user by Id, if not found, we send an error
  const user = await GUser.findById(resultSave.username).catch(err => {
    console.error(err);
    return { error: ERROR_GUSER.COULD_NOT_FIND, category: "guser" };
  });
  if (user == null) {
    return {
      error: ERROR_GUSER.USER_NOT_FOUND,
      category: "guser",
    };
  }
  if ("error" in user) {
    return user;
  }
  // Put the book in user and save it
  user.books.push(resultSave);
  const updatedUser = await user.save().catch(err => {
    console.error(err);
    return { error: ERROR_BOOKS.COULD_NOT_SAVE, category: "book" };
  });
  if ("error" in updatedUser) {
    return updatedUser;
  }
  // At the end only send the id and title of the book
  const displayBook = {
    title: resultSave.title,
    _id: resultSave._id,
  };
  return displayBook;
}

/** Function that deletes all data from books collection */
export async function deleteAllBooks(username: string) {
  // Delete all books, if there is an error at deleting, display it
  const deletedBooks = await Book.deleteMany().catch(err => {
    console.error(err);
    return { error: ERROR_BOOKS.COULD_NOT_DELETE, category: "book" };
  });
  if ("error" in deletedBooks) {
    return deletedBooks;
  }
  // If it was successful, we check if there was any book removed
  const { deletedCount } = deletedBooks;
  // If it was, then the action was successful, and we need to remove books from user
  if (deletedCount > 0) {
    // Find user by Id, if not found, we send an error
    const user = await GUser.findById(username).catch(err => {
      console.error(err);
      return { error: ERROR_GUSER.COULD_NOT_FIND, category: "guser" };
    });
    if (user == null) {
      return {
        error: ERROR_GUSER.USER_NOT_FOUND,
        category: "guser",
      };
    }
    if ("error" in user) {
      return user;
    }
    // Erase the array of books
    user.books = [];
    const updatedUser = await user.save().catch(err => {
      console.error(err);
      return { error: ERROR_BOOKS.COULD_NOT_DELETE, category: "book" };
    });
    if ("error" in updatedUser) {
      return updatedUser;
    }
    return { action: `All books were successfully deleted` };
  }
  // If not, we send an error because the was nothing to delete
  return { error: ERROR_BOOKS.DELETE_EMPTY_LIBRARY, category: "book" };
}

/** Function to get a single book based on the ID given by user */
export async function getSingleBook(_id: string) {
  // Find the book by its ID, if there was an error while searching, display it
  const book = await Book.findById(_id).catch(err => {
    console.error(err);
    return { error: ERROR_BOOKS.COULD_NOT_FIND, category: "book" };
  });
  // If we found a book we display the info needed
  if (book !== null) {
    // But if it's an error, display it
    if ("error" in book) {
      return book;
    }
    const bookDisplay = {
      _id: book._id,
      title: book.title,
      status: book.status,
      notes: book.notes,
      review: book.review,
      recommend: book.recommend,
    };
    return bookDisplay;
  }
  // If we didn't found a book, display we couldn't find a book
  return { error: ERROR_BOOKS.NOT_FOUND, category: "book" };
}

/** Function that creates and appends notes to one book given its ID by user */
export async function createBookNote(note: string, _id: string) {
  // Find the book we want to append a note
  const book = await Book.findById(_id).catch(err => {
    console.error(err);
    return { error: ERROR_BOOKS.COULD_NOT_FIND, category: "book" };
  });
  // If there was an error while searching or there isn't a book, display error
  if (book == null) {
    return { error: ERROR_BOOKS.NOT_FOUND, category: "book" };
  }
  if ("error" in book) {
    return book;
  }
  // If we have a book, append the note to it
  book.notes.push(note);
  const updatedBook = await book.save().catch(err => {
    console.error(err);
    return { error: ERROR_BOOKS.COULD_NOT_SAVE, category: "book" };
  }); // Save it and if there was an error at saving it, display the error
  if ("error" in updatedBook) {
    return updatedBook;
  }
  // If everything was successful, send the info we need to display it
  const displayBook = {
    title: updatedBook.title,
    _id: updatedBook._id,
    notes: updatedBook.notes,
  };
  return displayBook;
}

/** Function that updates a book, which is title, status, review and
 * if recommends the book
 */
export async function updateBook(dataUpdate: ReqBodyUpdateBook) {
  // Find book by it's id, send an error if a problem occur or we don't find anything
  const book = await Book.findById(dataUpdate._id).catch(err => {
    console.error(err);
    return { error: ERROR_BOOKS.COULD_NOT_FIND, category: "book" };
  });
  if (book == null) return { error: ERROR_BOOKS.NOT_FOUND, category: "book" };
  if ("error" in book) return book;
  /* If we have a book, we verify each property to update, we don't update it if
     it have the same old value and it exist */
  if (
    dataUpdate.title !== undefined &&
    dataUpdate.title !== book.title &&
    dataUpdate.title !== ""
  ) {
    book.title = dataUpdate.title;
  }
  if (dataUpdate.review !== undefined && dataUpdate.review !== book.review) {
    book.review = dataUpdate.review;
  }
  if (dataUpdate.status !== book.status) {
    book.status = dataUpdate.status;
  }
  // For the recommended property, we put an undefined value
  let isRecommended;
  // Based on what user sends, we put it as true or false or undefined
  if (dataUpdate.recommend.toLowerCase() === "yes") isRecommended = true;
  if (dataUpdate.recommend.toLowerCase() === "no") isRecommended = false;
  // And only update book if the value is different from original
  if (isRecommended !== book.recommend) {
    book.recommend = isRecommended;
  }
  // Save book and send error if there was one in the process
  const updatedBook = await book.save().catch(err => {
    console.error(err);
    return { error: ERROR_BOOKS.COULD_NOT_UPDATE, category: "book" };
  });
  if ("error" in updatedBook) return updatedBook;
  // At the end send the updated fields to user
  const updatedData = {
    title: updatedBook.title,
    status: updatedBook.status,
    review: updatedBook.review,
    recommend: updatedBook.recommend,
  };
  return updatedData;
}

/** Function that deletes a specific book based on the ID given by user */
export async function deleteSingleBook(_id: string, username: string) {
  // Delete the book by its ID, if an error happened while deleting, send it to display
  const deletedBook = await Book.deleteOne({ _id }).catch(err => {
    console.error(err);
    return { error: ERROR_BOOKS.COULD_NOT_DELETE, category: "book" };
  });
  if ("error" in deletedBook) {
    return deletedBook;
  }
  // If the action was successful, we look if the book was removed
  const { deletedCount } = deletedBook;
  // If yes, then action completed
  if (deletedCount > 0) {
    // But before we end, we need to update user to remove their book
    // Find user by Id, if not found, we send an error
    const user = await GUser.findById(username).catch(err => {
      console.error(err);
      return { error: ERROR_GUSER.COULD_NOT_FIND, category: "guser" };
    });
    if (user == null) {
      return {
        error: ERROR_GUSER.USER_NOT_FOUND,
        category: "guser",
      };
    }
    if ("error" in user) {
      return user;
    }
    // Erase the book and save users
    user.books = user.books.filter(book => book._id.toString() !== _id);
    const updatedUser = await user.save().catch(err => {
      console.error(err);
      return { error: ERROR_BOOKS.COULD_NOT_DELETE, category: "book" };
    });
    if ("error" in updatedUser) {
      return updatedUser;
    }
    return { action: `Delete successful book ${_id}` };
  }
  // If nothing happened, then the book didn't exist and send an error about it
  return { error: ERROR_BOOKS.DELETE_EMPTY_BOOK, category: "book" };
}

/** Function that "deletes" 1 note in the book sent by user  */
export async function deleteBookNote({ id, number }: UpdateNote) {
  // Find the book we want to delete 1 note by its ID
  const book = await Book.findById(id).catch(err => {
    console.error(err);
    return { error: ERROR_BOOKS.COULD_NOT_FIND, category: "book" };
  });
  // Return an error if book don't exist or something went wrong
  if (book === null) return { error: ERROR_BOOKS.NOT_FOUND, category: "book" };
  if ("error" in book) return book;
  // Once we got the book, we delete the note based on their array index
  book.notes[number] = "";
  // We delete it by putting it in blank, this way we don't move the id and
  // react can keep rendering ok the notes, the empty notes will be ignored in rendering
  // Save the book and show an error if there was 1 at saving
  const resultUpdate = await book.save().catch(err => {
    console.error(err);
    return { error: ERROR_BOOKS.COULD_NOT_UPDATE, category: "book" };
  });
  if ("error" in resultUpdate) return resultUpdate;
  // At the end return the notes updated
  return {
    _id: resultUpdate._id,
    notes: resultUpdate.notes,
  };
}
