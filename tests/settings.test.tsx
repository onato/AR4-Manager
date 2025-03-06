import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useSettingsContext } from "@/data/SettingsContext";
import Tab from "../app/(tabs)/settings";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock("@/data/SettingsContext");

describe("Settings Tab", () => {
  const mockUpdateSettings = jest.fn();
  const mockSettings = {
    gpsMode: 0,
    survey: "INIT_VAL",
    station: 0,
  };

  beforeEach(() => {
    (useSettingsContext as jest.Mock).mockReturnValue({
      settings: mockSettings,
      updateSettings: mockUpdateSettings,
    });
  });

  it("renders correctly", () => {
    const { getByText } = render(<Tab />);
    expect(getByText("GPS Settings")).toBeTruthy();
    expect(getByText("TIER1 Settings")).toBeTruthy();
  });

  it("updates GPS mode", () => {
    const { getByTestId } = render(<Tab />);
    const picker = getByTestId("doc-picker-gps-mode");
    fireEvent(picker, "onValueChange", 1); // Assuming '1' is a valid option
    expect(mockUpdateSettings).toHaveBeenCalledWith({ gpsMode: 0 });
  });

  it("updates survey input", () => {
    const { getByDisplayValue } = render(<Tab />);
    const input = getByDisplayValue("INIT_VAL");
    fireEvent.changeText(input, "NEW_VAL");
    expect(mockUpdateSettings).toHaveBeenCalledWith({ survey: "NEW_VAL" });
  });

  it("updates station", () => {
    const { getByTestId } = render(<Tab />);
    const picker = getByTestId("doc-picker-station");
    fireEvent(picker, "onValueChange", 1); // Assuming '1' is a valid option
    expect(mockUpdateSettings).toHaveBeenCalledWith({ station: 0 });
  });
});
