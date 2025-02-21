import React from "react";
import { View, StyleSheet, Text, AppState, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "../../styles";
import colors from "../../colors";
import * as Haptics from 'expo-haptics';
import { loadTimeframes, loadSettings } from "../../utils/storage";
import AR4Sender from "../../utils/AR4Sender";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import BorderedButton from "../../components/BorderedButton";
import NfcIcon, { IconState } from "../../components/NfcIcon";
import NfcHandler from "../../components/NfcHandler";
import NfcSettingsButton from "../../components/NfcSettingsButton";


export default function Tab() {
  const [nfcResult, setNfcResult] = React.useState('');
  const [nfcEnabled, setNfcEnabled] = useState(true);
  const [iconState, setIconState] = React.useState(IconState.Default);
  const [timeframes, setTimeframes] = useState([]);
  const [settings, setSettings] = useState({ gpsMode: 0, survey: "", station: 0 });

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        Promise.all([loadTimeframes(), loadSettings()])
          .then(([storedTimeframes, storedSettings]) => {
            setTimeframes(storedTimeframes);
            setSettings(storedSettings);
          })
          .catch(error => console.error("Error loading data:", error));
      };

      fetchData();
    }, [])
  );

  const handleNfcCheck = (isEnabled: boolean): void => {
    setNfcEnabled(isEnabled);
    if (isEnabled) {
      setIconState(IconState.Default);
    } else {
      showError("NFC is not enabled. Please go to Settings > Connections > NFC and enable it.", false);
    }
  };

  const sendOverNFC = async () => {
    setIconState(IconState.Sending);

    const result = await AR4Sender.send(timeframes, settings);

    if (result.success) {
      showSuccess();
      setIconState(IconState.Success);
      setTimeout(() => setIconState(IconState.Default), 5000);
    } else if (result.error) {
      showError(result.error);
      setIconState(IconState.Error);
    }
  };
  const cancelNfcScan = () => {
    AR4Sender.cancel();
    setIconState(IconState.Default);
  };

  const showSuccess = () => {
    setIconState(IconState.Success);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  };
  const showError = (message: string, useHaptics = true): void => {
    setNfcResult(message);
    setIconState(IconState.Error);
    if (useHaptics) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    }
  }

  const localStyles = StyleSheet.create({
    buttonContainer: {
      position: "absolute",
      bottom: 30,
      width: "90%",
      alignItems: "center",
    },
  });

  return (
    <View style={[styles.container, { alignItems: "center" }]}>
      <NfcHandler onNfcCheck={handleNfcCheck} />
      {iconState !== IconState.Error && (
        <Text style={styles.statusText}>{timeframes.filter(tf => tf.enabled).length} enabled recording timeframes</Text>
      )}
      <NfcIcon iconState={iconState} />
      {iconState === IconState.Error ? (
        <View>
          <Text style={styles.nfcResult}>{nfcResult}</Text>
          {(!nfcEnabled) && (
            <NfcSettingsButton />
          )}
        </View>
      ) : (
        <View style={localStyles.buttonContainer}>
          {iconState !== IconState.Sending && (
            <BorderedButton title="CONNECT & UPDATE" style={styles.submitButton} onPress={() => sendOverNFC()}>
              <Text style={styles.buttonText}>CONNECT & UPDATE</Text>
            </BorderedButton>
          )}
          {iconState === IconState.Sending && (
            <BorderedButton title="CANCEL" style={styles.submitButton} color={colors.docGrayLight} onPress={cancelNfcScan}>
              <Text style={styles.buttonText}>CANCEL</Text>
            </BorderedButton>
          )}
        </View>
      )}
    </View>
  );
}
