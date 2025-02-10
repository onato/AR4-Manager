import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "../../styles";
import AR4, {LogEntry, Station, GpsMode} from "doc-nfc-module";

enum IconState {
  Default,
  Checkmark,
  Alert
}

export default function Tab() {
  const [nfcResult, setNfcResult] = React.useState('');
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [iconState, setIconState] = React.useState(IconState.Default);

  React.useEffect(() => {
    NfcManager.start();
  }, []);

  const scanNfc = async () => {
    setIsButtonDisabled(true);
    setIconState(IconState.Default);
    let responseCode = 0;
    try {
      // Request NfcV technology
      await NfcManager.requestTechnology(NfcTech.NfcV);
      const tag = await NfcManager.getTag();

      if (!tag) {
        throw new Error('No NFC tag detected');
      }

      const logEntries = [
        new LogEntry(10, 31, 11, 9, "Forest"),
        new LogEntry(13, 15, 15, 10, "Tier1 Night"),
        new LogEntry(15, 15, 17, 45, "Tier1 Day"),
        new LogEntry(18, 15, 20, 15, "Bat"),
        new LogEntry(20, 15, 22, 45, "High"),
        new LogEntry(23, 10, 23, 45, "Low")
      ];
      const example = new AR4(logEntries, Station.BIRM, GpsMode.LogOnly, "Ste-Wil");
      const payload = example.convertToByteArray(tag.id);
      responseCode = await NfcManager.transceive(payload);

      console.log(typeof(responseCode));

      setIconState(IconState.Alert);
      if(responseCode == 0) {
        setIconState(IconState.Checkmark);
      } else if(responseCode.toString() == "1,15") {
        setNfcResult(`The device appears not to be ready.\n\nAfter powering on, wait for the time to be displayed before updating.`);
      } else {
        setNfcResult(`Error: ${responseCode}`);
      }
    } catch (error) {
      setNfcResult(`Error: ${error.message}`);
      setIconState(IconState.Alert);
      console.error("Error:", error);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
    setIsButtonDisabled(false);
  };
  return (
    <View style={[styles.container, styles.centered]}>
      <Text style={styles.statusText}>4 start times</Text>
      <View style={styles.nfcIcon}>
        {iconState === IconState.Checkmark ? (
          <Ionicons name="checkmark-circle" size={64} color="green" />
        ) : iconState === IconState.Alert ? (
          <Ionicons name="alert-circle" size={64} color="red" />
        ) : (
          <Image
            source={require("../../assets/nfc_logo.png")}
            style={styles.nfcImage}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity title="CONNECT & UPDATE" style={[styles.submitButton, isButtonDisabled && styles.disabledButton]} onPress={scanNfc} disabled={isButtonDisabled}>
          <Text style={styles.buttonText}>CONNECT & UPDATE</Text>
        </TouchableOpacity>
      </View>
      {iconState === IconState.Alert && (
        <Text style={styles.nfcResult}>{nfcResult}</Text>
      )}
    </View>
  );
}
