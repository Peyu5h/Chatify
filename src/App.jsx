import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import { useDispatch } from "react-redux";
import { logout } from "./rtk/userSlice";

const App = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(logout())}> Logout</button>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
