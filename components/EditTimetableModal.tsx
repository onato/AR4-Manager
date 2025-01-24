import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button } from 'react-native';
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

  const handleSave = () => {
    onSave({ ...item, protocol, start, end, enabled });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Edit Timetable Item</Text>
        <TextInput style={styles.input} value={protocol} onChangeText={setProtocol} placeholder="Protocol" />
        <TextInput style={styles.input} value={start} onChangeText={setStart} placeholder="Start Time" />
        <TextInput style={styles.input} value={end} onChangeText={setEnd} placeholder="End Time" />
        <View style={styles.buttonRow}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={onCancel} />
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
