import React, {memo, useState} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type ImageSourcePropType,
} from 'react-native';
import {useSearchWithPagination} from './hooks/use-search-with-pagination';
import {Button} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatGrid} from 'react-native-super-grid';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Image} from '@rneui/base';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {HeaderImage} from '../../assets/images';

const CARD_WIDTH = 170;
const CARD_HEIGHT = 85;

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

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.topBarContainer}>
          <Pressable style={styles.topBarButton}>
            <Text style={styles.topBarButtonText}>All episodes</Text>
          </Pressable>
          <Pressable style={styles.topBarButton}>
            <Text style={styles.topBarButtonText}>All locations</Text>
          </Pressable>
        </View>
        <View>
          <Image
            source={HeaderImage as ImageSourcePropType}
            style={{width: scale(350), height: verticalScale(130), padding: moderateScale(5)}}
          />
        </View>
        <View style={styles.headercontianer}>
          <DropDownPicker
            open={open}
            value={value}
            items={itemsList}
            setOpen={setOpen}
            setValue={setValue}
            style={{width: 140, backgroundColor: 'transparent', borderColor: 'transparent'}}
            containerStyle={{backgroundColor: 'transparent', width: 140}}
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
          <FlatGrid
            data={results ?? []}
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
    // height: Dimensions.get('window').height - 200,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    backgroundColor: 'gray',
    borderRadius: 5,
    padding: 10,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
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
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'black',
  },
  topBarButton: {
    marginHorizontal: 5,
    height: 30,
    justifyContent: 'center',
  },
  topBarButtonText: {
    color: 'white',
    fontFamily: 'Verdana',
    fontWeight: 'bold',
    fontSize: 12,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export const Home = memo(HomeComponent);
