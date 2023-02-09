/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSearchWithPagination} from './hooks/use-search-with-pagination';
import {SafeAreaView} from 'react-native-safe-area-context';
import {type ResultItem} from './types/types';
import {DetailsModal} from './components/details-modal';
import {TopBar} from './components/top-bar';
import {Header} from './components/header';
import {SearchBar} from './components/search-bar';
import {SearchResults} from './components/search-results';
import {Pagination} from './components/pagination';
import {Footer} from './components/footer';
import {colors} from '@utils/colors';

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

  useEffect(() => {
    console.log('SEAR!');
    searchCharacters('');
  }, []);

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
