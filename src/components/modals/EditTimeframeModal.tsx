import React, { useState } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import DOCPicker from "../forms/DOCPicker";
import colors from "@/colors";
import { Protocol } from "@onato/doc-nfc-module";
import Timeframe from "@/data/Timeframe";
import DOCLable from "../forms/DOCLable";
import TimePicker from "../forms/TimePicker";
import TextButton from "../buttons/TextButton";
import LogoTitle from "../icons/LogoTitle";

interface EditTimeframeModalProps {
  visible: boolean;
  item: Timeframe;
  onSave: (updatedItem: Timeframe) => void;
  onCancel: () => void;
  testID: string;
}

const EditTimeframeModal: React.FC<EditTimeframeModalProps> = ({
  visible,
  item,
  onSave,
  onCancel,
  testID,
}) => {
  const [protocol, setProtocol] = useState(item.protocol);
  const [start, setStart] = useState(
    `${item.start_hour}:${item.start_minute.toString().padStart(2, "0")}`,
  );
  const [end, setEnd] = useState(
    `${item.end_hour}:${item.end_minute.toString().padStart(2, "0")}`,
  );

  const handleSave = () => {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);
    onSave({
      ...item,
      protocol,
      start_hour: startHour,
      start_minute: startMinute,
      end_hour: endHour,
      end_minute: endMinute,
    });
  };

  return (
    <View>
      <Modal visible={visible} animationType="slide" transparent={true} testID={testID}>
        <View style={localStyles.modalContainer}>
          <LogoTitle
            title="Edit Timetable Item"
            style={localStyles.modalTitleContainer}
          />
          <View style={localStyles.form}>
            <DOCLable>Protocol</DOCLable>
            <DOCPicker
              testID="doc-picker"
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
                The times are set automatically by the device when using a Tier1
                protocol.
              </Text>
            )}
          </View>
          <View style={localStyles.buttonRow}>
            <View style={localStyles.button}>
              <TextButton title="Cancel" onPress={onCancel} testID="cancel" />
            </View>
            <View style={localStyles.button}>
              <TextButton title="Save" onPress={handleSave} testID="save" />
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
    justifyContent: "flex-start",
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
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: colors.androidNavWhite,
    position: "absolute",
    bottom: 0,
    paddingTop: 15,
    paddingBottom: 15,
  },
  button: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});

export default EditTimeframeModal;
