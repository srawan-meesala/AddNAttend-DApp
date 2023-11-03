import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Event from "./components/Event";
import Landing from "./components/Landing";
import CreateEvent from "./components/CreateEvent";
import Attend from "./components/Attend";
import Attended from "./components/Attended";
import './stylesheets/home.css'
import { useState } from "react";
import Registered from "./components/Registered";

function App() {

  const [id, setid] = useState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing setid={setid} />} />
        <Route path="/home" element={<Home id={id} setid={setid} />} />
        <Route path="/events" element={<Event />} />
        <Route path="/create-event" element={<CreateEvent id={id}/>} />
        <Route path="/attend" element={<Attend id={id}/>} />
        <Route path="/attended" element={<Attended />} />
        <Route path="/registered" element={<Registered />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App