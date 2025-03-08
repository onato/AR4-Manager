import { formatTimeframe } from '../../src/data/Timeframe';

describe('formatTimeframe', () => {
  it('should return "19:00 - 06:00" for "Tier1 Day" protocol', () => {
    const timeframe = {
      id: '1',
      protocol: 'Tier1 Day',
      start_hour: 0,
      start_minute: 0,
      end_hour: 0,
      end_minute: 0,
      enabled: true,
    };
    expect(formatTimeframe(timeframe)).toBe('19:00 - 06:00');
  });

  it('should return "20:00 - 10:00" for "Tier1 Night" protocol', () => {
    const timeframe = {
      id: '2',
      protocol: 'Tier1 Night',
      start_hour: 0,
      start_minute: 0,
      end_hour: 0,
      end_minute: 0,
      enabled: true,
    };
    expect(formatTimeframe(timeframe)).toBe('20:00 - 10:00');
  });

  it('should format timeframe correctly for default protocol', () => {
    const timeframe = {
      id: '3',
      protocol: 'Custom',
      start_hour: 9,
      start_minute: 30,
      end_hour: 17,
      end_minute: 45,
      enabled: true,
    };
    expect(formatTimeframe(timeframe)).toBe('09:30 - 17:45');
  });
});
