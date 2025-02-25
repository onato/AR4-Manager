import { Text, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../../styles";
import { Station, GpsMode } from "@onato/doc-nfc-module";
import { useSettingsContext } from "@/data/SettingsContext";
import PageContainer from "@/components/PageContainer";

export default function Tab() {
  const { settings, updateSettings } = useSettingsContext();

  return (
    <PageContainer style={{ alignItems: "center" }}>
      <Text style={styles.sectionTitle}>GPS Settings</Text>
      <Text style={styles.label}>GPS mode</Text>
      <Picker
        selectedValue={settings.gpsMode + 1}
        onValueChange={(itemValue) => updateSettings({ gpsMode: itemValue - 1 })}
        style={styles.picker}
      >
        {Object.values(GpsMode)
          .filter((value) => typeof value === "number") // Keep only numeric values
          .map((value) => (
            <Picker.Item key={value} label={GpsMode[value]} value={value + 1} />
          ))}
      </Picker>

      <Text style={styles.sectionTitle}>TIER1 Settings</Text>
      <Text style={styles.label}>Survey</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        autoCorrect={false}
        keyboardType="default"
        autoCapitalize="characters"
        value={settings.survey}
        maxLength={7}
        onChangeText={(text) => {
          const filteredText = text.replace(/[^A-Z0-9_]/g, '_');
          updateSettings({ survey: filteredText });
        }}
      />
      <Text style={styles.label}>Station</Text>
      <Picker
        selectedValue={settings.station + 1}
        onValueChange={(itemValue) => updateSettings({ station: itemValue - 1 })}
        style={styles.picker}
      >
        {Object.values(Station)
          .filter((value) => typeof value === "number") // Keep only numeric values
          .map((value) => (
            <Picker.Item key={value} label={Station[value]} value={value + 1} />
          ))}
      </Picker>
    </PageContainer>
  );
}
