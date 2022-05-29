import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataContextProvider } from "./context";

import Navbar from "./reusables/NavBar";
import HomePage from "./components/HomePage";
import DetailView from "./components/DetailPage";

import "./App.css";

function App() {
  return (
    <DataContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<DetailView />} />
        </Routes>
      </BrowserRouter>
    </DataContextProvider>
  );
}

export default App;
