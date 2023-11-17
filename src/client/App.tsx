import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { Quote } from "./components/Quotes/Quotes";
import { Calculator } from "./components/Calculator/Calculator";
import { DrumMachine } from "./components/DM/DrumMachine";
import { PomodoroClock } from "./components/Pomodoro/PomodoroClock";
import { Markdown } from "./components/Mark_down/Markdown";
import NotFound from "./components/NotFound/NotFound";
import DataRequest from "./components/DataRequest/DataRequest";
import ShortenerUrl from "./components/ShortenerUrl/ShortenerUrl";
import ConverterUnit from "./components/ConverterUnit/ConverterUnit";
import TranslatorEng from "./components/TranslatorEng/TranslatorEng";
import AnonBoard from "./components/AnonBoard/AnonBoard";
import AnonThread from "./components/AnonBoard/AnonThread";
import Login from "./components/Login/Login";
import ExerciseTracker from "./components/ExTracker/ExerciseTracker";
import Library from "./components/Library/Library";
import Book from "./components/Library/Book";

export default function App() {

  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/services/exercises" element={<ExerciseTracker />}></Route>
      <Route path="/services/library" element={<Library />}></Route>
      <Route path="/services/library/:id" element={<Book />}></Route>
      <Route path="/front-end/quote" element={<Quote />}></Route>
      <Route path="/front-end/calculator" element={<Calculator />}></Route>
      <Route path="/front-end/markdown" element={<Markdown />}></Route>
      <Route path="/front-end/drum-machine" element={<DrumMachine />}></Route>
      <Route path="/front-end/pomodoro" element={<PomodoroClock />}></Route>
      <Route path="/front-end/request-information" element={<DataRequest />}></Route>
      <Route path="/front-end/shortener-url" element={<ShortenerUrl />}></Route>
      <Route path="/front-end/converter" element={<ConverterUnit />}></Route>
      <Route path="/front-end/translate-eng" element={<TranslatorEng />}></Route>
      <Route path="/front-end/anon-board" element={<AnonBoard />}></Route>
      <Route path="/front-end/anon-board/thread/:board" element={<AnonThread />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
