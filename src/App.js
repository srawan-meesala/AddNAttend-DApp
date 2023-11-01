import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Event from "./components/Event";
import Landing from "./components/Landing";
import CreateEvent from "./components/CreateEvent";
import Attend from "./components/Attend";
import Attended from "./components/Attended";
import './stylesheets/home.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/events" element={<Event />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/attend" element={<Attend />} />
        <Route path="/attended" element={<Attended />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App