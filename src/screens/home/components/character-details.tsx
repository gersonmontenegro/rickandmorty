import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import {Detail} from './detail';

interface ItemDetailsProps {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  episodes?: string;
  origin?: {
    name: string;
  };
  location?: {
    name: string;
  };
}

const CharacterDetailsComponent = (props: ItemDetailsProps): JSX.Element => {
  const {name, status, species, gender, episodes, origin, location} = props;
  return (
    <View style={styles.detailsContainer}>
      <View>
        <Detail title="Name" description={name} />
        <Detail title="Status" description={status} />
        <Detail title="Species" description={species} />
        <Detail title="Gender" description={gender} />
      </View>
      <View>
        <Detail title="Origin" description={origin?.name} />
        <Detail title="Location" description={location?.name} />
        <Detail title="Episodes" description={episodes} />
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

export const CharacterDetails = memo(CharacterDetailsComponent);
