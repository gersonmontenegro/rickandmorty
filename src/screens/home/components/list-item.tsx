import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale, verticalScale} from 'react-native-size-matters';
import {CARD_HEIGHT, CARD_WIDTH} from '../constants';
import {useListItem} from '../hooks/use-list-item';
import {type ResultItem} from '../types/types';

const ListItemComponent = ({item}: {item: ResultItem}): JSX.Element => {
  const {firstSeen} = useListItem(item.episode[0]);

  return (
    <Pressable
      style={styles.itemContainer}
      onPress={() => {
        console.log(item);
      }}>
      <View style={styles.imageItemContainer}>
        <FastImage source={{uri: item.image}} style={styles.image} />
      </View>
      <View style={styles.titlesContainer}>
        <View>
          <Text style={styles.characterName}>{item.name}</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.status}>{`${item.status} - ${item.species}`}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.title}>Last know location</Text>
          <Text style={styles.description}>{item.location.name}</Text>
        </View>
        <View>
          <Text style={styles.title}>First seen in</Text>
          <Text style={styles.description}>{firstSeen}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 5,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    shadowColor: 'white',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 24,
  },
  imageItemContainer: {
    flex: 1,
  },
  image: {
    width: scale(50),
    height: verticalScale(72),
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  characterName: {
    fontFamily: 'Verdana',
    fontWeight: 'bold',
    fontSize: 10,
  },
  status: {
    fontFamily: 'Verdana',
    fontWeight: 'bold',
    fontSize: 8,
  },
  title: {
    fontFamily: 'Verdana',
    fontWeight: 'bold',
    fontSize: 7,
  },
  description: {
    fontFamily: 'Verdana',
    fontSize: 7,
  },
  titlesContainer: {
    flex: 2,
    justifyContent: 'space-evenly',
    paddingLeft: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 10,
  },
  bullet: {
    fontFamily: 'Verdana',
    fontSize: 12,
    color: '#00CF1E',
    verticalAlign: 'middle',
    height: 10,
  },
});

export const ListItem = memo(ListItemComponent);
