// import { useState } from "react";

import { ChangeEvent } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface HeaderProps {
  isEditingView: boolean;
  handleOpenSidebar: () => void;
  handleOpenCloseSettings: () => void;
  handleOpenEditingView: () => void;
}

function Header({
  handleOpenSidebar,
  handleOpenCloseSettings,
  handleOpenEditingView,
  isEditingView,
}: HeaderProps) {
  const [title, setTitle] = useLocalStorage("title", "");

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => [
    setTitle(e.target.value),
  ];

  return (
    <header className="relative top-0">
      <div className="flex flex-grow">
        <button
          className="shadow-md px-2"
          onClick={handleOpenSidebar}
        >
          Open the sidebar!
        </button>
        <h1 className="flex items-center shadow-md px-2">
          <input
            type="text"
            className="bg-gray-200 px-1 overflow-ellipsis"
            placeholder="Rehearsal name"
            onChange={handleChangeTitle}
            value={title}
          />
        </h1>
        <div className="flex flex-row flex-1 px-2 py-4 shadow-md">
          <button onClick={handleOpenCloseSettings}>Settings</button>
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
