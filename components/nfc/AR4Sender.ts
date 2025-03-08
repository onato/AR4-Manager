import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { AR4, LogEntry } from "@onato/doc-nfc-module";
import { Settings } from "@/data/Settings.js";

const start = () => {
  NfcManager.start();
};
const cancel = () => {
  NfcManager.cancelTechnologyRequest();
};
const send = async (settings: Settings) => {
  try {
    NfcManager.start();

    // Request NfcV technology
    await NfcManager.requestTechnology(NfcTech.NfcV);
    const tag = await NfcManager.getTag();

    if (!tag) {
      throw new Error("No NFC tag detected");
    }

    const logEntries = settings.timeframes
      .filter((timeframe) => timeframe.enabled)
      .map(
        (timeframe) =>
          new LogEntry(
            timeframe.start_hour,
            timeframe.start_minute,
            timeframe.end_hour,
            timeframe.end_minute,
            timeframe.protocol,
          ),
      );
    const ar4Settings = new AR4(
      logEntries,
      settings.station,
      settings.gpsMode,
      settings.survey,
    );
    const payload = ar4Settings.convertToByteArray(tag.id);
    const responseCode = await NfcManager.transceive(payload);

    return handleResponseCode(responseCode);
  } catch (error) {
    return { success: false, error: error.message };
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
};

const handleResponseCode = (responseCode) => {
  if (responseCode === 0) {
    return { success: true };
  } else if (responseCode.toString() === "1,15") {
    return {
      success: false,
      error:
        "The device appears not to be ready.\n\nAfter powering on, wait for the time to be displayed before updating.",
    };
  } else {
    return { success: false, error: `Error: ${responseCode}` };
  }
};
export default { start, cancel, send };
