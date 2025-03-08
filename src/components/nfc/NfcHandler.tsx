import React, { useState, useCallback, useEffect } from "react";
import { AppState, View } from "react-native";
import NfcManager from "react-native-nfc-manager";

interface NfcHandlerProps {
  onNfcCheck: (isEnabled: boolean) => void;
}

const NfcHandler: React.FC<NfcHandlerProps> = ({ onNfcCheck }) => {
  const [appState, setAppState] = useState<string>(AppState.currentState);

  const checkNfcEnabled = useCallback(async () => {
    const isEnabled = await NfcManager.isEnabled();
    onNfcCheck(isEnabled);
  }, [onNfcCheck]);

  useEffect(() => {
    checkNfcEnabled();
  }, [checkNfcEnabled]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState?.match(/inactive|background/) && nextAppState === "active") {
        checkNfcEnabled();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription?.remove();
    };
  }, [appState, checkNfcEnabled]);

  return <View testID="nfc-handler" />;
};

export default NfcHandler;
