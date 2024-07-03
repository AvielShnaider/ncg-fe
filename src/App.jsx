import Validation from "./components/Validation/validation";
import Page from "./components/Page/page";
import Test from "./components/Test/test";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/page" element={<Page />} />
          <Route path="/test" element={<Test />} />
          <Route path="/" element={<Validation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
