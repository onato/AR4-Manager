import React from "react";
import { render, screen } from "@testing-library/react-native";
import NfcEnabledView from "../../../src/components/nfc/NfcEnabledView";

jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons");
import NfcEnabledObserver from "../../../src/components/nfc/NfcEnabledObserver";

jest.mock("../../../src/components/nfc/NfcEnabledObserver", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("NfcEnabledView", () => {
  it("renders alert and button when NFC is disabled", () => {
    (NfcEnabledObserver as jest.Mock).mockImplementation(({ onNfcCheck }) => {
      React.useEffect(() => {
        onNfcCheck(false); // Simulate NFC being disabled
      }, []);
      return null;
    });

    render(<NfcEnabledView />);

    expect(screen.getByText("NFC is not enabled.")).toBeTruthy();
    expect(screen.getByTestId("open-settings-button")).toBeTruthy();
  });

  it("does not render alert and button when NFC is enabled", () => {
    (NfcEnabledObserver as jest.Mock).mockImplementation(({ onNfcCheck }) => {
      React.useEffect(() => {
        onNfcCheck(true); // Simulate NFC being enabled
      }, []);
      return null;
    });

    render(<NfcEnabledView />);

    expect(screen.queryByText("NFC is not enabled.")).toBeNull();
    expect(screen.queryByTestId("open-settings-button")).toBeNull();
  });
});
