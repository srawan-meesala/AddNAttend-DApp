import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Event from "./components/Event";
import Landing from "./components/Landing";
import CreateEvent from "./components/CreateEvent";
import './stylesheets/home.css'
import { useState } from "react";
import Register from "./components/Register";
import CheckIn from "./components/CheckIn";

function App() {

  const [id, setid] = useState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing setid={setid} />} />
        <Route path="/home" element={<Home id={id} setid={setid} />} />
        <Route path="/events" element={<Event />} />
        <Route path="/create-event" element={<CreateEvent id={id}/>} />
        <Route path="/register" element={<Register id={id}/>} />
        <Route path="/checkin" element={<CheckIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App