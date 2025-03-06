import React from "react";
import { render, waitFor } from "@testing-library/react-native";

import Tab from "../app/(tabs)/index";
import { SettingsProvider } from "../data/SettingsContext";

import { NavigationContainer } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      setOptions: jest.fn(),
      navigate: jest.fn(),
    }),
  };
});

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock("react-native-reorderable-list", () => "ReorderableList");

describe("Tab Screen", () => {
  const renderWithProvider = async (component: React.ReactElement) => {
    let screen;
    screen = render(
      <SettingsProvider>
        <NavigationContainer>{component}</NavigationContainer>
      </SettingsProvider>,
    );
    return screen!;
  };

  it("renders correctly", async () => {
    const screen = await renderWithProvider(<Tab />);

    await waitFor(() => {
      expect(screen.getByTestId("reorderable-list")).toBeTruthy();
    });
  });
});
