/* eslint-disable @typescript-eslint/naming-convention */
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Detail} from './detail';

interface LocationDetailsProps {
  name?: string;
  air_date?: string;
  episode?: string;
}

const EpisodeDetailsComponent = ({name, air_date, episode}: LocationDetailsProps): JSX.Element => {
  return (
    <View style={styles.detailsContainer}>
      <View>
        <Detail title="Name" description={name} />
        <Detail title="Air date" description={air_date} />
        <Detail title="Episode" description={episode} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export const EpisodeDetails = memo(EpisodeDetailsComponent);
