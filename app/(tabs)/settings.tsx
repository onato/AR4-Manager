import { Text, StyleSheet } from "react-native";
import SurveyInput from "@/components/forms/SurveyInput";
import colors from "../../colors";
import DOCPicker from "@/components/forms/DOCPicker";
import DOCLable from "@/components/forms/DOCLable";
import { Station, GpsMode } from "@onato/doc-nfc-module";
import { useSettingsContext } from "@/data/SettingsContext";
import PageContainer from "@/components/layout/PageContainer";

export default function Tab() {
  const { settings, updateSettings } = useSettingsContext();

  return (
    <PageContainer style={{ alignItems: "center" }}>
      <Text style={localStyles.sectionTitle}>GPS Settings</Text>
      <DOCLable>GPS mode</DOCLable>
      <DOCPicker
        testID="doc-picker-gps-mode"
        selectedValue={settings.gpsMode + 1}
        onValueChange={(itemValue) => updateSettings({ gpsMode: itemValue - 1 })}
        items={Object.values(GpsMode)
          .filter((value) => typeof value === "number")
          .map((value) => ({
            label: GpsMode[value],
            value: value + 1,
          }))}
      />

      <Text style={localStyles.sectionTitle}>TIER1 Settings</Text>
      <DOCLable>Survey</DOCLable>
      <SurveyInput
        value={settings.survey}
        onChangeText={(filteredText) => updateSettings({ survey: filteredText })}
      />
      <DOCLable>Station</DOCLable>
      <DOCPicker
        testID="doc-picker-station"
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
const localStyles = StyleSheet.create({
  input: {
    marginBottom: 10,
    padding: 15,
    paddingLeft: 10,
    width: "100%",
    backgroundColor: colors.docGray,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
