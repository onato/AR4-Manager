import React from "react";
import { StyleSheet, View, Image, ActivityIndicator } from "react-native";
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
  let content;
  if (iconState === IconState.Success) {
    content = (<Ionicons
      name="checkmark-circle"
      size={64}
      color="green"
      testID="success-icon"
    />)
  } else if (iconState === IconState.Error) {
    content = (<Ionicons
      name="alert-circle"
      size={64}
      color="red"
      testID="error-icon"
    />)
  } else if (iconState === IconState.Sending) {
    content = (<ActivityIndicator
      size="large"
      color={colors.docYellow}
      testID="activity-indicator"
    />)
  } else {
    content = (<Image
      source={require("../../assets/images/nfc_logo.png")}
      style={styles.nfcImage}
      testID="nfc-image"
    />)
  };
  return (<View style={styles.nfcIcon}>{content}</View>);
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
