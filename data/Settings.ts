import Timesframe from "./Timeframe";

export interface Settings {
  timeframes: Timesframe[];
  gpsMode: number;
  survey: string;
  station: number;
}
