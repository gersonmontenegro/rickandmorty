import React, {memo, useCallback, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import {colors} from '@utils/colors';
import {
  DROPDOWN_WIDTH,
  Entities,
  Messages,
  SEARCH_HEIGHT,
  SEPARATOR,
  itemsList,
} from '@utils/constants';

interface SearchBarProps {
  searchCharacters: (value: string) => void;
  searchLocations: (value: string) => void;
  searchEpisodes: (value: string) => void;
}

const SearchBarComponent = ({
  searchCharacters,
  searchEpisodes,
  searchLocations,
}: SearchBarProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(Entities.Character);
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  const onPressSearch = useCallback(() => {
    switch (value) {
      case Entities.Character: {
        searchCharacters(searchInputValue);
        break;
      }
      case Entities.Episode: {
        searchEpisodes(searchInputValue);
        break;
      }
      case Entities.Location: {
        searchLocations(searchInputValue);
        break;
      }
      default: {
        searchCharacters(searchInputValue);
      }
    }
  }, [searchCharacters, searchEpisodes, searchInputValue, searchLocations, value]);

  return (
    <View style={styles.searchHeaderContaianer}>
      <DropDownPicker
        open={open}
        value={value}
        items={itemsList}
        setOpen={setOpen}
        setValue={setValue}
        style={styles.dropdown}
        containerStyle={styles.containerStyle}
        listItemLabelStyle={styles.listItemLabelStyle}
        listItemContainerStyle={styles.listItemContainerStyle}
        textStyle={styles.textStyle}
      />
      <Text style={styles.separator}>{SEPARATOR}</Text>
      <TextInput
        value={searchInputValue}
        onChangeText={(text: string) => {
          setSearchInputValue(text);
        }}
        placeholder={Messages['type.to.search']}
        style={styles.searchInput}
        placeholderTextColor="lightgray"
      />
      <Pressable onPress={onPressSearch}>
        <Icon name="search" size={20} color={colors.whiteIcon} style={styles.searchIcon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  searchHeaderContaianer: {
    flexDirection: 'row',
    height: SEARCH_HEIGHT,
    zIndex: 10000,
    backgroundColor: colors.backgroundGray,
    marginHorizontal: 10,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    top: 5,
  },
  searchInput: {
    flex: 1,
    height: SEARCH_HEIGHT,
    marginHorizontal: 10,
    justifyContent: 'center',
    color: colors.whiteAbsolute,
    fontSize: 12,
    fontFamily: 'Verdana',
  },
  searchIcon: {
    right: 10,
  },
  separator: {
    color: colors.secondaryGray,
  },
  listItemLabelStyle: {
    color: colors.whiteAbsolute,
  },
  textStyle: {
    color: colors.whiteAbsolute,
  },
  listItemContainerStyle: {
    backgroundColor: colors.backgroundGray,
  },
  dropdown: {
    width: DROPDOWN_WIDTH,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  containerStyle: {
    backgroundColor: 'transparent',
    width: DROPDOWN_WIDTH,
  },
});

export const SearchBar = memo(SearchBarComponent);
