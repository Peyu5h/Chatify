import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import SocketContext from "./context/SocketContext";

const App = () => {
  const { user } = useSelector((state) => state.user);

  const backendUrl = import.meta.env.VITE_BACKEND_URL.split("/api/v1")[0];

  //Socket
  const socket = io("http://localhost:3000", {});

  return (
    <div className="selection:text-white selection:bg-gray-600 overflow-hidden">
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route
            path="/"
            element={
              user.email !== "" ? (
                <HomePage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              user.email === "" ? <Login /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/register"
            element={
              user.email === "" ? <Register /> : <Navigate to="/" replace />
            }
          />
        </Routes>
      </SocketContext.Provider>
    </div>
  );
};

export default App;
