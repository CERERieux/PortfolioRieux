import { GUser, ERROR_GUSER } from "../schemas/global";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { ReqBodyCreateUser } from "../types/global";
import {
  Book,
  ERROR_BOOKS,
  ERROR_ISSUES,
  IssueTracker,
} from "../schemas/advanced";
import { ERROR_EXERCISE, ERROR_URL, ExTracker, Url } from "../schemas/basic";

export async function createUser({ _id, password }: ReqBodyCreateUser) {
  // First, find user by its ID, if exist, send an error
  const findUser = await GUser.findById(_id).catch(err => {
    console.error(err);
    return { error: ERROR_GUSER.COULD_NOT_FIND };
  });
  if (findUser !== null) {
    if ("error" in findUser) return findUser;
    return { error: ERROR_GUSER.USER_EXIST };
  }
  // If user is new, then encrypt the password and create the new Global User
  const hashPassword = await bcrypt.hash(password, 10);
  const newGUser = new GUser({
    _id,
    password: hashPassword,
  });
  // Save it and return the result whenever is an error or a success
  const resultSave = await newGUser.save().catch(err => {
    console.error(err);
    return { error: ERROR_GUSER.COULD_NOT_SAVE };
  });
  if ("error" in resultSave) return resultSave;

  return { action: `The user ${resultSave._id} was created successfully!` };
}

export async function verifyLogin({ _id, password }: ReqBodyCreateUser) {
  // Find user by ID, if don't exist, send an error
  const user = await GUser.findById(_id).catch(err => {
    console.error(err);
    return { error: ERROR_GUSER.COULD_NOT_FIND };
  });
  if (user !== null) {
    // If user exist, we compare the password with the hash
    if ("error" in user) return user;
    const isPassword = await bcrypt.compare(password, user.password);
    // If it's incorrect, return an error
    if (!isPassword) return { error: ERROR_GUSER.INCORRECT_CREDENTIALS };
  } else {
    return { error: ERROR_GUSER.INCORRECT_CREDENTIALS };
  }
  // The data we want to send with the token
  const dataToken = {
    username: user._id,
  };
  // Encrypt the token with the secret word and give it 1 day of live
  const token = jwt.sign(dataToken, process.env.SECRET_WORD as string, {
    expiresIn: 60 * 60 * 24,
  });
  // Send the user verified
  const verifiedUser = {
    username: user._id,
    token,
  };
  return verifiedUser;
}

export async function updateImageUser(_id: string, number: number) {
  // Find user by its ID and return error if something went wrong
  const user = await GUser.findById(_id).catch(err => {
    console.error(err);
    return { error: ERROR_GUSER.COULD_NOT_FIND };
  });
  if (user === null) return { error: ERROR_GUSER.USER_NOT_FOUND };
  if ("error" in user) return user;
  // If we found a user, put the new image
  user.img = `type-img-${number}`;
  // Save user and return an error if needed
  const resultUpdate = await user.save().catch(err => {
    console.error(err);
    return { error: ERROR_GUSER.COULD_NOT_UPDATE };
  });
  if ("error" in resultUpdate) return resultUpdate;
  // At the end return the result action of this operation
  return { action: `Your profile image was changed to type-img-${number}` };
}

export async function deleteUser(_id: string) {
  // Find the user to delete by id, if an error occur, send it
  const user = await GUser.findById(_id).catch(err => {
    console.error(err);
    return { error: ERROR_GUSER.COULD_NOT_FIND };
  });
  if (user === null) return { error: ERROR_GUSER.USER_NOT_FOUND };
  if ("error" in user) return user;
  /** We need to see if user has stuff created, if yes, we need to delete them
     first in order to delete user, first the issues */
  if (user.issues.length > 0) {
    const deletedIssues = await IssueTracker.deleteMany({
      created_by: _id,
    }).catch(err => {
      console.error(err);
      return { error: ERROR_ISSUES.FAIL_DELETE_ALL };
    });
    if ("error" in deletedIssues) return deletedIssues;
  }
  // Then the short urls
  if (user.shortUrl.length > 0) {
    const deletedUrls = await Url.deleteMany({ username: _id }).catch(err => {
      console.error(err);
      return { error: ERROR_URL.COULD_NOT_DELETE_ALL };
    });
    if ("error" in deletedUrls) return deletedUrls;
  }
  // Then the books
  if (user.books.length > 0) {
    const deletedBooks = await Book.deleteMany({ username: _id }).catch(err => {
      console.error(err);
      return { error: ERROR_BOOKS.COULD_NOT_DELETE_ALL };
    });
    if ("error" in deletedBooks) return deletedBooks;
  }
  // Lastly, exercises
  if (user.exercises.length > 0) {
    const deletedExercises = await ExTracker.deleteMany({
      username: _id,
    }).catch(err => {
      console.error(err);
      return { error: ERROR_EXERCISE.PROBLEM_DELETE };
    });
    if ("error" in deletedExercises) return deletedExercises;
  }
  // Once we deleted all related to user, procced to delete user
  const deletedUser = await GUser.deleteOne({ _id }).catch(err => {
    console.error(err);
    return { error: ERROR_GUSER.COULD_NOT_DELETE };
  });
  // If there was an error, show it
  if ("error" in deletedUser) return deletedUser;
  // If user was deleted, send a message to confirm it
  if (deletedUser.deletedCount > 0)
    return { action: `User ${_id} was deleted successfully` };
  else return { error: ERROR_GUSER.USER_NOT_FOUND };
}
