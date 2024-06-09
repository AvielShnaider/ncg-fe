import Validation from "./components/Validation/validation";

import Print from "./components/PrintCheck/print";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/print" element={<Print />} />
          <Route path="/" element={<Validation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
