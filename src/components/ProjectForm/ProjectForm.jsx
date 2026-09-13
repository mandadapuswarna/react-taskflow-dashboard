import { PROJECT_STATUS_OPTIONS } from "../../utils/constants";

export default function ProjectForm({
  project,
  onChange,
  onSubmit,
  onCancel,
  submitLabel,
}) {
  return (
    <form className="project-form" onSubmit={onSubmit}>
      <label>
        Project name
        <input
          type="text"
          value={project.name}
          onChange={(event) => onChange({ ...project, name: event.target.value })}
          placeholder="Project name"
          required
        />
      </label>
      <label>
        Description
        <textarea
          value={project.description}
          onChange={(event) => onChange({ ...project, description: event.target.value })}
          placeholder="Describe the project"
          rows="3"
        />
      </label>
      <label>
        Status
        <select
          value={project.status}
          onChange={(event) => onChange({ ...project, status: event.target.value })}
        >
          {PROJECT_STATUS_OPTIONS.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </label>
      <div className="form-actions">
        <button type="submit" className="primary-button">
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}