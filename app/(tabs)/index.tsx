import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
} from 'react-native-reorderable-list';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditTimetableModal from "../../components/EditTimetableModal";
import { useState, useCallback, useEffect, useLayoutEffect } from "react";
import { updateTimeframes, deleteTimeframe } from "../../utils/TimeframeUpdater";
import { defaultTimeframes, defaultNewItem } from "../../utils/TimeframeStore";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import TimetableItem from "../../components/TimetableItem";
import React from "react";
import styles from "../../styles";
import { useSettingsContext } from "@/data/SettingsContext";

export default function Tab() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { settings, updateSettings } = useSettingsContext();

  const [newItem, setNewItem] = useState(defaultNewItem());

  const handleAdd = () => {
    setNewItem({ ...defaultNewItem(), id: (settings.timeframes.length + 1).toString() });
    setModalVisible(true);
  };

  const handleSave = (updatedItem) => {
    const prevTimeframes = settings.timeframes;
    const { success, timeframes } = updateTimeframes(prevTimeframes, updatedItem);
    if (!success) {
      alert("Cannot enable more than 6 timeframes.");
    }
    updateSettings({ timeframes: timeframes });
    setModalVisible(false);
    return timeframes;
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleDelete = (id) => {
    updateSettings({ timeframes: deleteTimeframe(settings.timeframes, id) });
  };

  const handleReorder = ({ from, to }: ReorderableListReorderEvent) => {
    updateSettings({ timeframes: reorderItems(settings.timeframes, from, to) });
  };

  useFocusEffect(
    useCallback(() => {
      return () => setEditMode(false);
    }, [])
  );

  useLayoutEffect(() => {
    const enabledTimeframesCount = settings.timeframes.filter(item => item.enabled).length;
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtonsContainer}>
          <TouchableOpacity onPress={handleAdd} disabled={enabledTimeframesCount >= 6} style={[styles.headerButton, { opacity: enabledTimeframesCount >= 6 ? 0.5 : 1 }]}>
            <Ionicons name="add" size={24} style={styles.headerButtonText} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleEditMode} style={styles.headerButton}>
            <Text style={[styles.headerButtonText, { fontWeight: editMode ? "bold" : "normal" }]}>{editMode ? "Done" : "Edit"}</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, settings.timeframes, editMode]);
  const renderItem = ({ item }) => (
    <TimetableItem
      item={item}
      onPress={() => editMode && handleDelete(item.id)}
      editMode={editMode}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
  return (
    <View style={styles.listContainer}>
      <EditTimetableModal
        visible={modalVisible}
        item={newItem}
        onSave={handleSave}
        onCancel={() => setModalVisible(false)}
      />
      <ReorderableList
        style={styles.list}
        data={settings.timeframes}
        onReorder={handleReorder}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}
