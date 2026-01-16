import { useEffect, useState } from "react";
import { apiFetch } from "../api";
import SessionForm from "../components/SessionForm";
import SessionCard from "../components/SessionCard";

export default function CreatorDashboard({ user, onLogout }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  function loadMySessions() {
  apiFetch("/api/sessions/creator/dashboard/")
    .then(data => {
      if (Array.isArray(data)) {
        setSessions(data);
      } else if (Array.isArray(data?.sessions)) {
        setSessions(data.sessions);
      } else {
        setSessions([]);
      }
    })
    .finally(() => setLoading(false));
}

  useEffect(() => {
    loadMySessions();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Creator Dashboard</h1>
      <p>Welcome, {user.username}</p>

      <SessionForm onCreated={loadMySessions} />

      <hr />

      <h2>My Sessions</h2>

      {loading && <p>Loading sessions...</p>}

      {!loading && sessions.length === 0 && <p>No sessions created yet.</p>}

      {sessions.map(session => (
        <SessionCard key={session.id} session={session} />
      ))}

      <button onClick={onLogout} style={{ marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
}
