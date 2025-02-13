import { FlatList, View, Text, TouchableOpacity, BackHandler } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditTimetableModal from "../../components/EditTimetableModal";
import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import TimetableItem from "../../components/TimetableItem";
import React from "react";
import styles from "../../styles";

export default function Tab() {
  const [timeframes, setTimeframes] = useState([
    { id: "1", protocol: "High", start_hour: 8, start_minute: 0, end_hour: 10, end_minute: 0, enabled: true },
    { id: "2", protocol: "Low", start_hour: 10, start_minute: 0, end_hour: 12, end_minute: 0, enabled: false },
    { id: "3", protocol: "Bat", start_hour: 12, start_minute: 0, end_hour: 14, end_minute: 0, enabled: true },
    {
      id: "4",
      protocol: "Tier1",
      start_hour: 14, start_minute: 0, end_hour: 16, end_minute: 0,
      enabled: false,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const defaultNewItem = {
    id: "",
    protocol: "High",
    start_hour: 12,
    start_minute: 0,
    end_hour: 13,
    end_minute: 0,
    enabled: true,
  };

  const [newItem, setNewItem] = useState(defaultNewItem);

  const handleAdd = () => {
    setEditMode(false);
    setNewItem({ ...defaultNewItem, id: (timeframes.length + 1).toString() });
    setModalVisible(true);
  };

  const handleSave = (updatedItem) => {
    setTimeframes((prevTimeframes) => {
      const index = prevTimeframes.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        // Update existing item
        const newTimeframes = [...prevTimeframes];
        newTimeframes[index] = updatedItem;
        return newTimeframes;
      }
      // Add new item
      return [...prevTimeframes, updatedItem];
    });
    setTimeframes((prevTimeframes) => {
      const index = prevTimeframes.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        // Update existing item
        const newTimeframes = [...prevTimeframes];
        newTimeframes[index] = updatedItem;
        return newTimeframes;
      }
      // Add new item
      return [...prevTimeframes, updatedItem];
    });
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedItems([]);
  };

  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleDelete = () => {
    setTimeframes(timeframes.filter(item => !selectedItems.includes(item.id)));
    setEditMode(false);
  };

  useEffect(() => {
    const backAction = () => {
      if (editMode) {
        setEditMode(false);
        setSelectedItems([]);
        return true; // Prevent default behavior (app closing)
      }
      return false; // Allow default behavior
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, [editMode]);
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (editMode) {
          setEditMode(false);
          setSelectedItems([]);
        }
      };
    }, [editMode])
  );
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <TouchableOpacity onPress={handleAdd} disabled={timeframes.length >= 6} style={{ minHeight: 44, minWidth: 44, justifyContent: "center", opacity: timeframes.length >= 6 ? 0.5 : 1 }}>
          <Ionicons name="add" size={24} style={{ marginHorizontal: 10 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={editMode ? handleDelete : toggleEditMode} style={{ minHeight: 44, minWidth: 44, justifyContent: "center" }}>
          <Text style={{ marginHorizontal: 10, fontSize: 18 }}>{editMode ? "Delete" : "Edit"}</Text>
        </TouchableOpacity>
      </View>
      <EditTimetableModal
        visible={modalVisible}
        item={newItem}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <FlatList
        style={styles.list}
        data={timeframes}
        renderItem={({ item }) => (
          <TimetableItem
            item={item}
            onPress={() => editMode && handleSelectItem(item.id)}
            selected={selectedItems.includes(item.id)}
            editMode={editMode}
            onSave={handleSave}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
