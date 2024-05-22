interface HeaderProps {
  handleOpenSidebar: () => void;
  handleOpenSettings: () => void;
}

function Header({ handleOpenSidebar, handleOpenSettings }: HeaderProps) {
  return (
    <header className="relative top-0">
      <div className="flex flex-row">
        <button onClick={handleOpenSidebar}>Open the sidebar!</button>
        <p>Purpose of page!</p>
        <div className="flex flex-row flex-1">
          <button
            className="flex-1"
            onClick={handleOpenSettings}
          >
            Settings
          </button>
          <button className="flex-1">Save</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
