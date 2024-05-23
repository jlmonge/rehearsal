import { MouseEventHandler, useState } from "react";

interface Day {
  id: number;
  shorthand: string;
  name: string;
}

const daysOfWeek: Day[] = [
  {
    id: 0,
    shorthand: "S",
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
}

function DayButton({ shorthand, onDayClick }: DayButtonProps) {
  return <button onClick={onDayClick}>{shorthand}</button>;
}

function DayOfWeekPicker() {
  const [selected, setSelected] = useState<Day[]>([]);

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
    selectedShorthandsString = selected.map((sDay) => sDay.shorthand).join("");
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

    console.log(`you clicked ${id}`);
  };

  return (
    <div>
      <div>
        {daysOfWeek.map((day) => (
          <DayButton
            shorthand={day.shorthand}
            onDayClick={() => handleDayClick(day.id)}
            key={day.id}
          />
        ))}
      </div>
      <span>{selectedShorthandsString} selected</span>
      <br />
      <span>{JSON.stringify(selected)} selected</span>
    </div>
  );
}

export default DayOfWeekPicker;
