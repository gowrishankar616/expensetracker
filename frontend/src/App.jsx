import { useState } from "react";
import Users from "./components/Users.jsx";
import Events from "./components/Events.jsx";
import Expenses from "./components/Expenses.jsx";

const TABS = ["Expenses", "Events", "Users"];

export default function App() {
  const [tab, setTab] = useState("Expenses");

  return (
    <div className="app">
      <header className="header">
        <h1>Expense Tracker</h1>
        <nav className="tabs">
          {TABS.map((t) => (
            <button
              key={t}
              className={t === tab ? "tab active" : "tab"}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>
      </header>

      <main className="content">
        {tab === "Expenses" && <Expenses />}
        {tab === "Events" && <Events />}
        {tab === "Users" && <Users />}
      </main>
    </div>
  );
}
