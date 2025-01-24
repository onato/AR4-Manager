import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import EditTimetableModal from "./EditTimetableModal";
import styles from "../styles";

interface TimetableItemProps {
  item: {
    protocol: string;
    start: string;
    end: string;
    enabled: boolean;
  };
}

const TimetableItem: React.FC<TimetableItemProps> = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSave = (updatedItem: any) => {
    // Handle save logic here
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.item} onTouchEnd={() => setModalVisible(true)}>
        <Text style={styles.text}>{item.protocol}</Text>
        <Text style={styles.text}>
          {item.start} - {item.end}
        </Text>
        <Switch value={item.enabled} />
      </View>
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
