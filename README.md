# 01-taskflow-dashboard

A task management dashboard built with React. It provides a focused workspace for creating, organizing, finding, editing, and deleting tasks while demonstrating component composition, reusable components, props, state management, custom hooks, and browser persistence.

## Features

### Task management

- Create tasks with a required title, description, priority, due date, and status
- Open the create-task form with the animated `+ New task` button
- Edit every task field from a reusable modal form
- Delete tasks with a confirmation modal
- Persist tasks in browser local storage
- Migrate legacy `Done` statuses to `Completed`

### Search, filters, and sorting

- Search by task title or description
- Filter by status: `All`, `Todo`, `In Progress`, or `Completed`
- Filter by priority: `All`, `Low`, `Medium`, or `High`
- Sort by `Newest`, `Oldest`, `Due Date`, or `Priority`
- Combine search, filters, and sorting to find relevant tasks quickly

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
│   └── Modal/
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
- `TaskCard` displays task details and CRUD actions
- `Modal` provides reusable edit and delete dialogs
- `useLocalStorage` persists and normalizes task data
- `constants.js` centralizes status, priority, sorting, and initial task values

## State management

`App.jsx` owns the task collection and coordinates the main workflows. Child components receive data and event handlers through props. Derived task results are calculated from the current search query, filters, and sort selection, while task data is persisted through the `useLocalStorage` hook.

## Technologies

- React
- Vite
- JavaScript
- CSS

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
