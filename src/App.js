import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Event from "./components/Event";
import Landing from "./components/Landing";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Event />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App