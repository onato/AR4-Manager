import * as IntentLauncher from 'expo-intent-launcher';
import { Button } from 'react-native';

const openNfcSettings = () => {
  IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.NFC_SETTINGS);
};

const NfcSettingsButton = () => (
  <Button title="Open NFC Settings" onPress={openNfcSettings} />
);

export default NfcSettingsButton;
