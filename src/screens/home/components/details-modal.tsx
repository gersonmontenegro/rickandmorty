/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, Modal, View, ImageBackground} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale, verticalScale} from 'react-native-size-matters';
import {Hero} from '../../../assets/images';
import {type DetailsModalProps} from '../types/types';
import LinearGradient from 'react-native-linear-gradient';
import {GRADIENT_COLORS, GRADIENT_END, GRADIENT_START} from '../constants';
import {Detail} from './detail';
import {Text} from 'react-native-paper';

const DetailsModalComponent = ({
  visible,
  setVisible,
  itemDetails,
}: DetailsModalProps): JSX.Element => {
  const [episodes, setEpisodes] = useState<string | undefined>('');
  const getLastNumber = (url: string): string => (url !== null ? url.match(/\d+$/)[0] : '');

  useEffect(() => {
    const episodesList = itemDetails?.episode.map((item) => getLastNumber(item));
    setEpisodes(episodesList?.join(','));
  }, [itemDetails?.episode]);

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
          <Text style={styles.title}>{itemDetails?.name}</Text>
        </View>
        <View style={styles.grayBackground}>
          <View style={styles.modalView}>
            <FastImage source={{uri: itemDetails?.image}} style={styles.photo}>
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
                  <Detail title="Name" description={itemDetails?.name} />
                  <Detail title="Status" description={itemDetails?.status} />
                  <Detail title="Species" description={itemDetails?.species} />
                  <Detail title="Gender" description={itemDetails?.gender} />
                </View>
                <View>
                  <Detail title="Origin" description={itemDetails?.origin.name} />
                  <Detail title="Location" description={itemDetails?.location.name} />
                  <Detail title="Episodes" description={episodes} />
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
  title: {
    textAlign: 'left',
    fontFamily: 'Verdana',
    fontWeight: 'bold',
    fontSize: 30,
    maxWidth: 180,
    paddingLeft: 20,
    paddingBottom: 20,
    color: 'white',
  },
});

export const DetailsModal = memo(DetailsModalComponent);
