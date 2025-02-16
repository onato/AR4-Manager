import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import colors from '../colors.js';
import styles from '../styles.js';

const BorderedButton = ({title, onPress, color, disabled}) => {
  return (
    <Button style={[styles.borderedButton, disabled && styles.disabledButton, color && {backgroundColor: color}]} mode="contained" onPress={onPress} disabled={disabled}>
      {title}
    </Button>
  );
};

export default BorderedButton;
