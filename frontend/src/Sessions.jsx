import { useEffect, useState } from "react";
import { apiFetch } from "./api";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    apiFetch("/api/sessions/").then(setSessions);
  }, []);

  async function bookSession(id) {
    await apiFetch(`/api/bookings/book/${id}/`, { method: "POST" });
    alert("Session booked");
  }

  return (
    <div>
      <h2>Sessions</h2>
      {sessions.map(s => (
        <div key={s.id}>
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          <button onClick={() => bookSession(s.id)}>Book</button>
        </div>
      ))}
    </div>
  );
}
