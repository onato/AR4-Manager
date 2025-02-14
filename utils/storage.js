import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMEFRAMES_KEY = 'timeframes';
const SETTINGS_KEY = 'settings';

export const loadTimeframes = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TIMEFRAMES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Failed to load timeframes", e);
    return null;
  }
};

export const loadSettings = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(SETTINGS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : { gpsMode: "Off", survey: "", station: "" };
  } catch (e) {
    console.error("Failed to load settings", e);
    return { gpsMode: "Off", survey: "", station: "" };
  }
};

export const saveSettings = async (settings) => {
  try {
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem(SETTINGS_KEY, jsonValue);
  } catch (e) {
    console.error("Failed to save settings", e);
  }
};

export const saveTimeframes = async (timeframes) => {
  try {
    const jsonValue = JSON.stringify(timeframes);
    await AsyncStorage.setItem(TIMEFRAMES_KEY, jsonValue);
  } catch (e) {
    console.error("Failed to save timeframes", e);
  }
};
