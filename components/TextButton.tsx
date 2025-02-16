import {StyleSheet } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import colors from '../colors.js';
import styles from '../styles.js';

const TextButton = ({title, onPress, color, disabled}) => {
  return (
    <Button style={styles.button} labelStyle={styles.textButtonText} mode="text" onPress={onPress} disabled={disabled}>
      {title}
    </Button>
  );
};

export default TextButton;
