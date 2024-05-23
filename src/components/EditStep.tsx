import { KeyboardEvent, useRef, useState } from "react";
import { Step } from "../types/features";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { useAutosizeTextArea } from "../hooks/useAutosizeTextArea";

interface EditStepProps {
  step: Step;
  handleDeleteStep: (argPos: number) => void;
  handleUpdateStep: (argStep: Step) => void;
}

function EditStep({ step, handleDeleteStep, handleUpdateStep }: EditStepProps) {
  const [isEditingText, setIsEditingText] = useState(false);
  const [textInput, setTextInput] = useState(step.text);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(inputRef, textInput, isEditingText);

  const handleClickOutsideWhileEditing = () => {
    setIsEditingText(false);
    console.log("you clicked outside while editing");
  };

  const handleStartEditing = () => {
    setIsEditingText(true);
    // inputRef.current?.focus();
  };

  useOnClickOutside(inputRef, handleClickOutsideWhileEditing);

  const handleInputEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key;

    if (textInput.trim() && key === "Enter") {
      handleUpdateStep({ ...step, text: textInput });
      setIsEditingText(false);
    }
  };

  return (
    <li className="group flex items-center gap-4 max-w-screen-sm">
      <span className="flex items-center justify-center bg-zinc-300 rounded-full w-8 h-8 group-hover:bg-zinc-400 group-hover:text-zinc-50">
        {step.pos}
      </span>

      {isEditingText ? (
        <textarea
          // TODO 2: component-ize repeating logic
          className="flex-1 resize-none p-1 border-slate-400 border-b-2 focus:outline-none no-scrollbar"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyUp={(e) => handleInputEnter(e)}
          ref={inputRef}
          autoFocus
          rows={1}
        />
      ) : (
        <span
          className="flex-1 overflow-anywhere p-1"
          onDoubleClick={handleStartEditing}
        >
          {step.text}
        </span>
      )}

      <button
        className="text-slate-500 text-lg px-1 select-none"
        onClick={() => handleDeleteStep(step.pos)}
      >
        X
      </button>
      {/* <span>{isEditingText.toString()}</span> */}
    </li>
  );
}

export default EditStep;
