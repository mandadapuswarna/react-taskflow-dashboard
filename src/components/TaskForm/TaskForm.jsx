export default function TaskForm({ title, onTitleChange, onSubmit }) {
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
        placeholder="Add a new task"
        aria-label="Task title"
      />
      <button type="submit" className="primary-button">
        Add
      </button>
    </form>
  );
}
