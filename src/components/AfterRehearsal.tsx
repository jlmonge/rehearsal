import Backdrop from "./ui/Backdrop";

interface AfterRehearsalProps {
  handleClose: () => void;
}

function AfterRehearsal({ handleClose }: AfterRehearsalProps) {
  console.log("test");
  return (
    <Backdrop className="flex justify-center items-center">
      <div className="flex flex-col h-1/3 w-2/3 bg-slate-300">
        <div className="p-2 bg-slate-200">
          <h2 className="text-lg text-gray-900">Congratuations!</h2>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 gap-x-1 justify-between">
            <button
              className="flex-1 hover:bg-gray-200 transition-colors"
              onClick={handleClose}
            >
              Return to rehearsal
            </button>
            <button className="flex-1 hover:bg-gray-200 transition-colors">
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}

export default AfterRehearsal;
