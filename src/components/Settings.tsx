// import { useState } from 'react';
import DayOfWeekPicker from "./ui/DayOfWeekPicker";
import Switch from "./ui/Switch";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Day } from "../types/features";

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
  const [daysOfWeek, setDaysOfWeek] = useLocalStorage<Day[]>("daysOfWeek", []);

  return (
    <div className="fixed bottom-0 inset-x-0 h-48 bg-slate-300">
      <h2>current rehearsal settings</h2>
      {settingsLabels.map(({ id, name }) => (
        <div key={id}>
          <label htmlFor={id}>{name}</label>
          <Switch id={id} />
        </div>
      ))}
      <DayOfWeekPicker
        selected={daysOfWeek}
        onSelect={setDaysOfWeek}
      />
    </div>
  );
}

export default Settings;
