import { useState } from "react";
import { apiFetch } from "./api";

export default function CreateSession() {
  const [title, setTitle] = useState("");

  async function create() {
    await apiFetch("/api/sessions/create/", {
      method: "POST",
      body: JSON.stringify({
        title,
        description: "Guided inner growth session",
        price: 799,
        duration: 60,
      }),
    });
    alert("Session created");
  }

  return (
    <div>
      <h2>Create Session (Creator)</h2>
      <input placeholder="title" onChange={e => setTitle(e.target.value)} />
      <button onClick={create}>Create</button>
    </div>
  );
}
