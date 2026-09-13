export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="toast-icon" aria-hidden="true">✓</span>
      <span>{message}</span>
      <button type="button" className="toast-close" onClick={onClose} aria-label="Dismiss notification">
        ×
      </button>
    </div>
  );
}
