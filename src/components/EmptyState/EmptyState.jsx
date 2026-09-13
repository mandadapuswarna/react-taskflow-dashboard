export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-state-icon" aria-hidden="true">📋</span>
      <h3>{title}</h3>
      <p>{message}</p>
      {onAction && (
        <button type="button" className="primary-button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}