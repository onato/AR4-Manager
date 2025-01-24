import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { ProgramScreen } from "./screens/ProgramScreen.tsx";
import { OptionsScreen } from "./screens/OptionsScreen.tsx";
import { TimetableScreen } from "./screens/TimetableScreen.tsx";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        style={styles.app}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "TIMETABLE") {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "OPTIONS") {
              iconName = focused ? "settings" : "settings-outline";
            } else if (route.name === "PROGRAM") {
              iconName = focused ? "code-working" : "code-working-outline";
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
