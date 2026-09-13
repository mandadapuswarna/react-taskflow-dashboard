import Dashboard from "../components/Dashboard/Dashboard";

export default function DashboardPage({ tasks, stats }) {
  const recentTasks = [...tasks].sort((firstTask, secondTask) => secondTask.id - firstTask.id).slice(0, 5);

  return (
    <>
      <header className="page-heading">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Good morning 👋</h1>
          <p className="subtitle">Here is what is happening across your workspace.</p>
        </div>
      </header>
      <Dashboard stats={stats} />
      <section className="panel recent-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Activity</p>
            <h2>Recent tasks</h2>
          </div>
          <span className="task-count">{recentTasks.length} recent</span>
        </div>
        <div className="recent-task-list">
          {recentTasks.length === 0 ? (
            <p className="muted-copy">No recent tasks yet.</p>
          ) : (
            recentTasks.map((task) => (
              <div className="recent-task" key={task.id}>
                <span>{task.title}</span>
                <span className={`status status-${task.status.toLowerCase().replace(" ", "-")}`}>
                  {task.status}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
