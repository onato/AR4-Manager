import React, { useState } from 'react';
import { Modal, View, Text, Button, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'
import styles from '../styles';
import { Protocol } from 'doc-nfc-module';

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
  const [protocol, setProtocol] = useState(item?.protocol || 'High');
  const [start, setStart] = useState(item ? `${item.start_hour}:${item.start_minute.toString().padStart(2, '0')}` : '12:00');
  const [end, setEnd] = useState(item ? `${item.end_hour}:${item.end_minute.toString().padStart(2, '0')}` : '13:00');
  const [enabled, setEnabled] = useState(item?.enabled || true);

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleStartChange = (selectedDate: Date | undefined) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStart(selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }
    setShowStartPicker(false)
  };

  const handleEndChange = (selectedDate: Date | undefined) => {
    setShowEndPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEnd(selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }
    setShowEndPicker(false)
  };

  const handleSave = () => {
    onSave({ ...item, protocol, start, end, enabled });
  };

  function time(hour, minute) {
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date;
  }

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
          {Object.values(Protocol).map((protocolValue) => (
            <Picker.Item key={protocolValue} label={protocolValue} value={protocolValue} />
          ))}
        </Picker>
        <Text style={styles.label}>Start</Text>
        <Button
          title={start}
          onPress={() => setShowStartPicker(true)}
          disabled={protocol.indexOf("Tier1") !== -1}
        />
        <DatePicker
          title="Start Time"
          modal
          open={showStartPicker}
          date={time(item.start_hour, item.start_minute)}
          mode="time"
          minuteInterval={5}
          onConfirm={handleStartChange}
          onCancel={() => {
            setShowStartPicker(false)
          }}
        />

        <Text style={styles.label}>Stop</Text>
        <Button
          title={end}
          onPress={() => setShowEndPicker(true)}
          disabled={protocol.indexOf("Tier1") !== -1}
        />
        <DatePicker
          title="Stop Time"
          modal
          open={showEndPicker}
          date={time(item.end_hour, item.end_minute)}
          mode="time"
          minuteInterval={5}
          onConfirm={handleEndChange}
          onCancel={() => {
            setShowEndPicker(false)
          }}
        />
        {protocol.indexOf("Tier1") !== -1 && (
          <Text style={styles.infoText}>
            The times are set automatically by the device when using a Tier1 protocol.
          </Text>
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
