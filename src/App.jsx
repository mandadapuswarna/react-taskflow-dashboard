import { useMemo, useState } from "react";
import "./styles.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskFilters from "./components/TaskFilters/TaskFilters";
import TaskList from "./components/TaskList/TaskList";
import Modal from "./components/Modal/Modal";

import { useLocalStorage } from "./hooks/useLocalStorage";
import { FILTER_OPTIONS, INITIAL_TASKS } from "./utils/constants";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("taskflow-tasks", INITIAL_TASKS);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTask = (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    setTasks((currentTasks) => [
      { id: Date.now(), title: title.trim(), status: "Todo", priority: "Medium" },
      ...currentTasks,
    ]);
    setTitle("");
  };

  const updateTaskStatus = (taskId, nextStatus) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status: nextStatus } : task,
      ),
    );
  };

  const filteredTasks = useMemo(
    () => (filter === "All" ? tasks : tasks.filter((task) => task.status === filter)),
    [filter, tasks],
  );

  const stats = useMemo(
    () => ({
      total: tasks.length,
      done: tasks.filter((task) => task.status === "Done").length,
      inProgress: tasks.filter((task) => task.status === "In Progress").length,
    }),
    [tasks],
  );

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <Header onNewProject={() => setIsModalOpen(true)} />
        <Dashboard stats={stats} />

        <section className="panel">
          <h2>Tasks</h2>
          <TaskForm
            title={title}
            onTitleChange={setTitle}
            onSubmit={addTask}
          />
          <TaskFilters
            filter={filter}
            onFilterChange={setFilter}
            options={FILTER_OPTIONS}
          />
          <TaskList tasks={filteredTasks} onStatusChange={updateTaskStatus} />
        </section>
      </main>

      <Modal
        isOpen={isModalOpen}
        title="Create new project"
        onClose={() => setIsModalOpen(false)}
      >
        <p className="modal-copy">This is a reusable modal component for future project creation flows.</p>
        <button
          type="button"
          className="primary-button"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
      </Modal>
    </div>
  );
}
