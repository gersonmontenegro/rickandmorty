/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {scale, verticalScale} from 'react-native-size-matters';

import {isEmpty} from 'lodash';

import {Helpers} from '@utils/Helpers';
import {colors} from '@utils/colors';
import {
  BULLET,
  CARD_HEIGHT,
  CARD_WIDTH,
  GRADIENT_COLORS,
  GRADIENT_END,
  GRADIENT_START,
} from '@utils/constants';

import {type ResultItem} from '../types/types';
import {CardDetail} from './card-detail';
import {FirstSeen} from './first-seen';

const ListItemComponent = ({
  item,
  setItemDetails,
  setModalVisible,
}: {
  item: ResultItem;
  setItemDetails: (value: ResultItem) => void;
  setModalVisible: (value: boolean) => void;
}): JSX.Element => {
  // Show status details only if entity is character
  const isCharacter = Helpers.isLocation(item) && Helpers.isEpisode(item);
  return (
    <Pressable
      style={styles.itemContainer}
      onPress={() => {
        setItemDetails(item);
        setModalVisible(true);
      }}>
      <View style={styles.imageItemContainer}>
        <FastImage source={Helpers.getImage(item)} style={styles.image}>
          <LinearGradient
            colors={GRADIENT_COLORS}
            style={styles.gradient}
            start={GRADIENT_START}
            end={GRADIENT_END}
          />
        </FastImage>
      </View>
      <View style={styles.titlesContainer}>
        <View>
          <Text style={styles.characterName}>{item.name}</Text>
          {isCharacter && (
            <View style={styles.statusContainer}>
              <Text style={styles.bullet}>{BULLET}</Text>
              <Text style={styles.status}>{`${item.status} - ${item.species}`}</Text>
            </View>
          )}
        </View>
        {!isEmpty(item.location) && (
          <CardDetail title="Las known location" description={item.location.name} />
        )}
        {Array.isArray(item.episode) && (
          <FirstSeen urlEpisode={item.episode[0] as string & any[]} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'flex-end',
    backgroundColor: colors.whiteAbsolute,
    flexDirection: 'row',
    borderRadius: 5,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    shadowColor: colors.whiteAbsolute,
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
    color: colors.activeBullet,
    verticalAlign: 'middle',
    height: 10,
  },
  gradient: {
    height: '100%',
    width: '100%',
  },
});

export const ListItem = memo(ListItemComponent);
