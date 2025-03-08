import React from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";
import colors from "@/colors";

interface DOCPickerProps<T> {
  testID?: string;
  selectedValue: T;
  onValueChange: (itemValue: T) => void;
  items: { label: string; value: T }[];
}

const DOCPicker = <T,>({
  selectedValue,
  onValueChange,
  items,
  testID,
}: DOCPickerProps<T>) => {
  return (
    <Picker
      testID={testID}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={localStyles.picker}
    >
      {items.map((item) => (
        <Picker.Item
          key={String(item.value)}
          label={item.label}
          value={item.value}
        />
      ))}
    </Picker>
  );
};
const localStyles = StyleSheet.create({
  picker: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: colors.docGray,
  },
});

export default DOCPicker;
