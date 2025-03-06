import React from 'react';
import { Button } from 'react-native-paper';
import { StyleProp, ViewStyle, StyleSheet } from "react-native";

type TextButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string,
};

const TextButton: React.FC<TextButtonProps> = ({
  title,
  onPress,
  disabled = false,
  testID
}) => {
  return (
    <Button
      labelStyle={styles.textButtonText}
      mode="text"
      onPress={onPress}
      disabled={disabled}
      {...(testID ? { testID: testID } : {})}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  textButtonText: {
    color: "black",
    fontSize: 18,
  },
});

export default React.memo(TextButton);
