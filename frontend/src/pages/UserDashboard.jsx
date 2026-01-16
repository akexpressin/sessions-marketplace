import { useEffect, useState } from "react";
import { apiFetch } from "../api";
import SessionCard from "../components/SessionCard";
import MyBookings from "./MyBookings";

export default function UserDashboard({ user, onLogout }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("sessions"); 

  function loadSessions() {
    apiFetch("/api/sessions/")
      .then(data => {
        if (Array.isArray(data)) {
          setSessions(data);
        } else if (Array.isArray(data?.results)) {
          setSessions(data.results);
        } else {
          setSessions([]);
        }
      })
      .finally(() => setLoading(false));
  }

  async function bookSession(sessionId) {
    try {
      await apiFetch(`/api/bookings/book/${sessionId}/`, {
        method: "POST",
      });
      alert("Session booked successfully");
    } catch {
      alert("Booking failed");
    }
  }

  useEffect(() => {
    loadSessions();
  }, []);

  if (view === "bookings") {
    return (
      <MyBookings onBack={() => setView("sessions")} />
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Dashboard</h1>
      <p>Welcome, {user.username}</p>

      <button onClick={() => setView("bookings")}>
        My Bookings
      </button>

      <h2 style={{ marginTop: "20px" }}>Available Sessions</h2>

      {loading && <p>Loading sessions...</p>}

      {!loading && sessions.length === 0 && (
        <p>No sessions available.</p>
      )}

      {sessions.map(session => (
        <SessionCard
          key={session.id}
          session={session}
          showBook={true}
          onBook={bookSession}
        />
      ))}

      <button onClick={onLogout} style={{ marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
}
