# 01-taskflow-dashboard

A task management dashboard built with React to demonstrate component composition, reusable UI building blocks, prop-driven rendering, and local state management.

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
