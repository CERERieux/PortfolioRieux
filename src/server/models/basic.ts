import "mongoose"; // Import mongoose to be able to use the models and manage our database
import dns from "node:dns"; // We need "dns" to verify if user hostname exist
import { nanoid } from "nanoid"; // NanoID to make the short URL in an easier way
import { Url, User, ExTracker } from "../schemas/basic";
import type {
  ValidUrlReq,
  IShortenerUrl,
  ValidExtension,
  ExerciseElements,
  LogOptions,
  IExTracker,
  DeleteResult,
  Error,
} from "../types/basic";

const dnsPromises = dns.promises;
const ERROR_URL = {
  COULD_NOT_FIND: "Couldn't find your shortURL, please try again later",
  COULD_NOT_SAVE: "Couldn't save your new shortURL, please try again later",
  EMPTY_URL: "Please put an URL in the form",
  INVALID_FORMAT:
    "Invalid format, please put an URL with the format http(s)://hostname.com",
  LOOKUP:
    "Error at trying to verify if URL is a valid hostname, verify if the URL is correct or try again later",
  URL_NOT_EXIST: "Error: This short URL doesn't exist, please put a valid URL",
};
const ERROR_USER = {
  COULD_NOT_FIND: "Could not find the user you needed, please try again later",
  COULD_NOT_FIND_EX:
    "Could not find the exercise you needed, please try again later",
  COULD_NOT_DELETE:
    "Could not delete the user you needed, please try again later",
  EXERCISE_NOT_FOUND:
    "The exercise doesn't exist in database, check if the exerciseID you entered is correct",
  EMPTY_RESULT: "Couldn't find any result that match your search",
  ID_FORMAT:
    "The ID you entered doesn't match the required format, please put a valid ID format",
  PROBLEM_GET:
    "Error at trying to get the information you asked for, please try again",
  PROBLEM_POST: "Error at trying to create a new user, please try again",
  PROBLEM_POST_EX: "Error at trying to create a new exercise, please try again",
  PROBLEM_UPDATE_USER:
    "Error at trying to update user's new exercise, please try again",
  PROBLEM_DELETE:
    "Error at trying to delete what you asked us to delete, please try again",
  USER_NOT_FOUND:
    "The user doesn't exist in database, check if the userID you entered is correct",
};

export async function createShortURL({ url }: { url: string }) {
  // If user didn't sent an URL in the form, we end the function
  if (url === "") {
    return ERROR_URL.EMPTY_URL;
  }
  // If the url don't have the format http(s)://hostname.com, we end the function
  const urlToCheck = url.split("/");
  if (urlToCheck.length < 3) {
    return ERROR_URL.INVALID_FORMAT;
  }
  // Object to configure the lookup function
  const options = {
    family: 6, // Family to search for IPv6
    hints: dns.ADDRCONFIG | dns.V4MAPPED, // And search for addresses IPv6 and IPv4
  };

  // To get our new short URL we look up if the hostname exist
  const newURL = await dnsPromises
    .lookup(urlToCheck[2], options)
    .then(async () => {
      // If there wasn't an error, we create the short URL, we need an auxiliar to do so
      let validatingURL = false;
      // We will create a new extension until is a valid one
      let newExtension = nanoid(8);
      do {
        const validExtension = await createUrlDB(newExtension, url); // Save result in DB
        // If there was an error in the process, display it
        if ("error" in validExtension) {
          return validExtension.error;
        }
        // If we had a duplicate, we need keep validating the url
        if (!validExtension.valid) {
          validatingURL = true;
          newExtension = nanoid(8);
        } else {
          // If we had a valid URL, stop verifying
          validatingURL = false;
        }
      } while (validatingURL);
      return newExtension;
    })
    .catch(err => {
      // If there was an error while looking up for the hostname, we send an error as result
      console.error(err);
      return ERROR_URL.LOOKUP;
    });

  return newURL;
}

async function createUrlDB(newExtension: string, url: string) {
  // First we check if the new extension already is used
  const query = await Url.find({ shortUrl: newExtension })
    .exec()
    .then(data => {
      if (data.length === 0) {
        return true;
      }
      return false;
    })
    .catch(err => {
      console.error(err);
      return { error: ERROR_URL.COULD_NOT_FIND };
    });
  // If we had an error while finding, end the function
  if (typeof query !== "boolean") {
    return query;
  }
  // If it free, then we create the new short URL to save it
  if (query) {
    const newValidExtension: ValidExtension = {
      valid: true,
      newExtension,
    };
    const newUserUrl = new Url({
      shortUrl: newExtension,
      originalUrl: url,
    });
    // Save new URL
    const resultSave = await newUserUrl.save().catch(err => {
      console.error(err);
      return { error: ERROR_URL.COULD_NOT_SAVE };
    });
    if ("error" in resultSave) {
      return resultSave;
    }
    return newValidExtension; // Return the new extension and if it was valid
  } else {
    // If extension is used, then we send a "signal" to the model so it keeps trying
    const invalidExtension: ValidExtension = {
      valid: false,
      newExtension,
    };
    return invalidExtension;
  }
}

export async function canRedirectURL(shortUrl: string) {
  // Find the users link
  const isValidReq: ValidUrlReq = await Url.find({ shortUrl })
    .exec()
    .then((data: IShortenerUrl[]) => {
      // If the link don't exist
      if (data.length === 0) {
        const response = {
          isValid: false, // We send an error pointing this problem
          original_url: ERROR_URL.URL_NOT_EXIST,
        };
        return response;
      } else {
        // If the link exist, we send the original users url
        const response = {
          isValid: true,
          original_url: data[0].originalUrl,
        };
        return response;
      }
    })
    .catch(err => {
      console.error(err);
      return { isValid: false, original_url: ERROR_URL.COULD_NOT_FIND };
    });
  return isValidReq;
}

/** ---------------------------------------------------------------- */

export async function getAllUsers() {
  // Get all users from User table
  const query = await User.find({})
    .exec()
    .then(data => {
      // If there is any data(users)
      if (data.length > 0) {
        // We only need to show the username and ID from each one
        const infoToDisplay = data.map(user => {
          return {
            username: user.username,
            _id: user._id,
          };
        });
        return infoToDisplay; // Return the info filtered
      } else {
        return { error: ERROR_USER.EMPTY_RESULT };
      }
    })
    .catch(err => {
      console.error(err);
      return { error: ERROR_USER.COULD_NOT_FIND };
    });

  return query;
}

export async function createNewUser({ username }: { username: string }) {
  const newUser = new User({
    username,
  });
  const isError = await newUser.save().catch(err => {
    console.error(err);
    return true;
  });
  if (isError === true) {
    return ERROR_USER.PROBLEM_POST;
  }
  return newUser;
}

export async function deleteUser(_id: string): Promise<DeleteResult | Error> {
  // If id isn't valid or user isn't found, return an error
  if (_id.length !== 24) {
    return { error: ERROR_USER.ID_FORMAT };
  }

  const user = await User.findById({ _id }).catch(err => {
    console.error(err);
    return { error: ERROR_USER.COULD_NOT_DELETE };
  });
  if (user == null) {
    return { error: ERROR_USER.USER_NOT_FOUND };
  }
  if ("error" in user) {
    return user;
  }
  // If user exist, then delete they activities
  const deletedExercises = await ExTracker.deleteMany({ username: _id })
    .then(deleted => {
      return deleted.deletedCount;
    })
    .catch(err => {
      console.error(err);
      return -1;
    });
  if (deletedExercises === -1) {
    return { error: ERROR_USER.PROBLEM_DELETE };
  }
  // Once we deleted their activities, delete the user
  const userDeleted = await User.deleteOne({ _id })
    .then(deleted => {
      return deleted.deletedCount;
    })
    .catch(err => {
      console.error(err);
      return -1;
    });
  if (userDeleted === -1) {
    return { error: ERROR_USER.PROBLEM_DELETE };
  }
  // Return an object with the user deleted and the number of activities they had
  return {
    delete: {
      user: _id,
      no_exercise: deletedExercises,
    },
  };
}

export async function createNewExercise({
  _id,
  description,
  duration,
  date,
}: ExerciseElements) {
  // In case the Id we recieve isn't correct, we send an error
  if (_id.length !== 24) {
    return {
      error: ERROR_USER.ID_FORMAT,
    };
  }
  // Find user by Id, if not found, we send an error
  const user = await User.findById({ _id }).catch(err => {
    console.error(err);
    return { error: ERROR_USER.COULD_NOT_FIND };
  });
  if (user == null) {
    return {
      error: ERROR_USER.USER_NOT_FOUND,
    };
  }
  if ("error" in user) {
    return user;
  }
  // If we found the user, create a new exercise with the elements needed
  const newExercise = new ExTracker({
    username: user._id,
    description,
    duration,
    date,
  });

  const resultSave = await newExercise.save().catch(err => {
    console.error(err);
    return { error: ERROR_USER.PROBLEM_POST_EX };
  }); // Save it
  if ("error" in resultSave) {
    return resultSave;
  }
  user.log.push(newExercise); // Push it to the user's log
  user.count = user.count + 1; // Update the count of user's activities
  // Save the modifications, then we return an object that display the new info
  const result = await user
    .save()
    .then(u => {
      return {
        username: u.username,
        description: newExercise.description,
        duration: newExercise.duration,
        date: newExercise.date,
        _id: u._id,
      };
    })
    .catch(err => {
      console.error(err);
      return { error: ERROR_USER.PROBLEM_UPDATE_USER };
    });

  return result;
}

export async function deleteExercise(_id: string) {
  // If id isn't valid or exercise isn't found, return an error
  if (_id.length !== 24) {
    return { error: ERROR_USER.ID_FORMAT };
  }

  const exercise = await ExTracker.findById({ _id }).catch(err => {
    console.error(err);
    return { error: ERROR_USER.COULD_NOT_FIND_EX };
  });
  if (exercise == null) {
    return { error: ERROR_USER.EXERCISE_NOT_FOUND };
  }
  if ("error" in exercise) {
    return exercise;
  }

  // Get the user because later we need to decrement the count of their exercises
  const user = await User.findById({ _id: exercise.username }).catch(err => {
    console.error(err);
    return { error: ERROR_USER.COULD_NOT_FIND };
  });
  if (user == null) {
    return { error: ERROR_USER.USER_NOT_FOUND };
  }
  if ("error" in user) {
    return user;
  }

  // Delete the exercise
  const deletedExercises = await ExTracker.deleteOne({ _id })
    .then(deleted => {
      return deleted.deletedCount;
    })
    .catch(err => {
      console.error(err);
      return -1;
    });
  if (deletedExercises === -1) {
    return { error: ERROR_USER.PROBLEM_DELETE };
  }

  // Decrement count in user
  user.count = user.count - 1;
  user.save().catch(err => {
    console.error(err);
    return { error: ERROR_USER.PROBLEM_DELETE };
  });

  // Return an object with the confirmation that exercise was deleted
  return { action: `The exercise ${_id} was sucessfully deleted.` };
}

export async function displayUserLog({ from, to, limit, _id }: LogOptions) {
  // If ID doesn't match the required format, send an error
  if (_id.length !== 24) {
    return {
      error: ERROR_USER.ID_FORMAT,
    };
  }
  // Find user by it's ID and populate the user's log, if doesn't exist, send an error
  const user = await User.findById({ _id })
    .populate("log", "description duration date")
    .exec()
    .catch(err => {
      console.error(err);
      return { error: ERROR_USER.COULD_NOT_FIND };
    });
  if (user == null) {
    return {
      error: ERROR_USER.USER_NOT_FOUND,
    };
  }
  if ("error" in user) {
    return user;
  }
  // If we found the user, we filter the info from the logs, we only filter the ID of each activity
  let orderLog: Array<Partial<IExTracker>> = user.log.map(exercise => {
    return {
      description: exercise.description,
      duration: exercise.duration,
      date: exercise.date,
    };
  });
  // Once we get our logs clean, we filter in case user sent queries in the request
  // Filter after a specific date
  if (from !== undefined) {
    orderLog = orderLog.filter(log => {
      const date = new Date(log.date as string).getTime();
      const filter = new Date(from).getTime();
      if (date > filter) return true;
      return false;
    });
  }
  // Filter before a specific date
  if (to !== undefined) {
    orderLog = orderLog.filter(log => {
      const date = new Date(log.date as string).getTime();
      const filter = new Date(to).getTime();
      if (date < filter) return true;
      return false;
    });
  }
  // Filter the number of activities in log
  if (limit !== undefined) {
    const limitNum = parseInt(limit);
    orderLog = orderLog.filter((log, i) => i < limitNum);
  }

  // Create the result in order
  const orderResult = {
    username: user.username,
    count: user.count,
    _id: user._id,
    log: orderLog,
  };
  return orderResult;
}
