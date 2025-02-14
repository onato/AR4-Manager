import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "../../styles";
import AR4, {LogEntry, Station, GpsMode} from "doc-nfc-module";
import * as Haptics from 'expo-haptics';
import { loadTimeframes } from "../../utils/storage";
import { useState } from "react";
import { useFocusEffect } from '@react-navigation/native';

enum IconState {
  Default,
  Checkmark,
  Alert
}

export default function Tab() {
  const [nfcResult, setNfcResult] = React.useState('');
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const [iconState, setIconState] = React.useState(IconState.Default);
  const [timeframes, setTimeframes] = useState([]);

  React.useEffect(() => {
    NfcManager.start();
  }, []);

  useFocusEffect(() => {
    const fetchTimeframes = async () => {
      const storedTimeframes = await loadTimeframes();
      if (storedTimeframes) {
        setTimeframes(storedTimeframes);
      }
    };

    fetchTimeframes();
  });

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

      const settings = new AR4(timeframes, Station.BIRM, GpsMode.LogOnly, "Ste-Wil");
      const payload = settings.convertToByteArray(tag.id);
      responseCode = await NfcManager.transceive(payload);

      console.log(typeof(responseCode));

      setIconState(IconState.Alert);
      if(responseCode == 0) {
        showSuccess();
      } else if(responseCode.toString() == "1,15") {
        showError(`The device appears not to be ready.\n\nAfter powering on, wait for the time to be displayed before updating.`);
      } else {
        showError(`Error: ${responseCode}`);
      }
    } catch (error) {
      showError(`Error: ${error.message}`);
      console.error("Error:", error);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
    setIsButtonDisabled(false);
  };
  const showSuccess = () => {
    setIconState(IconState.Checkmark);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  };
  const showError = (message) => {
    setNfcResult(message);
    setIconState(IconState.Alert);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
  }
  return (
    <View style={[styles.container, styles.centered]}>
      <Text style={styles.statusText}>{timeframes.length} start times</Text>
      <View style={styles.nfcIcon}>
        {iconState === IconState.Checkmark ? (
          <Ionicons name="checkmark-circle" size={64} color="green" />
        ) : iconState === IconState.Alert ? (
          <Ionicons name="alert-circle" size={64} color="red" />
        ) : (
          <Image
            source={require("../../assets/images/nfc_logo.png")}
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
