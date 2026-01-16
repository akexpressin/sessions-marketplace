import { useEffect, useState } from "react";
import { apiFetch } from "../api";
import SessionCard from "../components/SessionCard";

export default function MyBookings({ onBack }) {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch("/api/bookings/my/")
            .then(data => {
                console.log("BOOKINGS RESPONSE:", data);
                if (Array.isArray(data)) {
                    setBookings(data);
                } else if (Array.isArray(data?.results)) {
                    setBookings(data.results);
                } else {
                    setBookings([]);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <h2>My Booked Sessions</h2>

            {loading && <p>Loading bookings...</p>}

            {!loading && bookings.length === 0 && (
                <p>You have not booked any sessions yet.</p>
            )}

            {bookings.map(booking => {
                const sessionData = {
                    title:
                        booking.session?.title ||
                        booking.session_title ||
                        "Untitled Session",

                    description:
                        booking.session?.description ||
                        booking.session_description ||
                        "No description available",

                    price:
                        booking.session?.price ||
                        booking.price ||
                        "N/A",

                    duration:
                        booking.session?.duration ||
                        booking.duration ||
                        "N/A",
                };

                return (
                    <SessionCard
                        key={booking.id}
                        session={sessionData}
                        showBook={false}
                    />
                );
            })}

            <button onClick={onBack} style={{ marginTop: "20px" }}>
                Back
            </button>
        </div>
    );
}
