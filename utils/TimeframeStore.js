export const defaultTimeframe = () => {
  return [
          { id: "1", protocol: "High", start_hour: 8, start_minute: 0, end_hour: 10, end_minute: 0, enabled: true },
          { id: "2", protocol: "Low", start_hour: 10, start_minute: 0, end_hour: 12, end_minute: 0, enabled: false },
          { id: "3", protocol: "Bat", start_hour: 12, start_minute: 0, end_hour: 14, end_minute: 0, enabled: true },
          { id: "4", protocol: "Tier1 Day", start_hour: 14, start_minute: 0, end_hour: 16, end_minute: 0, enabled: false },
        ];
};

export const defaultNewItem = () => {
  return {
    id: "",
    protocol: "High",
    start_hour: 12,
    start_minute: 0,
    end_hour: 13,
    end_minute: 0,
    enabled: true,
  };
};

