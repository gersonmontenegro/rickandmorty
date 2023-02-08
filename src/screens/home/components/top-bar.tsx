import React, {memo} from 'react';
import {Text, Pressable, View, StyleSheet} from 'react-native';

interface TopBarProps {
  searchEpisodes: (value: string) => void;
  searchLocations: (value: string) => void;
}

const TopBarComponent = ({searchEpisodes, searchLocations}: TopBarProps): JSX.Element => {
  return (
    <View style={styles.topBarContainer}>
      <Pressable
        style={styles.topBarButton}
        onPress={() => {
          searchEpisodes('');
        }}>
        <Text style={styles.topBarButtonText}>All episodes</Text>
      </Pressable>
      <Pressable
        style={styles.topBarButton}
        onPress={() => {
          searchLocations('');
        }}>
        <Text style={styles.topBarButtonText}>All locations</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'black',
  },
  topBarButton: {
    marginHorizontal: 5,
    height: 30,
    justifyContent: 'center',
  },
  topBarButtonText: {
    color: 'white',
    fontFamily: 'Verdana',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export const TopBar = memo(TopBarComponent);
