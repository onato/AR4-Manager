import { View, StyleSheet } from "react-native";
import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
} from "react-native-reorderable-list";
import EditTimeframeModal from "@/components/modals/EditTimeframeModal";
import { useState, useCallback, useLayoutEffect } from "react";
import {
  updateTimeframes,
  deleteTimeframe,
} from "@/data/TimeframeUpdater";
import { defaultNewItem } from "@/data/TimeframeStore";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import TimetableItem from "@/components/table/TimetableItem";
import AddEditHeaderButtons from "@/components/headers/AddEditHeaderButtons";
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

  useFocusEffect(
    useCallback(() => {
      return () => setEditMode(false);
    }, []),
  );

  const RightHeaderComponentLocal = useCallback(() => {
    return (
      <AddEditHeaderButtons
        handleAdd={handleAdd}
        toggleEditMode={toggleEditMode}
        editMode={editMode}
      />
    );
  }, [editMode, settings.timeframes, handleAdd]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: RightHeaderComponentLocal,
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
        testID="edit-timeframe-modal"
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
