import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import NormalMode from "./components/NormalMode/NormalMode";
import SprintMode from "./components/SprintMode/SprintMode";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Navigate replace to="/normal" />} />
          <Route path="/normal" element={<NormalMode />} />
          <Route path="/sprint" element={<SprintMode />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
