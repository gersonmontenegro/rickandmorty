import React, {memo, useCallback} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {FlatGrid} from 'react-native-super-grid';

import {colors} from '@utils/colors';

import {type ResultItem} from '../types/types';
import {ListItem} from './list-item';

interface SearchResultsProps {
  results: ResultItem[];
  setModalVisible: (value: boolean) => void;
  setItemDetails: (value: ResultItem | null) => void;
  isLoading?: boolean;
}

const SearchResultsComponent = ({
  results,
  setItemDetails,
  setModalVisible,
  isLoading = true,
}: SearchResultsProps): JSX.Element => {
  const renderListItem = useCallback(
    ({item}: {item: ResultItem}) => (
      <ListItem
        setModalVisible={setModalVisible}
        item={item}
        key={item.id}
        setItemDetails={setItemDetails}
      />
    ),
    [setItemDetails, setModalVisible],
  );

  if (isLoading) {
    return (
      <View style={StyleSheet.flatten([styles.gridView, styles.loader])}>
        <ActivityIndicator />
      </View>
    );
  }

  return <FlatGrid data={results ?? []} style={styles.gridView} renderItem={renderListItem} />;
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    width: Dimensions.get('window').width,
    height: verticalScale(350),
    backgroundColor: colors.secondaryBackgroundGray,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const SearchResults = memo(SearchResultsComponent);
