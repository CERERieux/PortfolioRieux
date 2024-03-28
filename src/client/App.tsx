import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./components/NotFound/LoadingSpinner";

const AdminBoards = lazy(() => import("./components/AdminPanel/AdminBoards"));
const AdminLogin = lazy(() => import("./components/AdminPanel/AdminLogin"));
const AdminMainMenu = lazy(
  () => import("./components/AdminPanel/AdminMainMenu"),
);
const AdminPanel = lazy(() => import("./components/AdminPanel/AdminPanel"));
const AnonBoard = lazy(() => import("./components/AnonBoard/AnonBoard"));
const AnonReply = lazy(() => import("./components/AnonBoard/AnonReply"));
const AnonThread = lazy(() => import("./components/AnonBoard/AnonThread"));
const Book = lazy(() => import("./components/Library/Book"));
const Calculator = lazy(() => import("./components/Calculator/Calculator"));
const ConverterUnit = lazy(
  () => import("./components/ConverterUnit/ConverterUnit"),
);
const DataRequest = lazy(() => import("./components/DataRequest/DataRequest"));
const DrumMachine = lazy(() => import("./components/DM/DrumMachine"));
const ExerciseTracker = lazy(
  () => import("./components/ExTracker/ExerciseTracker"),
);
const ExternalProfile = lazy(
  () => import("./components/ExternalProfile/ExternalProfile"),
);
const Home = lazy(() => import("./components/Home/Home"));
const IssueBoard = lazy(
  () => import("./components/IssueBoard/Users/IssueBoard"),
);
const IssueProfile = lazy(
  () => import("./components/IssueBoard/Profile/IssuesProfile"),
);
const Library = lazy(() => import("./components/Library/Library"));
const Login = lazy(() => import("./components/Login/Login"));
const Markdown = lazy(() => import("./components/Mark_down/Markdown"));
const MenuDemos = lazy(() => import("./components/Menu/MenuDemos"));
const MyProfile = lazy(() => import("./components/MyProfile/MyProfile"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const PomodoroClock = lazy(() => import("./components/Pomodoro/PomodoroClock"));
const Quote = lazy(() => import("./components/Quotes/Quotes"));
const ShortenerUrl = lazy(
  () => import("./components/ShortenerUrl/ShortenerUrl"),
);
const StockViewer = lazy(() => import("./components/Stocks/StockViewer"));
const Sudoku = lazy(() => import("./components/Games/Sudoku/Sudoku"));
const TranslatorEng = lazy(
  () => import("./components/TranslatorEng/TranslatorEng"),
);
const Url = lazy(() => import("./components/Url/Url"));
const UserDataAdmin = lazy(
  () => import("./components/AdminPanel/UserDataAdmin"),
);

export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/issues-and-suggestions" element={<IssueBoard />}></Route>
        <Route path="/shortener-url" element={<ShortenerUrl />}></Route>
        <Route path="/my-profile">
          <Route index element={<MyProfile />}></Route>
          <Route path="notes" element={<ExerciseTracker />}></Route>
          <Route path="library" element={<Library />}></Route>
          <Route path="library/:id" element={<Book />}></Route>
          <Route path="issues" element={<IssueProfile />}></Route>
          <Route path="urls" element={<Url />}></Route>
        </Route>
        <Route path="/user/:id">
          <Route index element={<ExternalProfile />}></Route>
        </Route>
        <Route path="/demo">
          <Route index element={<MenuDemos />}></Route>
          <Route path="quote" element={<Quote />}></Route>
          <Route path="calculator" element={<Calculator />}></Route>
          <Route path="markdown" element={<Markdown />}></Route>
          <Route path="drum-machine" element={<DrumMachine />}></Route>
          <Route path="pomodoro" element={<PomodoroClock />}></Route>
          <Route path="converter" element={<ConverterUnit />}></Route>
          <Route path="translate-eng" element={<TranslatorEng />}></Route>
        </Route>
        <Route path="/games">
          {/* <Route index element={<Home />}></Route> */}
          <Route path="sudoku" element={<Sudoku />}></Route>
          {/* <Route path="ifIDosomethingExtra" element={<Home />}></Route> */}
        </Route>
        {/* <Route path="/communicationNameApp" element={<Home />}></Route> */}
        <Route path="/anon-board">
          <Route index element={<AnonBoard />}></Route>
          <Route path=":board/thread" element={<AnonThread />}></Route>
          <Route path=":board/:thread/reply" element={<AnonReply />}></Route>
        </Route>
        <Route path="/cut-content/portfolio">
          <Route index element={<Home />}></Route>
          <Route path="request-information" element={<DataRequest />}></Route>
          <Route path="stock-api-cert" element={<StockViewer />}></Route>
        </Route>
        {/* <Route path="/documentation" element={<Home />}></Route> */}
        <Route path={`/${import.meta.env.VITE_ROUTE_ADMIN}/admin`}>
          <Route index element={<AdminLogin />}></Route>
          <Route path="menu" element={<AdminMainMenu />}></Route>
          <Route path="anonboard" element={<AdminBoards />}></Route>
          <Route path="users" element={<AdminPanel />}></Route>
          <Route path=":user/data" element={<UserDataAdmin />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Suspense>
  );
}
