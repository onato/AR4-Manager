import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { useSettingsContext } from "@/data/SettingsContext";
import Tab from "@/app/(tabs)/program";
import AR4Sender from "@/components/nfc/AR4Sender";

jest.mock("react-native-nfc-manager", () => {
  return {
    isEnabled: jest.fn().mockResolvedValue(true), // Default mock implementation
  };
});

jest.mock("@react-native-async-storage/async-storage", () => ({}));
jest.mock("@/data/SettingsContext");
jest.mock("@/components/nfc/AR4Sender");
jest.mock("react-native-vector-icons/Ionicons", () => "Ionicons");

describe("Program Tab", () => {
  const mockSettings = {
    timeframes: [{ enabled: true }, { enabled: false }],
  };

  beforeEach(() => {
    (useSettingsContext as jest.Mock).mockReturnValue({
      settings: mockSettings,
    });
  });

  it("cancels NFC sending", async () => {
    (AR4Sender.send as jest.Mock).mockImplementation(() => {
      return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000));
    });
    (AR4Sender.cancel as jest.Mock).mockImplementation(() => { });

    const { getByText } = render(<Tab />);
    const button = getByText("CONNECT & UPDATE");
    fireEvent.press(button);

    await waitFor(() => {
      expect(getByText("CANCEL")).toBeTruthy();
    });

    fireEvent.press(getByText("CANCEL"));

    expect(AR4Sender.cancel).toHaveBeenCalled();
  });

  it("renders correctly", () => {
    const { getByText } = render(<Tab />);
    expect(getByText("1 enabled recording timeframes")).toBeTruthy();
  });

  it("sends NFC data successfully", async () => {
    (AR4Sender.send as jest.Mock).mockResolvedValue({ success: true });

    const { getByText, getByTestId } = render(<Tab />);
    const button = getByText("CONNECT & UPDATE");
    fireEvent.press(button);

    await waitFor(() => {
      expect(getByTestId("success-icon")).toBeTruthy();
    });
  });

  it("handles NFC send error", async () => {
    (AR4Sender.send as jest.Mock).mockResolvedValue({
      success: false,
      error: "NFC Error",
    });

    const { getByText } = render(<Tab />);
    const button = getByText("CONNECT & UPDATE");
    fireEvent.press(button);

    await waitFor(() => {
      expect(getByText("NFC Error")).toBeTruthy();
    });
  });

  it("handles empty NFC error", async () => {
    (AR4Sender.send as jest.Mock).mockResolvedValue({ success: false, error: "" });

    const { getByText, getByTestId } = render(<Tab />);
    const button = getByText("CONNECT & UPDATE");
    fireEvent.press(button);

    await waitFor(() => {
      expect(getByTestId("error-icon")).toBeTruthy();
    });
  });
});
