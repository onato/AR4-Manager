import { FlatList } from "react-native";
import TimetableItem from "../../components/TimetableItem";
import React from "react";

export default function Tab() {
  const timeframes = [
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
  ];

  return (
    <FlatList
      data={timeframes}
      renderItem={({ item }) => <TimetableItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}
