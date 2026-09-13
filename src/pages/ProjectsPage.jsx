import { useState } from "react";
import EmptyState from "../components/EmptyState/EmptyState";
import Modal from "../components/Modal/Modal";
import ProjectForm from "../components/ProjectForm/ProjectForm";

const createEmptyProject = () => ({
  name: "",
  description: "",
  status: "Planning",
});

export default function ProjectsPage({
  projects,
  tasks,
  onProjectsChange,
  onDeleteProject,
  onNotify,
}) {
  const [projectDraft, setProjectDraft] = useState(createEmptyProject);
  const [editingProject, setEditingProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  const addProject = (event) => {
    event.preventDefault();
    if (!projectDraft.name.trim()) return;

    onProjectsChange((currentProjects) => [
      {
        ...projectDraft,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        name: projectDraft.name.trim(),
      },
      ...currentProjects,
    ]);
    setProjectDraft(createEmptyProject());
    setIsCreateFormOpen(false);
    onNotify("Project created successfully");
  };

  const saveProject = (event) => {
    event.preventDefault();
    if (!editingProject.name.trim()) return;

    onProjectsChange((currentProjects) =>
      currentProjects.map((project) =>
        project.id === editingProject.id
          ? { ...editingProject, name: editingProject.name.trim() }
          : project,
      ),
    );
    setEditingProject(null);
    onNotify("Project updated successfully");
  };

  const deleteProject = () => {
    onDeleteProject(projectToDelete.id);
    setProjectToDelete(null);
    onNotify("Project deleted successfully");
  };

  return (
    <>
      <header className="page-heading">
        <div>
          <p className="eyebrow">Projects</p>
          <h1>Organize your work</h1>
          <p className="subtitle">Create and manage projects in one place.</p>
        </div>
        <button
          type="button"
          className="primary-button new-task-button"
          aria-expanded={isCreateFormOpen}
          aria-controls="create-project-panel"
          onClick={() => setIsCreateFormOpen((isOpen) => !isOpen)}
        >
          {isCreateFormOpen ? "Close" : "+ New project"}
        </button>
      </header>

      <div
        id="create-project-panel"
        className={`create-task-panel ${isCreateFormOpen ? "is-open" : ""}`}
        aria-hidden={!isCreateFormOpen}
      >
        <div className="create-task-panel-inner">
          <ProjectForm
            project={projectDraft}
            onChange={setProjectDraft}
            onSubmit={addProject}
            submitLabel="Create project"
          />
        </div>
      </div>

      <section className="panel project-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Your workspace</p>
            <h2>Projects</h2>
          </div>
          <span className="task-count">{projects.length} total</span>
        </div>

        {projects.length === 0 ? (
          <EmptyState
            title="No projects found"
            message="Create your first project to get started."
            actionLabel="+ New project"
            onAction={() => setIsCreateFormOpen(true)}
          />
        ) : (
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-card-copy">
                  <div className="project-card-title">
                    <h3>{project.name}</h3>
                    <span className={`status status-${project.status.toLowerCase()}`}>
                      {project.status}
                    </span>
                  </div>
                  <p>{project.description || "No description provided."}</p>
                  <small className="project-task-count">
                    {tasks.filter(
                      (task) => String(task.projectId) === String(project.id),
                    ).length} Tasks
                  </small>
                </div>
                <div className="task-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setEditingProject(project)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="danger-button"
                    onClick={() => setProjectToDelete(project)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Modal
        isOpen={Boolean(editingProject)}
        title="Edit project"
        onClose={() => setEditingProject(null)}
      >
        {editingProject && (
          <ProjectForm
            project={editingProject}
            onChange={setEditingProject}
            onSubmit={saveProject}
            onCancel={() => setEditingProject(null)}
            submitLabel="Save changes"
          />
        )}
      </Modal>

      <Modal
        isOpen={Boolean(projectToDelete)}
        title="Delete project"
        onClose={() => setProjectToDelete(null)}
      >
        <p className="modal-copy">Are you sure you want to delete this project?</p>
        <div className="form-actions">
          <button type="button" className="danger-button" onClick={deleteProject}>
            Delete project
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => setProjectToDelete(null)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
}
