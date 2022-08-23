import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import SignUp from "./components/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/customer" element={<Main />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
