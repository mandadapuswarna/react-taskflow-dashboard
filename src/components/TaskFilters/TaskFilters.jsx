export default function TaskFilters({ filter, onFilterChange, options }) {
  return (
    <div className="filters">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={filter === option ? "active" : ""}
          onClick={() => onFilterChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
