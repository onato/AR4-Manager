import React, { useState, useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditTimetableModal from "./EditTimetableModal";
import * as Haptics from 'expo-haptics';
import colors from "../colors";
import { useReorderableDrag } from 'react-native-reorderable-list';

interface TimetableItemProps {
  item: {
    id: string;
    protocol: string;
    start_hour: number;
    start_minute: number;
    end_hour: number;
    end_minute: number;
    enabled: boolean;
  };
  editMode: boolean;
  onSave: (updatedItem: any) => void;
  onDelete: (id: string) => void;
}

const TimetableItem: React.FC<TimetableItemProps> = ({ item, editMode, onSave, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const drag = useReorderableDrag();

  // Grouped shared values
  const positions = {
    switch: useSharedValue(editMode ? 100 : 25),
    delete: useSharedValue(editMode ? 0 : -50),
    dragHandle: useSharedValue(editMode ? 0 : 50),
    text: useSharedValue(editMode ? 0 : -50),
  };

  // Single useEffect for animations
  useEffect(() => {
    const toValue = (value: number) => withTiming(value, { duration: 300 });

    positions.switch.value = toValue(editMode ? 100 : 25);
    positions.delete.value = toValue(editMode ? 0 : -50);
    positions.dragHandle.value = toValue(editMode ? 0 : 50);
    positions.text.value = toValue(editMode ? 0 : -50);
  }, [editMode]);

  // Function to generate animated styles
  const createAnimatedStyle = (position: Animated.SharedValue<number>) =>
    useAnimatedStyle(() => ({
      transform: [{ translateX: position.value }],
    }));

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={localStyles.item}>
        <Animated.View style={createAnimatedStyle(positions.delete)}>
          <TouchableOpacity onPress={() => onDelete(item.id)} style={localStyles.listRowAccessory}>
            <Ionicons name="remove-circle" size={24} color="red" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={createAnimatedStyle(positions.text)}>
          <View style={localStyles.timespan}>
            <Text style={localStyles.largeText}>
              {item.start_hour.toString().padStart(2, '0')}:{item.start_minute.toString().padStart(2, '0')} -
              {item.end_hour.toString().padStart(2, '0')}:{item.end_minute.toString().padStart(2, '0')}
            </Text>
            <Text style={localStyles.text}>{item.protocol}</Text>
          </View>
        </Animated.View>

        <Animated.View style={createAnimatedStyle(positions.switch)}>
          <Switch
            value={item.enabled}
            onValueChange={(newValue) => {
              onSave({ ...item, enabled: newValue });
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            thumbColor={item.enabled ? colors.docBlue : "#f4f3f4"}
            trackColor={{ false: "#767577", true: colors.docGrayLight }}
            style={localStyles.listRowAccessory}
          />
        </Animated.View>

        <Animated.View style={createAnimatedStyle(positions.dragHandle)}>
          <TouchableOpacity onPressIn={drag} style={localStyles.grabber}>
            <MaterialIcons name="drag-handle" size={24} color="gray" />
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>

      <EditTimetableModal
        visible={modalVisible}
        item={item}
        onSave={(updatedItem) => {
          onSave(updatedItem);
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
      />
    </>
  );
};

const localStyles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    minHeight: 44,
    minWidth: 44,
    paddingRight: 20,
  },
  grabber: {
    padding: 10,
  },
  listRowAccessory: {
    padding: 20,
    paddingRight: 0,
    width: 50,
  },
  timespan: {
    padding: 10,
  },
  text: {
    fontSize: 22,
  },
  largeText: {
    fontSize: 38,
  },
});

export default TimetableItem;
