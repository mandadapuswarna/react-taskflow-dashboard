const navItems = ["Dashboard", "Projects", "Tasks", "Settings"];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <h2>TaskFlow</h2>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item} className="nav-item" type="button">
              {item}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
