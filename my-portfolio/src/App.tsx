import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Project from "./pages/Projects";

import Cursor from "./components/Cursor";
import ScrollToHash from "./components/ScrolltoHash";

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Cursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Project />} />
      </Routes>
    </>
  );
}