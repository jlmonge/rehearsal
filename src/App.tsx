import { KeyboardEvent, useState } from "react";
// import "./assets/App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import EditSteps from "./components/EditSteps";
import { Step } from "./types/features";

function App() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [stepInput, setStepInput] = useState("");
  const [steps, setSteps] = useState<Step[]>([]);

  const handleOpenSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const handleAddStep = (argStep: Step) => {
    setSteps([argStep, ...steps]);
  };

  const handleInputEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    if (stepInput.trim() && key === "Enter") {
      handleAddStep({ text: stepInput, pos: steps.length + 1 });
      setStepInput("");
    }
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

  return (
    <div className="flex">
      {isOpenSidebar && <Sidebar />}
      <div className="w-full">
        <Header onOpenSidebar={handleOpenSidebar} />
        <main>
          <h1 className="text-xl">Rehearsal 1</h1>
          <input
            type="text"
            placeholder="Next up..."
            value={stepInput}
            onChange={(e) => setStepInput(e.target.value)}
            onKeyUp={(e) => handleInputEnter(e)}
            // TODO: add required, unstyle
          />
          <EditSteps
            steps={steps}
            onDeleteStep={handleDeleteStep}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
