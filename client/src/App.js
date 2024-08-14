import { useState, useEffect } from "react";
import AuthPage from "./pages/authPage";
import ChatsPage from "./pages/chatsPage";

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

  if (!user) {
    return <AuthPage onAuth={handleAuth} />;
  } else {
    return <ChatsPage user={user} onLogout={handleLogout} />;
  }
}

export default App;
