import Switch from "./ui/Switch";

const settingsLabels: { id: string; name: string }[] = [
  {
    id: "daily",
    name: "Daily",
  },
  {
    id: "allday",
    name: "All day",
  },
];

function Settings() {
  return (
    <div className="fixed bottom-0 inset-x-0 h-48 bg-slate-300">
      <h2>current rehearsal settings</h2>
      {settingsLabels.map(({ id, name }) => (
        <div>
          <label htmlFor={id}>{name}</label>
          <Switch id={id} />
        </div>
      ))}
    </div>
  );
}

export default Settings;
