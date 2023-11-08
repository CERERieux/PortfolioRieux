import mongoose from "mongoose";
import type {
  StockAPI,
  LikeStock,
  OperationStocks,
  StockDocument,
  StockQuery,
  SingleConsultStock,
  IStocksData,
  IThreadFiltered,
  CreateThread,
  UserDataCreate,
  GetReplies,
  DeleteElementBoard,
} from "../types/advancedMisc";
import {
  Stock,
  Client,
  ERROR_STOCK,
  Board,
  Thread,
  Reply,
  ERROR_BOARD,
  ACTION_BOARD,
} from "../schemas/advancedMisc";

// Link to the API we consult to get the stock market info
const STOCK_API =
  "https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/[symbol]/quote";

/** ------------------------------------------------------------------------ */

export async function consultStock({ stock, like, _id }: StockQuery) {
  // We will search if client is new or already exist
  const dbClientId = await Client.findOne({ username: _id }).catch(err => {
    console.error(err);
    return { error: ERROR_STOCK.FINDING_ALL_CLIENTS };
  });

  let currentClient; // Auxiliar to get the current client
  // If it isn't new
  if (dbClientId !== null) {
    // In case of error, return the error
    if ("error" in dbClientId) return dbClientId;
    // If it's valid, then modify the likes
    currentClient = await putLikes({
      currentClient: dbClientId,
      stock,
      like,
    });
    if ("error" in currentClient) return currentClient;
  } else {
    // If is new, create it the ID and then the new client
    currentClient = await createNewClient(_id);
    if ("error" in currentClient) return currentClient;
    currentClient = await putLikes({ currentClient, stock, like });
    if ("error" in currentClient) return currentClient;
  }

  /** Once we got our client with the likes saved, we move to do
   * operations with the stocks */
  // First we have to see if the stock is 1 or 2
  if (typeof stock === "string") {
    // Call the function that do operations to the stock once with the client and the stock name
    const resultStock = await operationStocks({ currentClient, stock });
    if ("error" in resultStock) return resultStock;
    const infoStock = await fetchInfo(resultStock); // Fetch the info of the stock
    if ("error" in infoStock) return infoStock;
    // Make the result with the fetch dataand return it
    const resultConsult: SingleConsultStock = {
      stock: infoStock.symbol,
      price: infoStock.latestPrice,
      likes: resultStock.likes,
    };
    return resultConsult;
  } else {
    /** If there are 2 stocks, we call the operationStocks function for
     * each stock and then wait for both to finish */
    const [stock1, stock2] = await Promise.all([
      operationStocks({ currentClient, stock: stock[0] }),
      operationStocks({ currentClient, stock: stock[1] }),
    ]);
    if ("error" in stock1) return stock1;
    if ("error" in stock2) return stock2;
    /** Once we finished all the stock and client operations, then we work to
     * display what client ask us for, the stock price, stock symbol and
     * relative likes of the stock
     * Since we have 2 stocks, we repeat the process of get first all the
     * info and then use both results */
    const [infoStock1, infoStock2] = await Promise.all([
      fetchInfo(stock1),
      fetchInfo(stock2),
    ]);
    if ("error" in infoStock1) return infoStock1;
    if ("error" in infoStock2) return infoStock2;
    /** Call to fetchInfo function to get all the info needed to show final
     * result for each stock and once we got all the info, we get relative likes */
    const relLikes = stock1.likes - stock2.likes;

    let orderedStock; // Auxiliar to order stocks based on the likes
    // Get info needed from both stocks
    const stockData1 = {
      stock: infoStock1.symbol,
      price: infoStock1.latestPrice,
    };
    const stockData2 = {
      stock: infoStock2.symbol,
      price: infoStock2.latestPrice,
    };
    // Order them by likes
    if (relLikes > 0) {
      orderedStock = [
        { ...stockData1, rel_likes: relLikes },
        { ...stockData2, rel_likes: -relLikes },
      ];
    } else {
      orderedStock = [
        { ...stockData2, rel_likes: -relLikes },
        { ...stockData1, rel_likes: relLikes },
      ];
    }
    // Make the response to display and return it
    const resultConsult: IStocksData = {
      stockData: [{ ...orderedStock[0] }, { ...orderedStock[1] }],
    };
    return resultConsult;
  }
}

/** Function that creates and save a Client in the database */
async function createNewClient(_id: string) {
  const newClient = new Client({
    username: _id,
    liked: {},
  });
  const resultSave = await newClient.save().catch(err => {
    console.error(err);
    return { error: ERROR_STOCK.CREATING_CLIENT };
  });
  return resultSave;
}

/** Function that do operations with the stocks, create those in case
 * aren't found in db or modify those if exist */
async function putLikes({ currentClient, stock, like }: LikeStock) {
  // Since like is a string, we get the bool value of it with the next
  const boolLike = like === "true"; // Auxiliar to get the boolean
  // We will update liked values in client, case where we only get 1 stock
  if (typeof stock === "string") {
    const lowerStock = stock.toLowerCase();
    currentClient.liked.set(lowerStock, boolLike);
  } else {
    stock.map(sStock => {
      const lowerStock = sStock.toLowerCase();
      currentClient.liked.set(lowerStock, boolLike);
      return null;
    });
  }
  const resultSave = await currentClient.save().catch(err => {
    console.error(err);
    return { error: ERROR_STOCK.PUTTING_LIKES };
  });
  return resultSave;
}

/** Function that do operations with the stocks, create those in case
 * aren't found in db or modify those if exist */
async function operationStocks({ currentClient, stock }: OperationStocks) {
  let resultSave; // Auxiliar to save the update of the stock
  const clientID = currentClient._id.toString(); // Id of current client
  const lStock = stock.toLowerCase();
  // Find the stock to consult
  const consultStock = await Stock.findOne({ stockname: lStock })
    .populate("clients")
    .exec()
    .catch(err => {
      console.error(err);
      return { error: ERROR_STOCK.FINDING_STOCK };
    });

  // If the stock don't exist, create it
  if (consultStock === null) {
    const newStock = new Stock({
      stockname: stock.toLowerCase(),
      clients: [],
    });
    newStock.clients.push(currentClient); // Push the client who is consulting
    const isLikedStock = currentClient.liked.get(newStock.stockname);
    // Put likes to 1 if client liked it and save it
    if (typeof isLikedStock === "boolean" && isLikedStock) newStock.likes = 1;
    resultSave = await newStock.save().catch(err => {
      console.error(err);
      return { error: ERROR_STOCK.CREATING_STOCK };
    });
  } else {
    // If the stock exist and was an error, return the error
    if ("error" in consultStock) return consultStock;
    // If it's valid, we see if client is already in the stock
    let likes = 0; // Auxiliar to get the likes of the stock
    const existClient = consultStock.clients.find(client => {
      const currentID = client._id.toString();
      return currentID === clientID;
    });
    // If the client is new, push it to the array
    if (existClient === undefined) consultStock.clients.push(currentClient);

    // We get the likes of the stock
    consultStock.clients.map(client => {
      const isLikedStock = client.liked.get(consultStock.stockname);
      if (typeof isLikedStock === "boolean" && isLikedStock) likes++;
      return null;
    });
    consultStock.likes = likes;
    // And save the stock updated
    resultSave = await consultStock.save().catch(err => {
      console.error(err);
      return { error: ERROR_STOCK.UPDATE_STOCK };
    });
  }
  return resultSave;
}

/** Function to fetch the info from API and display the stock info that
 * user wants from it */
async function fetchInfo(resultStock: StockDocument) {
  // We need to replace the placeholder from the link
  const link = STOCK_API.replace("[symbol]", resultStock.stockname);
  const consult = await fetch(link) // Send a request to the API
    .then(response => response.json())
    .then((data: StockAPI) => {
      /** Translate response to json and then we got the data,
       * in data we get the 2 parameters we need to display, return
       * it to the main function */
      return data;
    })
    .catch(err => {
      console.error(err);
      return { error: ERROR_STOCK.FAIL_FETCH };
    });
  return consult;
}

/** ------------------------------------------------------------------------ */

export async function getAllBoards() {
  const allBoards = await Board.find({})
    .sort("_id")
    .exec()
    .catch(err => {
      console.error(err);
      return { error: ERROR_BOARD.COULD_NOT_GET_ALL_BOARDS };
    });
  if ("error" in allBoards) return allBoards;
  if (allBoards.length === 0) return { error: ERROR_BOARD.EMPTY_ALL_BOARDS };
  const resultQuery = allBoards.map(board => ({
    id: board._id,
    thread_count: board.threads.length,
  }));
  return resultQuery;
}

/** Function that gets the top 10 most recent threads and their 3 most
 * recent replies, if nothing is found, return an empty array */
export async function getTopThreads(_id: string) {
  // First we find the board that user want to see with all the info filtered
  const userBoard = await Board.findById({ _id })
    .populate({
      path: "threads",
      options: { sort: "-bumped_on", limit: 10 },
      select: "_id text created_on bumped_on replies",
      populate: {
        path: "replies",
        options: { sort: "-created_on" },
        select: "_id created_on text",
      },
    })
    .exec()
    .catch(err => {
      console.error(err);
      return { error: ERROR_BOARD.COULD_NOT_FIND_BOARD };
    });
  // If we got an error while finding or we don't found a board, end function
  if (userBoard === null) return { error: ERROR_BOARD.EMPTY_BOARD };
  if ("error" in userBoard) return userBoard;
  else {
    // If we got a board, we need to put the number of replies of each thread
    const orderThread = userBoard.threads.slice();

    // We get all the threads, then we put the reply counter
    const displayInfo = orderThread.map(thread => {
      // Start an auxiliar with only the info needed
      const infoFiltered: IThreadFiltered = {
        _id: thread._id,
        text: thread.text,
        created_on: thread.created_on,
        bumped_on: thread.bumped_on,
        replies: [],
        replycount: thread.replies.length,
      };
      // If we have more than 3 replies in the thread, only get the top 3 recent ones
      if (thread.replies.length > 3) {
        infoFiltered.replies = thread.replies.slice(0, 3);
      } else {
        infoFiltered.replies = thread.replies;
      }
      // Return the info needed
      return infoFiltered;
    });
    return displayInfo;
  }
}

export async function createNewThread({
  _id,
  text,
  deletePassword,
}: UserDataCreate) {
  // First we will get the board we are posting a thread for
  const userBoard = await Board.findById({ _id })
    .populate("threads")
    .exec()
    .catch(err => {
      console.error(err);
      return { error: ERROR_BOARD.COULD_NOT_FIND_BOARD };
    });

  let resultSaveThread; // Auxiliar to save the new thread
  // If the board don't exist, we will create it
  if (userBoard === null) {
    const newBoard = new Board({
      _id,
      threads: [],
    });
    resultSaveThread = await createThread({
      board: newBoard,
      text,
      deletePassword,
    });
    if ("error" in resultSaveThread) return resultSaveThread;
  } else {
    // If we had an error while finding the user board, return the error
    if ("error" in userBoard) return userBoard;
    // If it's a valid board, we create the thread
    resultSaveThread = await createThread({
      board: userBoard,
      text,
      deletePassword,
    });
    if ("error" in resultSaveThread) return resultSaveThread;
  }
  return resultSaveThread;
}

export async function reportThread(_id: string) {
  // First we get the thread by its ID to report it
  const thread = await Thread.findById({ _id }).catch(err => {
    console.error(err);
    return { error: ERROR_BOARD.COULD_NOT_FIND_THREAD };
  });
  // If we got an error while finding or the thread don't exist, end the function
  if (thread === null) return { error: ERROR_BOARD.COULD_NOT_FIND_ID_THREAD };
  if ("error" in thread) return thread;
  // If we found it and it's valid, then report it
  thread.reported = true;
  const resultUpdate = await thread.save().catch(err => {
    console.error(err);
    return { error: ERROR_BOARD.COULD_NOT_UPDATE_THREAD };
  });
  if ("error" in resultUpdate) return resultUpdate;
  const resultAction = { action: ACTION_BOARD.REPORT_THREAD_SUCCESS };
  return resultAction;
}

export async function deleteThread({ _id, password }: DeleteElementBoard) {
  // First we get the thread by its ID to delete it
  const thread = await Thread.findById({ _id }).catch(err => {
    console.error(err);
    return { error: ERROR_BOARD.COULD_NOT_FIND_THREAD };
  });
  // If we got an error while finding or the thread don't exist, end the function
  if (thread === null) return { error: ERROR_BOARD.COULD_NOT_FIND_ID_THREAD };
  if ("error" in thread) return thread;
  // If user gave the correct password, we delete it
  if (password === thread.delete_password) {
    // But 1st we need to delete all the replies of it
    if (thread.replies.length > 0) {
      const deleteReplies = await Reply.deleteMany({ thread_id: _id }).catch(
        err => {
          console.error(err);
          return { error: ERROR_BOARD.COULD_NOT_DELETE_REPLY };
        },
      );
      if ("error" in deleteReplies) return deleteReplies;
    }
    // Then we can delete the thread
    const deleteResult = await Thread.deleteOne({ _id }).catch(err => {
      console.error(err);
      return { error: ERROR_BOARD.COULD_NOT_DELETE_THREAD };
    });
    // If there was an error in deleting the thread, send it
    if ("error" in deleteResult) return deleteResult;
    // If it was successful, return the action
    const resultAction = { action: ACTION_BOARD.DELETE_THREAD_SUCCESS };
    return resultAction;
  } else {
    // If password is incorrect, return an error
    return { error: ERROR_BOARD.INCORRECT_PASSWORD };
  }
}

export async function getAllReplies({ _idBoard, _idThread }: GetReplies) {
  // First, we find the board by its name
  const userBoard = await Board.findById({ _id: _idBoard })
    .populate({
      path: "threads",
      select: "_id text created_on bumped_on replies",
      populate: {
        path: "replies",
        options: { sort: "-created_on" },
        select: "_id created_on text",
      },
    })
    .exec()
    .catch(err => {
      console.error(err);
      return { error: ERROR_BOARD.COULD_NOT_FIND_BOARD };
    });
  // If the board wasn't found or it had an error while finding, end function
  if (userBoard === null) return { error: ERROR_BOARD.EMPTY_BOARD };
  if ("error" in userBoard) return userBoard;
  // If we have a valid board, we need to find the user thread
  const userThread = userBoard.threads.filter(
    thread => thread._id.toString() === _idThread,
  );
  // If the thread don't exist, return an error
  if (userThread.length === 0)
    return { error: ERROR_BOARD.COULD_NOT_FIND_ID_THREAD };
  const currentThread = userThread[0]; // Get user thread

  return currentThread;
}

export async function createNewReply({
  _id,
  text,
  deletePassword,
}: UserDataCreate) {
  // Find the thread by its ID to add a reply
  const userThread = await Thread.findById({ _id })
    .populate("replies")
    .exec()
    .catch(err => {
      console.error(err);
      return { error: ERROR_BOARD.COULD_NOT_FIND_THREAD };
    });
  // If the thread don't exist or we had an error while finding, return the error
  if (userThread === null)
    return { error: ERROR_BOARD.COULD_NOT_FIND_ID_THREAD };
  if ("error" in userThread) return userThread;
  // If the thread exist, create the reply and save it
  const newReply = new Reply({
    _id: new mongoose.Types.ObjectId(),
    thread_id: _id,
    text,
    delete_password: deletePassword,
    created_on: new Date().toISOString(),
  });
  const saveReply = await newReply.save().catch(err => {
    console.error(err);
    return { error: ERROR_BOARD.COULD_NOT_SAVE_REPLY };
  });
  // If an error happened while saving, end function
  if ("error" in saveReply) return saveReply;
  userThread.replies.push(newReply); // Put the reply in the thread
  userThread.bumped_on = newReply.created_on; // And update the bumped_on info in thread
  // And save it, if an error happened, return the error
  const saveThread = await userThread.save().catch(err => {
    console.error(err);
    return { error: ERROR_BOARD.COULD_NOT_SAVE_THREAD };
  });
  if ("error" in saveThread) return saveThread;
  // If all was successful, return the new reply
  return newReply;
}

export async function reportReply(_id: string) {
  // First we need to find the user reply that they want to report
  const userReply = await Reply.findById({ _id }).catch(err => {
    console.error(err);
    return { error: ERROR_BOARD.COULD_NOT_FIND_REPLY };
  });
  // If reply don't exist or there was an error while finding, return the error
  if (userReply === null) return { error: ERROR_BOARD.COULD_NOT_FIND_ID_REPLY };
  if ("error" in userReply) return userReply;
  // If the reply exist, then update it and save it
  userReply.reported = true;
  const updateResult = await userReply.save().catch(err => {
    console.error(err);
    return { error: ERROR_BOARD.COULD_NOT_UPDATE_REPLY };
  });
  // If there was an error while updating, return the error
  if ("error" in updateResult) return updateResult;
  const resultAction = { action: ACTION_BOARD.REPORT_REPLY_SUCCESS };
  return resultAction; // Return the success message
}

export async function deleteReply({ _id, password }: DeleteElementBoard) {
  // First we need to find the user reply that they want to delete
  const userReply = await Reply.findById({ _id }).catch(err => {
    console.error(err);
    return { error: ERROR_BOARD.COULD_NOT_FIND_REPLY };
  });
  // If reply don't exist or there was an error while finding, return the error
  if (userReply === null) return { error: ERROR_BOARD.COULD_NOT_FIND_ID_REPLY };
  if ("error" in userReply) return userReply;
  // If the reply exist, verify if the password is correct
  if (userReply.delete_password === password) {
    // If it's the same then update the text and save it
    userReply.text = "[Deleted]";
    const deleteResult = await userReply.save().catch(err => {
      console.error(err);
      return { error: ERROR_BOARD.COULD_NOT_UPDATE_REPLY };
    });
    // If there was an error while deleting, return the error
    if ("error" in deleteResult) return deleteResult;
    const resultAction = { action: ACTION_BOARD.DELETE_REPLY_SUCCESS };
    return resultAction; // Return the success message
  } else {
    // If password is wrong, then return an error
    return { error: ERROR_BOARD.INCORRECT_PASSWORD };
  }
}

/** Function that creates threads for boards */
async function createThread({ board, text, deletePassword }: CreateThread) {
  const _id = new mongoose.Types.ObjectId(); // Create new id
  // Create the new thread with the data that user sent
  const newThread = new Thread({
    _id,
    text,
    delete_password: deletePassword,
    replies: [],
    created_on: new Date().toISOString(),
    bumped_on: new Date().toISOString(),
  });
  // Save the thread, if an error happened, return the error
  const saveThread = await newThread.save().catch(err => {
    console.error(err);
    return { error: ERROR_BOARD.COULD_NOT_SAVE_THREAD };
  });
  if ("error" in saveThread) return saveThread;

  // We add the thread to the board if save was successful
  board.threads.push(saveThread);
  // Save the board and return the result of the thread
  const saveBoard = await board.save().catch(err => {
    console.error(err);
    return { error: ERROR_BOARD.COULD_NOT_SAVE_BOARD };
  });
  if ("error" in saveBoard) return saveBoard;
  // If both elements were successful at saving, return the thread
  return saveThread;
}
