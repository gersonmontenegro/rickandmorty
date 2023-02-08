import {Button} from '@rneui/base';
import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

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
    <View style={styles.container}>
      <Button title="Prev page" containerStyle={styles.paginationButton} onPress={handlePrevPage} />
      <Text>{`${currentPage}/${totalPages}`}</Text>
      <Button
        title="Next page"
        containerStyle={[styles.paginationButton, {left: 10}]}
        onPress={handleNextPage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  paginationButton: {
    width: 60,
    height: 40,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export const Pagination = memo(PaginationComponent);
