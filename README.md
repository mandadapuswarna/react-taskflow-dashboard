# TaskFlow Dashboard

A responsive task and project management application built with React.

TaskFlow provides a focused workspace for creating, organizing, searching, filtering, editing, and managing tasks and projects. The application demonstrates practical React concepts including component composition, reusable components, state management, custom hooks, client-side routing, browser persistence, and responsive UI design.

## Features

### Task Management

* Create tasks with a required title, description, priority, due date, status, and optional project
* Edit task details using a reusable modal form
* Delete tasks with a confirmation modal
* View complete task information in a task details modal
* View task title, description, priority, status, project, created date, and due date
* Manage tasks from a dedicated Tasks workspace

### Project Management

* Create projects with a name, description, and status
* View all saved projects
* Edit project details
* Delete projects with confirmation
* Track project status:

  * Planning
  * Active
  * Completed
* Persist projects automatically using browser `localStorage`

### Task and Project Relationships

* Assign tasks to a project or select `No Project`
* Update project assignments while editing tasks
* Display the assigned project on task cards
* Filter tasks by project
* Calculate project task counts dynamically
* Preserve tasks when a project is deleted by resetting their `projectId` to `null`

### Search, Filters, and Sorting

* Search tasks by title or description
* Filter tasks by status:

  * All
  * Todo
  * In Progress
  * Completed
* Filter tasks by priority:

  * All
  * Low
  * Medium
  * High
* Filter tasks by project
* Sort tasks by:

  * Newest
  * Oldest
  * Due Date
  * Priority
* Combine search, filters, and sorting to quickly find relevant tasks

### Dashboard

* View total task count
* View Todo task count
* View In Progress task count
* View Completed task count
* Automatically calculate task completion percentage
* Display progress using an animated progress bar
* View recent tasks directly from the Dashboard

### Navigation

TaskFlow uses React Router for client-side navigation.

| Route       | Description                                     |
| ----------- | ----------------------------------------------- |
| `/`         | Dashboard with task statistics and recent tasks |
| `/tasks`    | Full task management workspace                  |
| `/projects` | Project management workspace                    |
| `/settings` | Application preferences and data management     |

The sidebar highlights the currently active route.

### Browser Persistence

* Persist tasks using browser `localStorage`
* Restore saved tasks after page refresh
* Persist project data
* Persist application settings
* Synchronize task changes across browser tabs using the `storage` event
* Normalize legacy task data by migrating `Done` statuses to `Completed`

### Settings

* Choose between:

  * Light mode
  * Dark mode
  * System preference
* Configure the default priority for newly created tasks
* Clear all tasks with confirmation
* Reset application data, including tasks, projects, and settings

### Empty States

* Display a friendly empty state when no tasks exist
* Provide a `+ New Task` action to create the first task
* Display contextual messaging when search results are empty
* Explain when selected filters return no matching tasks
* Provide helpful actions to recover from empty states

### User Feedback

* Display an initial loading state when the application starts
* Show toast notifications after successful actions
* Automatically dismiss toast notifications
* Allow toast notifications to be dismissed manually
* Use confirmation dialogs before destructive actions

### Responsive Design

The application is designed and tested for multiple screen sizes.

* Mobile: `375px`
* Tablet: `768px`
* Desktop: `1440px`

Responsive behavior includes:

* Mobile off-canvas sidebar navigation
* Adaptive search and filter layouts
* Responsive dashboard statistics
* Mobile-friendly task cards
* Responsive forms and controls
* Viewport-contained modals with vertical scrolling when required

---

## Technologies

* React
* Vite
* JavaScript
* CSS
* React Router
* Browser `localStorage`

---

## Key React Concepts Demonstrated

This project demonstrates practical usage of:

* Functional components
* Component composition
* Reusable components
* Props
* State management
* Derived state
* Custom hooks
* `useState`
* `useEffect`
* `useMemo`
* Client-side routing with React Router
* Controlled forms
* Conditional rendering
* List rendering
* Event handling
* Browser `localStorage`

---

## Project Structure

```text
src/
├── components/
│   ├── Sidebar/
│   ├── Header/
│   ├── Dashboard/
│   ├── TaskList/
│   ├── TaskCard/
│   ├── TaskForm/
│   ├── TaskFilters/
│   ├── Modal/
│   └── ProjectForm/
│
├── pages/
│   ├── DashboardPage.jsx
│   ├── TasksPage.jsx
│   ├── ProjectsPage.jsx
│   └── SettingsPage.jsx
│
├── hooks/
│   └── useLocalStorage.js
│
├── utils/
│   └── constants.js
│
├── App.jsx
├── main.jsx
└── styles.css
```

### Component Overview

* `Sidebar` — Main application navigation
* `Header` — Page introduction and contextual headings
* `Dashboard` — Task statistics, progress, and recent tasks
* `TaskForm` — Reusable form for creating and editing tasks
* `TaskFilters` — Search, filtering, and sorting controls
* `TaskList` — Renders the visible task collection
* `TaskCard` — Displays task information and actions
* `ProjectForm` — Supports project creation and editing
* `EmptyState` — Displays contextual empty workspace and no-results states
* `Modal` — Reusable modal for forms, details, and confirmation dialogs
* `Toast` — Displays reusable success notifications
* `useLocalStorage` — Persists, restores, normalizes, and synchronizes application data
* `constants.js` — Centralizes application constants and initial values
* Page components — Define the routed Dashboard, Tasks, Projects, and Settings views

---

## State Management

The application uses React's built-in state management with component state and props.

The main application coordinates shared workflows and passes data and event handlers to child components through props.

Derived task results are calculated from:

* Search queries
* Status filters
* Priority filters
* Project filters
* Sorting selections

Application data is persisted using a reusable `useLocalStorage` custom hook.

---

## Getting Started

### Prerequisites

Make sure you have Node.js installed.

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

The application will start on a local development server.

### Create a Production Build

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

---

## Future Improvements

Potential future enhancements include:

* User authentication
* Backend API integration
* Cloud-based data persistence
* Task deadlines and reminders
* Drag-and-drop task management
* Project-specific dashboards
* Task labels and tags
* Team collaboration
* User roles and permissions

---

## Live Demo

🔗 https://soft-madeleine-77f356.netlify.app/

---

## Author

Built as a React portfolio project demonstrating practical frontend development concepts and modern React application architecture.
