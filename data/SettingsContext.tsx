import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Settings } from "./Settings";
import Timeframe from "./Timeframe";
import { loadSettings, saveSettings } from "../utils/storage";

// Default timeframes
const defaultTimeframes: Timeframe[] = [
  {
    id: "1",
    protocol: "High",
    start_hour: 8,
    start_minute: 0,
    end_hour: 10,
    end_minute: 0,
    enabled: true,
  },
  {
    id: "2",
    protocol: "Low",
    start_hour: 10,
    start_minute: 0,
    end_hour: 12,
    end_minute: 0,
    enabled: true,
  },
  {
    id: "3",
    protocol: "Bat",
    start_hour: 12,
    start_minute: 0,
    end_hour: 14,
    end_minute: 0,
    enabled: true,
  },
  {
    id: "4",
    protocol: "Tier1 Day",
    start_hour: 14,
    start_minute: 0,
    end_hour: 16,
    end_minute: 0,
    enabled: true,
  },
];

// Default settings
const defaultSettings: Settings = {
  timeframes: defaultTimeframes,
  gpsMode: 0,
  survey: "",
  station: 0,
};

// Define context type
interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

// Create context with undefined initial value
const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

interface Props {
  readonly children: ReactNode;
}

// Provider component
export function SettingsProvider({ children }: Props) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  // Load settings from storage on mount
  useEffect(() => {
    async function loadInitialSettings() {
      const storedSettings = await loadSettings();

      // Update state with loaded values, falling back to defaults
      setSettings((prev) => ({
        ...prev,
        ...(storedSettings ?? defaultSettings),
      }));
    }

    loadInitialSettings();
  }, []);

  // Function to update settings
  const updateSettings = useCallback((newSettings: Partial<Settings>) => {
    setSettings((prevSettings) => {
      const updatedSettings = {
        ...prevSettings,
        ...newSettings,
      };
      saveSettings(updatedSettings);

      return updatedSettings;
    });
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

// Hook to use settings context
export function useSettingsContext() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsProvider",
    );
  }

  return context;
}
