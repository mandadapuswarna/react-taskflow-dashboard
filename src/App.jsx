import { useState } from "react";
import "./styles.css";

const initialTasks = [
  { id: 1, title: "Design dashboard", status: "In Progress", priority: "High" },
  { id: 2, title: "Build login page", status: "Done", priority: "Medium" },
  { id: 3, title: "Connect API", status: "Todo", priority: "High" },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("All");

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setTasks([
      { id: Date.now(), title, status: "Todo", priority: "Medium" },
      ...tasks,
    ]);
    setTitle("");
  };

  const filtered =
    filter === "All" ? tasks : tasks.filter((t) => t.status === filter);
  const done = tasks.filter((t) => t.status === "Done").length;

  return (
    <div className="app">
      <aside>
        <h2>TaskFlow</h2>
        <p>Dashboard</p>
        <p>Projects</p>
        <p>Tasks</p>
        <p>Settings</p>
      </aside>
      <main>
        <header>
          <div>
            <h1>Good morning 👋</h1>
            <p>Manage your team's work in one place.</p>
          </div>
          <button>+ New project</button>
        </header>
        <section className="stats">
          <div>
            <span>Total Tasks</span>
            <b>{tasks.length}</b>
          </div>
          <div>
            <span>Completed</span>
            <b>{done}</b>
          </div>
          <div>
            <span>In Progress</span>
            <b>{tasks.filter((t) => t.status === "In Progress").length}</b>
          </div>
        </section>
        <section className="panel">
          <h2>Tasks</h2>
          <form onSubmit={addTask}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a new task"
            />
            <button>Add</button>
          </form>
          <div className="filters">
            {["All", "Todo", "In Progress", "Done"].map((x) => (
              <button
                key={x}
                className={filter === x ? "active" : ""}
                onClick={() => setFilter(x)}
              >
                {x}
              </button>
            ))}
          </div>
          <div className="list">
            {filtered.map((t) => (
              <article key={t.id}>
                <div>
                  <strong>{t.title}</strong>
                  <small>{t.priority} priority</small>
                </div>
                <select
                  value={t.status}
                  onChange={(e) =>
                    setTasks(
                      tasks.map((x) =>
                        x.id === t.id ? { ...x, status: e.target.value } : x,
                      ),
                    )
                  }
                >
                  <option>Todo</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
