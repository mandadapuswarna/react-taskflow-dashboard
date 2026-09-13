import TaskFilters from "../components/TaskFilters/TaskFilters";
import TaskForm from "../components/TaskForm/TaskForm";
import TaskList from "../components/TaskList/TaskList";

export default function TasksPage({
  visibleTasks,
  projects,
  taskDraft,
  onTaskDraftChange,
  onCreateTask,
  isCreateFormOpen,
  onToggleCreateForm,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  projectFilter,
  onProjectFilterChange,
  sortBy,
  onSortChange,
  filterOptions,
  priorityOptions,
  sortOptions,
  emptyState,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <>
      <header className="page-heading">
        <div>
          <p className="eyebrow">Task Management</p>
          <h1>My Tasks</h1>
          <p className="subtitle">Manage and organize all your tasks in one place.</p>
        </div>
        <div className="section-actions">
          <span className="task-count">{visibleTasks.length} shown</span>
          <button
            type="button"
            className="primary-button new-task-button"
            aria-expanded={isCreateFormOpen}
            aria-controls="create-task-panel"
            onClick={onToggleCreateForm}
          >
            {isCreateFormOpen ? "Close" : "+ New task"}
          </button>
        </div>
      </header>

      <div
        id="create-task-panel"
        className={`create-task-panel ${isCreateFormOpen ? "is-open" : ""}`}
        aria-hidden={!isCreateFormOpen}
      >
        <div className="create-task-panel-inner">
          <TaskForm
            task={taskDraft}
            projects={projects}
            onChange={onTaskDraftChange}
            onSubmit={onCreateTask}
            submitLabel="Create task"
          />
        </div>
      </div>

      <section className="panel">
        <TaskFilters
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          statusFilter={statusFilter}
          onStatusFilterChange={onStatusFilterChange}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={onPriorityFilterChange}
          projectFilter={projectFilter}
          onProjectFilterChange={onProjectFilterChange}
          sortBy={sortBy}
          onSortChange={onSortChange}
          statusOptions={filterOptions}
          priorityOptions={priorityOptions}
          projectOptions={[
            { value: "All Projects", label: "All Projects" },
            ...projects.map((project) => ({
              value: String(project.id),
              label: project.name,
            })),
          ]}
          sortOptions={sortOptions}
        />
        <TaskList
          tasks={visibleTasks}
          projects={projects}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          emptyState={emptyState}
        />
      </section>
    </>
  );
}
