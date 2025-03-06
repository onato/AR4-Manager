import React from "react";
import { TextInput, StyleSheet } from "react-native";
import colors from "../../colors";

interface SurveyInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SurveyInput: React.FC<SurveyInputProps> = ({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Name"
      autoCorrect={false}
      keyboardType="default"
      autoCapitalize="characters"
      value={value}
      maxLength={7}
      onChangeText={(text) => {
        const filteredText = text.replace(/[^A-Z0-9_]/g, "_").slice(0, 7);
        onChangeText(filteredText);
      }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    padding: 15,
    paddingLeft: 10,
    width: "100%",
    backgroundColor: colors.docGray,
  },
});

export default SurveyInput;
