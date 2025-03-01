import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EditTimetableModal from '../components/modals/EditTimetableModal';

// Mock the native module used by react-native-date-picker
jest.mock('react-native-date-picker', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => null),
  };
  });

  it('calls onSave when the save button is pressed', () => {
    const mockOnCancel = jest.fn();
    const mockOnSave = jest.fn();
    const mockItem: Timeframe = {
      id: '1',
      protocol: 'High',
      start_hour: 12,
      start_minute: 0,
      end_hour: 13,
      end_minute: 0,
      enabled: true,
    };

    const { getByText } = render(
      <EditTimetableModal
        visible={true}
        item={mockItem}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.press(getByText('Save'));
    expect(mockOnSave).toHaveBeenCalled();
  });
import Timeframe from '../data/Timeframe';

describe('EditTimetableModal', () => {
  it('calls onCancel when the cancel button is pressed', () => {
    const mockOnCancel = jest.fn();
    const mockOnSave = jest.fn();
    const mockItem: Timeframe = {
      id: '1',
      protocol: 'High',
      start_hour: 12,
      start_minute: 0,
      end_hour: 13,
      end_minute: 0,
      enabled: true,
    };

    const { getByText } = render(
      <EditTimetableModal
        visible={true}
        item={mockItem}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.press(getByText('Cancel'));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
