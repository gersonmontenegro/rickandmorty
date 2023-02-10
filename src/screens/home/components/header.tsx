import React from 'react';
import {Image, type ImageSourcePropType, StyleSheet, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

import {HeaderImage} from '@assets/images';

export const Header = (): JSX.Element => {
  return (
    <View>
      <Image source={HeaderImage as ImageSourcePropType} style={styles.header} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: scale(350),
    height: verticalScale(130),
    padding: moderateScale(5),
  },
});
