import { Routes, Route } from "react-router-dom";
import AnonBoard from "./components/AnonBoard/AnonBoard";
import AnonThread from "./components/AnonBoard/AnonThread";
import Book from "./components/Library/Book";
import Calculator from "./components/Calculator/Calculator";
import ConverterUnit from "./components/ConverterUnit/ConverterUnit";
import DataRequest from "./components/DataRequest/DataRequest";
import DrumMachine from "./components/DM/DrumMachine";
import ExerciseTracker from "./components/ExTracker/ExerciseTracker";
import Home from "./components/Home";
import IssueBoard from "./components/IssueBoard/IssueBoard";
import IssueProfile from "./components/IssueBoard/IssuesProfile";
import Library from "./components/Library/Library";
import Login from "./components/Login/Login";
import Markdown from "./components/Mark_down/Markdown";
import NotFound from "./components/NotFound/NotFound";
import PomodoroClock from "./components/Pomodoro/PomodoroClock";
import Quote from "./components/Quotes/Quotes";
import ShortenerUrl from "./components/ShortenerUrl/ShortenerUrl";
import TranslatorEng from "./components/TranslatorEng/TranslatorEng";
import Url from "./components/Url/Url";
import StockViewer from "./components/Stocks/StockViewer";
import MyProfile from "./components/MyProfile/MyProfile";
import ExternalProfile from "./components/MyProfile/ExternalProfile";

export default function App() {

  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/issues-and-suggestions" element={<IssueBoard />}></Route>
      <Route path="/shortener-url" element={<ShortenerUrl />}></Route>
      <Route path="/communicationNameApp" element={<Home />}></Route>
      <Route path="/my-profile">
        <Route index element={<MyProfile />}></Route>
        <Route path="exercises" element={<ExerciseTracker />}></Route>
        <Route path="library" element={<Library />}></Route>
        <Route path="library/:id" element={<Book />}></Route>
        <Route path="issues" element={<IssueProfile />}></Route>
        <Route path="urls" element={<Url />}></Route>
      </Route>
      <Route path="/user/:id">
        <Route index element={<ExternalProfile />}></Route>
      </Route>
      <Route path="/demo">
        <Route path="quote" element={<Quote />}></Route>
        <Route path="calculator" element={<Calculator />}></Route>
        <Route path="markdown" element={<Markdown />}></Route>
        <Route path="drum-machine" element={<DrumMachine />}></Route>
        <Route path="pomodoro" element={<PomodoroClock />}></Route>
        <Route path="converter" element={<ConverterUnit />}></Route>
        <Route path="translate-eng" element={<TranslatorEng />}></Route>
      </Route>
      <Route path="/anon-board">
        <Route index element={<AnonBoard />}></Route>
        <Route path="thread/:board" element={<AnonThread />}></Route>
        <Route path="reply/:thread/:board" element={<AnonThread />}></Route>
      </Route>
      <Route path="/games">
        <Route index element={<Home />}></Route>
        <Route path="sudoku" element={<Home />}></Route>
        <Route path="ifIDosomethingExtra" element={<Home />}></Route>
      </Route>
      <Route path="/cut-content/portfolio">
        <Route index element={<Home />}></Route>
        <Route path="request-information" element={<DataRequest />}></Route>
        <Route path="stock-api-cert" element={<StockViewer />}></Route>
      </Route>
      <Route path="/documentation" element={<Home />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
