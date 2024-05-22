import { KeyboardEvent, useState } from "react";
// import "./assets/App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Step } from "./types/features";
import EditStep from "./components/EditStep";
import Settings from "./components/Settings";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  const [stepInput, setStepInput] = useLocalStorage("input", "");
  const [steps, setSteps] = useLocalStorage("steps", [] as Step[]);

  const handleOpenSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const handleAddStep = (argStep: Step) => {
    setSteps([...steps, argStep]);
  };

  const handleInputEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    if (stepInput.trim() && key === "Enter") {
      handleAddStep({ text: stepInput, pos: steps.length + 1 });
      setStepInput("");
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

  const handleOpenSettings = () => {
    setIsOpenSettings(!isOpenSettings);
    console.log(`settings open? ${isOpenSettings.toString()}`);
  };

  return (
    <div className="flex">
      {isOpenSidebar && <Sidebar />}
      {isOpenSettings && <Settings />}
      <div className="w-full">
        <Header
          handleOpenSidebar={handleOpenSidebar}
          handleOpenSettings={handleOpenSettings}
        />
        <main className="flex flex-col gap-4 p-4">
          <h1 className="text-xl">Rehearsal 1</h1>

          <input
            // TODO 2: component-ize repeating logic
            type="text"
            placeholder="Next up..."
            className="bg-slate-100 focus:bg-white focus:border-slate-400 transition-colors outline-none border-b-2 p-1 max-w-screen-sm"
            value={stepInput}
            onChange={(e) => setStepInput(e.target.value)}
            onKeyUp={(e) => handleInputEnter(e)}
            // TODO: add required, unstyle
          />
          <div>
            <ul className="flex flex-col-reverse gap-2">
              {steps?.map((step) => (
                <EditStep
                  key={step.pos}
                  step={step}
                  handleDeleteStep={handleDeleteStep}
                  handleUpdateStep={handleUpdateStep}
                />
              ))}
            </ul>
            <span className="overflow-anywhere">
              debug: {JSON.stringify(steps)}
            </span>
          </div>
          <span>Double click to edit step</span>
        </main>
      </div>
    </div>
  );
}

export default App;
