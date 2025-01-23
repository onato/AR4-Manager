import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList, Switch, TextInput, Image } from "react-native";
import { Picker } from '@react-native-picker/picker';

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
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gpsMode}
          onValueChange={(itemValue) => setGpsMode(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Off" value="Off" />
          <Picker.Item label="Log Only" value="Log Only" />
          <Picker.Item label="Log & Sync" value="Log & Sync" />
        </Picker>
      </View>

      <Text style={styles.sectionTitle}>TIER1 Settings</Text>
      <TextInput
        style={styles.input}
        placeholder="Survey"
        value={survey}
        onChangeText={setSurvey}
      />
      <TextInput
        style={styles.input}
        placeholder="Station"
        value={station}
        onChangeText={setStation}
      />
    </View>
  );
}

function ProgramScreen() {
  return (
    <View style={styles.container}>
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
      <Tab.Navigator>
        <Tab.Screen name="TIMETABLE" component={TimetableScreen} />
        <Tab.Screen name="OPTIONS" component={OptionsScreen} />
        <Tab.Screen name="PROGRAM" component={ProgramScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  nfcIcon: {
    marginBottom: 20,
    alignItems: 'center',
  },
  nfcImage: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    position: 'absolute',
    bottom: 30,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  pickerContainer: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
});
