export default function TaskCard({ task, onStatusChange }) {
  return (
    <article className="task-item">
      <div className="task-copy">
        <strong>{task.title}</strong>
        <small>{task.priority} priority</small>
      </div>

      <select
        value={task.status}
        onChange={(event) => onStatusChange(task.id, event.target.value)}
        aria-label={`Update status for ${task.title}`}
      >
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </article>
  );
}
