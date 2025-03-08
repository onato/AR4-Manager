import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";

// Mock NativeEventEmitter to prevent errors during testing
import { ReorderableList } from "react-native-reorderable-list";
import TimetableItem from "components/table/TimetableItem";
import Timeframe from "data/Timeframe";

// ✅ Ensure Jest clears mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock("react-native-reorderable-list", () => ({
  ReorderableList: ({ children }) => children,
  useReorderableDrag: jest.fn(() => jest.fn()), // Mock useReorderable
}));

jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");
jest.mock("react-native-vector-icons/MaterialIcons", () => "MaterialIcons");

describe("TimetableItem", () => {
  const mockTimeframe: Timeframe = {
    id: "1",
    protocol: "High",
    start_hour: 12,
    start_minute: 0,
    end_hour: 13,
    end_minute: 0,
    enabled: true,
  };

  const onSaveMock = jest.fn();
  const onDeleteMock = jest.fn();

  it("renders correctly", () => {
    const { getByText } = render(
      <ReorderableList>
        <TimetableItem
          item={mockTimeframe}
          editMode={false}
          onSave={onSaveMock}
          onDelete={onDeleteMock}
        />
      </ReorderableList>,
    );

    expect(getByText("12:00 - 13:00")).toBeTruthy();
    expect(getByText("High")).toBeTruthy();
  });

  it("calls onSave when switch is toggled", async () => {
    const { getByTestId } = render(
      <ReorderableList>
        <TimetableItem
          item={mockTimeframe}
          editMode={false}
          onSave={onSaveMock}
          onDelete={onDeleteMock}
        />
      </ReorderableList>,
    );

    const switchElement = getByTestId("enable-switch"); // ✅ Ensure the correct `testID`
    await act(async () => {
      fireEvent(switchElement, "valueChange", false);
    });

    expect(onSaveMock).toHaveBeenCalledWith({
      ...mockTimeframe,
      enabled: false,
    });
  });

  it("calls onDelete when delete button is pressed", async () => {
    const { getByTestId } = render(
      <ReorderableList>
        <TimetableItem
          item={mockTimeframe}
          editMode={true}
          onSave={onSaveMock}
          onDelete={onDeleteMock}
        />
      </ReorderableList>,
    );

    const deleteButton = getByTestId("delete-button");

    await act(async () => {
      fireEvent.press(deleteButton);
    });

    expect(onDeleteMock).toHaveBeenCalledWith("1");
  });
});
