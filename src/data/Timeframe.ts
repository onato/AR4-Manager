export default interface Timeframe {
  id: string;
  protocol: string;
  start_hour: number;
  start_minute: number;
  end_hour: number;
  end_minute: number;
  enabled: boolean;
}

export function formatTimeframe(timeframe: Timeframe): string {
  switch (timeframe.protocol) {
    case "Tier1 Day":
      return "19:00 - 06:00";
    case "Tier1 Night":
      return "20:00 - 10:00";
    default: {
      const startHour = timeframe.start_hour.toString().padStart(2, "0");
      const startMinute = timeframe.start_minute.toString().padStart(2, "0");
      const endHour = timeframe.end_hour.toString().padStart(2, "0");
      const endMinute = timeframe.end_minute.toString().padStart(2, "0");

      return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
    }
  }
}
