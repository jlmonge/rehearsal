// import { useState } from 'react';
import DayOfWeekPicker from "./ui/DayOfWeekPicker";
import Switch from "./ui/Switch";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Day } from "../types/features";
import { useRef, useState } from "react";
import { DAYS_OF_WEEK } from "../utils/variables";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import Backdrop from "./ui/Backdrop";

// function shuffleArray<T>(array: T[]) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// }

interface SettingsProps {
  handleOpenClose: () => void;
}

function Settings({ handleOpenClose }: SettingsProps) {
  const [daysOfWeek, setDaysOfWeek] = useLocalStorage<Day[]>("daysOfWeek", []);
  const [isRandomized, setIsRandomized] = useLocalStorage(
    "isRandomized",
    false
  );
  const prevDaysOfWeek = useRef<Day[]>([]);
  const [isDaily, setIsDaily] = useState(() => daysOfWeek.length === 7);
  const settingsRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(settingsRef, handleOpenClose);

  const handleDailyCheckedChange = () => {
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

  const handleRandomizedCheckedChange = () => {
    setIsRandomized(!isRandomized);
  };

  return (
    <Backdrop className="flex justify-center items-center">
      <div
        className="absolute h-2/3 w-2/3 bg-slate-300"
        ref={settingsRef}
      >
        <button
          className="absolute size-8 right-[0.5px] top-[0.5px] text-lg p-4 hover:bg-slate-500 rounded-full transition-colors"
          onClick={handleOpenClose}
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            X
          </span>
        </button>
        <div className="flex flex-col h-full">
          <div className="p-2 bg-slate-200">
            <h2 className="text-lg text-gray-900">Settings</h2>
          </div>

          <div className="flex flex-col gap-y-2 px-2 mt-2 overflow-y-auto">
            <div className="max-w-fit space-y-2">
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
                  onCheckedChange={handleDailyCheckedChange}
                />
              </div>
              {!isDaily && (
                <DayOfWeekPicker
                  selected={daysOfWeek}
                  onSelect={setDaysOfWeek}
                />
              )}
            </div>
            <div>
              <label htmlFor="random">Random order</label>
              <Switch
                id="random"
                checked={isRandomized}
                onCheckedChange={handleRandomizedCheckedChange}
              />
            </div>
          </div>
        </div>
      </div>
    </Backdrop>
  );
}

export default Settings;
