
import { useEffect, useState } from "react";
import {
  getEvents,
  createEvent,
  getUsers,
  addMember,
  removeMember,
} from "../api.js";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    eventName: "",
    location: "",
  });
  const [selectedUser, setSelectedUser] = useState({});
  const [error, setError] = useState("");

  const load = () => {
    getEvents()
      .then((data) => {
        console.log("Events API response:", data);

        // Make sure events is always an array
        setEvents(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        setError(e.message);
        setEvents([]);
      });

    getUsers()
      .then((data) => {
        console.log("Users API response:", data);

        // Make sure users is always an array
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        setError(e.message);
        setUsers([]);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createEvent(form);

      setForm({
        eventName: "",
        location: "",
      });

      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddMember = async (eventId) => {
    const userId = selectedUser[eventId];

    if (!userId) return;

    setError("");

    try {
      await addMember(eventId, userId);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveMember = async (eventId, userId) => {
    setError("");

    try {
      await removeMember(eventId, userId);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  // Extra protection in case state somehow becomes null
  const safeEvents = Array.isArray(events) ? events : [];
  const safeUsers = Array.isArray(users) ? users : [];

  return (
    <section>
      <h2>Events</h2>

      {error && <p className="error">{error}</p>}

      <form className="form" onSubmit={handleSubmit}>
        <input
          name="eventName"
          placeholder="Event name"
          value={form.eventName}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <button type="submit">Add event</button>
      </form>

      {safeEvents.length === 0 && (
        <p className="empty">
          No events yet. Add one above.
        </p>
      )}

      <div className="grid">
        {safeEvents.map((ev) => {
          const members = Array.isArray(ev.members)
            ? ev.members
            : [];

          return (
            <div className="card" key={ev.id}>
              <h3>{ev.eventName}</h3>

              <p className="muted">
                {ev.location}
              </p>

              <h4>Members</h4>

              <ul className="chips">
                {members.map((m) => (
                  <li key={m.id}>
                    {m.name}

                    <button
                      className="chip-x"
                      title="Remove member"
                      onClick={() =>
                        handleRemoveMember(ev.id, m.id)
                      }
                    >

                    </button>
                  </li>
                ))}

                {members.length === 0 && (
                  <li className="muted">
                    No members yet
                  </li>
                )}
              </ul>

              <div className="row">
                <select
                  value={selectedUser[ev.id] || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      [ev.id]: e.target.value,
                    })
                  }
                >
                  <option value="">
                    Select user…
                  </option>

                  {safeUsers.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => handleAddMember(ev.id)}
                >
                  Add member
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}



