const SIDEBAR_OPTIONS = [
  {
    id: 0,
    name: "Dashboard",
    href: "#",
  },
  {
    id: 1,
    name: "Create rehearsal",
    href: "#",
  },
  {
    id: 2,
    name: "Clear all data",
    href: "#",
  },
];

function Sidebar() {
  return (
    <nav className="sticky bg-gray-100 left-0 inset-y-0 min-w-48 z-40 shadow-md text-gray-600">
      <div className="p-1">
        {SIDEBAR_OPTIONS.map((option) => (
          <div key={option.id}>
            <a
              className="block w-full px-2 py-1 text-left hover:bg-gray-200 transition-colors rounded-md"
              href={option.href}
            >
              {option.name}
            </a>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default Sidebar;
