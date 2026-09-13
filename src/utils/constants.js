export const FILTER_OPTIONS = ["All", "Todo", "In Progress", "Completed"];

export const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

export const PRIORITY_FILTER_OPTIONS = ["All", ...PRIORITY_OPTIONS];

export const SORT_OPTIONS = ["Newest", "Oldest", "Due Date", "Priority"];

export const STATUS_OPTIONS = ["Todo", "In Progress", "Completed"];

export const PROJECT_STATUS_OPTIONS = ["Planning", "Active", "Completed"];

export const INITIAL_PROJECTS = [];

export const INITIAL_TASKS = [
  {
    id: 1,
    title: "Design dashboard",
    description: "Create the first dashboard layout.",
    createdAt: "2026-09-01T09:00:00.000Z",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-09-20",
  },
  {
    id: 2,
    title: "Build login page",
    description: "Implement the login screen and validation.",
    createdAt: "2026-09-02T09:00:00.000Z",
    status: "Completed",
    priority: "Medium",
    dueDate: "2026-09-15",
  },
  {
    id: 3,
    title: "Connect API",
    description: "Connect the dashboard to the task service.",
    createdAt: "2026-09-03T09:00:00.000Z",
    status: "Todo",
    priority: "High",
    dueDate: "",
  },
];
