import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from "expo-status-bar";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, FlatList, Switch, TextInput, Image } from "react-native";
import styles from './styles';
import { Picker } from '@react-native-picker/picker';
import colors from './colors';

const Tab = createBottomTabNavigator();

function TimetableScreen() {
  const timeframes = [
    { id: '1', protocol: 'High', start: '08:00', end: '10:00', enabled: true },
    { id: '2', protocol: 'Low', start: '10:00', end: '12:00', enabled: false },
    { id: '3', protocol: 'Bat', start: '12:00', end: '14:00', enabled: true },
    { id: '4', protocol: 'Tier1', start: '14:00', end: '16:00', enabled: false },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.protocol}</Text>
      <Text style={styles.text}>{item.start} - {item.end}</Text>
      <Switch value={item.enabled} />
    </View>
  );

  return (
    <FlatList
      data={timeframes}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}

function OptionsScreen() {
  const [gpsMode, setGpsMode] = React.useState("Off");
  const [survey, setSurvey] = React.useState("");
  const [station, setStation] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>GPS Settings</Text>
      <Text style={styles.label}>GPS mode</Text>
      <Picker
        selectedValue={gpsMode}
        onValueChange={(itemValue) => setGpsMode(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Off" value="Off" />
        <Picker.Item label="Log Only" value="Log Only" />
        <Picker.Item label="Log & Sync" value="Log & Sync" />
      </Picker>

      <Text style={styles.sectionTitle}>TIER1 Settings</Text>
      <Text style={styles.label}>Survey</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={survey}
        onChangeText={setSurvey}
      />
      <Text style={styles.label}>Station</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={station}
        onChangeText={setStation}
      />
    </View>
  );
}

function ProgramScreen() {
  return (
    <View style={[styles.container, styles.centered]}>
      <Text style={styles.statusText}>4 start times</Text>
      <View style={styles.nfcIcon}>
        {/* Placeholder for NFC Icon */}
        <Image source={require('./assets/nfc_logo.png')} style={styles.nfcImage} />
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>CONNECT & UPDATE</Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator style={styles.app}
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: colors.docGreen, // Green header background
          },
          headerTintColor: 'white', // Header text color
          tabBarStyle: {
            backgroundColor: colors.docGreenLight, // Green tab bar
          },
          tabBarActiveTintColor: colors.docYellow, // Active tab text/icon color
          tabBarInactiveTintColor: 'white', // Inactive tab text/icon color
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'TIMETABLE') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'OPTIONS') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'PROGRAM') {
              iconName = focused ? 'code-working' : 'code-working-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="TIMETABLE" component={TimetableScreen} />
        <Tab.Screen name="OPTIONS" component={OptionsScreen} />
        <Tab.Screen name="PROGRAM" component={ProgramScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

