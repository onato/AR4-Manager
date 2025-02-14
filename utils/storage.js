import AsyncStorage from '@react-native-async-storage/async-storage';
import { GpsMode, Station } from "doc-nfc-module";
import {defaultTimeframes} from "../utils/TimeframeStore.js";

const TIMEFRAMES_KEY = 'timeframes';
const SETTINGS_KEY = 'settings';

export const loadTimeframes = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TIMEFRAMES_KEY);
    let timeframes = jsonValue ? JSON.parse(jsonValue) : [];
    if (timeframes === null || (Array.isArray(timeframes) && timeframes.length === 0)) {
      timeframes = defaultTimeframes();
    }
    return timeframes;
  } catch (e) {
    console.error("Failed to load timeframes", e);
    return null;
  }
};

export const loadSettings = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(SETTINGS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : { gpsMode: GpsMode.LogAndSync, survey: "", station: Station.BIRM };
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
