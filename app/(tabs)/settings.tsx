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
      <View style={styles.hStack}>
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
      </View>

      <Text style={styles.sectionTitle}>TIER1 Settings</Text>
      <TextInput
        style={styles.input}
        placeholder="Survey Name"
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType="default"
        autoCapitalize="characters"
        value={survey}
        maxLength={7}
        onChangeText={(text) => {
          const filteredText = text.replace(/[^A-Z0-9_]/g, '_');
          setSurvey(filteredText);
        }}
      />
      <View style={styles.hStack}>
        <Text style={styles.label}>Station:</Text>
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
    </View>
  );
}
