import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./styles.css";

import Sidebar from "./components/Sidebar/Sidebar";
import TaskDetails from "./components/TaskDetails/TaskDetails";
import Modal from "./components/Modal/Modal";
import Toast from "./components/Toast/Toast";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import ProjectsPage from "./pages/ProjectsPage";
import SettingsPage from "./pages/SettingsPage";

import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  FILTER_OPTIONS,
  DEFAULT_SETTINGS,
  INITIAL_TASKS,
  INITIAL_PROJECTS,
  PRIORITY_OPTIONS,
  PRIORITY_FILTER_OPTIONS,
  PROJECT_FILTER_ALL,
  SORT_OPTIONS,
} from "./utils/constants";
import TaskForm from "./components/TaskForm/TaskForm";

const createEmptyTask = (defaultPriority = "Medium") => ({
  title: "",
  description: "",
  priority: defaultPriority,
  dueDate: "",
  status: "Todo",
  projectId: null,
});

export default function App() {
  const [tasks, setTasks] = useLocalStorage("taskflow-tasks", INITIAL_TASKS);
  const [projects, setProjects] = useLocalStorage("taskflow-projects", INITIAL_PROJECTS);
  const [settings, setSettings] = useLocalStorage("taskflow-settings", DEFAULT_SETTINGS);
  const [taskDraft, setTaskDraft] = useState(() => createEmptyTask(settings.defaultPriority));
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [projectFilter, setProjectFilter] = useState(PROJECT_FILTER_ALL);
  const [sortBy, setSortBy] = useState("Newest");
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [systemTheme, setSystemTheme] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  );

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setIsLoading(false), 600);

    return () => window.clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (!toastMessage) return undefined;

    const toastTimer = window.setTimeout(() => setToastMessage(""), 3000);

    return () => window.clearTimeout(toastTimer);
  }, [toastMessage]);

  useEffect(() => {
    if (settings.theme !== "system") return undefined;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (event) => setSystemTheme(event.matches ? "dark" : "light");

    setSystemTheme(mediaQuery.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleThemeChange);

    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, [settings.theme]);

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
    setToastMessage("Task created successfully");
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
    setToastMessage("Task updated successfully");
  };

  const deleteTask = () => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskToDelete.id),
    );
    setTaskToDelete(null);
    setToastMessage("Task deleted successfully");
  };

  const deleteProject = (projectId) => {
    setProjects((currentProjects) =>
      currentProjects.filter((project) => project.id !== projectId),
    );
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        String(task.projectId) === String(projectId)
          ? { ...task, projectId: null }
          : task,
      ),
    );
  };

  const updateSettings = (nextSettings) => {
    setSettings(nextSettings);
    setTaskDraft((currentDraft) =>
      currentDraft.title.trim()
        ? currentDraft
        : { ...currentDraft, priority: nextSettings.defaultPriority },
    );
  };

  const clearAllTasks = () => {
    setTasks([]);
    setSelectedTask(null);
    setEditingTask(null);
    setTaskToDelete(null);
    setToastMessage("All tasks cleared successfully");
  };

  const resetApplicationData = () => {
    setTasks([]);
    setProjects([]);
    setSettings(DEFAULT_SETTINGS);
    setTaskDraft(createEmptyTask(DEFAULT_SETTINGS.defaultPriority));
    setProjectFilter(PROJECT_FILTER_ALL);
    setSelectedTask(null);
    setEditingTask(null);
    setTaskToDelete(null);
    setToastMessage("Application data reset successfully");
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
      const matchesProject =
        projectFilter === PROJECT_FILTER_ALL || String(task.projectId) === projectFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesProject;
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
  }, [priorityFilter, projectFilter, searchQuery, sortBy, statusFilter, tasks]);

  const hasSearch = Boolean(searchQuery.trim());
  const hasFilters =
    statusFilter !== "All" ||
    priorityFilter !== "All" ||
    projectFilter !== PROJECT_FILTER_ALL;
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
            title: "No tasks match the selected filters",
            message: "Try changing the status, priority, or project filter.",
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

  if (isLoading) {
    return (
      <div className="loading-screen" role="status" aria-live="polite">
        <div className="loading-spinner" aria-hidden="true" />
        <p>Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className={`app-shell theme-${settings.theme === "system" ? systemTheme : settings.theme}`}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="main-content">
        <div className="mobile-app-bar">
          <button
            type="button"
            className="menu-button"
            aria-label="Open navigation"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span aria-hidden="true">☰</span>
          </button>
          <span className="mobile-brand">TaskFlow</span>
        </div>
        <Routes>
          <Route path="/" element={<DashboardPage tasks={tasks} stats={stats} />} />
          <Route
            path="/tasks"
            element={
              <TasksPage
                visibleTasks={visibleTasks}
                projects={projects}
                taskDraft={taskDraft}
                onTaskDraftChange={setTaskDraft}
                onCreateTask={addTask}
                isCreateFormOpen={isCreateFormOpen}
                onToggleCreateForm={() => setIsCreateFormOpen((isOpen) => !isOpen)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                priorityFilter={priorityFilter}
                onPriorityFilterChange={setPriorityFilter}
                projectFilter={projectFilter}
                onProjectFilterChange={setProjectFilter}
                sortBy={sortBy}
                onSortChange={setSortBy}
                filterOptions={FILTER_OPTIONS}
                priorityOptions={PRIORITY_FILTER_OPTIONS}
                sortOptions={SORT_OPTIONS}
                emptyState={emptyState}
                onView={setSelectedTask}
                onEdit={setEditingTask}
                onDelete={setTaskToDelete}
              />
            }
          />
          <Route
            path="/projects"
            element={
              <ProjectsPage
                projects={projects}
                tasks={tasks}
                onProjectsChange={setProjects}
                onDeleteProject={deleteProject}
                onNotify={setToastMessage}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <SettingsPage
                settings={settings}
                onSettingsChange={updateSettings}
                taskCount={tasks.length}
                onClearTasks={clearAllTasks}
                onResetData={resetApplicationData}
                priorityOptions={PRIORITY_OPTIONS}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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
            projects={projects}
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

      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </div>
  );
}
