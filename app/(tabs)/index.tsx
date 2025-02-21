import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
} from 'react-native-reorderable-list';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditTimetableModal from "../../components/EditTimetableModal";
import { useState, useCallback, useEffect, useLayoutEffect } from "react";
import { loadTimeframes, saveTimeframes } from "../../utils/storage";
import { updateTimeframes, deleteTimeframe } from "../../utils/TimeframeUpdater";
import { defaultTimeframes, defaultNewItem } from "../../utils/TimeframeStore";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import TimetableItem from "../../components/TimetableItem";
import React from "react";
import styles from "../../styles";

export default function Tab() {
  const navigation = useNavigation();
  const [timeframes, setTimeframes] = useState([]);

  useEffect(() => {
    const fetchTimeframes = async () => {
      const storedTimeframes = await loadTimeframes();
      if (storedTimeframes) {
        setTimeframes(storedTimeframes);
      } else {
        setTimeframes(defaultTimeframes());
      }
    };

    fetchTimeframes();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [newItem, setNewItem] = useState(defaultNewItem());

  const handleAdd = () => {
    setNewItem({ ...defaultNewItem(), id: (timeframes.length + 1).toString() });
    setModalVisible(true);
  };

  const handleSave = (updatedItem) => {
    setTimeframes((prevTimeframes) => {
      const { success, timeframes } = updateTimeframes(prevTimeframes, updatedItem);
      if (!success) {
        alert("Cannot enable more than 6 timeframes.");
      }
      return timeframes;
    });
    setModalVisible(false);
  };

  useEffect(() => {
    saveTimeframes(timeframes);
  }, [timeframes]); // Runs every time `timeframes` changes

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleDelete = (id) => {
    setTimeframes((prev) => deleteTimeframe(prev, id));
  };

  const handleReorder = ({ from, to }: ReorderableListReorderEvent) => {
    setTimeframes(value => reorderItems(value, from, to));
  };

  useFocusEffect(
    useCallback(() => {
      return () => setEditMode(false);
    }, [])
  );

  useLayoutEffect(() => {
    const enabledTimeframesCount = timeframes.filter(item => item.enabled).length;
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
  }, [navigation, timeframes, editMode]);
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
        data={timeframes}
        onReorder={handleReorder}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}
