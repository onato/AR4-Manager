import React from "react";
import { AppState } from "react-native";

import { render, waitFor, act } from "@testing-library/react-native";
import NfcHandler from "@/components/nfc/NfcHandler";
import NfcManager from "react-native-nfc-manager";

jest.mock("react-native-nfc-manager", () => {
  return {
    isEnabled: jest.fn().mockResolvedValue(true), // Default mock implementation
  };
});

describe("NfcHandler", () => {

  const addEventListenerMock = jest.spyOn(AppState, 'addEventListener');
  beforeEach(() => {
    addEventListenerMock.mockImplementation((type) => { });
  });

  afterEach(() => {
    addEventListenerMock.mockRestore();
  });

  it("should call onNfcCheck when app state changes to active", async () => {
    const onNfcCheckMock = jest.fn();
    NfcManager.isEnabled.mockResolvedValueOnce(true);

    render(<NfcHandler onNfcCheck={onNfcCheckMock} />);

    // Simulate app state change to active
    const changeHandler = addEventListenerMock.mock.calls[0][1];
    await act(async () => {
      changeHandler("active");
    });

    expect(NfcManager.isEnabled).toHaveBeenCalled();

    await waitFor(() => {
      expect(onNfcCheckMock).toHaveBeenCalledWith(true);
    });
  });

  it("should check NFC status on mount and call onNfcCheck with the result", async () => {
    const onNfcCheckMock = jest.fn();
    NfcManager.isEnabled.mockResolvedValueOnce(true);

    const { findByTestId } = render(<NfcHandler onNfcCheck={onNfcCheckMock} />);
    await findByTestId("nfc-handler");

    expect(NfcManager.isEnabled).toHaveBeenCalled();
    expect(onNfcCheckMock).toHaveBeenCalledWith(true);
  });

  it("should call onNfcCheck with false if NFC is not enabled", async () => {
    const onNfcCheckMock = jest.fn();
    NfcManager.isEnabled.mockResolvedValueOnce(false);

    const { findByTestId } = render(<NfcHandler onNfcCheck={onNfcCheckMock} />);
    await findByTestId("nfc-handler");

    expect(NfcManager.isEnabled).toHaveBeenCalled();
    expect(onNfcCheckMock).toHaveBeenCalledWith(false);
  });
});
