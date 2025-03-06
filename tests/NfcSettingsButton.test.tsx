import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NfcSettingsButton from "../components/nfc/NfcSettingsButton";
import * as IntentLauncher from "expo-intent-launcher";

jest.mock("expo-intent-launcher", () => ({
  startActivityAsync: jest.fn(),
  ActivityAction: {
    NFC_SETTINGS: "android.settings.NFC_SETTINGS",
  },
}));

describe("NfcSettingsButton", () => {
  it("renders correctly", () => {
    const { getByText } = render(<NfcSettingsButton />);
    expect(getByText("Open NFC Settings")).toBeTruthy();
  });

  it("calls openNfcSettings when button is pressed", () => {
    const { getByText } = render(<NfcSettingsButton />);
    const button = getByText("Open NFC Settings");
    fireEvent.press(button);
    expect(IntentLauncher.startActivityAsync).toHaveBeenCalledWith(
      IntentLauncher.ActivityAction.NFC_SETTINGS,
    );
  });
});
