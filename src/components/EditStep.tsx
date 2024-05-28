import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { Step } from "../types/features";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { useAutosizeTextArea } from "../hooks/useAutosizeTextArea";
import TextArea from "./ui/TextArea";
import { cn } from "../utils/cn";

interface EditStepProps {
  step: Step;
  isEditingView: boolean;
  handleDeleteStep: (argPos: number) => void;
  handleUpdateStep: (argStep: Step) => void;
  currentStep: number;
}

function EditStep({
  step,
  isEditingView,
  handleDeleteStep,
  handleUpdateStep,
  currentStep,
}: EditStepProps) {
  const [isEditingText, setIsEditingText] = useState(false);
  const [textInput, setTextInput] = useState(step.text);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textAreaClickOutsideRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef, textInput, isEditingText);
  useAutosizeTextArea(textAreaClickOutsideRef, textInput, isEditingText);

  const handleClickOutsideWhileEditing = () => {
    setIsEditingText(false);
  };

  const handleStartEditing = () => {
    setIsEditingText(true);
    // inputRef.current?.focus();
  };

  useOnClickOutside(textAreaClickOutsideRef, handleClickOutsideWhileEditing);

  const handleSetTextInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
  };

  const handleInputEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key;

    if (key === "Enter") {
      e.preventDefault();
      const trimmedTextInput = textInput.trim();

      if (trimmedTextInput) {
        handleUpdateStep({ ...step, text: trimmedTextInput });
        setIsEditingText(false);
      }
    }
  };

  let stepTextRegion = (
    <TextArea
      value={textInput}
      onChange={handleSetTextInput}
      onKeyDown={(e) => handleInputEnter(e)}
      ref={textAreaRef}
    />
  );

  if (!isEditingView) {
    stepTextRegion = isEditingText ? (
      <TextArea
        value={textInput}
        onChange={handleSetTextInput}
        onKeyDown={(e) => handleInputEnter(e)}
        ref={isEditingView ? textAreaRef : textAreaClickOutsideRef}
        autoFocus
      />
    ) : (
      <span
        className={cn("flex-1 overflow-anywhere p-1", {
          "text-3xl transition-all duration-500": step.pos === currentStep + 1,
          // "line-through": step.pos < currentStep + 1,
        })}
        onDoubleClick={handleStartEditing}
      >
        {step.text}
      </span>
    );
  }

  let stepDelete;

  if (isEditingView) {
    stepDelete = (
      <button
        className="text-slate-500 text-lg px-1 select-none"
        onClick={() => handleDeleteStep(step.pos)}
      >
        X
      </button>
    );
  }

  return (
    <li
      className={cn(
        "group flex items-center gap-4 max-w-sm transition-opacity",
        {
          "opacity-70": currentStep + 1 > step.pos,
        }
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center bg-zinc-300 rounded-full w-8 h-8 group-hover:bg-zinc-400 group-hover:text-zinc-50",
          {
            "bg-green-400 group-hover:bg-green-500": currentStep + 1 > step.pos,
          }
        )}
      >
        {step.pos}
      </span>
      {stepTextRegion}
      {stepDelete}
      {/* <span>{isEditingText.toString()}</span> */}
    </li>
  );
}

export default EditStep;
