export default function Dashboard({ stats }) {
  const cards = [
    { label: "Total Tasks", value: stats.total },
    { label: "Completed", value: stats.done },
    { label: "In Progress", value: stats.inProgress },
  ];

  return (
    <section className="stats-grid" aria-label="Dashboard summary">
      {cards.map((card) => (
        <div key={card.label} className="stat-card">
          <span>{card.label}</span>
          <b>{card.value}</b>
        </div>
      ))}
    </section>
  );
}
