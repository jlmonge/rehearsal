import { RefObject, useEffect } from "react";

type ClickEvent = MouseEvent | TouchEvent;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: () => void
) {
  useEffect(() => {
    const handleClick = (e: ClickEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick, true);
    document.addEventListener("touchstart", handleClick, true);

    return () => {
      document.removeEventListener("mousedown", handleClick, true);
      document.removeEventListener("touchstart", handleClick, true);
    };
  }, [ref, callback]);
}
