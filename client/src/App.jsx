import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Pathfinder from "./components/Pathfinder";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pathfinder" element={<Pathfinder />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
