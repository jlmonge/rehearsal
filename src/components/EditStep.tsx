import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { Step } from "../types/features";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { useAutosizeTextArea } from "../hooks/useAutosizeTextArea";
import TextArea from "./ui/TextArea";

interface EditStepProps {
  step: Step;
  handleDeleteStep: (argPos: number) => void;
  handleUpdateStep: (argStep: Step) => void;
}

function EditStep({ step, handleDeleteStep, handleUpdateStep }: EditStepProps) {
  const [isEditingText, setIsEditingText] = useState(false);
  const [textInput, setTextInput] = useState(step.text);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef, textInput, isEditingText);

  const handleClickOutsideWhileEditing = () => {
    setIsEditingText(false);
    console.log("you clicked outside while editing");
  };

  const handleStartEditing = () => {
    setIsEditingText(true);
    // inputRef.current?.focus();
  };

  useOnClickOutside(textAreaRef, handleClickOutsideWhileEditing);

  const handleSetTextInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(`input is changing: ${e.target.value}`);
    setTextInput(e.target.value);
  };

  const handleInputEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key;

    if (key === "Enter") {
      e.preventDefault();
      const trimmedTextInput = textInput.trim();
      console.log(textInput, trimmedTextInput);

      if (trimmedTextInput) {
        console.log(`passed condition ${trimmedTextInput}`);
        handleUpdateStep({ ...step, text: trimmedTextInput });
        setIsEditingText(false);
      }
    }
  };

  return (
    <li className="group flex items-center gap-4 max-w-sm">
      <span className="flex items-center justify-center bg-zinc-300 rounded-full w-8 h-8 group-hover:bg-zinc-400 group-hover:text-zinc-50">
        {step.pos}
      </span>

      {isEditingText ? (
        <TextArea
          value={textInput}
          onChange={handleSetTextInput}
          onKeyDown={(e) => handleInputEnter(e)}
          ref={textAreaRef}
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
