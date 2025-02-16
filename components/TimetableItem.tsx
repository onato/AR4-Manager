import React, { useState } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { View, Text, Switch, Pressable, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditTimetableModal from "./EditTimetableModal";
import * as Haptics from 'expo-haptics';
import styles from "../styles";
import colors from "../colors";
import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
  useReorderableDrag,
} from 'react-native-reorderable-list';

interface TimetableItemProps {
  item: {
    protocol: string;
    start: string;
    end: string;
    enabled: boolean;
  };

  onSave: (updatedItem: any) => void;
  onDelete: (id: string) => void;
  editMode: boolean;
}

const TimetableItem: React.FC<TimetableItemProps> = ({ item, editMode, onSave, onDelete, isActive }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const drag = useReorderableDrag();
  const switchPosition = useSharedValue(editMode ? 100 : 25);
  const deletePosition = useSharedValue(editMode ? 0 : -50);
  const dragHandlePosition = useSharedValue(editMode ? 0 : 50);
  const textPosition = useSharedValue(editMode ? 0 : -50);

  const handleDelete = () => {
    onDelete(item.id);
  };

  const animatedSwitchStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(switchPosition.value, { duration: 300 }) }],
    };
  });
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(textPosition.value, { duration: 300 }) }],
    };
  });
  const animatedDragHandleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(dragHandlePosition.value, { duration: 300 }) }],
    };
  });
  const animatedDeleteStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(deletePosition.value, { duration: 300 }) }],
    };
  });
  
  React.useEffect(() => {
    switchPosition.value = editMode ? 100 : 25;
    deletePosition.value = editMode ? 0 : -50;
    dragHandlePosition.value = editMode ? 0 : 50;
    textPosition.value = editMode ? 0 : -50;
  }, [editMode]);

  const handleSave = (updatedItem: any) => {
    onSave(updatedItem);
    setModalVisible(false);
  };

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleSwitch = (updatedItem: any) => {
    onSave(updatedItem);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <>
      <Pressable disabled={isActive} style={styles.item}>
        <Animated.View style={animatedDeleteStyle}>
          <TouchableOpacity onPress={handleDelete} style={styles.listRowAccessory}>
            <Ionicons name="remove-circle" size={24} color="red" style={{align: 'right'}}/>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={animatedTextStyle}>
          <View style={styles.timespan}>
            <Text style={styles.largeText}>
              {item.start_hour.toString().padStart(2, '0')}:{item.start_minute.toString().padStart(2, '0')} - {item.end_hour.toString().padStart(2, '0')}:{item.end_minute.toString().padStart(2, '0')}
            </Text>
            <Text style={styles.text}>{item.protocol}</Text>
          </View>
        </Animated.View>
        <Animated.View style={animatedSwitchStyle}>
          <Switch
            value={item.enabled}
            onValueChange={(newValue) => handleSwitch({ ...item, enabled: newValue })}
            thumbColor={item.enabled ? colors.docBlue: "#f4f3f4"}
            trackColor={{ false: "#767577", true: colors.docGrayLight }}
            style={styles.listRowAccessory}
          />
        </Animated.View>
        <Animated.View style={animatedDragHandleStyle}>
          <TouchableOpacity onPressIn={drag} style={styles.grabber}>
            <MaterialIcons name="drag-handle" size={24} color="gray" />
          </TouchableOpacity>
        </Animated.View>

      </Pressable>
      <EditTimetableModal
        visible={modalVisible}
        item={item}
        onSave={handleSave}
        onCancel={() => setModalVisible(false)}
      />
    </>
  );
};

export default TimetableItem;
