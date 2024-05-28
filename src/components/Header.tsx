// import { useState } from "react";

import { ChangeEvent } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface HeaderProps {
  isEditingView: boolean;
  isOpenSidebar: boolean;
  handleOpenSidebar: () => void;
  handleOpenCloseSettings: () => void;
  handleOpenEditingView: () => void;
}

function Header({
  handleOpenSidebar,
  handleOpenCloseSettings,
  handleOpenEditingView,
  isEditingView,
  isOpenSidebar,
}: HeaderProps) {
  const [title, setTitle] = useLocalStorage("title", "");

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => [
    setTitle(e.target.value),
  ];

  return (
    <header className="relative top-0 z-20 max-w-full">
      <div className="flex flex-1">
        <button
          className="shadow-md px-2"
          onClick={handleOpenSidebar}
        >
          {!isOpenSidebar ? "Open" : "Close"} menu
        </button>
        <h1 className="flex flex-1 items-center shadow-md px-2">
          <input
            type="text"
            className="bg-gray-200 px-1 overflow-ellipsis"
            placeholder="Rehearsal name"
            onChange={handleChangeTitle}
            value={title}
          />
        </h1>
        {isEditingView && (
          <button
            onClick={handleOpenCloseSettings}
            className="flex items-center justify-center px-2 py-4 shadow-md min-w-16"
          >
            Settings
          </button>
        )}

        <button
          onClick={handleOpenEditingView}
          className="flex items-center justify-center flex-row px-2 py-4 shadow-md min-w-16"
        >
          {!isEditingView ? "Edit" : "Save"}
        </button>
      </div>
    </header>
  );
}

export default Header;
