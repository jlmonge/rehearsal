import { Step } from "../types/features";

interface EditStepProps {
  step: Step;
}

function EditStep({ step }: EditStepProps) {
  return (
    <li className="flex">
      <span>{step.pos}</span>
      <span>{step.text}</span>
    </li>
  );
}

export default EditStep;
