import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'
import styles from '../styles';
import colors from '../colors';
import { Protocol } from '@onato/doc-nfc-module';
import BorderedButton from '../components/BorderedButton';
import { Timeframe } from '../models/Timeframe';
import TextButton from '../components/TextButton';
import LogoTitle from '../components/LogoTitle';

interface EditTimetableModalProps {
  visible: boolean;
  item: Timeframe;
  onSave: (updatedItem: Timeframe) => void;
  onCancel: () => void;
}

const EditTimetableModal: React.FC<EditTimetableModalProps> = ({ visible, item, onSave, onCancel }) => {
  const [protocol, setProtocol] = useState(item?.protocol || 'High');
  const [start, setStart] = useState(item ? `${item.start_hour}:${item.start_minute.toString().padStart(2, '0')}` : '12:00');
  const [end, setEnd] = useState(item ? `${item.end_hour}:${item.end_minute.toString().padStart(2, '0')}` : '13:00');

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleStartChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setStart(selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }
    setShowStartPicker(false)
  };

  const handleEndChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setEnd(selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }
    setShowEndPicker(false)
  };

  const handleSave = () => {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    onSave({ ...item, protocol, start_hour: startHour, start_minute: startMinute, end_hour: endHour, end_minute: endMinute });
  };

  function time(hour: number, minute: number) {
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date;
  }

  return (
    <View>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={localStyles.modalContainer}>
          <LogoTitle title="Edit Timetable Item" style={localStyles.modalTitleContainer} />
          <View style={localStyles.form}>
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
            <BorderedButton
              title={start}
              onPress={() => setShowStartPicker(true)}
              disabled={protocol.indexOf("Tier1") !== -1}
            />
            <DatePicker
              title="Start Time"
              locale="de_DE"
              is24hourSource="locale"
              modal
              open={showStartPicker}
              date={time(item.start_hour, item.start_minute)}
              mode="time"
              buttonColor={colors.docBlue}
              dividerColor={colors.docYellow}
              minuteInterval={5}
              onConfirm={handleStartChange}
              onCancel={() => {
                setShowStartPicker(false)
              }}
            />

            <Text style={styles.label}>Stop</Text>
            <BorderedButton
              title={end}
              onPress={() => setShowEndPicker(true)}
              disabled={protocol.indexOf("Tier1") !== -1}
            />
            <DatePicker
              title="Stop Time"
              locale="de_DE"
              is24hourSource="locale"
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
              <Text style={{ padding: 10 }}>
                The times are set automatically by the device when using a Tier1 protocol.
              </Text>
            )}
          </View>
          <View style={localStyles.buttonRow}>
            <View style={localStyles.button}>
              <TextButton title="Cancel" onPress={onCancel} />
            </View>
            <View style={localStyles.button}>
              <TextButton title="Save" onPress={handleSave} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const localStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
  },
  modalTitleContainer: {
    padding: 18,
    paddingLeft: 16,
    marginBottom: 20,
  },
  form: {
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: colors.androidNavWhite,
    position: 'absolute',
    bottom: 0,
    paddingTop: 15,
    paddingBottom: 15,
  },
  button: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

export default EditTimetableModal;
