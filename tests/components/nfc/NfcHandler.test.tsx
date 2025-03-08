import React from "react";
import { AppState, AppStateStatus } from "react-native";

import { render, waitFor, act } from "@testing-library/react-native";
import NfcHandler from "@/components/nfc/NfcHandler";
import NfcManager from "react-native-nfc-manager";

jest.mock("react-native-nfc-manager", () => {
  return {
    isEnabled: jest.fn().mockResolvedValue(true), // Default mock implementation
  };
});
const mockedNfcManager = jest.mocked(NfcManager);

describe("NfcHandler", () => {

  let appStateCallback: ((state: AppStateStatus) => void);
  const addEventListenerMock = jest.spyOn(AppState, 'addEventListener');
  beforeEach(() => {
    jest.spyOn(AppState, 'addEventListener').mockImplementation((type, handler) => {
      appStateCallback = handler;
      return { remove: jest.fn() };
    });
  });

  afterEach(() => {
    addEventListenerMock.mockRestore();
  });

  it("should call onNfcCheck when app state changes to active", async () => {
    const onNfcCheckMock = jest.fn();
    mockedNfcManager.isEnabled.mockResolvedValueOnce(true);

    render(<NfcHandler onNfcCheck={onNfcCheckMock} />);

    const changeHandler = appStateCallback
    await act(async () => {
      appStateCallback("background");
    });
    await waitFor(() => {
      expect(onNfcCheckMock).toHaveBeenCalledWith(true);
    });
    expect(NfcManager.isEnabled).toHaveBeenCalled();
    await act(async () => {
      appStateCallback("active");
    });


    await waitFor(() => {
      expect(onNfcCheckMock).toHaveBeenCalledTimes(2);
      expect(onNfcCheckMock).toHaveBeenCalledWith(true);
    });
  });

  it("should check NFC status on mount and call onNfcCheck with the result", async () => {
    const onNfcCheckMock = jest.fn();
    mockedNfcManager.isEnabled.mockResolvedValueOnce(true);

    const { findByTestId } = render(<NfcHandler onNfcCheck={onNfcCheckMock} />);
    await findByTestId("nfc-handler");

    expect(NfcManager.isEnabled).toHaveBeenCalled();
    expect(onNfcCheckMock).toHaveBeenCalledWith(true);
  });

  it("should call onNfcCheck with false if NFC is not enabled", async () => {
    const onNfcCheckMock = jest.fn();
    mockedNfcManager.isEnabled.mockResolvedValueOnce(false);

    const { findByTestId } = render(<NfcHandler onNfcCheck={onNfcCheckMock} />);
    await findByTestId("nfc-handler");

    expect(NfcManager.isEnabled).toHaveBeenCalled();
    expect(onNfcCheckMock).toHaveBeenCalledWith(false);
  });
});
