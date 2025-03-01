import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      setOptions: jest.fn(),
      navigate: jest.fn(),
    }),
  };
});

import Tab from '../app/(tabs)/index';
import { SettingsProvider } from '../data/SettingsContext';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('react-native-reorderable-list', () => 'ReorderableList');

import { NavigationContainer } from '@react-navigation/native';

describe('Tab Screen', () => {
  // ✅ Ensure `renderWithProvider` handles `expo-router` correctly
  const renderWithProvider = async (component: React.ReactElement) => {
    let screen;
    screen = render(
      <SettingsProvider>
        <NavigationContainer>
          {component}
        </NavigationContainer>
      </SettingsProvider>
    );
    return screen!;
  };

  it('renders correctly', async () => {
    const screen = await renderWithProvider(<Tab />);

    await waitFor(() => {
      expect(screen.getByTestId('reorderable-list')).toBeTruthy();
    });
  });

});
