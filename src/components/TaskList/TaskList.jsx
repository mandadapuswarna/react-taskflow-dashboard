import TaskCard from "../TaskCard/TaskCard";

export default function TaskList({ tasks, onStatusChange }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
}
