import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored));
      }
    } catch {
    console.log("error while storing!");
    }
  }, [key]);

  const setStoredValue = (val: T) => {
    try {
      setValue(val);
      window.localStorage.setItem(key, JSON.stringify(val));
    } catch {
        console.log("error while storing!");
    }
  };

  return [value, setStoredValue] as const;
}
