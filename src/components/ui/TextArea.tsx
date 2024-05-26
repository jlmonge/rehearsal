import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ className, ...props }, ref) {
    return (
      <>
        <textarea
          className={cn(
            "flex-1 resize-none p-1 border-slate-400 border-b-2 focus:outline-none no-scrollbar",
            className
          )}
          autoFocus
          rows={1}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);

export default TextArea;
