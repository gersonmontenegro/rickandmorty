import React, {memo} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSearchWithPagination} from './hooks/use-search-with-pagination';
import {Button} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatGrid} from 'react-native-super-grid';

const CARD_WIDTH = 170;
const CARD_HEIGHT = 85;

const HomeComponent = (): JSX.Element => {
  const {
    results,
    handleNextPage,
    handlePrevPage,
    totalPages,
    currentPage,
    locations,
    episodes,
    characters,
  } = useSearchWithPagination();
  console.log(results);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Home!!</Text>
        <View>
          <FlatGrid
            data={results}
            style={styles.gridView}
            renderItem={({item}) => {
              return (
                <Pressable
                  style={styles.itemContainer}
                  onPress={() => {
                    console.log(item.name);
                  }}>
                  <Text>Name: {item.name}</Text>
                </Pressable>
              );
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            title="Prev page"
            containerStyle={styles.paginationButton}
            onPress={handlePrevPage}
          />
          <Text>{`${currentPage}/${totalPages}`}</Text>
          <Button
            title="Next page"
            containerStyle={[styles.paginationButton, {left: 10}]}
            onPress={handleNextPage}
          />
        </View>
      </View>
      <View>
        <Text>{`Locations: ${locations}`}</Text>
        <Text>{`Characters: ${characters}`}</Text>
        <Text>{`Episodes: ${episodes}`}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  paginationButton: {
    width: 60,
    height: 40,
  },
  gridView: {
    marginTop: 10,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 200,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    backgroundColor: 'gray',
    borderRadius: 5,
    padding: 10,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
  },
});

export const Home = memo(HomeComponent);
