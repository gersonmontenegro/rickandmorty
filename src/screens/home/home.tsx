import React, {memo, useCallback, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useSearchWithPagination} from './hooks/use-search-with-pagination';
import {Button} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatGrid} from 'react-native-super-grid';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {verticalScale} from 'react-native-size-matters';
import {type ResultItem} from './types/types';
import {ListItem} from './components/list-item';
import {DetailsModal} from './components/details-modal';
import {TopBar} from './components/top-bar';
import {Header} from './components/header';

const itemsList = [
  {label: 'Characters', value: 'character'},
  {label: 'Locations', value: 'location'},
  {label: 'Episodes', value: 'episode'},
];

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

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('character');
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [itemDetails, setItemDetails] = useState<ResultItem | null>(null);

  const renderListItem = useCallback(
    ({item}: {item: ResultItem}) => (
      <ListItem
        setModalVisible={setModalVisible}
        item={item}
        key={item.id}
        setItemDetails={setItemDetails}
      />
    ),
    [],
  );

  return (
    <SafeAreaView>
      <DetailsModal visible={modalVisible} setVisible={setModalVisible} itemDetails={itemDetails} />
      <View style={styles.container}>
        <TopBar searchEpisodes={searchEpisodes} searchLocations={searchLocations} />
        <Header />
        <View style={styles.headercontianer}>
          <DropDownPicker
            open={open}
            value={value}
            items={itemsList}
            setOpen={setOpen}
            setValue={setValue}
            style={{width: 140, backgroundColor: 'transparent', borderColor: 'transparent'}}
            containerStyle={{backgroundColor: 'transparent', width: 140}}
            listItemLabelStyle={{color: 'white'}}
            listItemContainerStyle={{backgroundColor: '#292929'}}
            textStyle={{color: 'white'}}
          />
          <TextInput
            value={searchInputValue}
            onChangeText={(text: string) => {
              setSearchInputValue(text);
            }}
            placeholder="Type to search"
            style={styles.searchInput}
            placeholderTextColor="lightgray"
          />
          <Pressable
            onPress={() => {
              switch (value) {
                case 'character': {
                  searchCharacters(searchInputValue);
                  break;
                }
                case 'episode': {
                  searchEpisodes(searchInputValue);
                  break;
                }
                case 'location': {
                  searchLocations(searchInputValue);
                  break;
                }
                default: {
                  searchCharacters(searchInputValue);
                }
              }
            }}>
            <Icon name="search" size={20} color="#ffff" style={styles.searchIcon} />
          </Pressable>
        </View>
        <View>
          <FlatGrid data={results ?? []} style={styles.gridView} renderItem={renderListItem} />
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
      <View style={styles.footerContainer}>
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
    height: verticalScale(380),
    backgroundColor: '#333333',
  },
  headercontianer: {
    flexDirection: 'row',
    height: 40,
    zIndex: 10000,
    backgroundColor: '#292929',
    marginHorizontal: 10,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 30,
    marginHorizontal: 10,
    justifyContent: 'center',
    color: 'white',
  },
  searchIcon: {
    right: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export const Home = memo(HomeComponent);
