import { Text, TextInput } from "react-native";
import DOCPicker from "@/components/DOCPicker";
import styles from "../../styles";
import DOCLable from "@/components/DOCLable";
import { Station, GpsMode } from "@onato/doc-nfc-module";
import { useSettingsContext } from "@/data/SettingsContext";
import PageContainer from "@/components/PageContainer";

export default function Tab() {
  const { settings, updateSettings } = useSettingsContext();

  return (
    <PageContainer style={{ alignItems: "center" }}>
      <Text style={styles.sectionTitle}>GPS Settings</Text>
      <DOCLable>GPS mode</DOCLable>
      <DOCPicker
        selectedValue={settings.gpsMode + 1}
        onValueChange={(itemValue) => updateSettings({ gpsMode: itemValue - 1 })}
        items={Object.values(GpsMode)
          .filter((value) => typeof value === "number")
          .map((value) => ({
            label: GpsMode[value],
            value: value + 1,
          }))}
      />

      <Text style={styles.sectionTitle}>TIER1 Settings</Text>
      <DOCLable>Survey</DOCLable>
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
      <DOCLable>Station</DOCLable>
      <DOCPicker
        selectedValue={settings.station + 1}
        onValueChange={(itemValue) => updateSettings({ station: itemValue - 1 })}
        items={Object.values(Station)
          .filter((value) => typeof value === "number")
          .map((value) => ({
            label: Station[value],
            value: value + 1,
          }))}
      />
    </PageContainer>
  );
}
