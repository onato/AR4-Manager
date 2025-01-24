import React from "react";
import { View, Text, Switch } from "react-native";
import styles from "../styles";

interface TimetableItemProps {
  item: {
    protocol: string;
    start: string;
    end: string;
    enabled: boolean;
  };
}

const TimetableItem: React.FC<TimetableItemProps> = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.text}>{item.protocol}</Text>
    <Text style={styles.text}>
      {item.start} - {item.end}
    </Text>
    <Switch value={item.enabled} />
  </View>
);

export default TimetableItem;
