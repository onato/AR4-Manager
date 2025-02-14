import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../colors.js';
import styles from '../styles.js';

const BorderedButton = ({title, onPress, color, disabled}) => {
  return (
    <TouchableOpacity style={[styles.borderedButton, disabled && styles.disabledButton, color && {backgroundColor: color}]} onPress={onPress} disabled={disabled}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default BorderedButton;
