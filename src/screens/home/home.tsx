import React, {memo} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {useSearchWithPagination} from './hooks/use-search-with-pagination';
import {Button} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeComponent = (): JSX.Element => {
  const {results, handleNextPage, handlePrevPage, totalPages, currentPage} =
    useSearchWithPagination();
  console.log(results);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Home!!</Text>
        <Text>Pages: {totalPages}</Text>
        <View>
          {results.map((item) => {
            return (
              <View key={item.id}>
                <Text>Name: {item.name}</Text>
              </View>
            );
          })}
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            title="Prev page"
            containerStyle={styles.paginationButton}
            onPress={handlePrevPage}
          />
          <Text>{currentPage}</Text>
          <Button
            title="Next page"
            containerStyle={[styles.paginationButton, {left: 10}]}
            onPress={handleNextPage}
          />
        </View>
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
});

export const Home = memo(HomeComponent);
