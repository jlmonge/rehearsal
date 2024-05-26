// import { useState } from "react";

interface HeaderProps {
  isEditingView: boolean;
  handleOpenSidebar: () => void;
  handleOpenSettings: () => void;
  handleOpenEditingView: () => void;
}

function Header({
  handleOpenSidebar,
  handleOpenSettings,
  handleOpenEditingView,
  isEditingView,
}: HeaderProps) {
  // const [title, setTitle] = useState();

  return (
    <header className="relative top-0">
      <div className="flex flex-grow">
        <button
          className="shadow-md px-2"
          onClick={handleOpenSidebar}
        >
          Open the sidebar!
        </button>
        <h1 className="flex items-center shadow-md">
          <input
            type="text"
            className="bg-gray-200 px-1"
            placeholder="Rehearsal name"
          />
        </h1>
        <div className="flex flex-row flex-1 px-2 py-4 shadow-md">
          <button onClick={handleOpenSettings}>Settings</button>
        </div>
        <div className="flex flex-row flex-1 px-2 py-4 shadow-md">
          <button onClick={handleOpenEditingView}>
            {!isEditingView ? "Edit" : "Save"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
