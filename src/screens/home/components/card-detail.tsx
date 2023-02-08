import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

const CardDetailComponent = ({
  title,
  description,
}: {
  title: string;
  description: string;
}): JSX.Element => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
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

export const CardDetail = memo(CardDetailComponent);
