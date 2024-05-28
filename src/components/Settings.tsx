// import { useState } from 'react';
import DayOfWeekPicker from "./ui/DayOfWeekPicker";
import Switch from "./ui/Switch";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Day } from "../types/features";
import { useRef, useState } from "react";
import { DAYS_OF_WEEK } from "../utils/variables";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

interface SettingsProps {
  handleOpenClose: () => void;
}

function Settings({ handleOpenClose }: SettingsProps) {
  const [daysOfWeek, setDaysOfWeek] = useLocalStorage<Day[]>("daysOfWeek", []);
  const prevDaysOfWeek = useRef<Day[]>([]);
  const [isDaily, setIsDaily] = useState(() => daysOfWeek.length === 7);
  const settingsRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(settingsRef, handleOpenClose);

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
    <div
      className="fixed p-4 bottom-0 inset-x-0 h-48 bg-slate-300 z-10"
      ref={settingsRef}
    >
      <button
        className="absolute size-12 right-1 top-1 text-xl p-3 hover:bg-slate-400 rounded-full transition-colors"
        onClick={handleOpenClose}
      >
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          X
        </span>
      </button>
      <div className="flex flex-col gap-y-4">
        <h2 className="text-2xl text-gray-900">Settings</h2>
        <div className="flex flex-col gap-y-2 max-w-fit">
          <div className="flex gap-x-2">
            <label
              htmlFor="daily"
              className="w-24 text-gray-700"
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
