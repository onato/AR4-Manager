import { Tabs } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../colors.js";
import { StatusBar } from "react-native";
import { useCallback } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import LogoTitle from "../../components/icons/LogoTitle";
import { HeaderTitleProps } from '@react-navigation/elements';

type IconProps = {
  focused: boolean;
  color: string;
  size: number;
};

type VectorIconProps = {
  focused: boolean;
  color: string;
  size: number;
  iconName: string;
};

export default function TabLayout() {
  const TitleComponent = useCallback((props: HeaderTitleProps) => {
    return <LogoTitle title={props.children} />
  }, []);

  const IconComponent = useCallback(({ focused, color, size, iconName }: VectorIconProps) => {
    return (
      <Ionicons
        size={size}
        color={color}
        name={focused ? iconName : `${iconName}-outline`}
      />
    );
  }, []);

  const TimetableComponent = useCallback((props: IconProps) => {
    return <IconComponent {...props} iconName="calendar" />
  }, []);

  const SettingsComponent = useCallback((props: IconProps) => {
    return <IconComponent {...props} iconName="settings" />
  }, []);

  const ProgramComponent = useCallback(({ focused, color, size }: IconProps) => {
    return (
      <MaterialCommunityIcons
        size={size}
        name={
          focused
            ? "contactless-payment-circle"
            : "contactless-payment-circle-outline"
        }
        color={color}
      />
    );
  }, []);

  return (
    <>
      <StatusBar backgroundColor={colors.docYellow} barStyle="dark-content" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.docBlue,
          tabBarActiveBackgroundColor: colors.androidNavWhite,
          tabBarInactiveBackgroundColor: colors.androidNavWhite,
          headerStyle: { backgroundColor: colors.docGreen },
          headerTintColor: colors.white,
          headerTitle: TitleComponent,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Timetable",
            tabBarIcon: TimetableComponent,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: SettingsComponent,
          }}
        />
        <Tabs.Screen
          name="program"
          options={{
            title: "Program",
            tabBarIcon: ProgramComponent,
          }}
        />
      </Tabs>
    </>
  );
}
