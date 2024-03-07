import { GUser, ERROR_GUSER } from "../schemas/global";
import bcrypt from "bcrypt";
import jwt, { type JwtPayload, TokenExpiredError } from "jsonwebtoken";
import type { ReqBodyCreateUser, UpdateUserData } from "../types/global";
import {
  Book,
  ERROR_BOOKS,
  ERROR_ISSUES,
  IssueTracker,
} from "../schemas/advanced";
import { ERROR_EXERCISE, ERROR_URL, ExTracker, Url } from "../schemas/basic";
import { type IBook } from "../types/advanced";

export async function getUserBasicInfo(_id: string) {
  const user = await GUser.findById(_id).catch(err => {
    console.error(err);
    return { error: ERROR_GUSER.COULD_NOT_FIND, category: "guser" };
  });
  if (user === null)
    return { error: ERROR_GUSER.USER_NOT_EXIST, category: "guser" };
  if ("error" in user) return user;
  else {
    return {
      username: user._id,
      img: user.img,
      bio: user.bio,
    };
  }
}

export async function createUser({ _id, password }: ReqBodyCreateUser) {
  // First, find user by its ID, if exist, send an error
  const findUser = await GUser.findById(_id).catch(err => {
    console.error(err);
    return { error: ERROR_GUSER.COULD_NOT_FIND, category: "guser" };
  });
  if (findUser !== null) {
    if ("error" in findUser) return findUser;
    return { error: ERROR_GUSER.USER_EXIST, category: "guser" };
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
    return { error: ERROR_GUSER.COULD_NOT_SAVE, category: "guser" };
  });
  if ("error" in resultSave) return resultSave;

  return { action: `The user ${resultSave._id} was created successfully!` };
}

export async function verifyLogin({ _id, password }: ReqBodyCreateUser) {
  // Find user by ID, if don't exist, send an error
  const user = await GUser.findById(_id).catch(err => {
    console.error(err);
    return { error: ERROR_GUSER.COULD_NOT_FIND, category: "guser" };
  });
  if (user !== null) {
    // If user exist, we compare the password with the hash
    if ("error" in user) return user;
    const isPassword = await bcrypt.compare(password, user.password);
    // If it's incorrect, return an error
    if (!isPassword)
      return { error: ERROR_GUSER.INCORRECT_CREDENTIALS, category: "guser" };
  } else {
    return { error: ERROR_GUSER.INCORRECT_CREDENTIALS, category: "guser" };
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

export async function updateUser({ _id, img, bio }: UpdateUserData) {
  // Find user by its ID and return error if something went wrong
  const user = await GUser.findById(_id).catch(err => {
    console.error(err);
    return { error: ERROR_GUSER.COULD_NOT_FIND, category: "guser" };
  });
  if (user === null)
    return { error: ERROR_GUSER.USER_NOT_FOUND, category: "guser" };
  if ("error" in user) return user;
  // If we found a user, put the new image and the new bio
  if (img !== "-1" && img !== user.img) user.img = `${img}`;
  if (bio !== undefined && bio !== user.bio) user.bio = bio;
  // Save user and return an error if needed
  const resultUpdate = await user.save().catch(err => {
    console.error(err);
    return { error: ERROR_GUSER.COULD_NOT_UPDATE, category: "guser" };
  });
  if ("error" in resultUpdate) return resultUpdate;
  // At the end return the result action of this operation
  return { action: `Your profile was updated!` };
}

export async function deleteUser(_id: string) {
  // Find the user to delete by id, if an error occur, send it
  const user = await GUser.findById(_id).catch(err => {
    console.error(err);
    return { error: ERROR_GUSER.COULD_NOT_FIND, category: "guser" };
  });
  if (user === null)
    return { error: ERROR_GUSER.USER_NOT_FOUND, category: "guser" };
  if ("error" in user) return user;
  /** We need to see if user has stuff created, if yes, we need to delete them
     first in order to delete user, first the issues */
  if (user.issues.length > 0) {
    const deletedIssues = await IssueTracker.deleteMany({
      created_by: _id,
    }).catch(err => {
      console.error(err);
      return { error: ERROR_ISSUES.FAIL_DELETE_ALL, category: "guser" };
    });
    if ("error" in deletedIssues) return deletedIssues;
  }
  // Then the short urls
  if (user.shortUrl.length > 0) {
    const deletedUrls = await Url.deleteMany({ username: _id }).catch(err => {
      console.error(err);
      return { error: ERROR_URL.COULD_NOT_DELETE_ALL, category: "guser" };
    });
    if ("error" in deletedUrls) return deletedUrls;
  }
  // Then the books
  if (user.books.length > 0) {
    const deletedBooks = await Book.deleteMany({ username: _id }).catch(err => {
      console.error(err);
      return { error: ERROR_BOOKS.COULD_NOT_DELETE_ALL, category: "guser" };
    });
    if ("error" in deletedBooks) return deletedBooks;
  }
  // Lastly, exercises
  if (user.exercises.length > 0) {
    const deletedExercises = await ExTracker.deleteMany({
      username: _id,
    }).catch(err => {
      console.error(err);
      return { error: ERROR_EXERCISE.PROBLEM_DELETE, category: "guser" };
    });
    if ("error" in deletedExercises) return deletedExercises;
  }
  // Once we deleted all related to user, procced to delete user
  const deletedUser = await GUser.deleteOne({ _id }).catch(err => {
    console.error(err);
    return { error: ERROR_GUSER.COULD_NOT_DELETE, category: "guser" };
  });
  // If there was an error, show it
  if ("error" in deletedUser) return deletedUser;
  // If user was deleted, send a message to confirm it
  if (deletedUser.deletedCount > 0)
    return { action: `User ${_id} was deleted successfully` };
  else return { error: ERROR_GUSER.USER_NOT_FOUND, category: "guser" };
}

export async function verifyToken(token: string) {
  // First try to verify the token
  let decodedToken;
  try {
    decodedToken = jwt.verify(
      token,
      process.env.SECRET_WORD as string,
    ) as JwtPayload;
  } catch (error) {
    // If there is an error, send it
    console.error(error);
    if (error instanceof TokenExpiredError)
      return { error: ERROR_GUSER.EXPIRED_TOKEN, category: "guser" };
    else {
      return { error: ERROR_GUSER.ERROR_VERIFY_TOKEN, category: "guser" };
    }
  }
  // If token is valid, we check for the time expiration
  const todayAsMs = new Date(Date.now()).getTime();
  const expDateToken = (decodedToken.exp as number) * 1000;
  const timeLeft = expDateToken - todayAsMs;
  // Only generate a new token if the expiration date is close (1 day or less close
  if (timeLeft < 86400000) {
    const dataToken = {
      username: decodedToken.username,
    };
    // A new token with expiration of 5 days and the username as information
    const newToken = jwt.sign(dataToken, process.env.SECRET_WORD as string, {
      expiresIn: 60 * 60 * 24 * 5,
    });
    return { newToken };
  }
  // If there is time left, just return the old token
  return { newToken: token };
}

export async function getAllUsers() {
  const users = await GUser.find({})
    .select("_id")
    .exec()
    .catch(err => {
      console.error(err);
      return { error: ERROR_GUSER.COULD_NOT_FIND, category: "guser" };
    });
  if ("error" in users) return users;
  if (users.length === 0)
    return { error: ERROR_GUSER.USER_NOT_FOUND, category: "guser" };
  return users;
}

export async function getUserInfo(user: string) {
  if (user === "Anonymous") {
    const shortUrl = await Url.find({ username: process.env.DUMP_USER }).catch(
      err => {
        console.error(err);
        return { error: ERROR_URL.COULD_NOT_FIND, category: "url" };
      },
    );
    if ("error" in shortUrl) return shortUrl;
    const issues = await IssueTracker.find({ created_by: user }).catch(err => {
      console.error(err);
      return { error: ERROR_ISSUES.FAIL_FIND, category: "issue" };
    });
    if ("error" in issues) return issues;
    const books: IBook[] = [];
    const data = {
      _id: user,
      books,
      issues,
      shortUrl,
    };
    return data;
  } else {
    const userInfo = await GUser.findById(user)
      .select("_id issues books shortUrl")
      .populate("issues books shortUrl")
      .exec()
      .catch(err => {
        console.error(err);
        return { error: ERROR_GUSER.COULD_NOT_FIND, category: "guser" };
      });
    if (userInfo === null)
      return { error: ERROR_GUSER.USER_NOT_FOUND, category: "guser" };
    if ("error" in userInfo) return userInfo;
    const data = {
      _id: userInfo._id,
      books: userInfo.books,
      issues: userInfo.issues,
      shortUrl: userInfo.shortUrl,
    };
    return data;
  }
}
