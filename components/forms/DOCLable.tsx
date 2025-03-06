import React from "react";
import { Text, StyleSheet } from "react-native";

interface DOCLableProps {
  children: React.ReactNode;
}

const DOCLable: React.FC<DOCLableProps> = ({ children }) => {
  return <Text style={localStyles.label}>{children}</Text>;
};

const localStyles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default DOCLable;
