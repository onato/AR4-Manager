import { updateTimeframes, deleteTimeframe } from "@/data/TimeframeUpdater";

describe("TimeframeUpdater", () => {
  const createTimeframe = (id: number, enabled = true) => ({
    id: id.toString(),
    protocol: "High",
    start_hour: 12,
    start_minute: 0,
    end_hour: 13,
    end_minute: 0,
    enabled,
  });

  test("should add a new timeframe", () => {
    const prevTimeframes = [createTimeframe(1)];
    const newTimeframe = createTimeframe(2);

    const { success, timeframes } = updateTimeframes(
      prevTimeframes,
      newTimeframe,
    );

    expect(success).toBe(true);
    expect(timeframes).toHaveLength(2);
    expect(timeframes[1]).toEqual(newTimeframe);
  });

  test("should update an existing timeframe", () => {
    const prevTimeframes = Array.from({ length: 6 }, (_, i) =>
      createTimeframe(i + 1),
    );
    const updatedTimeframe = { ...createTimeframe(1), protocol: "Low" };

    const { success, timeframes } = updateTimeframes(
      prevTimeframes,
      updatedTimeframe,
    );

    expect(success).toBe(true);
    expect(timeframes).toHaveLength(6);
    expect(timeframes[0].protocol).toBe("Low");
  });

  test("should not add more than 6 enabled timeframes", () => {
    const prevTimeframes = Array.from({ length: 6 }, (_, i) =>
      createTimeframe(i + 1),
    );
    const newTimeframe = createTimeframe(7);

    const { success, timeframes } = updateTimeframes(
      prevTimeframes,
      newTimeframe,
    );

    expect(success).toBe(false);
    expect(timeframes).toHaveLength(6);
  });

  test("should allow adding timeframe if 6 but less are enabled", () => {
    const prevTimeframes = Array.from({ length: 6 }, (_, i) =>
      createTimeframe(i + 1, i % 2 === 0),
    );
    const newTimeframe = createTimeframe(7, false);

    const { success, timeframes } = updateTimeframes(
      prevTimeframes,
      newTimeframe,
    );

    expect(success).toBe(true);
    expect(timeframes).toHaveLength(7);
  });

  test("should delete a timeframe", () => {
    const prevTimeframes = [createTimeframe(1), createTimeframe(2)];

    const updatedTimeframes = deleteTimeframe(prevTimeframes, "1");

    expect(updatedTimeframes).toHaveLength(1);
    expect(updatedTimeframes[0].id).toBe("0");
  });
});
