import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../../colors.js';

interface LogoTitleProps {
  title: string;
  style?: object;
}

const LogoTitle: React.FC<LogoTitleProps> = ({ title, style }) => {
  return (
    <View style={[localStyles.titleContainer, style]}>
      <Image
        style={localStyles.icon}
        source={require('../../assets/images/doc-logo.png')}
      />
      <Text style={localStyles.modalTitle}>{title}</Text>
    </View>
  );
};

const localStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.docGreen,
  },
  modalTitle: {
    fontSize: 18,
    color: colors.white,
  },
  icon: {
    width: 22,
    height: 27,
    marginRight: 8,
  },
});


export default LogoTitle;
