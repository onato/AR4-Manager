import React, { useState } from "react";
import { View, Text } from "react-native";
import NfcSettingsButton from "./NfcSettingsButton";
import NfcEnabledObserver from "./NfcEnabledObserver";
import Ionicons from "@expo/vector-icons/Ionicons";

const NfcEnableView: React.FC = () => {
  const [nfcEnabled, setNfcEnabled] = useState(true);

  return (
    <>
      <NfcEnabledObserver
        onNfcCheck={(isEnabled) => {
          setNfcEnabled(isEnabled);
        }}
      />
      {!nfcEnabled && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Ionicons name="alert-circle" size={64} color="red" />
          <Text style={{ marginBottom: 20, fontSize: 16 }}>
            {"NFC is not enabled."}
          </Text>
          <NfcSettingsButton />
        </View>
      )}
    </>
  );
};

export default NfcEnableView;
