import {BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Prices from "./pages/Prices";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Packages from "./pages/Packages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />        {/* Home.jsx */}
        <Route path="/prices" element={<Prices />} /> {/* Prices.jsx */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/packages" element={<Packages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
