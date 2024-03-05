import * as BasicModel from "../models/basic";
import { basicError } from "./error";
import type { Request, Response } from "express";
import type {
  ExerciseElements,
  LogOptions,
  ReqExerciseBody,
  ReqParam,
  ReqQueryLog,
  ValidUrlReq,
} from "../types/basic";
import { ERROR_EXERCISE, ERROR_URL } from "../schemas/basic";
import { ERROR_GUSER } from "../schemas/global";
import type { AdminData } from "../types/advanced";

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
    return res
      .status(200)
      .json({ unix: date.getTime(), utc: date.toUTCString() });
  } else {
    return res.status(400).json({ error: date.toUTCString() });
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
  return res.status(200).json(headResponse);
}

/** --------------------------------------------------------------- */

export async function getUserURL(req: Request, res: Response) {
  const username = req._id;
  const allUserUrl = await BasicModel.getUserURL(username);
  if ("error" in allUserUrl) {
    const status = basicError(allUserUrl);
    return res.status(status).json(allUserUrl);
  }
  return res.status(200).json(allUserUrl);
}

export async function shortenerURL(req: Request, res: Response) {
  // Get the username and url from user
  const { url } = req.body;
  const username = req._id;
  const resultURL = await BasicModel.createShortURL({ url, username }); // Create a short URL with the user data
  // If the short URL is bigger then 8 characters, then it's an error
  if ("error" in resultURL) {
    const status = basicError(resultURL);
    return res.status(status).json( resultURL );
  } else {
    return res
      .status(201)
      .json({ original_url: url, short_url: resultURL.shortUrl });
  }
}

export async function visitShortURL(req: Request, res: Response) {
  // We check if user sent a short url that exist
  const userURL = req.params.user_url;
  if (userURL.length !== 8) {
    return res.status(400).json({ error: ERROR_URL.INVALID_SHORTURL });
  }
  const isValidReq: ValidUrlReq = await BasicModel.canRedirectURL(userURL);
  // If it exist/it's valid, we redirect the user to its original url
  if (isValidReq.isValid) {
    res.redirect(301, isValidReq.original_url);
  } else {
    // If it don't exist, we indicate an error
    const status = basicError({
      error: isValidReq.original_url,
      category: "url",
    });
    return res.status(status).json(isValidReq.original_url);
  }
}

export async function deleteShortURL(
  req: Request<ReqParam, {}, {}, AdminData>,
  res: Response,
) {
  const { _id } = req.params;
  if (_id.length !== 24)
    return res.status(400).json({ error: ERROR_URL.INVALID_ID });
  const username =
    req._id === (process.env.ADMIN as string) ? req.query.user_id : req._id;
  if (username === undefined)
    return res.status(400).json({ error: ERROR_GUSER.ADMIN_FORGOT_USER });
  const resultDelete = await BasicModel.deleteShortURL(_id, username);
  if ("error" in resultDelete) {
    const status = basicError(resultDelete);
    return res.status(status).json(resultDelete);
  }
  return res.status(200).json(resultDelete);
}

/** --------------------------------------------------------------- */

export async function createNewExercise(
  req: Request<{}, {}, ReqExerciseBody, {}>,
  res: Response,
) {
  const { description, status, date } = req.body;
  // We create a date with the actual time
  let exerciseDate = new Date(Date.now());
  if (date != null && date !== "") {
    // If user sends a date, we replace the old date with the user one
    exerciseDate = new Date(date);
  }
  // Create an object with all the elements we need to create a new exercise
  const exerciseData: ExerciseElements = {
    _id: req._id,
    description,
    status,
    date: exerciseDate,
  };
  const resultExercise = await BasicModel.createNewExercise(exerciseData);
  if ("error" in resultExercise) {
    const status = basicError(resultExercise);
    return res.status(status).json(resultExercise);
  }
  return res.status(201).json(resultExercise);
}

export async function displayUserLog(
  req: Request<{}, {}, {}, ReqQueryLog>,
  res: Response,
) {
  // We get all the queries we want from user even if those are undefined
  const { from, to } = req.query;
  // Create an object with the options to display the user's log activity
  const options: LogOptions = {
    from,
    to,
    _id: req._id,
  };
  const logs = await BasicModel.displayUserLog(options);
  if ("error" in logs) {
    const status = basicError(logs);
    return res.status(status).json(logs);
  }
  return res.status(200).json(logs);
}

export async function updateExercise(
  req: Request<ReqParam, {}, ReqExerciseBody, {}>,
  res: Response,
) {
  const { _id } = req.params;
  // If id isn't valid or exercise isn't found, return an error
  if (_id.length !== 24) {
    return res.status(400).json({ error: ERROR_EXERCISE.ID_FORMAT });
  }
  const { description, status } = req.body;
  const resultUpdate = await BasicModel.updateExercise({
    _id,
    description,
    status,
  });
  if ("error" in resultUpdate) {
    const status = basicError(resultUpdate);
    return res.status(status).json(resultUpdate);
  }
  return res.status(200).json(resultUpdate);
}

export async function deleteExercise(
  req: Request<ReqParam, {}, {}, {}>,
  res: Response,
) {
  const { _id } = req.params;
  // If id isn't valid or exercise isn't found, return an error
  if (_id.length !== 24) {
    return res.status(400).json({ error: ERROR_EXERCISE.ID_FORMAT });
  }
  const resultDelete = await BasicModel.deleteExercise(req.params._id);
  if ("error" in resultDelete) {
    const status = basicError(resultDelete);
    return res.status(status).json(resultDelete);
  }
  return res.status(200).json(resultDelete);
}

/** --------------------------------------------------------------- */
// TODO FILE UPLOAD MULTER
