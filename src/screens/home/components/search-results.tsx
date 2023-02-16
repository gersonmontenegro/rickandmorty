import React, {memo, useCallback} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {FlatGrid} from 'react-native-super-grid';

import {colors} from '@utils/colors';

import {GRID_HEIGHT, GRID_WIDTH, MAX_COLUMNS_PER_ROW} from '..';
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

  return (
    <FlatGrid
      maxItemsPerRow={MAX_COLUMNS_PER_ROW}
      data={results ?? []}
      style={styles.gridView}
      renderItem={renderListItem}
      adjustGridToStyles
      itemContainerStyle={styles.itemContainer}
    />
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    width: scale(GRID_WIDTH),
    height: verticalScale(GRID_HEIGHT),
    backgroundColor: colors.secondaryBackgroundGray,
  },
  itemContainer: {
    alignItems: 'center',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const SearchResults = memo(SearchResultsComponent);
