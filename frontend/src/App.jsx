import { useEffect, useState } from "react";
import Login from "./pages/Login";
import CreatorDashboard from "./pages/CreatorDashboard";
import UserDashboard from "./pages/UserDashboard";
import { apiFetch } from "./api";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      setLoading(false);
      return;
    }

    apiFetch("/api/users/profile/")
      .then(data => {
        setUser(data);
      })
      .catch(() => {
        localStorage.removeItem("access");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleLogin(userData) {
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("access");
    setUser(null);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (user.role === "CREATOR") {
    return <CreatorDashboard user={user} onLogout={logout} />;
  }

  return <UserDashboard user={user} onLogout={logout} />;
}
