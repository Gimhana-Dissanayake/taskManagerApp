import React, { useEffect } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import NotFound from "./pages/NotFound";
import "./default.scss";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { HomeLayout } from "./layouts/HomeLayout";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import User from "./models/User";
import AuthService from "./service/AuthService";

function App() {
  useEffect(() => {
    const value = localStorage.getItem("todoAuthUser");
    const user = JSON.parse(value!) as User;
    AuthService.setUpAxiosInterceptors(user);
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>

        <Route path="/auth" element={<ProtectedLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
