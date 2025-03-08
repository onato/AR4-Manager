import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "@/colors";
import { useSettingsContext } from "@/data/SettingsContext";

interface AddEditHeaderButtonsProps {
  handleAdd: () => void;
  toggleEditMode: () => void;
  editMode: boolean;
}

const AddEditHeaderButtons: React.FC<AddEditHeaderButtonsProps> = ({
  handleAdd,
  toggleEditMode,
  editMode,
}) => {
  const { settings } = useSettingsContext();
  const enabledTimeframesCount = settings.timeframes.filter(
    (item) => item.enabled,
  ).length;

  return (
    <View style={styles.headerButtonsContainer}>
      <TouchableOpacity
        onPress={handleAdd}
        disabled={enabledTimeframesCount >= 6}
        style={[
          styles.headerButton,
          { opacity: enabledTimeframesCount >= 6 ? 0.5 : 1 },
        ]}
        testID="add"
      >
        <Ionicons name="add" size={24} style={styles.headerButtonText} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={toggleEditMode}
        style={styles.headerButton}
        testID={editMode ? "done" : "edit"}
      >
        <Text
          style={[
            styles.headerButtonText,
            { fontWeight: editMode ? "bold" : "normal" },
          ]}
        >
          {editMode ? "Done" : "Edit"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerButtonsContainer: {
    flexDirection: "row",
    paddingRight: 10,
  },
  headerButton: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: "center",
  },
  headerButtonText: {
    marginHorizontal: 5,
    fontSize: 18,
    textAlign: "center",
    color: colors.white,
    width: 50,
  },
});

export default AddEditHeaderButtons;
