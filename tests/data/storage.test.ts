import { saveSettings, loadSettings } from "@/data/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Settings } from "@/data/Settings";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe("Storage Tests", () => {
  const mockSettings: Settings = {
    timeframes: [],
    gpsMode: 1,
    survey: "testSurvey",
    station: 123,
  };

  beforeEach(() => {
    mockedAsyncStorage.setItem.mockClear();
    mockedAsyncStorage.getItem.mockClear();
  });

  it("should save settings to AsyncStorage", async () => {
    await saveSettings(mockSettings);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "settings",
      JSON.stringify(mockSettings),
    );
  });

  it("should load settings from AsyncStorage", async () => {
    mockedAsyncStorage.getItem.mockResolvedValueOnce(
      JSON.stringify(mockSettings),
    );
    const loadedSettings = await loadSettings();
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("settings");
    expect(loadedSettings).toEqual(mockSettings);
  });

  it("should handle invalid JSON gracefully", async () => {
    mockedAsyncStorage.getItem.mockResolvedValueOnce("invalid json");
    await expect(loadSettings()).rejects.toThrow(
      /Failed to save settings: Unexpected token.*/,
    );
  });

  it("should handle JSON conversion errors gracefully", async () => {
    const circularReference: any = {};
    circularReference.myself = circularReference;

    await expect(saveSettings(circularReference)).rejects.toThrow(
      "Failed to save settings: Converting circular structure to JSON",
    );
  });
});
