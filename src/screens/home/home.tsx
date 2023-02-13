import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {isEmpty} from 'lodash';

import {colors} from '@utils/colors';

import {DetailsModal} from './components/details-modal';
import {Footer} from './components/footer';
import {Header} from './components/header';
import {Pagination} from './components/pagination';
import {SearchBar} from './components/search-bar';
import {SearchResults} from './components/search-results';
import {TopBar} from './components/top-bar';
import {useQueryData} from './hooks/use-query-data';
import {useQueryQuantities} from './hooks/use-query-quantities';
import {type ResultItem} from './types/types';

const HomeComponent = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [itemDetails, setItemDetails] = useState<ResultItem | null>(null);
  const {
    isLoading,
    rqData,
    onPressNextPage,
    onPressPreviousPage,
    totalPages,
    currentPageNumber,
    searchCharacters,
    searchEpisodes,
    searchLocations,
  } = useQueryData();
  const {data} = useQueryQuantities();

  return (
    <SafeAreaView>
      <DetailsModal visible={modalVisible} setVisible={setModalVisible} itemDetails={itemDetails} />
      <View style={styles.container}>
        <TopBar searchEpisodes={searchEpisodes} searchLocations={searchLocations} />
        <Header />
        <SearchBar
          searchCharacters={searchCharacters}
          searchEpisodes={searchEpisodes}
          searchLocations={searchLocations}
        />
        <SearchResults
          results={(!isEmpty(rqData) ? rqData : []) as ResultItem[]}
          setItemDetails={setItemDetails}
          setModalVisible={setModalVisible}
          isLoading={isLoading}
        />
        {currentPageNumber > 0 && (
          <Pagination
            currentPage={currentPageNumber}
            totalPages={totalPages}
            handleNextPage={onPressNextPage}
            handlePrevPage={onPressPreviousPage}
          />
        )}
      </View>
      <Footer locations={data?.locations} characters={data?.characters} episodes={data?.episodes} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackAbsolute,
  },
});

export const Home = memo(HomeComponent);
