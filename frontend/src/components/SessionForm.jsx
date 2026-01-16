import { useState } from "react";
import { apiFetch } from "../api";

export default function SessionForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!title || !description || !price || !duration) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await apiFetch("/api/sessions/create/", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          price,
          duration,
        }),
      });

      setTitle("");
      setDescription("");
      setPrice("");
      setDuration("");

      onCreated(); 
    } catch {
      alert("Failed to create session");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Create Session</h2>

      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <br />

      <input
        type="number"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={e => setDuration(e.target.value)}
      />
      <br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating..." : "Create Session"}
      </button>
    </div>
  );
}
