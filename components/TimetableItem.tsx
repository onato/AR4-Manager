import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditTimetableModal from "./EditTimetableModal";
import * as Haptics from 'expo-haptics';
import styles from "../styles";
import colors from "../colors";

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

const TimetableItem: React.FC<TimetableItemProps> = ({ item, editMode, onSave, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
    onDelete(item.id);
  };

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
      <TouchableOpacity onPress={handlePress} style={styles.item}>
        <View style={styles.timespan}>
          <Text style={styles.largeText}>
            {item.start_hour.toString().padStart(2, '0')}:{item.start_minute.toString().padStart(2, '0')} - {item.end_hour.toString().padStart(2, '0')}:{item.end_minute.toString().padStart(2, '0')}
          </Text>
          <Text style={styles.text}>{item.protocol}</Text>
        </View>
        {editMode ? (
          <TouchableOpacity onPress={handleDelete} style={styles.listRowAccessory}>
            <Ionicons name="trash" size={24} color="red" style={{align: 'right'}}/>
          </TouchableOpacity>
        ) : (
          <Switch
            value={item.enabled}
            onValueChange={(newValue) => handleSwitch({ ...item, enabled: newValue })}
            thumbColor={item.enabled ? colors.docBlue: "#f4f3f4"}
            trackColor={{ false: "#767577", true: colors.docBlueLight }}
            style={styles.listRowAccessory}
          />
        )}
      </TouchableOpacity>
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
