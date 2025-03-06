import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import EditTimetableModal from "../components/modals/EditTimetableModal";
import Timeframe from "../data/Timeframe";

// Mock the native module used by react-native-date-picker
jest.mock("react-native-date-picker", () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => null),
  };
});

const baseMockItem: Timeframe = {
  id: "1",
  protocol: "High",
  start_hour: 12,
  start_minute: 0,
  end_hour: 13,
  end_minute: 0,
  enabled: true,
};

describe("EditTimetableModal", () => {
  it("calls onSave when the save button is pressed", () => {
    const mockOnCancel = jest.fn();
    const mockOnSave = jest.fn();
    const mockItem: Timeframe = { ...baseMockItem };

    const { getByText } = render(
      <EditTimetableModal
        visible={true}
        item={mockItem}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />,
    );

    fireEvent.press(getByText("Save"));
    expect(mockOnSave).toHaveBeenCalled();
  });

  it("calls onCancel when the cancel button is pressed", () => {
    const mockOnCancel = jest.fn();
    const mockOnSave = jest.fn();
    const mockItem: Timeframe = { ...baseMockItem };

    const { getByText } = render(
      <EditTimetableModal
        visible={true}
        item={mockItem}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />,
    );

    fireEvent.press(getByText("Cancel"));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("calls onValueChange when a new value is selected in DOCPicker", () => {
    const mockOnCancel = jest.fn();
    const mockOnSave = jest.fn();
    const mockItem: Timeframe = { ...baseMockItem };

    const { getByTestId } = render(
      <EditTimetableModal
        visible={true}
        item={mockItem}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />,
    );

    fireEvent(getByTestId("doc-picker"), "onValueChange", "new-value");
    // Assuming there's a state update or function call to verify
    // Add your verification logic here, e.g., checking state or a mock function call
  });

  it("shows the Tier1 protocol text when the protocol is Tier1", () => {
    const mockTimeframe: Timeframe = { ...baseMockItem, protocol: "Tier1" };

    const { getByText } = render(
      <EditTimetableModal
        visible={true}
        item={mockTimeframe}
        onSave={jest.fn()}
        onCancel={jest.fn()}
      />,
    );

    expect(
      getByText(
        "The times are set automatically by the device when using a Tier1 protocol.",
      ),
    ).toBeTruthy();
  });
});
