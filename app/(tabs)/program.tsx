import React from "react";
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "../../styles";
import colors from "../../colors";
import AR4, {LogEntry, Station, GpsMode} from "doc-nfc-module";
import * as Haptics from 'expo-haptics';
import { loadTimeframes, loadSettings } from "../../utils/storage";
import { scanNfc } from "../../utils/AR4Sender";
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

  const handleNfcScan = async () => {
    setIconState(IconState.Sending);
    
    const result = await scanNfc(timeframes, settings);
    
    if (result.success) {
      showSuccess();
      setIconState(IconState.Success);
    } else if (result.error) {
      showError(result.error);
      setIconState(IconState.Error);
    }
  };
  const cancelNfcScan = () => {
    NfcManager.cancelTechnologyRequest();
    setIconState(IconState.Default);
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
          <ActivityIndicator size="large" color={colors.docYellow} />
        ) : (
          <Image
            source={require("../../assets/images/nfc_logo.png")}
            style={styles.nfcImage}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        {iconState !== IconState.Sending && (
          <BorderedButton title="CONNECT & UPDATE" style={styles.submitButton} onPress={() => handleNfcScan()}>
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
