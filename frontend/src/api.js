
async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });


  if (res.status === 204) {
    return null;
  }

  const data = await res.json().catch(() => null);

  if (!res.ok) {


    const message =
      data?.message ||
      (data && typeof data === "object"
        ? Object.values(data).join(", ")
        : null) ||
      `Request failed (${res.status})`;

    throw new Error(message);
  }

  return data;
}

// --------------------------------------------------
// Users
// --------------------------------------------------

export const getUsers = async () => {
  const data = await request("/api/users");

  // Always return an array
  return Array.isArray(data) ? data : [];
};

export const createUser = (body) =>
  request("/api/users", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const deleteUser = (id) =>
  request(`/api/users/${id}`, {
    method: "DELETE",
  });

// --------------------------------------------------
// Events
// --------------------------------------------------

export const getEvents = async () => {
  const data = await request("/api/events");

  // Always return an array
  return Array.isArray(data) ? data : [];
};

export const getEvent = (id) =>
  request(`/api/events/${id}`);

export const createEvent = (body) =>
  request("/api/events", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const addMember = (eventId, userId) =>
  request(`/api/events/${eventId}/members/${userId}`, {
    method: "POST",
  });

export const removeMember = (eventId, userId) =>
  request(`/api/events/${eventId}/members/${userId}`, {
    method: "DELETE",
  });

// --------------------------------------------------
// Expenses
// --------------------------------------------------

export const getExpenses = async () => {
  const data = await request("/api/expenses");

  // Always return an array
  return Array.isArray(data) ? data : [];
};

export const getExpensesByEvent = async (eventId) => {
  const data = await request(`/api/expenses/event/${eventId}`);

  // Always return an array
  return Array.isArray(data) ? data : [];
};

export const createExpense = (body) =>
  request("/api/expenses", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const updateExpense = (id, body) =>
  request(`/api/expenses/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const deleteExpense = (id) =>
  request(`/api/expenses/${id}`, {
    method: "DELETE",
  });



