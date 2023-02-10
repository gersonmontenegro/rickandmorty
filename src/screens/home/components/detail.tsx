import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {type DetailProps} from '../types/types';

const DetailComponent = ({title, description}: DetailProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${title}:`}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    maxWidth: 95,
  },
  title: {
    fontFamily: 'Verdana',
    fontWeight: 'bold',
    fontSize: 9,
  },
  description: {
    fontFamily: 'Verdana',
    fontSize: 9,
  },
});

export const Detail = memo(DetailComponent);
