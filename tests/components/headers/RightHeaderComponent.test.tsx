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

describe("RightHeaderComponent", () => {
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

  it("calls handleAdd when add button is pressed", async () => {
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
