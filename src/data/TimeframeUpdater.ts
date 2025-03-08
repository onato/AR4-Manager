import Timeframe from "./Timeframe";

export interface UpdateResult {
  success: boolean;
  timeframes: Timeframe[];
}

export const updateTimeframes = (prevTimeframes: Timeframe[], updatedItem: Timeframe): UpdateResult => {
  const index = prevTimeframes.findIndex((item) => item.id === updatedItem.id);
  const wasAdded = index === -1;
  if (
    wasAdded &&
    updatedItem?.enabled &&
    prevTimeframes.filter((t) => t.enabled).length >= 6
  ) {
    return { success: false, timeframes: prevTimeframes };
  }
  if (index !== -1) {
    const newTimeframes = [...prevTimeframes];
    newTimeframes[index] = updatedItem;
    return { success: true, timeframes: newTimeframes };
  }
  return { success: true, timeframes: [...prevTimeframes, updatedItem] };
};

export const deleteTimeframe = (prevTimeframes: Timeframe[], id: string): Timeframe[] => {
  const updatedTimeframes = prevTimeframes.filter((item) => item.id !== id);
  return updatedTimeframes.map((item, index) => ({
    ...item,
    id: index.toString(),
  }));
};
