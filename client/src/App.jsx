import { useState } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Addblog from "./pages/Addblog";
import { Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="mx-10">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-blog" element={<Addblog />} />
      </Routes>
    </div>
  );
}

export default App;
