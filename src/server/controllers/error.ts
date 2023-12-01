import { ERROR_GUSER } from "../schemas/global";
import { ERROR_EXERCISE, ERROR_URL } from "../schemas/basic";
import { ERROR_BOOKS, ERROR_ISSUES } from "../schemas/advanced";
// import { ERROR_BOARD, ERROR_STOCK } from "../schemas/advancedMisc";
import type { ErrorStatus } from "../types/global";
import { ERROR_BOARD, ERROR_STOCK } from "../schemas/advancedMisc";

/**
 * Summary of the status return:
 * 503: Error from operations that database couldn't do likely because it is down
 * 400: Error from user data, likely send something it shouldn't
 * 200: "Error" that isn't an actual error because when it happens, it's because user arrays are empty and that's it
 */

export function basicError({ error, category }: ErrorStatus) {
  if (category === "url") {
    if (
      error === ERROR_URL.COULD_NOT_DELETE ||
      error === ERROR_URL.COULD_NOT_FIND ||
      error === ERROR_URL.COULD_NOT_SAVE
    )
      return 503;
    if (
      error === ERROR_URL.EMPTY_URL ||
      error === ERROR_URL.INVALID_FORMAT ||
      error === ERROR_URL.LOOKUP ||
      error === ERROR_URL.URL_NOT_EXIST
    )
      return 400;
    if (error === ERROR_URL.EMPTY_USER_URL) return 200;
  }
  if (category === "extracker") {
    if (
      error === ERROR_EXERCISE.PROBLEM_POST ||
      error === ERROR_EXERCISE.PROBLEM_UPDATE_USER ||
      error === ERROR_EXERCISE.COULD_NOT_FIND_EX ||
      error === ERROR_EXERCISE.PROBLEM_PUT ||
      error === ERROR_EXERCISE.PROBLEM_DELETE
    )
      return 503;
    if (error === ERROR_EXERCISE.EXERCISE_NOT_FOUND) return 400;
  }
  if (category === "guser") {
    const statusGUser = gUserError({ error, category });
    return statusGUser;
  }
  // If at the end the error for any reason don't fall in any case, send a 400
  return 400;
}

export function advancedError({ error, category }: ErrorStatus) {
  if (category === "book") {
    if (
      error === ERROR_BOOKS.COULD_NOT_DELETE ||
      error === ERROR_BOOKS.COULD_NOT_FIND ||
      error === ERROR_BOOKS.COULD_NOT_SAVE ||
      error === ERROR_BOOKS.COULD_NOT_UPDATE
    )
      return 503;

    if (
      error === ERROR_BOOKS.DELETE_EMPTY_LIBRARY ||
      error === ERROR_BOOKS.DELETE_EMPTY_BOOK ||
      error === ERROR_BOOKS.NOT_FOUND
    )
      return 400;

    if (error === ERROR_BOOKS.EMPTY_LIBRARY) return 200;
  }
  if (category === "issue") {
    if (
      error === ERROR_ISSUES.FAIL_CREATE ||
      error === ERROR_ISSUES.FAIL_FIND ||
      error === ERROR_ISSUES.FAIL_FIND_ID ||
      error === ERROR_ISSUES.FAIL_UPDATE
    )
      return 503;
    if (error === ERROR_ISSUES.NOT_FOUND || error === ERROR_ISSUES.EMPTY_DELETE)
      return 400;
    if (error === ERROR_ISSUES.NOT_ISSUES_FIND) return 200;
  }
  if (category === "guser") {
    const statusGUser = gUserError({ error, category });
    return statusGUser;
  }
  // If at the end the error for any reason don't fall in any case, send a 400
  return 400;
}

export function miscError({ error, category }: ErrorStatus) {
  if (category === "stock") {
    if (
      error === ERROR_STOCK.CREATING_CLIENT ||
      error === ERROR_STOCK.FINDING_ALL_CLIENTS ||
      error === ERROR_STOCK.PUTTING_LIKES ||
      error === ERROR_STOCK.FINDING_STOCK ||
      error === ERROR_STOCK.CREATING_STOCK ||
      error === ERROR_STOCK.UPDATE_STOCK
    )
      return 503;
    if (error === ERROR_STOCK.INVALID) return 400;
  }
  if (category === "board") {
    if (
      error === ERROR_BOARD.COULD_NOT_DELETE_BOARD ||
      error === ERROR_BOARD.COULD_NOT_DELETE_REPLY ||
      error === ERROR_BOARD.COULD_NOT_DELETE_THREAD ||
      error === ERROR_BOARD.COULD_NOT_FIND_BOARD ||
      error === ERROR_BOARD.COULD_NOT_FIND_REPLY ||
      error === ERROR_BOARD.COULD_NOT_FIND_THREAD ||
      error === ERROR_BOARD.COULD_NOT_GET_ALL_BOARDS ||
      error === ERROR_BOARD.COULD_NOT_SAVE_BOARD ||
      error === ERROR_BOARD.COULD_NOT_SAVE_REPLY ||
      error === ERROR_BOARD.COULD_NOT_SAVE_THREAD ||
      error === ERROR_BOARD.COULD_NOT_UPDATE_REPLY ||
      error === ERROR_BOARD.COULD_NOT_UPDATE_THREAD
    )
      return 503;
  }
  if (category === "guser") {
    const statusGUser = gUserError({ error, category });
    return statusGUser;
  }
  // If at the end the error for any reason don't fall in any case, send a 400
  return 400;
}

export function gUserError({ error, category }: ErrorStatus) {
  if (
    error === ERROR_GUSER.COULD_NOT_CREATE ||
    error === ERROR_GUSER.COULD_NOT_DELETE ||
    error === ERROR_GUSER.COULD_NOT_FIND ||
    error === ERROR_GUSER.COULD_NOT_SAVE ||
    error === ERROR_GUSER.COULD_NOT_UPDATE ||
    error === ERROR_URL.COULD_NOT_DELETE_ALL ||
    error === ERROR_EXERCISE.PROBLEM_DELETE_ALL ||
    error === ERROR_BOOKS.COULD_NOT_DELETE_ALL ||
    error === ERROR_ISSUES.FAIL_DELETE_ALL
  )
    return 503;

  if (
    error === ERROR_GUSER.USER_NOT_FOUND ||
    error === ERROR_GUSER.EXPIRED_TOKEN ||
    error === ERROR_GUSER.ERROR_VERIFY_TOKEN
  )
    return 401;
  if (
    error === ERROR_GUSER.USER_EXIST ||
    error === ERROR_GUSER.INCORRECT_CREDENTIALS
  )
    return 400;
  // If at the end the error for any reason don't fall in any case, send a 400
  return 400;
}
