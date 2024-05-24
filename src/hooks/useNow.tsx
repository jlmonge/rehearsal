type TimeUnit = "day" | "hour" | "minute" | "second";

import { useEffect, useState } from "react";

function getDateUnit(date: Date, unit: TimeUnit) {
  switch (unit) {
    case "day":
      return date.getDate();
    case "hour":
      return date.getHours();
    case "minute":
      return date.getMinutes();
    case "second":
      return date.getSeconds();
  }
}

function useNow(frequency: number, unit: TimeUnit) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const newNow = new Date();
      const diff = getDateUnit(newNow, unit) - getDateUnit(now, unit);

      if (diff >= frequency) {
        setNow(newNow);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [frequency, unit]);

  return now;
}

export default useNow;
