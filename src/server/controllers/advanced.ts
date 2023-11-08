import * as AdvancedModel from "../models/advanced";
import type { Request, Response } from "express";
import type {
  ConverterQuery,
  CreateIssue,
  ReqBodyCreateBook,
  ReqBodyIssue,
  ReqBodyNoteCreate,
  ReqBodyUpdateBook,
  ReqParamDelete,
  ReqParamsBook,
  ReqQueryIssue,
  SudokuBody,
  TranslatorBody,
  UpdateIssue,
} from "../types/advanced";
import {
  ERROR_ISSUES,
  ERROR_BOOKS,
  ERROR_CONVERTER,
  ERROR_SUDOKU,
  ERROR_TRANSLATOR,
  AME_TO_BRIT,
  BRIT_TO_AME,
} from "../schemas/advanced";

const UPDATE_SUCCESS = (id: string) => `Successfully updated issue ${id}`;
const DELETE_SUCCESS = (id: string) => `Successfully deleted issue ${id}`;
const translator = new AdvancedModel.Translator();

/** ------------------------------------------------------------------------ */

export function convertHandler(
  req: Request<{}, {}, {}, ConverterQuery>,
  res: Response,
) {
  const input = req.query.input;
  const canConvert = AdvancedModel.canBeConverted(input);
  const initialUnit = AdvancedModel.getUnit(input);
  if (!canConvert && initialUnit === "") {
    return res.status(400).json({ error: ERROR_CONVERTER.INVALID_INPUT });
  }
  if (!canConvert) {
    return res.status(400).json({ error: ERROR_CONVERTER.INVALID_NUMBER });
  }
  if (initialUnit === "") {
    return res.status(400).json({ error: ERROR_CONVERTER.INVALID_UNIT });
  }
  const initialNumber = AdvancedModel.getNumber(input);
  const resultNumber = AdvancedModel.convert({ initialNumber, initialUnit });
  const resultUnit = AdvancedModel.getReturnUnit(initialUnit);
  const initialUnitSO = AdvancedModel.spellOutUnit(initialUnit);
  const resultUnitSO = AdvancedModel.spellOutUnit(resultUnit);
  const resultString = AdvancedModel.getString({
    initialNumber,
    initialUnitSO,
    resultNumber,
    resultUnitSO,
  });
  const response = {
    initNum: initialNumber,
    initUnit: initialUnit,
    returnNum: resultNumber,
    returnUnit: resultUnit,
    string: resultString,
  };
  return res.status(200).json(response);
}

/** ------------------------------------------------------------------------ */

export function checkSudoku(
  req: Request<{}, {}, SudokuBody, {}>,
  res: Response,
) {
  const puzzle = req.body.puzzle;
  const coord = req.body.coordinate;
  const value = req.body.value;
  // If request is missing 1 field to check user's value in the puzzle, we return an error
  if (puzzle == null || coord == null || value == null) {
    return res.status(400).json({ error: ERROR_SUDOKU.MISSING_FIELDS });
  }
  // We check if the puzzle is valid to check user's input
  const validationResult = AdvancedModel.sudokuValidate(puzzle);
  if (
    validationResult === ERROR_SUDOKU.INVALID_CHARACTER ||
    validationResult === ERROR_SUDOKU.INVALID_FORMAT ||
    validationResult === ERROR_SUDOKU.UNSOLVABLE
  ) {
    return res.status(400).json({ error: validationResult });
  }
  /* If the puzzle is valid, then we check the coordinate and value given by user, if any of 
    those is invalid, we show an error */
  const regexCoordinate = /^[A-I][1-9]$/i;
  const regexValue = /^[1-9]$/;
  if (!regexCoordinate.test(coord)) {
    res.json({ error: ERROR_SUDOKU.INVALID_COORD });
  } else if (!regexValue.test(value)) {
    res.json({ error: ERROR_SUDOKU.INVALID_VALUE });
  }
  /* If coordinate and value are valid, then we start to check the user's input into the puzzle
    and see if those are valid to solve the sudoku or not
    Also, we need to see if user's value already exist in the puzzle coords they want to check,
    this is in case user sends the same value and puzzle has that value, so the code
    don't detect it is a duplicate */
  const indexOfValue = AdvancedModel.getIndexFromCoords(coord);
  let alreadyExist = false;
  let newPuzzle = puzzle;
  if (value === puzzle.charAt(indexOfValue)) {
    /* If user input already is occupied in puzzle by the same value,
     we put a dot to verify their input */
    alreadyExist = true;
    newPuzzle =
      puzzle.slice(0, indexOfValue) + "." + puzzle.slice(indexOfValue + 1);
  }
  const row = coord.slice(0, 1);
  const column = parseInt(coord.slice(1));
  const validateInput = AdvancedModel.userSudokuValidateInput({
    puzzle: newPuzzle,
    row,
    column,
    value,
  });
  /* At the end, we reset the flag that let us know if user's value is a duplicate */
  if (alreadyExist) {
    alreadyExist = false;
  }
  // If there was conflict while validating user input, we display it
  if (validateInput.conflicts.length > 0) {
    return res.status(200).json({
      valid: validateInput.validPlace,
      conflict: validateInput.conflicts,
    });
  } else {
    return res.status(200).json({ valid: validateInput.validPlace });
  }
}

export function solveSudoku(
  req: Request<{}, {}, Partial<SudokuBody>, {}>,
  res: Response,
) {
  // If request is missing the puzzle, we return an error
  const puzzle = req.body.puzzle;
  if (puzzle == null) {
    return res.status(400).json({ error: ERROR_SUDOKU.MISSING_FIELDS });
  } else {
    // We check if the puzzle is valid
    const validationResult = AdvancedModel.sudokuValidate(puzzle);
    if (
      validationResult === ERROR_SUDOKU.INVALID_CHARACTER ||
      validationResult === ERROR_SUDOKU.INVALID_FORMAT ||
      validationResult === ERROR_SUDOKU.UNSOLVABLE
    ) {
      return res.status(400).json({ error: validationResult });
    }
    // If valid, resolve sudoku with recursivity
    const result = AdvancedModel.solveSudoku(puzzle);
    return res.status(200).json({
      solution: result,
    });
  }
}

/** ------------------------------------------------------------------------ */

export function translatorAmericanBritish(
  req: Request<{}, {}, TranslatorBody, {}>,
  res: Response,
) {
  // Obtain the data from user, if there is an error with the data, send an error
  const { text, locale } = req.body;
  if (text == null || locale == null) {
    return res.status(400).json({ error: ERROR_TRANSLATOR.MISSING_FIELDS });
  }
  if (text === "") {
    return res.status(400).json({ error: ERROR_TRANSLATOR.EMPTY_TEXT });
  }
  if (locale !== AME_TO_BRIT && locale !== BRIT_TO_AME) {
    return res.status(400).json({ error: ERROR_TRANSLATOR.INVALID_LOCALE });
  }
  // If data is valid, then we check what locale user wants the translation
  if (locale === AME_TO_BRIT) {
    translator.setInput(text);
    const translationToBritish = translator.translateAmerican(text);
    return res.status(200).json({ text, translation: translationToBritish });
  } else {
    translator.setInput(text);
    const translationToAmerican = translator.translateBritish(text);
    return res.status(200).json({ text, translation: translationToAmerican });
  }
}

/** ------------------------------------------------------------------------ */

export async function getAllIssues(
  req: Request<{}, {}, {}, ReqQueryIssue>,
  res: Response,
) {
  const { project, title, text, status, open, _id } = req.query;
  const createdBy = req.query.created_by;
  const createdOn = req.query.created_on;
  const updatedOn = req.query.updated_on;
  if (_id !== undefined && _id.length !== 24) {
    return res.status(400).json({ error: ERROR_ISSUES.INVALID_FORMAT });
  }
  const searchParams: ReqQueryIssue = {
    project,
    title,
    text,
    created_by: createdBy,
    status,
    open,
    created_on: createdOn,
    updated_on: updatedOn,
    _id,
  };
  const resultQuery = await AdvancedModel.getAllIssues(searchParams);
  if ("error" in resultQuery) return res.status(500).json(resultQuery);
  return res.status(200).json(resultQuery);
}

export async function createNewIssue(
  req: Request<{}, {}, ReqBodyIssue, {}>,
  res: Response,
) {
  const { project, title, text } = req.body;
  const createdBy = req._id === process.env.DUMP_USER ? "Anonymous" : req._id;

  if (project == null || title == null || text == null) {
    return res.status(400).json({ error: ERROR_ISSUES.MISSING_FIELDS });
  } else {
    const createdOn = new Date(Date.now());
    const issue: CreateIssue = {
      project,
      title,
      text,
      created_by: createdBy,
      created_on: createdOn,
      updated_on: createdOn,
    };
    const resultCreated = await AdvancedModel.createNewIssue(issue);
    if ("error" in resultCreated) return res.status(500).json(resultCreated);
    return res.status(200).json(resultCreated);
  }
}

export async function updateIssue(
  req: Request<{}, {}, ReqBodyIssue, {}>,
  res: Response,
) {
  const { title, text, status, open, _id } = req.body;
  if (_id == null)
    return res.status(400).json({ error: ERROR_ISSUES.MISSING_ID });

  if (_id.length !== 24)
    return res.status(400).json({ error: ERROR_ISSUES.INVALID_FORMAT });

  if (title == null && text == null && status == null && open == null) {
    return res.status(400).json({
      error: ERROR_ISSUES.MISSING_UPDATE_DATA,
      _id,
    });
  }

  const issue: UpdateIssue = {
    title,
    text,
    status,
    open,
    _id,
  };
  const resultUpdate = await AdvancedModel.updateIssue(issue);
  // If there was an error at updating, display it
  if ("error" in resultUpdate) return res.status(500).json(resultUpdate);
  return res.status(200).json(UPDATE_SUCCESS(_id));
}

export async function deleteIssue(
  req: Request<ReqParamDelete, {}, {}, {}>,
  res: Response,
) {
  // If user isn't admin, send an error
  if (req._id !== process.env.ADMIN)
    return res.status(401).json({
      error: ERROR_ISSUES.FORBIDDEN_ACCESS,
    });
  const _id = req.params._id;
  if (_id == null) {
    return res.status(400).json({ error: ERROR_ISSUES.MISSING_ID });
  } else if (_id.length !== 24) {
    return res.status(400).json({ error: ERROR_ISSUES.INVALID_FORMAT });
  } else {
    const wasDeleted = await AdvancedModel.deleteIssue(_id);
    // If an issue was deleted, it was a success, if not then it's an error
    if (wasDeleted) {
      return res.status(200).json({
        result: DELETE_SUCCESS,
        _id,
      });
    } else {
      return res.status(500).json({
        error: ERROR_ISSUES.ERROR_DELETE(_id),
        _id,
      });
    }
  }
}

/** ------------------------------------------------------------------------ */

export async function getAllBooks(req: Request, res: Response) {
  // Get the user from request
  const username = req._id;
  // Get all the books and extract the 1st book
  const resultQuery = await AdvancedModel.getAllBooks(username);
  const firstBook = resultQuery[0];
  // If the 1st book has the error property, then the result was an error
  if ("error" in firstBook) {
    return res.status(500).json(firstBook);
  } else {
    return res.status(200).json(resultQuery); // Else, send all the book
  }
}

export async function createNewBook(
  req: Request<{}, {}, ReqBodyCreateBook, {}>,
  res: Response,
) {
  // Get the title from user, if don't exist, send an error
  const { title, status } = req.body;
  const username = req._id;
  if (title == null) {
    return res.status(400).json({ error: ERROR_BOOKS.MISSING_TITLE });
  }
  // Create a new book based on the title and show it
  const newBook = await AdvancedModel.createNewBook({
    title,
    status,
    username,
  });
  if ("error" in newBook) return res.status(500).json(newBook);
  return res.status(200).json(newBook);
}

export async function deleteAllBooks(req: Request, res: Response) {
  // Delete all the books and show the result of the operation
  const username = req._id;
  const deletedBooks = await AdvancedModel.deleteAllBooks(username);
  if ("error" in deletedBooks) return res.status(500).json(deletedBooks);
  return res.status(200).json(deletedBooks);
}

export async function getSingleBook(req: Request, res: Response) {
  // Get the id sent by user, if it's invalid, send an error
  const _id = req.params.id;
  if (_id.length !== 24) {
    return res.status(400).json({ error: ERROR_BOOKS.INVALID_ID });
  }
  // Find the book and show the result of the operation
  const book = await AdvancedModel.getSingleBook(_id);
  if ("error" in book) return res.status(500).json(book);
  return res.status(200).json(book);
}

export async function createBookNote(
  req: Request<ReqParamsBook, {}, ReqBodyNoteCreate, {}>,
  res: Response,
) {
  // Get data sent from user, if there is an error with both data, send an error
  const _id = req.params.id;
  if (_id.length !== 24) {
    return res.status(400).json({ error: ERROR_BOOKS.INVALID_ID });
  }
  const note = req.body.note;
  if (note == null) {
    return res.status(400).json({ error: ERROR_BOOKS.MISSING_NOTE });
  }
  // If those are valid, create the comment and show the result of the operation
  const newNote = await AdvancedModel.createBookNote(note, _id);
  if ("error" in newNote) return res.status(500).json(newNote);
  return res.status(200).json(newNote);
}

export async function updateBook(
  req: Request<ReqParamsBook, {}, ReqBodyUpdateBook, {}>,
  res: Response,
) {
  // Get data sent from user, if there is an error with both data, send an error
  const _id = req.params.id;
  if (_id.length !== 24) {
    return res.status(400).json({ error: ERROR_BOOKS.INVALID_ID });
  }
  const { title, status, review, recommend } = req.body;
  const resultUpdate = await AdvancedModel.updateBook({
    title,
    status,
    review,
    recommend,
    _id,
  });
  if ("error" in resultUpdate) return res.status(500).json(resultUpdate);
  return res.status(200).json(resultUpdate);
}

export async function deleteSingleBook(req: Request, res: Response) {
  // Get the ID of the book to delete, if there is an error with the ID, send an error
  const _id = req.params.id;
  if (_id == null) {
    return res.status(400).json({ error: ERROR_BOOKS.MISSING_ID });
  }
  if (_id.length !== 24) {
    return res.status(400).json({ error: ERROR_BOOKS.INVALID_ID });
  }
  // If valid, delete the book and show the result of the operation
  const resultDelete = await AdvancedModel.deleteSingleBook(_id, req._id);
  if ("error" in resultDelete) return res.status(500).json(resultDelete);
  return res.status(200).json(resultDelete);
}
