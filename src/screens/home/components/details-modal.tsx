/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, {memo} from 'react';
import {ImageBackground, Modal, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native-paper';
import {scale, verticalScale} from 'react-native-size-matters';

import {Hero} from '@assets/images';
import {Helpers} from '@utils/Helpers';
import {colors} from '@utils/colors';
import {GRADIENT_COLORS, GRADIENT_END, GRADIENT_START} from '@utils/constants';

import {type DetailsModalProps} from '../types/types';
import {CardDetails} from './card-details';

const DetailsModalComponent = ({
  visible,
  setVisible,
  itemDetails,
}: DetailsModalProps): JSX.Element => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle={'formSheet'}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <ImageBackground source={Hero} style={styles.centeredView}>
        <View style={styles.nameContainer}>
          <Text style={styles.title}>{itemDetails?.name}</Text>
        </View>
        <View style={styles.grayBackground}>
          <View style={styles.modalView}>
            <FastImage source={Helpers.getImage(itemDetails)} style={styles.photo}>
              <LinearGradient
                colors={GRADIENT_COLORS}
                style={styles.gradient}
                start={GRADIENT_START}
                end={GRADIENT_END}
              />
            </FastImage>
            <View style={styles.rightColumn}>
              <CardDetails itemDetails={itemDetails} />
            </View>
          </View>
        </View>
        <View style={styles.bottomSpacer} />
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flexDirection: 'row',
    width: scale(320),
    height: verticalScale(160),
    backgroundColor: colors.whiteAbsolute,
    borderRadius: 20,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  photo: {
    flex: 1,
    width: scale(150),
    height: verticalScale(160),
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  gradient: {
    height: '100%',
    width: '100%',
  },
  rightColumn: {
    flex: 2,
    justifyContent: 'center',
  },
  grayBackground: {
    backgroundColor: colors.backgroundGray,
    width: '100%',
    height: verticalScale(220),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'left',
    fontFamily: 'Verdana',
    fontWeight: 'bold',
    fontSize: 30,
    maxWidth: 180,
    paddingLeft: 20,
    paddingBottom: 20,
    color: colors.whiteAbsolute,
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  bottomSpacer: {
    flex: 1,
  },
});

export const DetailsModal = memo(DetailsModalComponent);
