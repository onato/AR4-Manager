import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BorderedButton from '../components/buttons/BorderedButton';

describe('BorderedButton Component', () => {
  it('renders correctly with given title', () => {
    const { getByText } = render(<BorderedButton title="Click Me" onPress={() => { }} color="blue" disabled={false} />);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<BorderedButton title="Press Me" onPress={onPressMock} color="blue" />);
    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<BorderedButton title="Disabled" onPress={onPressMock} color="blue" disabled={true} />);
    const button = getByText('Disabled');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalledTimes(0);
  });
});
