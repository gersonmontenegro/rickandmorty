import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SEPARATOR} from '../constants';

interface PaginationProps {
  handleNextPage: () => void;
  handlePrevPage: () => void;
  currentPage: number;
  totalPages: number;
}

const PaginationComponent = ({
  handleNextPage,
  handlePrevPage,
  currentPage,
  totalPages,
}: PaginationProps): JSX.Element => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Pressable style={styles.arrowButton} onPress={handlePrevPage}>
          <Icon name="caret-left" size={20} color="#ffff" />
        </Pressable>
        <Text style={styles.separator}>{SEPARATOR}</Text>
        <View style={styles.pagesContainer}>
          <Text style={styles.pageText}>{`${currentPage} / ${totalPages}`}</Text>
        </View>
        <Text style={styles.separator}>{SEPARATOR}</Text>
        <Pressable style={styles.arrowButton} onPress={handleNextPage}>
          <Icon name="caret-right" size={20} color="#ffff" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(350),
    height: verticalScale(40),
  },
  container: {
    backgroundColor: '#333333',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: scale(250),
    height: verticalScale(25),
    borderRadius: 20,
  },
  paginationButton: {
    width: 60,
    height: 40,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pageText: {
    color: 'white',
  },
  separator: {
    color: 'lightgray',
  },
  pagesContainer: {
    alignItems: 'center',
    width: scale(200),
  },
  arrowButton: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Pagination = memo(PaginationComponent);
