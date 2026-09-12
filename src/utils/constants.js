export const FILTER_OPTIONS = ["All", "Todo", "In Progress", "Completed"];

export const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

export const PRIORITY_FILTER_OPTIONS = ["All", ...PRIORITY_OPTIONS];

export const SORT_OPTIONS = ["Newest", "Oldest", "Due Date", "Priority"];

export const STATUS_OPTIONS = ["Todo", "In Progress", "Completed"];

export const INITIAL_TASKS = [
  {
    id: 1,
    title: "Design dashboard",
    description: "Create the first dashboard layout.",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-09-20",
  },
  {
    id: 2,
    title: "Build login page",
    description: "Implement the login screen and validation.",
    status: "Completed",
    priority: "Medium",
    dueDate: "2026-09-15",
  },
  { id: 3, title: "Connect API", status: "Todo", priority: "High" },
];
