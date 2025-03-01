import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import DOCPicker from '../forms/DOCPicker';
import colors from '../../colors';
import { Protocol } from '@onato/doc-nfc-module';
import Timeframe from '../../data/Timeframe';
import DOCLable from '../forms/DOCLable';
import TimePicker from '../forms/TimePicker';
import TextButton from '../buttons/TextButton';
import LogoTitle from '../icons/LogoTitle';

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

  const handleSave = () => {
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);
    onSave({ ...item, protocol, start_hour: startHour, start_minute: startMinute, end_hour: endHour, end_minute: endMinute });
  };

  return (
    <View>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={localStyles.modalContainer}>
          <LogoTitle title="Edit Timetable Item" style={localStyles.modalTitleContainer} />
          <View style={localStyles.form}>
            <DOCLable>Protocol</DOCLable>
            <DOCPicker
              selectedValue={protocol}
              onValueChange={(itemValue) => setProtocol(String(itemValue))}
              items={Object.values(Protocol).map((protocolValue) => ({
                label: protocolValue,
                value: protocolValue,
              }))}
            />
            <TimePicker
              label="Start"
              time={start}
              onTimeChange={setStart}
              disabled={protocol.indexOf("Tier1") !== -1}
            />
            <TimePicker
              label="Stop"
              time={end}
              onTimeChange={setEnd}
              disabled={protocol.indexOf("Tier1") !== -1}
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
