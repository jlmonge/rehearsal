// import { useState } from 'react';
import DayOfWeekPicker from "./ui/DayOfWeekPicker";
import Switch from "./ui/Switch";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Day } from "../types/features";
import { useRef, useState } from "react";
import { DAYS_OF_WEEK } from "../utils/variables";

function Settings() {
  const [daysOfWeek, setDaysOfWeek] = useLocalStorage<Day[]>("daysOfWeek", []);
  const prevDaysOfWeek = useRef<Day[]>([]);
  const [isDaily, setIsDaily] = useState(true);

  const handleCheckedChange = () => {
    const newIsDaily = !isDaily;
    setIsDaily(!isDaily);
    // if going from not daily to daily (checking), save daysOfWeek to ref because we will be setting daysOfWeek to all days.
    // else, going from daily to not daily (unchecking), so restore localStorage
    if (newIsDaily) {
      setDaysOfWeek(DAYS_OF_WEEK);
      prevDaysOfWeek.current = daysOfWeek;
    } else {
      setDaysOfWeek(prevDaysOfWeek.current);
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 h-48 bg-slate-300">
      <button className="absolute right-0 top-0">X</button>
      <div className="flex flex-col gap-y-4">
        <h2>Settings</h2>
        <div className="flex flex-col gap-y-2 max-w-fit">
          <div className="flex gap-x-2">
            <label
              htmlFor="daily"
              className="max-w-12"
            >
              Daily
            </label>
            <Switch
              id="daily"
              checked={isDaily}
              onCheckedChange={handleCheckedChange}
            />
          </div>
          {!isDaily && (
            <DayOfWeekPicker
              selected={daysOfWeek}
              onSelect={setDaysOfWeek}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
