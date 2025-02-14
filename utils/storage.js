import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMEFRAMES_KEY = 'timeframes';

export const loadTimeframes = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TIMEFRAMES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Failed to load timeframes", e);
    return null;
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
