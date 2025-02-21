import React from 'react';
import { Button } from 'react-native-paper';
import colors from '../colors.js';
import { StyleSheet } from "react-native";

type BorderedButtonProps = {
  title: string,
  onPress: () => void,
  color?: string,
  disabled?: boolean,
}
const BorderedButton: React.FC<BorderedButtonProps> = ({
  title,
  onPress,
  color,
  disabled = false,
}) => {
  return (
    <Button
      style={[textStyles.borderedButton, disabled && textStyles.disabledButton, color && { backgroundColor: color }]}
      mode="contained"
      onPress={onPress}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

const textStyles = StyleSheet.create({
  borderedButton: {
    minHeight: 44,
    backgroundColor: colors.docBlue,
    color: colors.white,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: colors.docGrayLight,
    opacity: 0.5,
  },
});

export default React.memo(BorderedButton);
