import React from "react";
import { View, StyleSheet, Text } from "react-native";
import styles from "../../styles";
import colors from "../../colors";
import * as Haptics from 'expo-haptics';
import AR4Sender from "../../utils/AR4Sender";
import { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import BorderedButton from "../../components/BorderedButton";
import NfcIcon, { IconState } from "../../components/NfcIcon";
import NfcHandler from "../../components/NfcHandler";
import NfcSettingsButton from "../../components/NfcSettingsButton";
import PageContainer from "../../components/PageContainer";
import { useSettingsContext } from "../../data/SettingsContext";

export default function Tab() {
  const [nfcResult, setNfcResult] = React.useState('');
  const [nfcEnabled, setNfcEnabled] = useState(true);
  const [iconState, setIconState] = React.useState(IconState.Default);
  const { settings } = useSettingsContext();

  const handleNfcCheck = (isEnabled: boolean): void => {
    setNfcEnabled(isEnabled);
    if (isEnabled) {
      setIconState(IconState.Default);
    } else {
      showError("NFC is not enabled. Please go to Settings > Connections > NFC and enable it.", false);
    }
  };

  const send = async () => {
    setIconState(IconState.Sending);

    const result = await AR4Sender.send(settings);

    if (result.success) {
      showSuccess();
      setIconState(IconState.Success);
      setTimeout(() => setIconState(IconState.Default), 5000);
    } else if (result.error) {
      showError(result.error);
      setIconState(IconState.Error);
    }
  };
  const cancelSend = () => {
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
    <PageContainer style={{ alignItems: "center" }}>
      {iconState !== IconState.Error && (
        <Text style={styles.statusText}>{settings.timeframes.filter(tf => tf.enabled).length} enabled recording timeframes</Text>
      )}
      <NfcIcon iconState={iconState} />
      {iconState === IconState.Error && (
        <>
          <Text style={{ marginBottom: 20 }}>{nfcResult}</Text>
        </>
      )}
      <View style={localStyles.buttonContainer}>
        {iconState === IconState.Sending ? (
          <BorderedButton title="CANCEL" color={colors.docGrayLight} onPress={cancelSend} />
        ) : (
          <BorderedButton title="CONNECT & UPDATE" onPress={() => send()} />
        )}
      </View>
      <NfcHandler onNfcCheck={handleNfcCheck} />
      {(!nfcEnabled) && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          {/* <Ionicons name="alert-circle" size={64} color="red" /> */}
          <Text style={{ marginBottom: 20 }}>{nfcResult}</Text>
          <NfcSettingsButton />
        </View>
      )}
    </PageContainer >
  );
}
