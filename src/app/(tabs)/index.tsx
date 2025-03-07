import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
} from "react-native-reorderable-list";
import Ionicons from "react-native-vector-icons/Ionicons";
import EditTimeframeModal from "@/components/modals/EditTimeframeModal";
import { useState, useCallback, useLayoutEffect } from "react";
import {
  updateTimeframes,
  deleteTimeframe,
} from "@/data/TimeframeUpdater";
import { defaultNewItem } from "@/data/TimeframeStore";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import TimetableItem from "@/components/table/TimetableItem";
import colors from "@/colors";
import { useSettingsContext } from "@/data/SettingsContext";
import Timeframe from "@/data/Timeframe";

export default function Tab() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { settings, updateSettings } = useSettingsContext();

  const [newItem, setNewItem] = useState(defaultNewItem());

  const handleAdd = useCallback(() => {
    setNewItem({
      ...defaultNewItem(),
      id: (settings.timeframes.length + 1).toString(),
    });
    setModalVisible(true);
  }, [settings.timeframes]);

  const handleSave = (updatedItem: Timeframe) => {
    const prevTimeframes = settings.timeframes;
    const { success, timeframes } = updateTimeframes(
      prevTimeframes,
      updatedItem,
    );
    if (!success) {
      alert("Cannot enable more than 6 timeframes.");
    }
    updateSettings({ timeframes: timeframes });
    setModalVisible(false);
    return timeframes;
  };

  const toggleEditMode = useCallback(() => {
    setEditMode(!editMode);
  }, [editMode]);

  const handleDelete = (id: string) => {
    updateSettings({ timeframes: deleteTimeframe(settings.timeframes, id) });
  };

  const handleReorder = ({ from, to }: ReorderableListReorderEvent) => {
    updateSettings({ timeframes: reorderItems(settings.timeframes, from, to) });
  };

  const RightHeaderComponent = useCallback(() => {
    const enabledTimeframesCount = settings.timeframes.filter(
      (item) => item.enabled,
    ).length;

    return (
      <View style={localStyles.headerButtonsContainer}>
        <TouchableOpacity
          onPress={handleAdd}
          disabled={enabledTimeframesCount >= 6}
          style={[
            localStyles.headerButton,
            { opacity: enabledTimeframesCount >= 6 ? 0.5 : 1 },
          ]}
          testID="add"
        >
          <Ionicons
            name="add"
            size={24}
            style={localStyles.headerButtonText}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleEditMode}
          style={localStyles.headerButton}
          testID={editMode ? "done" : "edit"}
        >
          <Text
            style={[
              localStyles.headerButtonText,
              { fontWeight: editMode ? "bold" : "normal" },
            ]}
          >
            {editMode ? "Done" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }, [editMode, settings.timeframes, handleAdd]);


  useFocusEffect(
    useCallback(() => {
      return () => setEditMode(false);
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: RightHeaderComponent,
    });
  }, [navigation, settings.timeframes, editMode, handleAdd, toggleEditMode]);

  const renderItem = ({ item }: { item: Timeframe }) => (
    <TimetableItem
      item={item}
      editMode={editMode}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
  return (
    <View style={localStyles.listContainer}>
      <EditTimeframeModal
        visible={modalVisible}
        item={newItem}
        onSave={handleSave}
        onCancel={() => setModalVisible(false)}
      />
      <ReorderableList
        data={settings.timeframes}
        onReorder={handleReorder}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        testID="reorderable-list"
      />
    </View>
  );
}
const localStyles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
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
