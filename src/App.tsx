import { KeyboardEvent, useRef, useState } from "react";
// import "./assets/App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Step } from "./types/features";
import EditStep from "./components/EditStep";
import Settings from "./components/Settings";
import { useLocalStorage } from "./hooks/useLocalStorage";
import TextArea from "./components/ui/TextArea";
import { useAutosizeTextArea } from "./hooks/useAutosizeTextArea";

function App() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  const [stepInput, setStepInput] = useLocalStorage("input", "");
  const [currentStep, setCurrentStep] = useLocalStorage("currentStep", 0);
  const [steps, setSteps] = useLocalStorage("steps", [] as Step[]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isEditingView, setIsEditingView] = useState(false);

  useAutosizeTextArea(textAreaRef, stepInput);

  const handleClearSteps = () => setSteps([]);

  const handleOpenSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const handleOpenEditingView = () => {
    setIsEditingView(!isEditingView);
  };

  const handleAddStep = (argStep: Step) => {
    setSteps([...steps, argStep]);
  };

  const handleInputEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key;
    const trimmedStepInput = stepInput.trim();

    if (key === "Enter") {
      e.preventDefault();
      if (trimmedStepInput) {
        setStepInput("");
        handleAddStep({ text: trimmedStepInput, pos: steps.length + 1 });
      } else {
        setStepInput(trimmedStepInput);
      }
    }
  };

  const handleUpdateStep = (argStep: Step) => {
    const newSteps = steps.map((step) => {
      if (step.pos === argStep.pos) {
        return argStep;
      }
      return step;
    });
    setSteps(newSteps);
  };

  const handleDeleteStep = (argPos: number) => {
    const newSteps = steps.flatMap((step) => {
      const { pos } = step;
      if (pos === argPos) {
        return [];
      }
      return pos < argPos ? step : { ...step, pos: pos - 1 };
    });
    setSteps(newSteps);
  };

  const handleOpenCloseSettings = () => {
    setIsOpenSettings(!isOpenSettings);
    console.log(`settings open? ${isOpenSettings.toString()}`);
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="flex">
      {isOpenSidebar && <Sidebar />}
      {isOpenSettings && <Settings handleOpenClose={handleOpenCloseSettings} />}
      <div className="w-full">
        <Header
          handleOpenSidebar={handleOpenSidebar}
          handleOpenCloseSettings={handleOpenCloseSettings}
          isEditingView={isEditingView}
          handleOpenEditingView={handleOpenEditingView}
        />
        <main className="flex flex-col gap-4 p-4 items-start">
          {isEditingView ? (
            <TextArea
              placeholder={
                steps.length
                  ? "Next up..."
                  : "Enter your first step to get started"
              }
              className="bg-slate-50 focus:bg-white focus:border-slate-400 transition-colors outline-none border-slate-300 border-b-2 p-1 w-full max-w-screen-sm"
              value={stepInput}
              onChange={(e) => setStepInput(e.target.value)}
              onKeyDown={(e) => handleInputEnter(e)}
              ref={textAreaRef}
              autoFocus
            />
          ) : (
            <div className="flex">
              <button onClick={handlePrevStep}>Previous</button>
              <button onClick={handleNextStep}>Next</button>
              {currentStep === steps.length && <p>You finished</p>}
            </div>
          )}

          <ul className="flex flex-col-reverse gap-2 w-full">
            {steps?.map((step) => (
              <EditStep
                key={step.pos}
                step={step}
                handleDeleteStep={handleDeleteStep}
                handleUpdateStep={handleUpdateStep}
                isEditingView={isEditingView}
                currentStep={currentStep}
              />
            ))}
          </ul>
          <p className="overflow-anywhere">debug: currentStep: {currentStep}</p>
          <p className="overflow-anywhere">debug: {JSON.stringify(steps)}</p>
          <span>Double click to edit step</span>
          <button onClick={handleClearSteps}>Click to clear steps</button>
        </main>
      </div>
    </div>
  );
}

export default App;
