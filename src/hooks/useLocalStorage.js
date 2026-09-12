import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;
      return Array.isArray(parsedValue)
        ? parsedValue.map((task) => ({
            description: "",
            dueDate: "",
            ...task,
            status: task.status === "Done" ? "Completed" : task.status,
          }))
        : parsedValue;
    } catch (error) {
      console.error("Unable to read from localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Unable to write to localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}
