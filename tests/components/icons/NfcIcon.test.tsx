import React from "react";
import { render } from "@testing-library/react-native";
import NfcIcon, { IconState } from "@/components/icons/NfcIcon";

// Mock Ionicons to prevent errors during testing
jest.mock("@expo/vector-icons/Ionicons", () => "Ionicons");

describe("NfcIcon", () => {
  it("renders the success icon when iconState is Success", () => {
    const { getByTestId } = render(<NfcIcon iconState={IconState.Success} />);
    const successIcon = getByTestId("success-icon");
    expect(successIcon).toBeTruthy();
  });

  it("renders the error icon when iconState is Error", () => {
    const { getByTestId } = render(<NfcIcon iconState={IconState.Error} />);
    const errorIcon = getByTestId("error-icon");
    expect(errorIcon).toBeTruthy();
  });

  it("renders the activity indicator when iconState is Sending", () => {
    const { getByTestId } = render(<NfcIcon iconState={IconState.Sending} />);
    const activityIndicator = getByTestId("activity-indicator");
    expect(activityIndicator).toBeTruthy();
  });

  it("renders the default NFC image when iconState is Default", () => {
    const { getByTestId } = render(<NfcIcon iconState={IconState.Default} />);
    const nfcImage = getByTestId("nfc-image");
    expect(nfcImage).toBeTruthy();
  });
});
