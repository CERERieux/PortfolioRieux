import { GUser } from "../schemas/global";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { ReqBodyCreateUser } from "../types/global";

const ERROR_GUSER = {
  COULD_NOT_FIND: "Can't find any user right now, please try again later",
  COULD_NOT_SAVE: "Can't save any user right now, please try again later",
  INCORRECT_CREDENTIALS:
    "The username or password are incorrect, please introduce a valid pair of information",
  USER_EXIST: "The username is already taken, please introduce a new one",
};

export async function createUser({ _id, password }: ReqBodyCreateUser) {
  // First, find user by its ID, if exist, send an error
  const findUser = await GUser.findById({ _id }).catch(err => {
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

/** TODO: Delete the user and maybe show users */
