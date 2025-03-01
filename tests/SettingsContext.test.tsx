import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react-native';
import { Text, Button } from 'react-native';
import { SettingsProvider, useSettingsContext } from '../data/SettingsContext';
import * as storageModule from '../utils/storage';

const loadSettings = jest.mocked(storageModule.loadSettings);
const loadTimeframes = jest.mocked(storageModule.loadTimeframes);
const saveSettings = jest.mocked(storageModule.saveSettings);

jest.mock('../utils/storage', () => ({
  loadSettings: jest.fn(),
  loadTimeframes: jest.fn(),
  saveSettings: jest.fn(),
  saveTimeframes: jest.fn(),
}));

const TestComponent = () => {
  const { settings, updateSettings } = useSettingsContext();
  return (
    <>
      <Text>{settings.gpsMode}</Text>
      <Button title="Update" onPress={() => updateSettings({ gpsMode: 1 })} />
    </>
  );
};

describe('SettingsContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    loadSettings.mockResolvedValue(null);
    loadTimeframes.mockResolvedValue(null);
  });

  it('provides default settings', async () => {

    const { getByText } = render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    await waitFor(() => {
      expect(getByText('0')).toBeTruthy(); // Default gpsMode
    });

  });

  it('loads settings from storage', async () => {
    loadSettings.mockResolvedValueOnce({ gpsMode: 2 });

    const { getByText, findByText } = render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    await waitFor(() => {
      expect(getByText('2')).toBeTruthy(); // Loaded gpsMode
    }, { timeout: 2000 }); // Increase timeout if necessary

  });

  it('updates settings and saves them', async () => {

    const { getByText } = render(
      <SettingsProvider>
        <TestComponent />
      </SettingsProvider>
    );

    const button = getByText('Update');
    await waitFor(() => {
      fireEvent.press(button);
    });

    expect(saveSettings).toHaveBeenCalledWith(expect.objectContaining({ gpsMode: 1 }));
    expect(getByText('1')).toBeTruthy(); // Updated gpsMode
  });
  it('throws an error if used outside of SettingsProvider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useSettingsContext must be used within a SettingsProvider');

    consoleError.mockRestore();
  });
});
