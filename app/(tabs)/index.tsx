import { View, Text, TouchableOpacity, BackHandler } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import Animated, { Layout, FadeIn, FadeOut } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditTimetableModal from "../../components/EditTimetableModal";
import { useState, useCallback, useEffect, useLayoutEffect } from "react";
import { loadTimeframes, saveTimeframes } from "../../utils/storage";
import {timeframeStore, defaultNewItem} from "../../utils/TimeframeStore.js";
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
        setTimeframes(timeframeStore.defaultTimeframes);
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
      const index = prevTimeframes.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        const newTimeframes = [...prevTimeframes];
        newTimeframes[index] = updatedItem;
        return newTimeframes;
      }
      return [...prevTimeframes, updatedItem];
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
    setTimeframes((prev) => {
      const updatedTimeframes = prev.filter((item) => item.id !== id);
      return updatedTimeframes.map((item, index) => ({ ...item, id: index.toString() }));
    });
  };

  useFocusEffect(
    useCallback(() => {
      return () => setEditMode(false);
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtonsContainer}>
          <TouchableOpacity onPress={handleAdd} disabled={timeframes.length >= 6} style={[styles.headerButton, { opacity: timeframes.length >= 6 ? 0.5 : 1 }]}>
            <Ionicons name="add" size={24} style={styles.headerButtonText} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleEditMode} style={styles.headerButton}>
            <Text style={[styles.headerButtonText, { fontWeight: editMode ? "bold" : "normal" }]}>{editMode ? "Done" : "Edit"}</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, timeframes.length, editMode]);
  return (
    <View style={styles.listContainer}>
      <EditTimetableModal
        visible={modalVisible}
        item={newItem}
        onSave={handleSave}
        onCancel={() => setModalVisible(false)}
      />
      <DraggableFlatList
        style={styles.list}
        data={timeframes}
        onDragEnd={({ data }) => {
          const updatedData = data.map((item, index) => ({ ...item, id: index.toString() }));
          setTimeframes(updatedData);
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item, drag, isActive }) => (
          <Animated.View entering={FadeIn} exiting={FadeOut} layout={Layout}>
            <TimetableItem
              item={item}
              onPress={() => editMode && handleDelete(item.id)}
              editMode={editMode}
              onSave={handleSave}
              onDelete={handleDelete}
              drag={drag}
              isActive={isActive}
            />
          </Animated.View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
