import React, {memo, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage, {type Source} from 'react-native-fast-image';
import {Text} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';
import {Facebook, Instagram, Linkedin} from '../../../assets/images';
import {colors} from '../../../utils/colors';
import {BULLET} from '../../../utils/constants';

interface FooterProps {
  locations: number;
  characters: number;
  episodes: number;
}

const FooterComponent = ({locations, characters, episodes}: FooterProps): JSX.Element => {
  const isServerOn = useMemo(() => {
    return !isNaN(locations);
  }, [locations]);

  const bulletIcon = useMemo(() => {
    return StyleSheet.flatten([styles.text, {color: isServerOn ? '#00CF1E' : 'gray'}]);
  }, [isServerOn]);

  return (
    <View style={styles.footerContainer}>
      <View style={styles.quantities}>
        <Text style={styles.text}>{`LOCATIONS: ${locations}`}</Text>
        <Text style={styles.text}>{`CHARACTERES: ${characters}`}</Text>
        <Text style={styles.text}>{`EPISODES: ${episodes}`}</Text>
      </View>
      <View style={styles.serverStatus}>
        <Text style={styles.text}>SERVER STATUS</Text>
        <Text style={bulletIcon}>{BULLET}</Text>
      </View>
      <View style={styles.social}>
        <FastImage source={Facebook as Source} style={styles.socialIcon} />
        <FastImage source={Instagram as Source} style={styles.socialIcon} />
        <FastImage source={Linkedin as Source} style={styles.socialIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    justifyContent: 'center',
    backgroundColor: colors.blackAbsolute,
  },
  quantities: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  serverStatus: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  social: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(30),
  },
  text: {
    color: colors.primaryGray,
    fontFamily: 'Verdana',
    fontWeight: 'bold',
    fontSize: 10,
    paddingHorizontal: 5,
  },
  socialIcon: {
    width: scale(20),
    height: verticalScale(20),
    marginHorizontal: 10,
  },
});

export const Footer = memo(FooterComponent);
