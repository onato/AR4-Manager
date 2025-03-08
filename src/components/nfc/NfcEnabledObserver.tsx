import React, { useEffect, useCallback, useRef } from "react";
import { AppState, View } from "react-native";
import NfcManager from "react-native-nfc-manager";

interface NfcEnabledObserverProps {
  onNfcCheck: (isEnabled: boolean) => void;
}

const NfcEnabledObserver: React.FC<NfcEnabledObserverProps> = ({ onNfcCheck }) => {
  const appStateRef = useRef<string>(AppState.currentState);

  const checkNfcEnabled = useCallback(async () => {
    const isEnabled = await NfcManager.isEnabled();
    onNfcCheck(isEnabled);
  }, [onNfcCheck]);

  useEffect(() => {
    checkNfcEnabled();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      const prevState = appStateRef.current;
      const wasBackground = /inactive|background/.exec(prevState);
      if (wasBackground && nextAppState === "active") {
        checkNfcEnabled();
      }

      appStateRef.current = nextAppState;
    });

    return () => subscription.remove();
  }, [checkNfcEnabled]);

  return <View testID="nfc-handler" />;
};

export default NfcEnabledObserver;
