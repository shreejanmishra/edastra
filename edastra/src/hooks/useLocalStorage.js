import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for syncing state with localStorage
 * @param {string} key - The localStorage key
 * @param {any} initialValue - Default value if key doesn't exist
 * @returns {[any, function]} - State value and setter function
 */
export function useLocalStorage(key, initialValue) {
  // Initialize state with value from localStorage or initial value
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Sync to localStorage when value changes
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Memoized setter
  const setValue = useCallback((value) => {
    setStoredValue((prev) => {
      const valueToStore = value instanceof Function ? value(prev) : value;
      return valueToStore;
    });
  }, []);

  return [storedValue, setValue];
}

export default useLocalStorage;
