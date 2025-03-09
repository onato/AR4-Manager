import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AddEditHeaderButtons from "@/components/headers/AddEditHeaderButtons";

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");
import { SettingsProvider } from "@/data/SettingsContext";

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

import Timeframe from "@/data/Timeframe";

const mockSettings = {
  timeframes: Array(6).fill({
    id: "1",
    protocol: "Protocol",
    start_hour: 0,
    start_minute: 0,
    end_hour: 0,
    end_minute: 0,
    enabled: true,
  } as Timeframe),
  gpsMode: 0,
  survey: "Survey",
  station: 1,
};

describe("AddEditHeaderButtons", () => {
  beforeEach(() => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      settings: mockSettings,
      setSettings: jest.fn(),
    }));
  });
  const handleAdd = jest.fn();
  const toggleEditMode = jest.fn();

  const renderComponent = (editMode = false) => {
    let screen;
    screen = render(
      <SettingsProvider>
        <AddEditHeaderButtons
          handleAdd={handleAdd}
          toggleEditMode={toggleEditMode}
          editMode={editMode}
        />
      </SettingsProvider>,
    );
    return screen!;
  };

  it("disables add button when there are 6 timeframes", async () => {
    const { getByTestId } = renderComponent();
    const addButton = getByTestId("add");
    await waitFor(() => {
      expect(addButton).toBeDisabled();
    });
  });

  it("calls handleAdd when add button is pressed and not disabled", async () => {
    mockSettings.timeframes = Array(5).fill({ id: 1, name: "Timeframe" });
    const { getByTestId } = renderComponent();
    const addButton = getByTestId("add");
    await waitFor(() => {
      fireEvent.press(addButton);
    });
    expect(handleAdd).toHaveBeenCalled();
  });

  it("calls toggleEditMode when edit button is pressed", async () => {
    const { getByTestId } = renderComponent();
    const editButton = getByTestId("edit");
    await waitFor(() => {
      fireEvent.press(editButton);
    });
    expect(toggleEditMode).toHaveBeenCalled();
  });

  it("displays 'Done' when in edit mode", async () => {
    const { getByTestId } = renderComponent(true);
    await waitFor(() => {
      const doneButton = getByTestId("done");
      expect(doneButton).toBeTruthy();
    });
  });
});
