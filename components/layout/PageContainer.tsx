import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import colors from "../../colors";

interface PageContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.white,
    justifyContent: "center",
  },
});

export default PageContainer;
