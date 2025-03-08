import NfcManager, { NfcTech } from "react-native-nfc-manager";
import AR4Sender from "@/components/nfc/AR4Sender";
import { Settings } from "@/data/Settings";

jest.mock("react-native-nfc-manager", () => ({
  start: jest.fn(),
  requestTechnology: jest.fn(),
  getTag: jest.fn(),
  transceive: jest.fn(),
  cancelTechnologyRequest: jest.fn(),
  NfcTech: { NfcV: "NfcV" },
}));

jest.mock("@onato/doc-nfc-module", () => ({
  AR4: jest.fn().mockImplementation(() => ({
    convertToByteArray: jest.fn().mockReturnValue(new Uint8Array([0x00])),
  })),
  LogEntry: jest.fn(),
}));

describe("AR4Sender", () => {
  const mockSettings: Settings = {
    timeframes: [
      {
        id: "1",
        start_hour: 12,
        start_minute: 0,
        end_hour: 13,
        end_minute: 0,
        protocol: "High",
        enabled: true,
      },
    ],
    station: 1,
    gpsMode: 1,
    survey: "Test Survey",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("start function initializes NFC Manager", () => {
    AR4Sender.start();
    expect(NfcManager.start).toHaveBeenCalled();
  });

  test("cancel function cancels NFC technology request", () => {
    AR4Sender.cancel();
    expect(NfcManager.cancelTechnologyRequest).toHaveBeenCalled();
  });

  test("send function processes NFC tag and returns success", async () => {
    NfcManager.getTag.mockResolvedValue({ id: "test-tag-id" });
    NfcManager.transceive.mockResolvedValue(0);

    const result = await AR4Sender.send(mockSettings);

    expect(NfcManager.start).toHaveBeenCalled();
    expect(NfcManager.requestTechnology).toHaveBeenCalledWith(NfcTech.NfcV);
    expect(NfcManager.getTag).toHaveBeenCalled();
    expect(NfcManager.transceive).toHaveBeenCalled();
    expect(result).toEqual({ success: true });
  });

  test("send function returns error if no NFC tag is detected", async () => {
    NfcManager.getTag.mockResolvedValue(null);

    const result = await AR4Sender.send(mockSettings);

    expect(result).toEqual({ success: false, error: "No NFC tag detected" });
  });

  test("send function returns error for non-zero response code", async () => {
    NfcManager.getTag.mockResolvedValue({ id: "test-tag-id" });
    NfcManager.transceive.mockResolvedValue(1);

    const result = await AR4Sender.send(mockSettings);

    expect(result).toEqual({ success: false, error: "Error: 1" });
  });

  test("send function returns 'device not ready' error for response code 1,15", async () => {
    NfcManager.getTag.mockResolvedValue({ id: "test-tag-id" });
    NfcManager.transceive.mockResolvedValue("1,15");

    const result = await AR4Sender.send(mockSettings);

    expect(result).toEqual({
      success: false,
      error:
        "The device appears not to be ready.\n\nAfter powering on, wait for the time to be displayed before updating.",
    });
  });
});
