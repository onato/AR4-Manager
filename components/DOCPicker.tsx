import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleProp, TextStyle } from 'react-native';

interface DOCPickerProps<T> {
  selectedValue: T;
  onValueChange: (itemValue: T) => void;
  items: { label: string; value: T }[];
  style?: StyleProp<TextStyle>;
}

const DOCPicker = <T,>({ selectedValue, onValueChange, items, style }: DOCPickerProps<T>) => {
  return (
    <Picker selectedValue={selectedValue} onValueChange={onValueChange} style={style}>
      {items.map((item) => (
        <Picker.Item key={String(item.value)} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
};

export default DOCPicker;
