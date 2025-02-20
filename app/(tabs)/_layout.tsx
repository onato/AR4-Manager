import { Tabs } from 'expo-router';
import { Image, View, Text } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from '../../colors.js';
import styles from '../../styles.js';
import { StatusBar } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

function LogoTitle({ title }) {
  return (
    <View style={styles.titleContainer}>
      <Image
        style={styles.icon}
        source={require('../../assets/images/doc-logo.png')}
      />
      <Text style={styles.modalTitle}>{title}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <>
      <StatusBar backgroundColor={colors.docYellow} barStyle="dark-content" />
      <Tabs screenOptions={{
        tabBarActiveTintColor: colors.docBlue,
        tabBarActiveBackgroundColor: colors.androidNavWhite,
        tabBarInactiveBackgroundColor: colors.androidNavWhite,
        headerStyle: { backgroundColor: colors.docGreen },
        headerTintColor: colors.white,
        headerTitle: ({ children }) => <LogoTitle title={children} />,
        headerRight: () => (
          <Ionicons name="ios-information-circle-outline" size={24} color={colors.white} style={{ marginRight: 15 }} />
        )
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Timetable',
            tabBarIcon: ({ focused, color, size }) => <Ionicons size={size} name={focused ? "calendar" : "calendar-outline"} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ focused, color, size }) => <Ionicons size={size} name={focused ? "settings" : "settings-outline"} color={color} />,
          }}
        />
        <Tabs.Screen
          name="program"
          options={{
            title: 'Program',
            tabBarIcon: ({ focused, color, size }) => <MaterialCommunityIcons size={size} name={focused ? "contactless-payment-circle" : "contactless-payment-circle-outline"} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

