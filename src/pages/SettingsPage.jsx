import { useState } from "react";
import Modal from "../components/Modal/Modal";

export default function SettingsPage({
  settings,
  onSettingsChange,
  taskCount,
  onClearTasks,
  onResetData,
  priorityOptions,
}) {
  const [confirmation, setConfirmation] = useState(null);

  const confirmAction = () => {
    if (confirmation === "clear") onClearTasks();
    if (confirmation === "reset") onResetData();
    setConfirmation(null);
  };

  return (
    <>
      <header className="page-heading">
        <div>
          <p className="eyebrow">Settings</p>
          <h1>Customize your experience</h1>
          <p className="subtitle">Manage your application preferences and settings.</p>
        </div>
      </header>

      <section className="panel settings-panel">
        <div className="settings-section">
          <div>
            <h2>Appearance</h2>
            <p className="muted-copy">Choose how TaskFlow looks on this device.</p>
          </div>
          <label className="settings-control">
            Theme
            <select
              value={settings.theme}
              onChange={(event) =>
                onSettingsChange({ ...settings, theme: event.target.value })
              }
            >
              <option value="light">Light mode</option>
              <option value="dark">Dark mode</option>
              <option value="system">System preference</option>
            </select>
          </label>
        </div>

        <div className="settings-section">
          <div>
            <h2>Task preferences</h2>
            <p className="muted-copy">New tasks will use this priority by default.</p>
          </div>
          <label className="settings-control">
            Default task priority
            <select
              value={settings.defaultPriority}
              onChange={(event) =>
                onSettingsChange({
                  ...settings,
                  defaultPriority: event.target.value,
                })
              }
            >
              {priorityOptions.map((priority) => (
                <option key={priority}>{priority}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="settings-section settings-danger-zone">
          <div>
            <h2>Data management</h2>
            <p className="muted-copy">You currently have {taskCount} task{taskCount === 1 ? "" : "s"}.</p>
          </div>
          <div className="settings-actions">
            <button
              type="button"
              className="danger-button"
              onClick={() => setConfirmation("clear")}
            >
              Clear all tasks
            </button>
            <button
              type="button"
              className="danger-outline-button"
              onClick={() => setConfirmation("reset")}
            >
              Reset application data
            </button>
          </div>
        </div>
      </section>

      <Modal
        isOpen={Boolean(confirmation)}
        title={confirmation === "reset" ? "Reset application data" : "Clear all tasks"}
        onClose={() => setConfirmation(null)}
      >
        <p className="modal-copy">
          {confirmation === "reset"
            ? "This will clear all tasks, projects, and saved settings. Are you sure?"
            : "Are you sure you want to clear all tasks?"}
        </p>
        <div className="form-actions">
          <button type="button" className="danger-button" onClick={confirmAction}>
            {confirmation === "reset" ? "Reset data" : "Clear tasks"}
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => setConfirmation(null)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}
