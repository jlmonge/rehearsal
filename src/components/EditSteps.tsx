import EditStep from "./EditStep";
import { type Step } from "../types/features";

interface EditStepsProps {
  steps: Step[];
  onDeleteStep: (argStep: Step) => void;
}

function EditSteps({ steps }: EditStepsProps) {
  return (
    <div>
      <ul>
        {steps?.map((step) => (
          <EditStep step={step} />
        ))}
      </ul>
    </div>
  );
}

export default EditSteps;
