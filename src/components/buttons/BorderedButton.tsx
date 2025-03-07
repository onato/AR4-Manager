import React from "react";
import { Button } from "react-native-paper";
import colors from "@/colors";
import { StyleSheet } from "react-native";

type BorderedButtonProps = {
  title: string;
  onPress: () => void;
  color?: string;
  disabled?: boolean;
  testID?: string;
};
const BorderedButton: React.FC<BorderedButtonProps> = ({
  title,
  onPress,
  color,
  disabled = false,
  testID,
}) => {
  return (
    <Button
      style={[
        textStyles.borderedButton,
        disabled && textStyles.disabledButton,
        color && { backgroundColor: color },
      ]}
      mode="contained"
      onPress={onPress}
      disabled={disabled}
      {...(testID ? { testID: testID } : {})}
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
