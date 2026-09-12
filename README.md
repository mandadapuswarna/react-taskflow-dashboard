# 01-taskflow-dashboard

A task management dashboard built with React to demonstrate component composition, reusable UI building blocks, prop-driven rendering, and local state management.

## Phase 2 — Task Management Features

Phase 2 adds complete task management workflows:

- Create a task with required title, description, priority, due date, and status
- Create-task fields are collapsed by default and open with an animated `+ New task` button
- Edit every task field from the reusable edit modal
- Delete tasks with a confirmation modal
- Priority options: `Low`, `Medium`, and `High`
- Status options: `Todo`, `In Progress`, and `Completed`
- Existing Phase 1 tasks using the old `Done` status are migrated to `Completed`

Tasks continue to persist in browser local storage through `useLocalStorage`.

## Phase 1 — Better Project Structure

This phase refactors the dashboard into a cleaner component structure:

- `Sidebar` for navigation
- `Header` for the page header and action button
- `Dashboard` for stats cards
- `TaskForm` for creating new tasks
- `TaskFilters` for status filtering
- `TaskList` and `TaskCard` for list rendering and item controls
- `Modal` as a reusable UI pattern
- `useLocalStorage` hook for persisting task data
- `constants.js` for shared app data

### Project structure

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

### Features in this phase

- Reusable component architecture
- Props-based composition
- Centralized state for tasks and filters
- Local storage persistence with a custom hook
- Improved UI structure and maintainability

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
