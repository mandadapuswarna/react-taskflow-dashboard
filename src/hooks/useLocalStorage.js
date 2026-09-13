import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const fallbackValue =
      typeof initialValue === "function" ? initialValue() : initialValue;

    if (typeof window === "undefined") return fallbackValue;

    try {
      const storedValue = window.localStorage.getItem(key);
      const parsedValue = storedValue ? JSON.parse(storedValue) : fallbackValue;
      return Array.isArray(parsedValue)
        ? parsedValue.map((task) => ({
            description: "",
            dueDate: "",
            createdAt: new Date().toISOString(),
            ...task,
            status: task.status === "Done" ? "Completed" : task.status,
          }))
        : parsedValue;
    } catch (error) {
      console.error("Unable to read from localStorage:", error);
        return fallbackValue;
    }
  });

  useEffect(() => {
      if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Unable to write to localStorage:", error);
    }
  }, [key, value]);

    useEffect(() => {
      if (typeof window === "undefined") return undefined;

      const handleStorageChange = (event) => {
        if (event.key !== key || event.newValue === null) return;

        try {
          setValue(JSON.parse(event.newValue));
        } catch (error) {
          console.error("Unable to sync localStorage:", error);
        }
      };

      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }, [key]);

  return [value, setValue];
}
