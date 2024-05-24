import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ className, ...props }, ref) {
    return (
      <>
        <textarea
          className={
            className ??
            "flex-1 resize-none p-1 border-slate-400 border-b-2 focus:outline-none no-scrollbar"
          }
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
