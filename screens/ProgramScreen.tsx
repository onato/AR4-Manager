import { View, Image, Text } from "react-native";
import styles from "../styles";

export function ProgramScreen() {
  return (
    <View style={[styles.container, styles.centered]}>
      <Text style={styles.statusText}>4 start times</Text>
      <View style={styles.nfcIcon}>
        <Image
          source={require("../assets/nfc_logo.png")}
          style={styles.nfcImage}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>CONNECT & UPDATE</Text>
      </View>
    </View>
  );
}
