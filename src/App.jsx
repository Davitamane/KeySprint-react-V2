import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import NormalMode from "./components/NormalMode/NormalMode";
import SprintMode from "./components/SprintMode/SprintMode";
import { StateProvider } from "./components/NormalMode/contexts/StateContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <StateProvider>
          <Header />
          <Routes>
            <Route index element={<Navigate replace to="/normal" />} />
            <Route path="/normal" element={<NormalMode />} />
            <Route path="/sprint" element={<SprintMode />} />
          </Routes>
        </StateProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
