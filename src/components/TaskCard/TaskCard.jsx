export default function TaskCard({ task, onView, onEdit, onDelete }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onView(task);
    }
  };

  return (
    <article
      className="task-item"
      onClick={() => onView(task)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
    >
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
        <button
          type="button"
          className="secondary-button"
          onClick={(event) => {
            event.stopPropagation();
            onEdit(task);
          }}
        >
          Edit
        </button>
        <button
          type="button"
          className="danger-button"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(task);
          }}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
