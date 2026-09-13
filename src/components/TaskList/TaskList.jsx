import TaskCard from "../TaskCard/TaskCard";
import EmptyState from "../EmptyState/EmptyState";

export default function TaskList({
  tasks,
  projects = [],
  onView,
  onEdit,
  onDelete,
  emptyState,
}) {
  if (tasks.length === 0) {
    return <EmptyState {...emptyState} />;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          project={projects.find(
            (project) => String(project.id) === String(task.projectId),
          )}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
