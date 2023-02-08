import React, {memo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../utils/colors';
import {SEPARATOR} from '../../../utils/constants';

interface PaginationProps {
  handleNextPage: () => void;
  handlePrevPage: () => void;
  currentPage: number;
  totalPages: number;
}
// TODO: Add page numbers, and allow user to select page size
const PaginationComponent = ({
  handleNextPage,
  handlePrevPage,
  currentPage,
  totalPages,
}: PaginationProps): JSX.Element => (
  <View style={styles.mainContainer}>
    <View style={styles.container}>
      <Pressable style={styles.arrowButton} onPress={handlePrevPage}>
        <Icon name="caret-left" size={20} color={colors.whiteIcon} />
      </Pressable>
      <Text style={styles.separator}>{SEPARATOR}</Text>
      <View style={styles.pagesContainer}>
        <Text style={styles.pageText}>{`${currentPage} / ${totalPages}`}</Text>
      </View>
      <Text style={styles.separator}>{SEPARATOR}</Text>
      <Pressable style={styles.arrowButton} onPress={handleNextPage}>
        <Icon name="caret-right" size={20} color={colors.whiteIcon} />
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.blackAbsolute,
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(350),
    height: verticalScale(40),
  },
  container: {
    backgroundColor: colors.secondaryBackgroundGray,
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
    color: colors.whiteAbsolute,
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
