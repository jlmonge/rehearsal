interface HeaderProps {
  onOpenSidebar: () => void;
}

function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <header className="relative top-0">
      <div className="flex flex-row justify-between">
        <button onClick={onOpenSidebar}>Open the sidebar!</button>
        <div className="flex flex-row justify-around flex-1">
          <p>Purpose of page!</p>
          <button>Button!</button>
          <button>Another!</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
