import React, {memo, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import {SEPARATOR} from '../constants';

interface SearchBarProps {
  searchCharacters: (value: string) => void;
  searchLocations: (value: string) => void;
  searchEpisodes: (value: string) => void;
}

const itemsList = [
  {label: 'Characters', value: 'character'},
  {label: 'Locations', value: 'location'},
  {label: 'Episodes', value: 'episode'},
];

const SearchBarComponent = ({
  searchCharacters,
  searchEpisodes,
  searchLocations,
}: SearchBarProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('character');
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  return (
    <View style={styles.headercontianer}>
      <DropDownPicker
        open={open}
        value={value}
        items={itemsList}
        setOpen={setOpen}
        setValue={setValue}
        style={{width: 130, backgroundColor: 'transparent', borderColor: 'transparent'}}
        containerStyle={{backgroundColor: 'transparent', width: 130}}
        listItemLabelStyle={{color: 'white'}}
        listItemContainerStyle={{backgroundColor: '#292929'}}
        textStyle={{color: 'white'}}
      />
      <Text style={styles.separator}>{SEPARATOR}</Text>
      <TextInput
        value={searchInputValue}
        onChangeText={(text: string) => {
          setSearchInputValue(text);
        }}
        placeholder="Type to search..."
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
  );
};

const styles = StyleSheet.create({
  headercontianer: {
    flexDirection: 'row',
    height: 30,
    zIndex: 10000,
    backgroundColor: '#292929',
    marginHorizontal: 10,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    top: 5,
  },
  searchInput: {
    flex: 1,
    height: 30,
    marginHorizontal: 10,
    justifyContent: 'center',
    color: 'white',
    fontSize: 12,
    fontFamily: 'Verdana',
  },
  searchIcon: {
    right: 10,
  },
  separator: {
    color: 'lightgray',
  },
});

export const SearchBar = memo(SearchBarComponent);
