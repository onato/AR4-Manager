import { View, Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../../styles";
import { Station } from "doc-nfc-module";
import React from "react";

export default function Tab() {
  const [gpsMode, setGpsMode] = React.useState("Off");
  const [survey, setSurvey] = React.useState("");
  const [station, setStation] = React.useState(Station[0]);

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
      <Picker
        selectedValue={station}
        onValueChange={(itemValue) => setStation(itemValue)}
        style={styles.picker}
      >
        {Object.entries(Station).map(([stationName, stationValue]) => (
          <Picker.Item key={stationValue} label={stationName} value={stationValue} />
        ))}
      </Picker>
    </View>
  );
}
