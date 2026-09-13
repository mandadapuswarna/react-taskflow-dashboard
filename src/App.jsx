import { useMemo, useState } from "react";
import "./styles.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskFilters from "./components/TaskFilters/TaskFilters";
import TaskList from "./components/TaskList/TaskList";
import TaskDetails from "./components/TaskDetails/TaskDetails";
import Modal from "./components/Modal/Modal";

import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  FILTER_OPTIONS,
  INITIAL_TASKS,
  PRIORITY_FILTER_OPTIONS,
  SORT_OPTIONS,
} from "./utils/constants";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  const addTask = (event) => {
    event.preventDefault();

    if (!taskDraft.title.trim()) return;

    setTasks((currentTasks) => [
      {
        ...taskDraft,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        title: taskDraft.title.trim(),
      },
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

  const visibleTasks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const priorityRank = { Low: 1, Medium: 2, High: 3 };

    const matchingTasks = tasks.filter((task) => {
      const matchesSearch =
        !normalizedQuery ||
        task.title.toLowerCase().includes(normalizedQuery) ||
        task.description.toLowerCase().includes(normalizedQuery);
      const matchesStatus = statusFilter === "All" || task.status === statusFilter;
      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    return [...matchingTasks].sort((firstTask, secondTask) => {
      if (sortBy === "Newest") return secondTask.id - firstTask.id;
      if (sortBy === "Oldest") return firstTask.id - secondTask.id;
      if (sortBy === "Priority") {
        return priorityRank[secondTask.priority] - priorityRank[firstTask.priority];
      }

      if (!firstTask.dueDate && !secondTask.dueDate) return 0;
      if (!firstTask.dueDate) return 1;
      if (!secondTask.dueDate) return -1;
      return firstTask.dueDate.localeCompare(secondTask.dueDate);
    });
  }, [priorityFilter, searchQuery, sortBy, statusFilter, tasks]);

  const hasSearch = Boolean(searchQuery.trim());
  const hasFilters = statusFilter !== "All" || priorityFilter !== "All";
  const emptyState = tasks.length === 0
    ? {
        title: "No tasks found",
        message: "Create your first task to get started.",
        actionLabel: "+ New task",
        onAction: () => setIsCreateFormOpen(true),
      }
    : hasSearch
      ? {
          title: "No search results",
          message: "Try a different search term.",
        }
      : hasFilters
        ? {
            title: "No tasks match these filters",
            message: "Try changing the selected status or priority.",
          }
        : {
            title: "No tasks found",
            message: "Create your first task to get started.",
            actionLabel: "+ New task",
            onAction: () => setIsCreateFormOpen(true),
          };

  const stats = useMemo(
    () => {
      const total = tasks.length;
      const completed = tasks.filter((task) => task.status === "Completed").length;

      return {
        total,
        completed,
        inProgress: tasks.filter((task) => task.status === "In Progress").length,
        todo: tasks.filter((task) => task.status === "Todo").length,
        completionPercentage: total ? Math.round((completed / total) * 100) : 0,
      };
    },
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
              <span className="task-count">{visibleTasks.length} shown</span>
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
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            statusOptions={FILTER_OPTIONS}
            priorityOptions={PRIORITY_FILTER_OPTIONS}
            sortOptions={SORT_OPTIONS}
          />
          <TaskList
            tasks={visibleTasks}
            onView={setSelectedTask}
            onEdit={setEditingTask}
            onDelete={setTaskToDelete}
            emptyState={emptyState}
          />
        </section>
      </main>

      <Modal
        isOpen={Boolean(selectedTask)}
        title={selectedTask?.title}
        onClose={() => setSelectedTask(null)}
      >
        {selectedTask && <TaskDetails task={selectedTask} />}
      </Modal>

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
