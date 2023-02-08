import React, {memo, useCallback} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {FlatGrid} from 'react-native-super-grid';
import {type ResultItem} from '../types/types';
import {ListItem} from './list-item';

interface SearchResultsProps {
  results: ResultItem[];
  setModalVisible: (value: boolean) => void;
  setItemDetails: (value: ResultItem | null) => void;
}

const SearchResultsComponent = ({
  results,
  setItemDetails,
  setModalVisible,
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

  return (
    <View>
      <FlatGrid data={results ?? []} style={styles.gridView} renderItem={renderListItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    width: Dimensions.get('window').width,
    height: verticalScale(350),
    backgroundColor: '#333333',
  },
});

export const SearchResults = memo(SearchResultsComponent);
