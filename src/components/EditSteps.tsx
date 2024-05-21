import EditStep from "./EditStep";
import { type Step } from "../types/features";

interface EditStepsProps {
  steps: Step[];
  onDeleteStep: (argPos: number) => void;
}

function EditSteps({ steps, onDeleteStep }: EditStepsProps) {
  return (
    <div>
      <ul>
        {steps?.map((step) => (
          <EditStep
            key={step.pos}
            step={step}
            handleDeleteStep={onDeleteStep}
          />
        ))}
      </ul>
    </div>
  );
}

export default EditSteps;
