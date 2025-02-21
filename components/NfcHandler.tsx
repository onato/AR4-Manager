import React, { useState, useEffect } from "react";
import { AppState } from "react-native";
import NfcManager from "react-native-nfc-manager";

interface NfcHandlerProps {
  onNfcCheck: (isEnabled: boolean) => void;
}

const NfcHandler: React.FC<NfcHandlerProps> = ({ onNfcCheck }) => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        console.log("App has come to the foreground!");
        checkNfcEnabled();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  const checkNfcEnabled = async () => {
    const isEnabled = await NfcManager.isEnabled();
    onNfcCheck(isEnabled);
  };

  useEffect(() => {
    checkNfcEnabled();
  }, []);

  return null;
};

export default NfcHandler;
