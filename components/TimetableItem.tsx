import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditTimetableModal from "./EditTimetableModal";
import styles from "../styles";

interface TimetableItemProps {
  item: {
    protocol: string;
    start: string;
    end: string;
    enabled: boolean;
  };
  onPress: () => void;
  selected: boolean;
  onSave: (updatedItem: any) => void;
  editMode: boolean;
}

const TimetableItem: React.FC<TimetableItemProps> = ({ item, onPress, selected, editMode, onSave }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSave = (updatedItem: any) => {
    onSave(updatedItem);
    setModalVisible(false);
  };

  const handlePress = () => {
    if (editMode) {
      onPress();
    } else {
      setModalVisible(true);
    }
  };
  return (
    <>
      <TouchableOpacity onPress={handlePress} style={[styles.item, selected && styles.selected, { minHeight: 44, minWidth: 44, flexDirection: 'row', alignItems: 'center' }]}>
        {editMode && (
          <>
            {selected ? (
              <Ionicons name="radio-button-on" size={24} style={{ marginRight: 10 }} />
            ) : (
              <Ionicons name="radio-button-off" size={24} style={{ marginRight: 10 }} />
            )}
          </>
        )}
        <Text style={styles.text}>{item.protocol}</Text>
        <Text style={styles.text}>
          {item.start_hour}:{item.start_minute.toString().padStart(2, '0')} - {item.end_hour}:{item.end_minute.toString().padStart(2, '0')}
        </Text>
        <Switch
          value={item.enabled}
          onValueChange={(newValue) => onSave({ ...item, enabled: newValue })}
        />
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
