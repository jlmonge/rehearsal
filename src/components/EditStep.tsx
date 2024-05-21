import { Step } from "../types/features";

interface EditStepProps {
  step: Step;
  handleDeleteStep: (argPos: number) => void;
}

function EditStep({ step, handleDeleteStep }: EditStepProps) {
  return (
    <li
      className="flex"
      onDoubleClick={() => handleDeleteStep(step.pos)}
    >
      <span>{step.pos}</span>
      <span>{step.text}</span>
    </li>
  );
}

export default EditStep;
