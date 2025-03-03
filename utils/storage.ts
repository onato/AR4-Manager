import { Settings } from '@/data/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = 'settings';

export const loadSettings = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(SETTINGS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Failed to load settings", e);
    return null;
  }
};

export const saveSettings = async (settings: Settings) => {
  try {
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem(SETTINGS_KEY, jsonValue);
  } catch (e) {
    console.error("Failed to save settings", e);
  }
};

