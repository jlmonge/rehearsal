import { KeyboardEvent, useState } from "react";
import { Step } from "../types/features";

interface EditStepProps {
  step: Step;
  handleDeleteStep: (argPos: number) => void;
  handleUpdateStep: (argStep: Step) => void;
}

function EditStep({ step, handleDeleteStep, handleUpdateStep }: EditStepProps) {
  const [isEditingText, setIsEditingText] = useState(false);
  const [textInput, setTextInput] = useState(step.text);

  const handleInputEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    if (textInput.trim() && key === "Enter") {
      handleUpdateStep({ ...step, text: textInput });
      setIsEditingText(false);
    }
  };

  return (
    <li
      className="flex"
      onDoubleClick={() => handleDeleteStep(step.pos)}
    >
      <span>{step.pos}</span>

      {isEditingText ? (
        <input
          // TODO 2: component-ize repeating logic
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyUp={(e) => handleInputEnter(e)}
        />
      ) : (
        <span onClick={() => setIsEditingText(true)}>{step.text}</span>
      )}

      {/* <span>{isEditingText.toString()}</span> */}
    </li>
  );
}

export default EditStep;