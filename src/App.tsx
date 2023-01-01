import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import "./bootstrap.css";
import { HomeLayout } from "./components/HomeLayout";
import { ProtectedLayout } from "./components/ProtectedLayout";
import WelcomeScreen from "./components/WelcomeScreen";
import TodoList from "./components/TodoList";
import { AuthProvider } from "./hooks/useAuth";
import NotFound from "./components/NotFound";
import UpdateTodoForm from "./components/UpdateTodoForm";
import CreateTodoForm from "./components/CreateTodoForm";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>

        <Route path="/auth" element={<ProtectedLayout />}>
          <Route path="welcome" element={<WelcomeScreen />} />
          <Route path="list" element={<TodoList />} />
          <Route path="update/:id" element={<UpdateTodoForm />} />
          <Route path="create" element={<CreateTodoForm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
