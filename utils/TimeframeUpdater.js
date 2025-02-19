export const updateTimeframes = (prevTimeframes, updatedItem) => {
  const index = prevTimeframes.findIndex(item => item.id === updatedItem.id);
  const wasAdded = index === -1;
  if (wasAdded && updatedItem && updatedItem.enabled && prevTimeframes.filter(t => t.enabled).length >= 6) {
    return { success: false, timeframes: prevTimeframes };
  }
  if (index !== -1) {
    const newTimeframes = [...prevTimeframes];
    newTimeframes[index] = updatedItem;
    return { success: true, timeframes: newTimeframes };
  }
  return { success: true, timeframes: [...prevTimeframes, updatedItem] };
};

export const deleteTimeframe = (prevTimeframes, id) => {
  const updatedTimeframes = prevTimeframes.filter((item) => item.id !== id);
  return updatedTimeframes.map((item, index) => ({ ...item, id: index.toString() }));
};
