import { useEffect, useState } from "react";

function getStorageValue<T>(key: string, defaultValue: T) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
}

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
