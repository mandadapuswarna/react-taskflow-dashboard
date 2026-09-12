export default function Header({ onNewProject }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Welcome back</p>
        <h1>Good morning 👋</h1>
        <p className="subtitle">Manage your team's work in one place.</p>
      </div>
      <button type="button" className="primary-button" onClick={onNewProject}>
        + New project
      </button>
    </header>
  );
}
