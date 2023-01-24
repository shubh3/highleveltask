import "./App.css";
import Setup from "./components/Setup.js";
import Transact from "./components/Transact";
import AllTransaction from "./components/AllTransaction";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Setup />} />
          <Route path="/transact" element={<Transact />} />
          <Route path="/transactions" element={<AllTransaction />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
