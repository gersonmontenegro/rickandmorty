import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

interface FooterProps {
  locations: number;
  characters: number;
  episodes: number;
}

const FooterComponent = ({locations, characters, episodes}: FooterProps): JSX.Element => {
  return (
    <View style={styles.footerContainer}>
      <Text>{`Locations: ${locations}`}</Text>
      <Text>{`Characters: ${characters}`}</Text>
      <Text>{`Episodes: ${episodes}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export const Footer = memo(FooterComponent);
