export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <article className="task-item">
      <div className="task-copy">
        <strong>{task.title}</strong>
        {task.description && <p>{task.description}</p>}
        <small>
          {task.priority} priority{task.dueDate ? ` · Due ${task.dueDate}` : ""}
        </small>
      </div>
      <div className="task-actions">
        <span className={`status status-${task.status.toLowerCase().replace(" ", "-")}`}>
          {task.status}
        </span>
        <button type="button" className="secondary-button" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button type="button" className="danger-button" onClick={() => onDelete(task)}>
          Delete
        </button>
      </div>
    </article>
  );
}
