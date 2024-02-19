import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";

const App = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="selection:text-white selection:bg-gray-600">
      <Routes>
        <Route
          path="/"
          element={
            user.email !== "" ? <HomePage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={user.email === "" ? <Login /> : <Navigate to="/" replace />}
        />
        <Route
          path="/register"
          element={
            user.email === "" ? <Register /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
