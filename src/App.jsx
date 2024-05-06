import Validation from "./components/Validation/validation";
import Page from "./components/Page/page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Validation />} />
          <Route path="/page" element={<Page />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
