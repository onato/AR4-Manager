import React from "react";
import { View, Image, Text, AppState, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "../../styles";
import colors from "../../colors";
import * as Haptics from 'expo-haptics';
import { loadTimeframes, loadSettings } from "../../utils/storage";
import AR4Sender from "../../utils/AR4Sender";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import NfcManager from "react-native-nfc-manager";
import BorderedButton from "../../components/BorderedButton";
import NfcHandler from "../../components/NfcHandler";
import NfcSettingsButton from "../../components/NfcSettingsButton";

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
  const [settings, setSettings] = useState({ gpsMode: 0, survey: "", station: 0 });
  const [nfcEnabled, setNfcEnabled] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchTimeframes = async () => {
        const storedTimeframes = await loadTimeframes();
        if (storedTimeframes) {
          setTimeframes(storedTimeframes);
        }
      };
      const fetchSettings = async () => {
        const storedSettings = await loadSettings();
        setSettings(storedSettings);
      };

      fetchTimeframes();
      fetchSettings();
    }, [])
  );

  const handleNfcCheck = (isEnabled) => {
    setNfcEnabled(isEnabled);
    if (isEnabled) {
      setIconState(IconState.Default);
    } else {
      showError("NFC is not enabled. Please go to Settings > Connections > NFC and enable it.", false);
    }
  };

  const handleNfcScan = async () => {
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
  const showError = (message, useHaptics = true) => {
    setNfcResult(message);
    setIconState(IconState.Error);
    if (useHaptics) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    }
  }
  return (
    <View style={[styles.container, styles.centered]}>
      <NfcHandler onNfcCheck={handleNfcCheck} />
      {iconState !== IconState.Error && (
        <Text style={styles.statusText}>{timeframes.filter(tf => tf.enabled).length} enabled recording timeframes</Text>
      )}
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
      {iconState === IconState.Error ? (
        <View>
          <Text style={styles.nfcResult}>{nfcResult}</Text>
          {(!nfcEnabled) && (
            <NfcSettingsButton />
          )}
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          {iconState !== IconState.Sending && (
            <BorderedButton title="CONNECT & UPDATE" style={styles.submitButton} onPress={() => handleNfcScan()}>
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
