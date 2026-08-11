import Navbar from "./components/Navbar";
import Home from "./components/Home";
import GradientBackground from "./components/GradientBackground";
import CustomCursor from "./components/Cursor";

function App() {
  return (
    <>
      <GradientBackground />
      <CustomCursor />
      <Navbar />
      <Home />
    </>
  );
}

export default App;