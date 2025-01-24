import { View, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles";
import React from "react";

export function OptionsScreen() {
  const [gpsMode, setGpsMode] = React.useState("Off");
  const [survey, setSurvey] = React.useState("");
  const [station, setStation] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>GPS Settings</Text>
      <Text style={styles.label}>GPS mode</Text>
      <Picker
        selectedValue={gpsMode}
        onValueChange={(itemValue) => setGpsMode(itemValue)}
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
        value={survey}
        onChangeText={setSurvey}
      />
      <Text style={styles.label}>Station</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={station}
        onChangeText={setStation}
      />
    </View>
  );
}
