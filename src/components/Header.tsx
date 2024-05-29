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
    <header className="relative top-0 z-20 max-w-full text-sm sm:text-base">
      <div className="flex flex-1 shadow-md justify-stretch h-16">
        <button
          className="shadow-md px-2"
          onClick={handleOpenSidebar}
        >
          {!isOpenSidebar ? "Open" : "Close"} menu
        </button>
        <h1 className="flex items-center shadow-md px-2">
          <input
            type="text"
            className="bg-gray-200 px-1 overflow-ellipsis w-full min-w-20 max-w-36"
            placeholder="Untitled rehearsal"
            onChange={handleChangeTitle}
            value={title}
          />
        </h1>
        {/* other buttons go here */}
        <div className="flex flex-row flex-1 justify-end">
          <button className="flex items-center justify-center px-2 py-4 shadow-md sm:min-w-16">
            Help
          </button>
          {isEditingView && (
            <button
              onClick={handleOpenCloseSettings}
              className="flex items-center justify-center px-2 py-4 shadow-md sm:min-w-16"
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
      </div>
    </header>
  );
}

export default Header;
