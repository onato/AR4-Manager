import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DatePicker from 'react-native-date-picker';
import BorderedButton from '../buttons/BorderedButton';
import colors from '../../colors';

interface TimePickerProps {
  label: string;
  time: string;
  onTimeChange: (time: string) => void;
  disabled: boolean;
}

const TimePicker: React.FC<TimePickerProps> = ({ label, time, onTimeChange, disabled }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleTimeChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      onTimeChange(selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    }
    setShowPicker(false);
  };

  function timeToDate(hour: number, minute: number) {
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date;
  }

  return (
    <View>
      <Text style={{ padding: 10 }}>{label}</Text>
      <BorderedButton
        title={time}
        onPress={() => setShowPicker(true)}
        disabled={disabled}
      />
      <DatePicker
        title={label}
        locale="de_DE"
        is24hourSource="locale"
        modal
        open={showPicker}
        date={time ? timeToDate(...time.split(':').map(Number).slice(0, 2) as [number, number]) : new Date()}
        mode="time"
        buttonColor={colors.docBlue}
        dividerColor={colors.docYellow}
        minuteInterval={5}
        onConfirm={handleTimeChange}
        onCancel={() => setShowPicker(false)}
      />
    </View>
  );
};

export default TimePicker;
