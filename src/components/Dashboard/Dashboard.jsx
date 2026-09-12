export default function Dashboard({ stats }) {
  const cards = [
    { label: "Total Tasks", value: stats.total },
    { label: "Completed", value: stats.completed },
    { label: "In Progress", value: stats.inProgress },
    { label: "Todo", value: stats.todo },
  ];

  return (
    <section className="dashboard-overview" aria-label="Dashboard summary">
      <div className="stats-grid">
        {cards.map((card) => (
          <div key={card.label} className="stat-card">
            <span>{card.label}</span>
            <b>{card.value}</b>
          </div>
        ))}
      </div>
      <div className="progress-card">
        <div className="progress-heading">
          <div>
            <span>Overall progress</span>
            <strong>Progress: {stats.completionPercentage}%</strong>
          </div>
          <span className="progress-detail">
            {stats.completed} of {stats.total} completed
          </span>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Task completion progress"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={stats.completionPercentage}
        >
          <div
            className="progress-fill"
            style={{ width: `${stats.completionPercentage}%` }}
          />
        </div>
      </div>
    </section>
  );
}
