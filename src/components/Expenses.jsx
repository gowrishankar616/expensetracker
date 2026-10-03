import { useEffect, useState } from "react";
import {
  getExpenses,
  getExpensesByEvent,
  getEvents,
  getUsers,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../api.js";

const emptyForm = {
  description: "",
  amount: "",
  category: "",
  expenseDate: "",
  eventId: "",
  userId: "",
};

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterEvent, setFilterEvent] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const loadExpenses = (eventId = filterEvent) => {
    const req = eventId ? getExpensesByEvent(eventId) : getExpenses();

    req
      .then((data) => {
        console.log("Expenses API response:", data);
        setExpenses(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        setError(e.message);
        setExpenses([]);
      });
  };

  useEffect(() => {
    getEvents()
      .then((data) => {
        console.log("Events API response:", data);
        setEvents(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        setError(e.message);
        setEvents([]);
      });

    getUsers()
      .then((data) => {
        console.log("Users API response:", data);
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        setError(e.message);
        setUsers([]);
      });

    loadExpenses("");
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = (e) => {
    setFilterEvent(e.target.value);
    loadExpenses(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      description: form.description,
      amount: form.amount === "" ? null : Number(form.amount),
      category: form.category,
      expenseDate: form.expenseDate || null,
      eventId: form.eventId ? Number(form.eventId) : null,
      userId: form.userId ? Number(form.userId) : null,
    };

    try {
      if (editingId) {
        await updateExpense(editingId, payload);
      } else {
        await createExpense(payload);
      }

      setForm(emptyForm);
      setEditingId(null);
      loadExpenses();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (ex) => {
    setEditingId(ex.id);

    setForm({
      description: ex.description || "",
      amount: ex.amount ?? "",
      category: ex.category || "",
      expenseDate: ex.expenseDate || "",
      eventId: ex.event?.id ?? "",
      userId: ex.paidBy?.id ?? "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    setError("");

    try {
      await deleteExpense(id);
      loadExpenses();
    } catch (err) {
      setError(err.message);
    }
  };

  const total = (Array.isArray(expenses) ? expenses : []).reduce(
    (sum, ex) => sum + (Number(ex.amount) || 0),
    0
  );

  return (
    <section>
      <h2>Expenses</h2>

      {error && <p className="error">{error}</p>}

      <form className="form" onSubmit={handleSubmit}>
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="amount"
          type="number"
          step="0.01"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <input
          name="expenseDate"
          type="date"
          value={form.expenseDate}
          onChange={handleChange}
        />

        <select
          name="eventId"
          value={form.eventId}
          onChange={handleChange}
        >
          <option value="">Select event…</option>

          {(Array.isArray(events) ? events : []).map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.eventName}
            </option>
          ))}
        </select>

        <select
          name="userId"
          value={form.userId}
          onChange={handleChange}
        >
          <option value="">Paid by…</option>

          {(Array.isArray(users) ? users : []).map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        <button type="submit">
          {editingId ? "Save changes" : "Add expense"}
        </button>

        {editingId && (
          <button
            type="button"
            className="secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </form>

      <div className="row spaced">
        <select value={filterEvent} onChange={handleFilter}>
          <option value="">All events</option>

          {(Array.isArray(events) ? events : []).map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.eventName}
            </option>
          ))}
        </select>

        <strong>Total: {total.toFixed(2)}</strong>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Event</th>
            <th>Paid by</th>
            <th className="num">Amount</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {(Array.isArray(expenses) ? expenses : []).map((ex) => (
            <tr key={ex.id}>
              <td>{ex.expenseDate}</td>
              <td>{ex.description}</td>
              <td>{ex.category}</td>
              <td>{ex.event?.eventName || ""}</td>
              <td>{ex.paidBy?.name || ""}</td>

              <td className="num">
                {Number(ex.amount || 0).toFixed(2)}
              </td>

              <td className="actions">
                <button
                  className="secondary"
                  onClick={() => handleEdit(ex)}
                >
                  Edit
                </button>

                <button
                  className="danger"
                  onClick={() => handleDelete(ex.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {(Array.isArray(expenses) ? expenses : []).length === 0 && (
            <tr>
              <td colSpan="7" className="empty">
                No expenses yet. Create an event and a user first, then add
                one above.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}