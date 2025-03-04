import React from "react";
import { StyleSheet } from "react-native";
import { View, Image, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../colors";

interface NfcIconProps {
  iconState: IconState;
}

export enum IconState {
  Default,
  Success,
  Sending,
  Error,
}

const NfcIcon: React.FC<NfcIconProps> = ({ iconState }) => {
  return (
    <View style={styles.nfcIcon}>
      {iconState === IconState.Success ? (
        <Ionicons name="checkmark-circle" size={64} color="green" testID="success-icon" />
      ) : iconState === IconState.Error ? (
        <Ionicons name="alert-circle" size={64} color="red" testID="error-icon" />
      ) : iconState === IconState.Sending ? (
        <ActivityIndicator size="large" color={colors.docYellow} testID="activity-indicator" />
      ) : (
        <Image
          source={require("../../assets/images/nfc_logo.png")}
          style={styles.nfcImage}
          testID="nfc-image"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  nfcIcon: {
    marginBottom: 20,
    alignItems: "center",
  },
  nfcImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});
export default NfcIcon;
