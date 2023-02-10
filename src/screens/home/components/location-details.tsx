import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import {Detail} from './detail';

interface LocationDetailsProps {
  name?: string;
  dimension?: string;
  type?: string;
}

const LocationDetailsComponent = ({name, dimension, type}: LocationDetailsProps): JSX.Element => {
  return (
    <View style={styles.detailsContainer}>
      <View>
        <Detail title="Name" description={name} />
        <Detail title="Air date" description={dimension} />
        <Detail title="Type" description={type} />
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

export const LocationDetails = memo(LocationDetailsComponent);
