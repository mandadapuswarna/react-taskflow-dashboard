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

const createEmptyTask = () => ({
  title: "",
  description: "",
  priority: "Medium",
  dueDate: "",
  status: "Todo",
});

export default function App() {
  const [tasks, setTasks] = useLocalStorage("taskflow-tasks", INITIAL_TASKS);
  const [taskDraft, setTaskDraft] = useState(createEmptyTask);
  const [filter, setFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  const addTask = (event) => {
    event.preventDefault();

    if (!taskDraft.title.trim()) return;

    setTasks((currentTasks) => [
      { ...taskDraft, id: Date.now(), title: taskDraft.title.trim() },
      ...currentTasks,
    ]);
    setTaskDraft(createEmptyTask());
    setIsCreateFormOpen(false);
  };

  const saveTask = (event) => {
    event.preventDefault();
    if (!editingTask.title.trim()) return;

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === editingTask.id
          ? { ...editingTask, title: editingTask.title.trim() }
          : task,
      ),
    );
    setEditingTask(null);
  };

  const deleteTask = () => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskToDelete.id),
    );
    setTaskToDelete(null);
  };

  const filteredTasks = useMemo(
    () => (filter === "All" ? tasks : tasks.filter((task) => task.status === filter)),
    [filter, tasks],
  );

  const stats = useMemo(
    () => ({
      total: tasks.length,
      done: tasks.filter((task) => task.status === "Completed").length,
      inProgress: tasks.filter((task) => task.status === "In Progress").length,
    }),
    [tasks],
  );

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <Header />
        <Dashboard stats={stats} />

        <section className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Workspace</p>
              <h2>Tasks</h2>
            </div>
            <div className="section-actions">
              <span className="task-count">{filteredTasks.length} shown</span>
              <button
                type="button"
                className="primary-button new-task-button"
                aria-expanded={isCreateFormOpen}
                aria-controls="create-task-panel"
                onClick={() => setIsCreateFormOpen((isOpen) => !isOpen)}
              >
                {isCreateFormOpen ? "Close" : "+ New task"}
              </button>
            </div>
          </div>
          <div
            id="create-task-panel"
            className={`create-task-panel ${isCreateFormOpen ? "is-open" : ""}`}
            aria-hidden={!isCreateFormOpen}
          >
            <div className="create-task-panel-inner">
              <TaskForm
                task={taskDraft}
                onChange={setTaskDraft}
                onSubmit={addTask}
                submitLabel="Create task"
              />
            </div>
          </div>
          <TaskFilters
            filter={filter}
            onFilterChange={setFilter}
            options={FILTER_OPTIONS}
          />
          <TaskList
            tasks={filteredTasks}
            onEdit={setEditingTask}
            onDelete={setTaskToDelete}
          />
        </section>
      </main>

      <Modal
        isOpen={Boolean(editingTask)}
        title="Edit task"
        onClose={() => setEditingTask(null)}
      >
        {editingTask && (
          <TaskForm
            task={editingTask}
            onChange={setEditingTask}
            onSubmit={saveTask}
            onCancel={() => setEditingTask(null)}
            submitLabel="Save changes"
          />
        )}
      </Modal>

      <Modal
        isOpen={Boolean(taskToDelete)}
        title="Delete task"
        onClose={() => setTaskToDelete(null)}
      >
        <p className="modal-copy">Are you sure you want to delete this task?</p>
        <div className="form-actions">
          <button type="button" className="danger-button" onClick={deleteTask}>
            Delete task
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => setTaskToDelete(null)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
