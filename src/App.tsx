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

    if (currentStep !== 0 && argPos - 1 < currentStep) {
      setCurrentStep(currentStep - 1);
    }
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
    <div className="flex h-full">
      {isOpenSidebar && <Sidebar />}
      {isOpenSettings && <Settings handleOpenClose={handleOpenCloseSettings} />}
      <div className="flex flex-col w-full h-full">
        <Header
          handleOpenSidebar={handleOpenSidebar}
          handleOpenCloseSettings={handleOpenCloseSettings}
          handleOpenEditingView={handleOpenEditingView}
          isEditingView={isEditingView}
          isOpenSidebar={isOpenSidebar}
        />
        <div className="relative flex-1 overflow-y-auto">
          <main className="flex flex-col gap-4 py-4 px-2 sm:px-4 items-start">
            {isEditingView && (
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
            )}
            {steps.length > 0 && currentStep === steps.length && (
              <p>You finished</p>
            )}
            {!isEditingView && (
              <div className="border-l-2 px-1 border-gray-300 fixed right-4 top-1/2 -translate-y-1/2 flex flex-col justify-between z-20">
                <button
                  onClick={handleNextStep}
                  className="hover:bg-gray-400 transition-colors size-16 rounded-full"
                >
                  Next
                </button>
                <button
                  onClick={handlePrevStep}
                  className="hover:bg-gray-400 transition-colors size-16 rounded-full"
                >
                  Back
                </button>
              </div>
            )}

            {!!steps.length && (
              <ul className="flex flex-col-reverse gap-1 w-full">
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
            )}

            {/* <p className="overflow-anywhere">debug: currentStep: {currentStep}</p> */}
            {/* <p className="overflow-anywhere">debug: {JSON.stringify(steps)}</p> */}
            <span>Double click to edit step</span>
            <button onClick={handleClearSteps}>Click to clear steps</button>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
