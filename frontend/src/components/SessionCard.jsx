export default function SessionCard({ session, onBook, showBook }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h3>{session.title}</h3>
      <p>{session.description}</p>
      <p>Price: ₹{session.price}</p>
      <p>Duration: {session.duration} mins</p>

      {showBook && (
        <button onClick={() => onBook(session.id)}>
          Book Session
        </button>
      )}
    </div>
  );
}
