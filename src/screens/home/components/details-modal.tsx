/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, {memo} from 'react';
import {StyleSheet, Modal, View, ImageBackground} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale, verticalScale} from 'react-native-size-matters';
import {Hero} from '../../../assets/images';
import {type DetailsModalProps} from '../types/types';
import LinearGradient from 'react-native-linear-gradient';
import {GRADIENT_COLORS, GRADIENT_END, GRADIENT_START} from '../constants';
import {Detail} from './detail';
import {Text} from 'react-native-paper';

const photo = 'https://rickandmortyapi.com/api/character/avatar/1.jpeg';

const DetailsModalComponent = ({visible, setVisible}: DetailsModalProps): JSX.Element => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle={'formSheet'}
      onRequestClose={() => {
        setVisible(false);
      }}>
      <ImageBackground source={Hero} style={styles.centeredView}>
        <View style={{flex: 1, justifyContent: 'flex-end', width: '100%'}}>
          <Text
            style={{
              textAlign: 'left',
              fontFamily: 'Verdana',
              fontWeight: 'bold',
              fontSize: 30,
              maxWidth: 170,
              paddingLeft: 20,
              paddingBottom: 20,
              color: 'white',
            }}>
            Rick Sanchez
          </Text>
        </View>
        <View style={styles.grayBackground}>
          <View style={styles.modalView}>
            <FastImage source={{uri: photo}} style={styles.photo}>
              <LinearGradient
                colors={GRADIENT_COLORS}
                style={styles.gradient}
                start={GRADIENT_START}
                end={GRADIENT_END}
              />
            </FastImage>
            <View style={styles.rightColumn}>
              <View style={styles.detailsContainer}>
                <View>
                  <Detail title="Name" description="Rick Sanchez" />
                  <Detail title="Status" description="Alive" />
                  <Detail title="Species" description="Human" />
                  <Detail title="Gender" description="Male" />
                </View>
                <View>
                  <Detail title="Origin" description="Earth" />
                  <Detail title="Location" description="Earth (Replaced Dimension)" />
                  <Detail title="Episodes" description="1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12" />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: 'black'}} />
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
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
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
  photoContainer: {
    // borderRadius: 20,
  },
  gradient: {
    height: '100%',
    width: '100%',
  },
  rightColumn: {
    flex: 2,
    justifyContent: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  grayBackground: {
    backgroundColor: '#282828',
    width: '100%',
    height: verticalScale(220),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const DetailsModal = memo(DetailsModalComponent);
