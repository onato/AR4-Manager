import { FlatList, Button, View } from "react-native";
import EditTimetableModal from "../../components/EditTimetableModal";
import { useState } from "react";
import TimetableItem from "../../components/TimetableItem";
import React from "react";

export default function Tab() {
  const [timeframes, setTimeframes] = useState([
    { id: "1", protocol: "High", start: "08:00", end: "10:00", enabled: true },
    { id: "2", protocol: "Low", start: "10:00", end: "12:00", enabled: false },
    { id: "3", protocol: "Bat", start: "12:00", end: "14:00", enabled: true },
    {
      id: "4",
      protocol: "Tier1",
      start: "14:00",
      end: "16:00",
      enabled: false,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState({
    id: "",
    protocol: "",
    start: "",
    end: "",
    enabled: false,
  });

  const handleAdd = () => {
    setNewItem({ id: (timeframes.length + 1).toString(), protocol: "", start: "", end: "", enabled: false });
    setModalVisible(true);
  };

  const handleSave = (updatedItem) => {
    setTimeframes([...timeframes, updatedItem]);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Button title="Add" onPress={handleAdd} />
      <EditTimetableModal
        visible={modalVisible}
        item={newItem}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <FlatList
        data={timeframes}
        renderItem={({ item }) => <TimetableItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
