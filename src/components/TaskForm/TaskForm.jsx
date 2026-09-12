import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../utils/constants";

export default function TaskForm({ task, onChange, onSubmit, onCancel, submitLabel }) {
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <input
        type="text"
        value={task.title}
        onChange={(event) => onChange({ ...task, title: event.target.value })}
        placeholder="Task title"
        aria-label="Task title"
        required
      />
      <textarea
        value={task.description}
        onChange={(event) => onChange({ ...task, description: event.target.value })}
        placeholder="Description"
        aria-label="Task description"
        rows="2"
      />
      <div className="form-row">
        <label>
          Priority
          <select
            value={task.priority}
            onChange={(event) => onChange({ ...task, priority: event.target.value })}
          >
            {PRIORITY_OPTIONS.map((priority) => (
              <option key={priority}>{priority}</option>
            ))}
          </select>
        </label>
        <label>
          Due date
          <input
            type="date"
            value={task.dueDate}
            onChange={(event) => onChange({ ...task, dueDate: event.target.value })}
          />
        </label>
        <label>
          Status
          <select
            value={task.status}
            onChange={(event) => onChange({ ...task, status: event.target.value })}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" className="primary-button">
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
