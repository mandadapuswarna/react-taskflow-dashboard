const formatDate = (date) => {
  if (!date) return "Not set";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(new Date(date));
};

export default function TaskDetails({ task }) {
  const details = [
    { label: "Priority", value: task.priority },
    { label: "Status", value: task.status },
    { label: "Created Date", value: formatDate(task.createdAt) },
    { label: "Due Date", value: formatDate(task.dueDate) },
  ];

  return (
    <div className="task-details">
      <div className="task-detail-description">
        <span>Description</span>
        <p>{task.description || "No description provided."}</p>
      </div>
      <dl className="task-detail-grid">
        {details.map((detail) => (
          <div key={detail.label}>
            <dt>{detail.label}</dt>
            <dd>{detail.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}