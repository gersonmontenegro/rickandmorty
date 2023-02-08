import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useListItem} from '../hooks/use-list-item';

const FirstSeenComponent = ({urlEpisode}: {urlEpisode: string}): JSX.Element => {
  const {firstSeen} = useListItem(urlEpisode);

  return (
    <View>
      <Text style={styles.title}>First seen in</Text>
      <Text style={styles.description}>{firstSeen}</Text>
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
