import { RefObject, useEffect } from "react";

export function useAutosizeTextArea(
  ref: RefObject<HTMLTextAreaElement>,
  value: string
) {
  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.style.height = "auto";
      const scrollHeight = node.scrollHeight;

      node.style.height = scrollHeight + "px";
    }
  }, [ref, value]);
}
