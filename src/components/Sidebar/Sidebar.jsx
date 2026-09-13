const navItems = ["Dashboard", "Projects", "Tasks", "Settings"];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <button
        type="button"
        className={`sidebar-backdrop ${isOpen ? "is-visible" : ""}`}
        aria-label="Close navigation"
        onClick={onClose}
      />
      <aside className={`sidebar ${isOpen ? "is-open" : ""}`}>
      <div>
        <h2>TaskFlow</h2>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item} className="nav-item" type="button" onClick={onClose}>
              {item}
            </button>
          ))}
        </nav>
      </div>
      </aside>
    </>
  );
}
