
import { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser } from "../api.js";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState("");

  const load = () => {
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
      await createUser(form);

      setForm({
        name: "",
        email: "",
      });

      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    setError("");

    try {
      await deleteUser(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const safeUsers = Array.isArray(users) ? users : [];

  return (
    <section>
      <h2>Users</h2>

      {error && <p className="error">{error}</p>}

      <form className="form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <button type="submit">Add user</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {safeUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button
                  className="danger"
                  onClick={() => handleDelete(u.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {safeUsers.length === 0 && (
            <tr>
              <td colSpan="4" className="empty">
                No users yet. Add one above.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}




