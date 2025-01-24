import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from "expo-status-bar";
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import colors from './colors';
import { ProgramScreen } from "./components/ProgramScreen.tsx"
import { OptionsScreen } from "./components/OptionsScreen.tsx"
import { TimetableScreen } from "./components/TimetableScreen.tsx"

const Tab = createBottomTabNavigator();

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

