import Validation from "./components/Validation/validation";
import Page from "./components/Page/page";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
        <Routes>
          <Route path="/page" element={<Page />} />

          <Route path="/" element={<Validation />} />
        </Routes>
      </BrowserRouter> */}
      <div>אתה רוצה את האתר , אתה מוזמן להתקשר למס׳ הבא : 050-544-2056</div>
    </div>
  );
}

export default App;
