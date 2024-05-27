import { MouseEventHandler } from "react";
import useNow from "../../hooks/useNow";
import { Day } from "../../types/features";
import { cn } from "../../utils/cn";
import { DAYS_OF_WEEK } from "../../utils/variables";

interface DayButtonProps {
  shorthand: string;
  isCurrentDay: boolean;
  isSelected: boolean;
  onDayClick: MouseEventHandler<HTMLButtonElement>;
}

function DayButton({
  shorthand,
  isCurrentDay,
  isSelected,
  onDayClick,
}: DayButtonProps) {
  const buttonJSX = (
    <button
      className={cn(
        "bg-slate-100 w-7 h-8 rounded-md shadow-md transition-colors",
        {
          "bg-green-400": isSelected,
        }
      )}
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

interface DayOfWeekPickerProps {
  selected: Day[];
  onSelect: (value: Day[]) => void;
}

function DayOfWeekPicker({ selected, onSelect }: DayOfWeekPickerProps) {
  // const [selected, setSelected] = useState<Day[]>([]);
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
    const day = DAYS_OF_WEEK.find((day) => day.id === id) as Day;

    const findDayInSelected = (sDay: Day) => {
      return sDay.id === day.id;
    };

    if (selected.some(findDayInSelected)) {
      onSelect(selected.filter((sDay) => !findDayInSelected(sDay)));
    } else {
      const sorted = [...selected, day].sort((a, b) => {
        return a.id - b.id;
      });
      onSelect(sorted);
    }
  };

  return (
    <div className="inline-flex flex-col items-center">
      <ol className="flex gap-x-1">
        {DAYS_OF_WEEK.map((day) => (
          <DayButton
            key={day.id}
            shorthand={day.shorthand}
            isCurrentDay={day.id === currentDay.getDay()}
            // check if day.id is in selected
            isSelected={!!selected.find((sDay) => sDay.id === day.id)}
            onDayClick={() => handleDayClick(day.id)}
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
