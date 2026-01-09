import { useState } from "react";
import Login from "./Login";
import Sessions from "./Sessions";
import CreateSession from "./CreateSession";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("access")
  );

  function logout() {
    localStorage.removeItem("access");
    setLoggedIn(false);
  }

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={logout} style={{ marginBottom: "20px" }}>
        Logout
      </button>

      <Sessions />
      <hr />
      <CreateSession />
    </div>
  );
}
