import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

import {colors} from '@utils/colors';

const FirstSeenComponent = ({name}: {name?: string}): JSX.Element => {
  if (name === '') {
    return <ActivityIndicator size="small" color={colors.primaryGray} />;
  }
  return (
    <View>
      <Text style={styles.title}>First seen in</Text>
      <Text style={styles.description}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Verdana',
    fontWeight: 'bold',
    fontSize: 7,
  },
  description: {
    fontFamily: 'Verdana',
    fontSize: 7,
  },
});

export const FirstSeen = memo(FirstSeenComponent);
