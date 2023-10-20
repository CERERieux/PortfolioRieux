import * as BasicModel from "../models/basic";
import type { Request, Response } from "express";
import type {
  ExerciseElements,
  LogOptions,
  ReqParamsLog,
  ReqQueryLog,
  ValidUrlReq,
} from "../types/basic";

/** --------------------------------------------------------------- */

export function timestamp(req: Request, res: Response) {
  let date: Date = new Date(Date.now()); // Create a date with the actual date
  // Check for the optional date, if there is one, we replace the actual one with users
  if (req.params.date != null) {
    // Check if date given is a unix date or something else
    if (/\D/.test(req.params.date)) {
      date = new Date(req.params.date);
    } else {
      date = new Date(parseInt(req.params.date));
    }
  }
  // If we can't get the time, it's an invalid date
  if (!isNaN(date.getTime())) {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  } else {
    res.json({ error: date.toUTCString() });
  }
}

/** --------------------------------------------------------------- */

export function headParser(req: Request, res: Response) {
  // We display from request the next information:
  const headResponse = {
    ipaddress: req.ip, // IP of the user
    language: req.acceptsLanguages(), // The prefered language they use
    software: req.headers["user-agent"], // And the specs of the user
  };
  res.json(headResponse);
}

/** --------------------------------------------------------------- */

export async function shortenerURL(req: Request, res: Response) {
  const shortURL = await BasicModel.createShortURL(req.body); // Create a short URL with the user data
  // If the short URL is bigger then 8 characters, then it's an error
  if (shortURL.length > 8) {
    res.json({ error: shortURL });
  } else {
    res.json({ original_url: req.body.url, short_url: shortURL });
  }
}

export async function visitShortURL(req: Request, res: Response) {
  // We check if user sent a short url that exist
  const userURL = req.params.user_url;
  if (userURL.length !== 8) {
    res.json({ error: "Please introduce a valid shortURL" });
  }
  const isValidReq: ValidUrlReq = await BasicModel.canRedirectURL(userURL);
  // If it exist/it's valid, we redirect the user to its original url
  if (isValidReq.isValid) {
    res.redirect(301, isValidReq.original_url);
  } else {
    // If it don't exist, we indicate an error
    res.json(isValidReq.original_url);
  }
}

/** --------------------------------------------------------------- */

export async function getAllUsers(req: Request, res: Response) {
  const users = await BasicModel.getAllUsers();
  res.json(users);
}

export async function createUser(req: Request, res: Response) {
  const newUser = await BasicModel.createNewUser(req.body);
  if (typeof newUser === "string") {
    res.json({ error: newUser });
  } else {
    res.json({ username: newUser.username, _id: newUser._id });
  }
}

export async function deleteUser(req: Request, res: Response) {
  // TODO
  const result = await BasicModel.deleteUser(req.params._id);
  res.json(result);
}

export async function createNewExercise(req: Request, res: Response) {
  // We create a date with the actual time
  let exerciseDate = new Date(Date.now()).toDateString();
  if (req.body.date !== "") {
    // If user sends a date, we replace the old date with the user one
    exerciseDate = new Date(req.body.date).toDateString();
  }
  // Create an object with all the elements we need to create a new exercise
  const exerciseData: ExerciseElements = {
    _id: req.params._id,
    description: req.body.description,
    duration: req.body.duration,
    date: exerciseDate,
  };
  const resultExercise = await BasicModel.createNewExercise(exerciseData);
  res.json(resultExercise);
}

export async function deleteExercise(req: Request, res: Response) {
  const result = await BasicModel.deleteExercise(req.params._id);
  res.json(result);
}

export async function displayUserLog(
  req: Request<ReqParamsLog, {}, {}, ReqQueryLog>,
  res: Response,
) {
  // We get all the queries we want from user even if those are undefined
  const { from, to, limit } = req.query;
  // Create an object with the options to display the user's log activity
  const options: LogOptions = {
    from,
    to,
    limit,
    _id: req.params._id,
  };
  const Logs = await BasicModel.displayUserLog(options);
  res.json(Logs);
}

/** --------------------------------------------------------------- */
// TODO FILE UPLOAD MULTER
