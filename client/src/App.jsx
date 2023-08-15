import React from "react";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { myAuth } from "./states";

const App = () => {
  const loading = useAuth();
  const isAuth = myAuth((state) => state.auth.isAuth);

  if (loading) {
    return <div>Loading Please Wait...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={!isAuth ? <Login /> : <Navigate to="/chat" />} />
      <Route path="/chat" element={isAuth ? <Chat /> : <Navigate to="/" />} />
    </Routes>
  );
};

export default App;
