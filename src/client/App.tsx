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

export default function App() {

  return (
    <Routes>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/front-end/quote" element={<Quote />}></Route>
      <Route path="/front-end/calculator" element={<Calculator />}></Route>
      <Route path="/front-end/markdown" element={<Markdown />}></Route>
      <Route path="/front-end/drum-machine" element={<DrumMachine />}></Route>
      <Route path="/front-end/pomodoro" element={<PomodoroClock />}></Route>
      <Route path="/front-end/request-information" element={<DataRequest />}></Route>
      <Route path="/front-end/shortener-url" element={<ShortenerUrl />}></Route>
      <Route path="/front-end/converter" element={<ConverterUnit />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
