import { Routes, Route } from "react-router-dom";
import Orders from "./pages/Orders.jsx";
import Logs from "./pages/Logs.jsx";
import './index.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Orders />} />
      <Route path="/logs" element={<Logs />} />
    </Routes>
  );
}

export default App;
