import { MouseEventHandler, useState } from "react";
import useNow from "../../hooks/useNow";

interface Day {
  id: number;
  shorthand: string;
  name: string;
}

const daysOfWeek: Day[] = [
  {
    id: 0,
    shorthand: "Su",
    name: "Sunday",
  },
  {
    id: 1,
    shorthand: "M",
    name: "Monday",
  },
  {
    id: 2,
    shorthand: "Tu",
    name: "Tuesday",
  },
  {
    id: 3,
    shorthand: "W",
    name: "Wednesday",
  },
  {
    id: 4,
    shorthand: "Th",
    name: "Thursday",
  },
  {
    id: 5,
    shorthand: "F",
    name: "Friday",
  },
  {
    id: 6,
    shorthand: "Sa",
    name: "Saturday",
  },
];

interface DayButtonProps {
  shorthand: string;
  onDayClick: MouseEventHandler<HTMLButtonElement>;
  isCurrentDay: boolean;
}

function DayButton({ shorthand, onDayClick, isCurrentDay }: DayButtonProps) {
  const buttonJSX = (
    <button
      className="bg-slate-100 w-7 h-8 rounded-md shadow-md"
      onClick={onDayClick}
    >
      {shorthand}
    </button>
  );

  if (isCurrentDay) {
    return (
      <div className="flex flex-col gap-y-2 items-center">
        {buttonJSX}
        <div className="bg-gray-800 size-2 rounded-full" />
      </div>
    );
  }

  return <>{buttonJSX}</>;
}

function DayOfWeekPicker() {
  const [selected, setSelected] = useState<Day[]>([]);
  const currentDay = useNow(1, "day");

  let selectedShorthandsString: string;
  const selectedIdsArray = selected.map((sDay) => sDay.id);
  if (selectedIdsArray.length === 0) {
    selectedShorthandsString = "No days";
  } else if (selectedIdsArray.toString() === [0, 1, 2, 3, 4, 5, 6].toString()) {
    selectedShorthandsString = "Every day";
  } else if (selectedIdsArray.toString() === [1, 2, 3, 4, 5].toString()) {
    selectedShorthandsString = "Weekdays";
  } else if (selectedIdsArray.toString() === [0, 6].toString()) {
    selectedShorthandsString = "Weekends";
  } else {
    selectedShorthandsString = selected.map((sDay) => sDay.shorthand).join(" ");
  }

  const handleDayClick = (id: number) => {
    const day = daysOfWeek.find((day) => day.id === id) as Day;

    const findDayInSelected = (sDay: Day) => {
      return sDay.id === day.id;
    };

    if (selected.some(findDayInSelected)) {
      setSelected(selected.filter((sDay) => !findDayInSelected(sDay)));
    } else {
      const sorted = [...selected, day].sort((a, b) => {
        return a.id - b.id;
      });
      setSelected(sorted);
    }
  };

  return (
    <div className="inline-flex flex-col items-center">
      <ol className="flex gap-x-1">
        {daysOfWeek.map((day) => (
          <DayButton
            shorthand={day.shorthand}
            onDayClick={() => handleDayClick(day.id)}
            key={day.id}
            isCurrentDay={day.id === currentDay.getDay()}
          />
        ))}
      </ol>
      <span className="text-gray-500">{selectedShorthandsString} selected</span>
      {/* <br />
      <span>{JSON.stringify(selected)} selected</span> */}
    </div>
  );
}

export default DayOfWeekPicker;
