# react-taskflow-dashboard

A task management dashboard built with React. It provides a focused workspace for creating, organizing, finding, editing, and deleting tasks while demonstrating component composition, reusable components, props, state management, custom hooks, and browser persistence.

## Features

### Task management

- Create tasks with a required title, description, priority, due date, and status
- Open the create-task form with the animated `+ New task` button
- Edit every task field from a reusable modal form
- Delete tasks with a confirmation modal
- Open a task details modal by clicking a task
- View title, description, priority, status, created date, and due date
- Persist tasks in browser `localStorage` after every create, edit, and delete
- Restore saved tasks automatically after a page refresh
- Synchronize task changes across browser tabs using the `storage` event
- Migrate legacy `Done` statuses to `Completed`

### Project management

- Create projects with a name, description, and status
- View the saved project list
- Edit project details
- Delete projects with confirmation
- Persist projects automatically in browser `localStorage`
- Project statuses: `Planning`, `Active`, and `Completed`

### Search, filters, and sorting

- Search by task title or description
- Filter by status: `All`, `Todo`, `In Progress`, or `Completed`
- Filter by priority: `All`, `Low`, `Medium`, or `High`
- Sort by `Newest`, `Oldest`, `Due Date`, or `Priority`
- Combine search, filters, and sorting to find relevant tasks quickly

### Empty states

- Show a friendly empty state when no tasks exist
- Provide a `+ New task` action to start the workspace
- Explain when a search returns no results
- Explain when selected status or priority filters match no tasks

### Dashboard statistics

- Display total task count
- Display completed, in-progress, and todo task counts
- Calculate completion percentage automatically
- Show completion percentage with an animated progress bar

### Responsive design

- Mobile navigation collapses into an off-canvas sidebar at widths below `768px`
- Search and filter controls adapt from three columns to two columns and then one column
- Task cards stack their content and actions on small screens
- Modals remain contained within the viewport and scroll vertically when needed
- The layout is designed for mobile `375px`, tablet `768px`, and desktop `1440px` viewports

### Professional feedback

- Show `Loading your tasks...` briefly while the application starts
- Display auto-dismissing toast notifications after task creation, updates, and deletion
- Allow toast notifications to be dismissed manually

### Navigation

- `/` renders the Dashboard with statistics and recent tasks
- `/tasks` renders the full task-management workspace
- `/projects` provides the Projects destination
- `/settings` provides the Settings destination
- Sidebar links use React Router and show the active route

## Project structure

```bash
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

The application is composed from focused components:

- `Sidebar` provides the main navigation
- `Header` renders the dashboard introduction
- `Dashboard` displays task statistics
- `TaskForm` is reused for both task creation and editing
- `TaskFilters` controls search, status filtering, priority filtering, and sorting
- `TaskList` renders the visible task collection
- `EmptyState` provides contextual empty-workspace and no-results messaging
- `TaskCard` displays task details and CRUD actions
- `ProjectForm` supports project creation and editing
- `Modal` provides reusable edit and delete dialogs
- `Toast` provides reusable success notifications
- `useLocalStorage` persists, restores, normalizes, and synchronizes task data
- `constants.js` centralizes status, priority, sorting, and initial task values
- Page components define the routed Dashboard, Tasks, Projects, and Settings views

## State management

`App.jsx` owns the task collection and coordinates the main workflows. Child components receive data and event handlers through props. Derived task results are calculated from the current search query, filters, and sort selection, while task data is persisted through the `useLocalStorage` hook.

## Technologies

- React
- Vite
- JavaScript
- CSS
- React Router

## Getting started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Create a production build

```bash
npm run build
```
