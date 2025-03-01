import React from 'react';
import { render } from '@testing-library/react-native';
import NfcHandler from '../components/nfc/NfcHandler';
import NfcManager from 'react-native-nfc-manager';

jest.mock('react-native-nfc-manager', () => ({
  isEnabled: jest.fn(),
}));

describe('NfcHandler', () => {
  it('should check NFC status on mount and call onNfcCheck with the result', async () => {
    const onNfcCheckMock = jest.fn();
    NfcManager.isEnabled.mockResolvedValueOnce(true);

    const { findByTestId } = render(<NfcHandler onNfcCheck={onNfcCheckMock} />);
    await findByTestId('nfc-handler');

    expect(NfcManager.isEnabled).toHaveBeenCalled();
    expect(onNfcCheckMock).toHaveBeenCalledWith(true);
  });

  it('should call onNfcCheck with false if NFC is not enabled', async () => {
    const onNfcCheckMock = jest.fn();
    NfcManager.isEnabled.mockResolvedValueOnce(false);

    const { findByTestId } = render(<NfcHandler onNfcCheck={onNfcCheckMock} />);
    await findByTestId('nfc-handler');

    expect(NfcManager.isEnabled).toHaveBeenCalled();
    expect(onNfcCheckMock).toHaveBeenCalledWith(false);
  });
});
