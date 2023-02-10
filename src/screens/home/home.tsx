import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '@utils/colors';

import {DetailsModal} from './components/details-modal';
import {Footer} from './components/footer';
import {Header} from './components/header';
import {Pagination} from './components/pagination';
import {SearchBar} from './components/search-bar';
import {SearchResults} from './components/search-results';
import {TopBar} from './components/top-bar';
import {useSearchWithPagination} from './hooks/use-search-with-pagination';
import {type ResultItem} from './types/types';

const HomeComponent = (): JSX.Element => {
  const {
    results,
    handleNextPage,
    handlePrevPage,
    searchCharacters,
    searchEpisodes,
    searchLocations,
    totalPages,
    currentPage,
    locations,
    episodes,
    characters,
  } = useSearchWithPagination();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [itemDetails, setItemDetails] = useState<ResultItem | null>(null);

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
          results={results}
          setItemDetails={setItemDetails}
          setModalVisible={setModalVisible}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      </View>
      <Footer locations={locations} characters={characters} episodes={episodes} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackAbsolute,
  },
});

export const Home = memo(HomeComponent);
