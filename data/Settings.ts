import Timeframe from "./Timeframe";

export interface Settings {
  timeframes: Timeframe[];
  gpsMode: number;
  survey: string;
  station: number;
}
