import React from "react";
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "../../styles";
import AR4, {LogEntry, Station, GpsMode} from "doc-nfc-module";
import * as Haptics from 'expo-haptics';
import { loadTimeframes, loadSettings } from "../../utils/storage";
import { useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import BorderedButton from "../../components/BorderedButton.tsx";

enum IconState {
  Default,
  Success,
  Sending,
  Error,
}

export default function Tab() {
  const [nfcResult, setNfcResult] = React.useState('');
  const [iconState, setIconState] = React.useState(IconState.Default);
  const [timeframes, setTimeframes] = useState([]);
  const [settings, setSettings] = useState({ gpsMode: "Off", survey: "", station: Station.BIRM });

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

  useFocusEffect(() => {
    const fetchSettings = async () => {
      const storedSettings = await loadSettings();
      setSettings(storedSettings);
    };

    fetchSettings();
  });

  const cancelNfcScan = () => {
    NfcManager.cancelTechnologyRequest();
    setIconState(IconState.Default);
  };

  const scanNfc = async () => {
    setIconState(IconState.Sending);
    let responseCode = 0;
    try {
      // Request NfcV technology
      await NfcManager.requestTechnology(NfcTech.NfcV);
      const tag = await NfcManager.getTag();

      if (!tag) {
        throw new Error('No NFC tag detected');
      }

      const ar4Settings = new AR4(timeframes, settings.station, settings.gpsMode, settings.survey);
      const payload = ar4Settings.convertToByteArray(tag.id);
      responseCode = await NfcManager.transceive(payload);

      console.log(typeof(responseCode));

      setIconState(IconState.Error);
      if(responseCode == 0) {
        showSuccess();
      } else if(responseCode.toString() == "1,15") {
        showError(`The device appears not to be ready.\n\nAfter powering on, wait for the time to be displayed before updating.`);
      } else {
        showError(`Error: ${responseCode}`);
      }
    } catch (error) {
      if(error.message) {
        showError(`Error: ${error.message}`);
      }
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };
  const showSuccess = () => {
    setIconState(IconState.Success);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  };
  const showError = (message) => {
    setNfcResult(message);
    setIconState(IconState.Error);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
  }
  return (
    <View style={[styles.container, styles.centered]}>
      <Text style={styles.statusText}>{timeframes.length} start times</Text>
      <View style={styles.nfcIcon}>
        {iconState === IconState.Success ? (
          <Ionicons name="checkmark-circle" size={64} color="green" />
        ) : iconState === IconState.Error ? (
          <Ionicons name="alert-circle" size={64} color="red" />
        ) : iconState === IconState.Sending ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Image
            source={require("../../assets/images/nfc_logo.png")}
            style={styles.nfcImage}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        {iconState !== IconState.Sending && (
          <BorderedButton title="CONNECT & UPDATE" style={styles.submitButton} onPress={scanNfc}>
            <Text style={styles.buttonText}>CONNECT & UPDATE</Text>
          </BorderedButton>
        )}
        {iconState === IconState.Sending && (
          <BorderedButton title="CANCEL" style={styles.submitButton} color="gray" onPress={cancelNfcScan}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </BorderedButton>
        )}
      </View>
      {iconState === IconState.Error && (
        <Text style={styles.nfcResult}>{nfcResult}</Text>
      )}
    </View>
  );
}
