import { Tabs } from 'expo-router';
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from '../../colors.js';
import { StatusBar } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import LogoTitle from '../../components/icons/LogoTitle';

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

