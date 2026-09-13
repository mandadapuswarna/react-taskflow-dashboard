export default function Header({ onMenuToggle }) {
  return (
    <header className="topbar">
      <button
        type="button"
        className="menu-button"
        aria-label="Open navigation"
        onClick={onMenuToggle}
      >
        <span aria-hidden="true">☰</span>
      </button>
      <div>
        <p className="eyebrow">Welcome back</p>
        <h1>Good morning 👋</h1>
        <p className="subtitle">Manage your team's work in one place.</p>
      </div>
    </header>
  );
}
