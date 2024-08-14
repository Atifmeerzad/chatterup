import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthPage from "./pages/authPage";
import ChatsPage from "./pages/chatsPage";
import SignUp from "./pages/SignUp";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAuth = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !user ? <AuthPage onAuth={handleAuth} /> : <Navigate to="/chats" />
          }
        />
        <Route
          path="/signup"
          element={
            !user ? <SignUp onAuth={handleAuth} /> : <Navigate to="/chats" />
          }
        />
        <Route
          path="/chats"
          element={
            user ? (
              <ChatsPage user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={<Navigate to={user ? "/chats" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
