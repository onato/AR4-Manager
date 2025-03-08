import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "@/colors";
import * as Haptics from "expo-haptics";
import AR4Sender from "@/components/nfc/AR4Sender";
import BorderedButton from "@/components/buttons/BorderedButton";
import NfcIcon, { IconState } from "@/components/icons/NfcIcon";
import NfcEnabledChecker from "@/components/nfc/NfcEnabledChecker";
import PageContainer from "@/components/layout/PageContainer";
import { useSettingsContext } from "@/data/SettingsContext";

export default function Tab() {
  const [nfcResult, setNfcResult] = React.useState("");
  const [iconState, setIconState] = React.useState(IconState.Default);
  const { settings } = useSettingsContext();

  const enabledTimeframesCount = settings.timeframes.filter(
    (tf) => tf.enabled,
  ).length;
  const isError = iconState === IconState.Error;
  const isSending = iconState === IconState.Sending;

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
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const showError = (message: string): void => {
    setNfcResult(message);
    setIconState(IconState.Error);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const localStyles = StyleSheet.create({
    pageContainer: { alignItems: "center" },
    errorText: { marginBottom: 20 },
    statusText: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
    },
    buttonContainer: {
      position: "absolute",
      bottom: 30,
      width: "90%",
      alignItems: "center",
    },
  });

  return (
    <PageContainer style={localStyles.pageContainer}>
      {!isError && (
        <Text style={localStyles.statusText}>
          {enabledTimeframesCount} enabled recording timeframes
        </Text>
      )}
      <NfcIcon iconState={iconState} />

      {isError && <Text style={localStyles.errorText}>{nfcResult}</Text>}

      <View style={localStyles.buttonContainer}>
        <BorderedButton
          title={isSending ? "CANCEL" : "CONNECT & UPDATE"}
          color={isSending ? colors.docGrayLight : undefined}
          onPress={isSending ? cancelSend : send}
        />
      </View>

      <NfcEnabledChecker />
    </PageContainer>
  );
}
