import React, { useState } from 'react';
import { Modal, View, Text, Button, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles';

interface EditTimetableModalProps {
  visible: boolean;
  item: {
    protocol: string;
    start: string;
    end: string;
    enabled: boolean;
  };
  onSave: (updatedItem: any) => void;
  onCancel: () => void;
}

const EditTimetableModal: React.FC<EditTimetableModalProps> = ({ visible, item, onSave, onCancel }) => {
  const [protocol, setProtocol] = useState(item.protocol);
  const [start, setStart] = useState(item.start);
  const [end, setEnd] = useState(item.end);
  const [enabled, setEnabled] = useState(item.enabled);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleStartChange = (event: any, selectedDate: Date | undefined) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStart(selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  const handleEndChange = (event: any, selectedDate: Date | undefined) => {
    setShowEndPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEnd(selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  const handleSave = () => {
    onSave({ ...item, protocol, start, end, enabled });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={[styles.modalContainer, { justifyContent: 'flex-start' }]}>
        <Text style={styles.modalTitle}>Edit Timetable Item</Text>
        <Text style={styles.label}>Protocol</Text>
        <Picker
          selectedValue={protocol}
          onValueChange={(itemValue) => setProtocol(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="High" value="High" />
          <Picker.Item label="Low" value="Low" />
          <Picker.Item label="Bat" value="Bat" />
          <Picker.Item label="Tier1" value="Tier1" />
        </Picker>
        <Text style={styles.label}>Start Time</Text>
        <Button title={start} onPress={() => setShowStartPicker(true)} />
        {showStartPicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display="default"
            onChange={handleStartChange}
          />
        )}

        <Text style={styles.label}>End Time</Text>
        <Button title={end} onPress={() => setShowEndPicker(true)} />
        {showEndPicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display="default"
            onChange={handleEndChange}
          />
        )}
        <View style={styles.buttonRow}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={onCancel} color='gray' />
          </View>
          <View style={styles.button}>
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditTimetableModal;
