import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
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
jest.mock("react-native-date-picker", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => null),
  };
});


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

  it("shows modal when TimetableItem is pressed", async () => {
    const { getByTestId, queryByTestId } = render(
      <ReorderableList>
        <TimetableItem
          item={mockTimeframe}
          editMode={false}
          onSave={onSaveMock}
          onDelete={onDeleteMock}
        />
      </ReorderableList>,
    );

    const timetableItem = getByTestId("timetable-item");
    expect(queryByTestId("edit-timeframe-modal")).toBeFalsy();

    await act(async () => {
      fireEvent.press(timetableItem);
    });

    expect(queryByTestId("edit-timeframe-modal")).toBeTruthy();
  });
});

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

  it("closes modal when cancel button is pressed", async () => {
    const { getByTestId, queryByTestId } = render(
      <ReorderableList>
        <TimetableItem
          item={mockTimeframe}
          editMode={false}
          onSave={onSaveMock}
          onDelete={onDeleteMock}
        />
      </ReorderableList>,
    );

    const timetableItem = getByTestId("timetable-item");
    await act(async () => {
      fireEvent.press(timetableItem);
    });

    const cancelButton = getByTestId("cancel");
    await act(async () => {
      fireEvent.press(cancelButton);
    });

    expect(queryByTestId("edit-timeframe-modal")).toBeFalsy();
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
