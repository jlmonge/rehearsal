import { KeyboardEvent, useRef, useState } from "react";
import { Step } from "../types/features";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

interface EditStepProps {
  step: Step;
  handleDeleteStep: (argPos: number) => void;
  handleUpdateStep: (argStep: Step) => void;
}

function EditStep({ step, handleDeleteStep, handleUpdateStep }: EditStepProps) {
  const [isEditingText, setIsEditingText] = useState(false);
  const [textInput, setTextInput] = useState(step.text);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickOutsideWhileEditing = () => {
    setIsEditingText(false);
    console.log("you clicked outside while editing");
  };

  const handleStartEditing = () => {
    setIsEditingText(true);
    // inputRef.current?.focus();
  };

  useOnClickOutside(inputRef, handleClickOutsideWhileEditing);

  const handleInputEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    if (textInput.trim() && key === "Enter") {
      handleUpdateStep({ ...step, text: textInput });
      setIsEditingText(false);
    }
  };

  return (
    <li className="flex items-center gap-4 max-w-sm">
      <span>{step.pos}</span>

      {isEditingText ? (
        <input
          // TODO 2: component-ize repeating logic
          className="flex-1"
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyUp={(e) => handleInputEnter(e)}
          ref={inputRef}
          autoFocus
        />
      ) : (
        <span
          className="flex-1"
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
