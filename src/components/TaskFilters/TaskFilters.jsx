export default function TaskFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  sortBy,
  onSortChange,
  statusOptions,
  priorityOptions,
  sortOptions,
  projectFilter,
  onProjectFilterChange,
  projectOptions,
}) {
  return (
    <div className="task-filters">
      <label className="search-field">
        <span className="sr-only">Search tasks</span>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tasks..."
        />
      </label>
      <div className="filter-controls">
        <label>
          Status
          <select
            value={statusFilter}
            onChange={(event) => onStatusFilterChange(event.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Priority
          <select
            value={priorityFilter}
            onChange={(event) => onPriorityFilterChange(event.target.value)}
          >
            {priorityOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Sort by
          <select value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
            {sortOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          Project
          <select
            value={projectFilter}
            onChange={(event) => onProjectFilterChange(event.target.value)}
          >
            {projectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
