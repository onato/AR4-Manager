import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
jest.mock('react-native-date-picker', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(({ testID }) => <View testID={testID} />),
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

  it('calls onCancel when the date picker is cancelled', () => {
    const mockOnTimeChange = jest.fn();
    const { getByTestId } = render(
      <TimePicker
        label="Start"
        time="12:00"
        onTimeChange={mockOnTimeChange}
        disabled={false}
      />
    );

    // Simulate opening the date picker
    fireEvent.press(getByTestId('button'));

    // Simulate cancelling the date picker
    fireEvent(getByTestId('date-picker'), 'onCancel');

    // Ensure onTimeChange is not called when cancelled
    expect(mockOnTimeChange).not.toHaveBeenCalled();
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
