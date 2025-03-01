import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DOCPicker from '../components/forms/DOCPicker';

describe('DOCPicker', () => {
  it('calls onValueChange when a new value is selected', () => {
    const mockOnValueChange = jest.fn();
    const { getByTestId } = render(
      <DOCPicker
        selectedValue="option1"
        onValueChange={mockOnValueChange}
        items={
          [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
          ]}
        testID="doc-picker"
      />
    );

    fireEvent(getByTestId('doc-picker'), 'onValueChange', 'option2');
    expect(mockOnValueChange).toHaveBeenCalledWith('option2');
  });
});
