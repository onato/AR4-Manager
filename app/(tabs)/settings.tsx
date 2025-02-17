import { View, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../../styles";
import { Station } from "@onato/doc-nfc-module";
import React, { useEffect } from "react";
import { loadSettings, saveSettings } from "../../utils/storage";

export default function Tab() {
  const [gpsMode, setGpsMode] = React.useState("");
  const [survey, setSurvey] = React.useState("");
  const [station, setStation] = React.useState("");

  useEffect(() => {
    const loadInitialSettings = async () => {
      const settings = await loadSettings();
      setGpsMode(settings.gpsMode);
      setSurvey(settings.survey);
      setStation(settings.station);
    };
    loadInitialSettings();
  }, []);

  const updateSettings = async (newSettings) => {
    setGpsMode(newSettings.gpsMode || gpsMode);
    setSurvey(newSettings.survey);
    setStation(newSettings.station || station);
    await saveSettings({ gpsMode: newSettings.gpsMode || gpsMode, survey: newSettings.survey || survey, station: newSettings.station || station });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>GPS Settings</Text>
      <Text style={styles.label}>GPS mode</Text>
      <Picker
        selectedValue={gpsMode}
        onValueChange={(itemValue) => updateSettings({ gpsMode: itemValue })}
        style={styles.picker}
      >
        <Picker.Item label="Off" value="Off" />
        <Picker.Item label="Log Only" value="Log Only" />
        <Picker.Item label="Log & Sync" value="Log & Sync" />
      </Picker>

      <Text style={styles.sectionTitle}>TIER1 Settings</Text>
      <Text style={styles.label}>Survey</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="default"
        autoCapitalize="characters"
        value={survey}
        maxLength={7}
        onChangeText={(text) => {
          const filteredText = text.replace(/[^A-Z0-9_]/g, '_');
          updateSettings({ survey: filteredText });
        }}
      />
      <Text style={styles.label}>Station</Text>
      <Picker
        selectedValue={station}
        onValueChange={(itemValue) => updateSettings({ station: itemValue })}
        style={styles.picker}
      >
        {Object.entries(Station).map(([stationName, stationValue]) => (
          <Picker.Item key={stationValue} label={stationName} value={stationValue} />
        ))}
      </Picker>
    </View>
  );
}
