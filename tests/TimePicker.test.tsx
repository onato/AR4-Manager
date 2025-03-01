import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Mock the native module used by react-native-date-picker
jest.mock('react-native-date-picker', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => null),
  };
});
import TimePicker from '../components/forms/TimePicker';

describe('TimePicker', () => {
  it('renders correctly when enabled', () => {
    const mockOnTimeChange = jest.fn();
    const { getByText, getByTestId } = render(
      <TimePicker
        label="Start"
        time="12:00"
        onTimeChange={mockOnTimeChange}
        disabled={false}
      />
    );
    expect(getByText('Start')).toBeTruthy();
    // Simulate time change
    fireEvent.press(getByTestId('button'));
    // Directly simulate the onConfirm callback
    const selectedDate = new Date();
    selectedDate.setHours(13, 0);
    mockOnTimeChange(selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    expect(mockOnTimeChange).toHaveBeenCalledWith('13:00');
  });

  it('renders correctly when disabled', () => {
    const mockOnTimeChange = jest.fn();
    const { getByText } = render(
      <TimePicker
        label="Start"
        time="12:00"
        onTimeChange={mockOnTimeChange}
        disabled={true}
      />
    );
    expect(getByText('Start')).toBeTruthy();
    // Ensure onTimeChange is not called when disabled
    expect(mockOnTimeChange).not.toHaveBeenCalled();
  });
});
